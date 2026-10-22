import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getMessaging } from 'firebase-admin/messaging';

function getAdminApp(): App {
  if (getApps().length > 0) return getApps()[0];

  const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!rawJson) {
    throw new Error('CONFIG_ERROR_MISSING_CREDENTIALS');
  }

  let serviceAccount: { project_id?: string; client_email?: string; private_key?: string };
  try {
    serviceAccount = JSON.parse(rawJson);
  } catch {
    throw new Error('CONFIG_ERROR_INVALID_JSON');
  }

  if (!serviceAccount.project_id || !serviceAccount.client_email || !serviceAccount.private_key) {
    throw new Error('CONFIG_ERROR_INCOMPLETE_FIELDS');
  }

  return initializeApp({
    credential: cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key.replace(/\\n/g, '\n'),
    }),
  });
}

export default async function handler(req: any, res: any) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || 'https://in.arsca.tax';
  const requestOrigin = req.headers?.origin;

  // Strict CORS Validation: Only exact configured origin
  if (requestOrigin) {
    if (requestOrigin === allowedOrigin) {
      res.setHeader('Access-Control-Allow-Origin', requestOrigin);
    } else {
      return res.status(403).json({ success: false, error: 'ORIGIN_FORBIDDEN' });
    }
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'METHOD_NOT_ALLOWED' });
  }

  try {
    // 1. Verify Authorization Bearer Header
    const authHeader = req.headers?.authorization;
    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'AUTH_HEADER_MISSING' });
    }

    const idToken = authHeader.split('Bearer ')[1].trim();
    if (!idToken) {
      return res.status(401).json({ success: false, error: 'ID_TOKEN_EMPTY' });
    }

    const app = getAdminApp();
    const decoded = await getAuth(app).verifyIdToken(idToken);

    // 2. Authorize ONLY by verified UID against TEST_ADMIN_UIDS
    const allowedUids = (process.env.TEST_ADMIN_UIDS || '')
      .split(',')
      .map((uid) => uid.trim())
      .filter(Boolean);

    if (allowedUids.length === 0) {
      return res.status(403).json({ success: false, error: 'TEST_ALLOWLIST_NOT_CONFIGURED' });
    }

    if (!allowedUids.includes(decoded.uid)) {
      return res.status(403).json({ success: false, error: 'CALLER_UID_NOT_AUTHORIZED' });
    }

    // 3. Validate Submitted Device Token Format
    const { token } = req.body || {};
    if (
      !token ||
      typeof token !== 'string' ||
      token.length < 50 ||
      token.length > 500 ||
      /[\r\n\s]/.test(token)
    ) {
      return res.status(400).json({ success: false, error: 'INVALID_DEVICE_TOKEN_FORMAT' });
    }

    // 4. Dispatch Test Notification (Single Target)
    const messageId = await getMessaging(app).send({
      token,
      notification: {
        title: 'ARSCA Test Notification',
        body: 'This is a test notification confirming device push delivery for ARSCA Tax Consultants.',
      },
      data: {
        type: 'test_notification',
        timestamp: String(Date.now()),
      },
      webpush: {
        headers: { Urgency: 'high' },
        notification: {
          icon: '/icons/launchericon-192x192.png',
          badge: '/icons/launchericon-192x192.png',
        },
      },
    });

    return res.status(200).json({
      success: true,
      messageId: messageId.split('/').pop() || 'sent',
    });
  } catch (err: any) {
    const errorCode = err.code || err.message || 'DISPATCH_ERROR';
    // Sanitize error response: never expose private key or credentials
    const safeError =
      errorCode.includes('CONFIG_ERROR')
        ? errorCode
        : errorCode.includes('auth/')
        ? 'FIREBASE_AUTH_FAILED'
        : errorCode.includes('messaging/')
        ? 'FCM_MESSAGING_ERROR'
        : 'INTERNAL_SERVER_ERROR';

    return res.status(500).json({ success: false, error: safeError });
  }
}
