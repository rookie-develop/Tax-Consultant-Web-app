// Vercel Daily Cron Function: Automated Compliance Deadline Processor
import type { Request, Response } from 'express';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';

if (!getApps().length) {
  try {
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY
      ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined;

    if (projectId && clientEmail && privateKey) {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    } else if (projectId) {
      initializeApp({ projectId });
    }
  } catch (err) {
    console.warn('[Cron Reminders] Firebase Admin initialization note:', err);
  }
}

const TEST_UID_ALLOWLIST = [
  'keshavyadav5306@gmail.com',
  ...(process.env.TEST_ADMIN_UIDS || '').split(',').map((s) => s.trim()),
].filter(Boolean);

export default async function handler(req: Request, res: Response) {
  // Verify Cron authorization via CRON_SECRET or Vercel cron header
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;
  const isVercelCron = Boolean(req.headers['x-vercel-cron']);

  if (cronSecret && authHeader !== `Bearer ${cronSecret}` && !isVercelCron) {
    return res.status(401).json({ error: 'Unauthorized: Invalid Cron Secret' });
  }

  if (!getApps().length) {
    return res.status(200).json({
      status: 'skipped',
      message: 'Firebase Admin not configured for live database scan.',
    });
  }

  try {
    const db = getFirestore();
    const now = Date.now();

    // 1. Fetch active notification rules
    const rulesSnap = await db.collection('notification_rules').where('isEnabled', '==', true).get();
    const activeRules: any[] = [];
    rulesSnap.forEach((doc) => activeRules.push({ id: doc.id, ...doc.data() }));

    // 2. Fetch active compliance deadlines
    const deadlinesSnap = await db.collection('tax_deadlines').where('status', '==', 'active').get();
    const activeDeadlines: any[] = [];
    deadlinesSnap.forEach((doc) => activeDeadlines.push({ id: doc.id, ...doc.data() }));

    let dispatchedCount = 0;
    let skippedDuplicateCount = 0;

    for (const rule of activeRules) {
      const matchingDeadlines = activeDeadlines.filter((d) => d.taxType === rule.taxType);

      for (const deadline of matchingDeadlines) {
        const dueDateMs = new Date(deadline.effectiveDueDate).getTime();
        const daysRemaining = Math.ceil((dueDateMs - now) / (1000 * 60 * 60 * 24));

        // Trigger condition: deadline is within the rule's notification window
        if (daysRemaining <= rule.daysBeforeDeadline && daysRemaining >= 0) {
          // Query eligible client preferences
          const prefsSnap = await db
            .collection('client_preferences')
            .where('obligations', 'array-contains', rule.taxType)
            .get();

          const targetClients: { uid: string; email: string }[] = [];
          prefsSnap.forEach((doc) => {
            const data = doc.data();
            targetClients.push({ uid: doc.id, email: data.email || '' });
          });

          // Server-enforced test isolation: filter strictly when isTestRule is active
          const eligibleClients = rule.isTestRule
            ? targetClients.filter(
                (c) => TEST_UID_ALLOWLIST.includes(c.uid) || TEST_UID_ALLOWLIST.includes(c.email)
              )
            : targetClients;

          for (const client of eligibleClients) {
            // Deterministic Idempotency Key
            const idempotencyKey = `remind_${rule.id}_${deadline.id}_${deadline.period}_${client.uid}`;
            const logRef = db.collection('delivery_logs').doc(idempotencyKey);
            const logDoc = await logRef.get();

            if (logDoc.exists) {
              skippedDuplicateCount++;
              continue;
            }

            // Prepare notification text
            const title = rule.titleTemplate.replace('{{period}}', deadline.period);
            const body = rule.bodyTemplate
              .replace('{{period}}', deadline.period)
              .replace('{{dueDate}}', deadline.effectiveDueDate);

            // Create In-App Notification
            await db.collection('in_app_notifications').add({
              uid: client.uid,
              title,
              body,
              category: 'deadline',
              taxType: deadline.taxType,
              effectiveDueDate: deadline.effectiveDueDate,
              actionUrl: rule.actionUrl || '/#services',
              isRead: false,
              createdAt: now,
            });

            // Query active tokens
            const tokenSnaps = await db
              .collection('fcm_tokens')
              .where('uid', '==', client.uid)
              .where('status', '==', 'active')
              .get();

            const fcmTokens: string[] = [];
            tokenSnaps.forEach((t) => {
              const d = t.data();
              if (d.token) fcmTokens.push(d.token);
            });

            let successCount = 0;
            let failureCount = 0;

            if (fcmTokens.length > 0) {
              try {
                const response = await getMessaging().sendEachForMulticast({
                  tokens: fcmTokens,
                  notification: { title, body },
                  data: {
                    title,
                    body,
                    actionUrl: rule.actionUrl || '/#services',
                  },
                });
                successCount = response.successCount;
                failureCount = response.failureCount;
              } catch (fcmErr) {
                console.warn('[FCM Cron] Dispatch error:', fcmErr);
              }
            }

            // Write to Idempotency Ledger
            await logRef.set({
              id: idempotencyKey,
              idempotencyKey,
              ruleId: rule.id,
              deadlineId: deadline.id,
              period: deadline.period,
              uid: client.uid,
              tokensTargeted: fcmTokens.length,
              successCount,
              failureCount,
              staleTokensRemoved: 0,
              status: 'delivered',
              sentAt: now,
            });

            dispatchedCount++;
          }
        }
      }
    }

    return res.status(200).json({
      status: 'success',
      dispatchedCount,
      skippedDuplicateCount,
      message: `Processed reminders. Dispatched: ${dispatchedCount}, Skipped duplicate: ${skippedDuplicateCount}`,
    });
  } catch (err: any) {
    console.error('[Cron Execution Error]:', err);
    return res.status(500).json({ error: err.message || 'Internal Cron Error' });
  }
}
