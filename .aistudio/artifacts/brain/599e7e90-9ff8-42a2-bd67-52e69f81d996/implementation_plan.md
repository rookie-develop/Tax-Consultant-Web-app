# ARSCA Tax Consultant — Push Notification & Tax Reminder System Implementation Plan (Revised)

A rigorous, phased architectural blueprint to integrate an admin-controlled push notification and automated statutory tax deadline reminder system into the ARSCA Tax Consultant web app and installed Android Trusted Web Activity (TWA), without disrupting existing features.

> [!IMPORTANT]
> **Planning Mode Active — Zero Changes Made**: This document is a strategic specification and implementation blueprint only. No code, configuration, database schemas, or Firebase settings have been modified. Execution requires your explicit review and approval.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions require your review and confirmation before proceeding to code execution:

- **Decision 1: Backend Execution Environment & Hosting Quotas**
  - *(Recommended)* **Vercel Serverless Function + Daily Vercel Cron with Firebase Admin SDK**:
    - Operates within Firebase Spark plan quotas without requiring a credit card or Blaze billing activation.
    - Uses Vercel's daily cron trigger (`0 3 * * *` UTC = 08:30 AM IST).
    - *Constraint & Safeguard*: Vercel Hobby serverless functions have a **10-second maximum duration limit**. In early phases (10–500 clients), processing takes under 1.5 seconds. If the client database scales to thousands of active push tokens in the future, chunked execution or an external task queue will be required.
  - *Alternative*: **Firebase Cloud Functions 2nd Gen (Cloud Run backend) + Cloud Scheduler**:
    - Native GCP infrastructure, but **strictly requires upgrading Firebase to the Blaze (Pay-as-you-go) plan** with credit card validation.
- **Decision 2: Admin Identity Provisioning**
  - *(Recommended)* **Immutable Server-Side Role Collection (`admins/{uid}`)**:
    - The authorized admin UID is manually provisioned in Firestore or via Firebase Admin SDK.
    - Write access is completely disabled in client security rules (`allow write: if false`), ensuring no client can elevate their own privileges.
- **Decision 3: Test Scope for GSTR-1 Baseline**
  - Automated test will execute on **GSTR-1** with an explicit server-enforced `TEST_UID_ALLOWLIST`, guaranteeing zero messages reach production clients regardless of client-side inputs.

---

## A. Recommended Architecture & Comparative Analysis

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT INTERFACE LAYER                            │
│                                                                             │
│   Web Browser (Desktop / Mobile)       Android App (TWA - in.arsca.tax)     │
│   ┌──────────────────────────────┐     ┌────────────────────────────────┐   │
│   │ • React 19 UI (Existing)     │     │ • Fullscreen Chrome Container  │   │
│   │ • In-App Notification Center │     │ • Native Notification Delegate │   │
│   │ • Tax Preferences Manager    │     │ • Origin-delegated Web Push    │   │
│   └──────────────┬───────────────┘     └───────────────┬────────────────┘   │
└──────────────────┼─────────────────────────────────────┼────────────────────┘
                   │                                     │
                   ▼                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     SERVICE WORKER & TOKEN REGISTRATION                     │
│                                                                             │
│   public/firebase-messaging-sw.js (Firebase JS SDK v12 Web Push)            │
│   • Registers FCM token via `getToken(messaging, { vapidKey })`             │
│   • Background handler: displays privacy-safe compliance alert              │
│   • Background click: deep-links to ARSCA portal                            │
│   • Stores token document: `fcm_tokens/{tokenId}`                           │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        DATA PERSISTENCE (FIRESTORE)                         │
│                                                                             │
│   • `clients/{uid}`           (Existing Client records; UID-restricted)     │
│   • `client_preferences/{uid}`(Client-specific tax obligations & toggles)   │
│   • `fcm_tokens/{tokenId}`    (Active web/TWA push tokens; UID-scoped)      │
│   • `tax_deadlines/{id}`      (Configurable statutory deadlines & dates)    │
│   • `notification_rules/{id}` (Admin rules: days-before, audience, text)    │
│   • `in_app_notices/{id}`     (In-app notification center inbox)            │
│   • `delivery_logs/{logId}`   (Server-only idempotency & audit ledger)      │
│   • `admins/{uid}`            (Read-only admin identity allowlist)          │
└──────────────────────────────────▲──────────────────────────────────────────┘
                                   │
                                   │ HTTPS / Firebase Admin SDK (Private Key)
                                   │
┌──────────────────────────────────┴──────────────────────────────────────────┐
│                   SERVER-SIDE DISPATCH & AUTOMATION LAYER                   │
│                                                                             │
│   [Vercel Serverless API + Vercel Cron]                                     │
│   • `POST /api/admin/send` (Verified via `admin.auth().verifyIdToken()`)    │
│   • `GET /api/cron/reminders` (Secured via `CRON_SECRET` Bearer token)      │
│   • Jitter-tolerant date-window scanning & strict Idempotency Key check     │
│   • Enforced `TEST_UID_ALLOWLIST` when running in test mode                 │
│   • Multicast dispatch via `admin.messaging().sendEachForMulticast()`       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Server-Side Technology Comparison

| Evaluation Criteria | Option A: Vercel Serverless + Cron (Recommended) | Option B: Firebase Cloud Functions 2nd Gen |
| :--- | :--- | :--- |
| **Firebase Billing Plan** | **Firebase Spark (Free)**. Zero billing account required. | **Firebase Blaze (Pay-as-you-go)**. Credit card mandatory to deploy. |
| **Security & Secrets** | Secrets held in Vercel Encrypted Environment Variables. | Secrets managed in Google Cloud Secret Manager. |
| **Vercel Hobby Limitations** | 1 cron job / day; **10-second execution limit**. (Sufficient for daily morning batching up to 500 clients). | Concurrency up to 1000; up to 9-minute execution timeout. |
| **Idempotency Requirement** | **Mandatory**: Must withstand cron jitter, retries, and manual re-triggers. | Mandatory: Must handle function cold-start retries. |

---

## B. SDK Compatibility & Deprecated API Audit

1. **Installed Frontend SDK**:
   - `package.json` contains `"firebase": "^12.19.0"`.
   - In Firebase JS SDK v12, the messaging client is strictly modular:
     ```typescript
     import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';
     ```
   - **Deprecated APIs to Avoid**:
     - Do NOT use legacy callback-based `messaging.getToken()`.
     - Do NOT pass sender ID directly; modern v12 requires passing `{ vapidKey: string, serviceWorkerRegistration?: ServiceWorkerRegistration }`.
     - In the service worker (`public/firebase-messaging-sw.js`), use the compatible worker bundle (`importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js', 'https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js')`) or a bundled modern worker to ensure broad mobile browser compatibility.
   - **Environment Guard**:
     - Must call `await isSupported()` before initializing messaging to gracefully handle private browsing, iOS Safari without PWA mode, and environments where `PushManager` is unavailable.

2. **Backend Admin SDK**:
   - Install `"firebase-admin": "^13.x"` in the serverless API context.
   - **Deprecated APIs to Avoid**:
     - Do NOT use legacy `sendToDevice()`.
     - Use `admin.messaging().sendEachForMulticast()` which handles up to 500 tokens per batch, returns individual token statuses, and pinpoints invalid tokens (`messaging/registration-token-not-registered`).

---

## C. Delivery vs. Visibility & Lock-Screen Privacy Safeguards

- **Delivery ≠ Visibility**:
  - An HTTP 200 response from FCM confirms the message was accepted and handed off to Google Play Services or the browser push endpoint.
  - It does **not** guarantee the client saw or read the notice (device may be powered off, app notifications disabled at the OS level, or battery saver delaying wakeups).
  - The in-app notification center acts as the reliable fallback inbox when users open the app.
- **Lock-Screen Privacy Policy**:
  - Push notifications appear on public device lock screens.
  - **Strict Rule**: Lock-screen payloads must NEVER include sensitive financial data, PAN numbers, turnover, computed tax liability, or client IDs.
  - *Standard compliant format*:
    - **Title**: `ARSCA Tax Alert: GSTR-1 Filing Reminder`
    - **Body**: `GSTR-1 for [Period] is due in [X] days ([Date]). Open the ARSCA portal to review your compliance checklist.`

---

## D. Proposed Firestore Data Model & Least-Privilege Rules

### Overlapping Rules Architecture Warning
> [!WARNING]
> **Firestore `allow` rules are additive (`OR` logic)**. If any rule matching a path grants access, no subsequent rule can restrict it. We must ensure no global `allow read: if request.auth != null;` is placed on the `/clients` collection or root, which would compromise client privacy.

### 1. `clients/{docId}` (Existing Client Directory — Preserved)
- **Security Rule**:
  ```javascript
  match /clients/{docId} {
    // Strictly preserve existing isolation: user can only read their OWN record matching their UID
    allow read: if request.auth != null && (resource.data.uid == request.auth.uid || exists(/databases/$(database)/documents/admins/$(request.auth.uid)));
    allow write: if false; // Clients cannot modify records; managed only by server/admin
  }
  ```

### 2. `client_preferences/{uid}`
- **Schema**:
  ```typescript
  interface ClientPreference {
    uid: string;
    email: string;
    obligations: Array<'gstr1' | 'gstr3b' | 'cmp08' | 'advance_tax' | 'itr_salaried' | 'itr_business' | 'tax_audit'>;
    gstFilingFrequency: 'monthly' | 'quarterly';
    pushNotificationsEnabled: boolean;
    updatedAt: FirebaseFirestore.Timestamp;
  }
  ```
- **Security Rule**:
  ```javascript
  match /client_preferences/{uid} {
    allow read, write: if request.auth != null && request.auth.uid == uid;
    allow read: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
  }
  ```

### 3. `fcm_tokens/{tokenId}`
- **Schema**:
  ```typescript
  interface FCMTokenRecord {
    tokenId: string;
    token: string;
    uid: string;
    platform: 'web' | 'android_twa';
    userAgent: string;
    createdAt: FirebaseFirestore.Timestamp;
    updatedAt: FirebaseFirestore.Timestamp;
    status: 'active' | 'stale';
  }
  ```
- **Security Rule**:
  ```javascript
  match /fcm_tokens/{tokenId} {
    // Authenticated user can create or update ONLY tokens tagged with their own UID
    allow read, write: if request.auth != null && request.resource.data.uid == request.auth.uid;
    // Admins can read tokens for verification
    allow read: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
  }
  ```

### 4. `tax_deadlines/{deadlineId}`
- **Schema**:
  ```typescript
  interface TaxDeadline {
    id: string;
    taxType: 'gstr1' | 'gstr3b' | 'advance_tax' | 'itr_individual' | 'itr_business';
    period: string;
    frequency: 'monthly' | 'quarterly' | 'annual';
    statutoryDueDate: FirebaseFirestore.Timestamp;
    effectiveDueDate: FirebaseFirestore.Timestamp; // Accommodates extensions
    isExtended: boolean;
    extensionCircularRef?: string;
    applicableAudience: 'all' | 'monthly_filers' | 'quarterly_filers';
    status: 'active' | 'archived';
    updatedBy: string;
  }
  ```
- **Security Rule**:
  ```javascript
  match /tax_deadlines/{deadlineId} {
    allow read: if request.auth != null; // Clients can view deadlines
    allow write: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
  }
  ```

### 5. `notification_rules/{ruleId}`
- **Schema**:
  ```typescript
  interface NotificationRule {
    id: string;
    name: string;
    taxType: string;
    daysBeforeDeadline: number;
    isEnabled: boolean;
    titleTemplate: string;
    bodyTemplate: string;
    actionUrl: string;
    isTestRule: boolean;
  }
  ```
- **Security Rule**:
  ```javascript
  match /notification_rules/{ruleId} {
    // Confidential to administrators
    allow read, write: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
  }
  ```

### 6. `in_app_notifications/{noticeId}`
- **Schema**:
  ```typescript
  interface InAppNotification {
    id: string;
    uid: string;
    title: string;
    body: string;
    category: 'deadline' | 'circular' | 'general';
    taxType?: string;
    effectiveDueDate?: FirebaseFirestore.Timestamp;
    isRead: boolean;
    actionUrl?: string;
    createdAt: FirebaseFirestore.Timestamp;
  }
  ```
- **Security Rule**:
  ```javascript
  match /in_app_notifications/{noticeId} {
    allow read: if request.auth != null && (resource.data.uid == request.auth.uid || resource.data.uid == 'broadcast');
    allow update: if request.auth != null && resource.data.uid == request.auth.uid 
                  && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['isRead']);
    allow create, delete: if false; // Server-only creation
  }
  ```

### 7. `delivery_logs/{logId}` & `admins/{uid}`
- **Security Rules**:
  ```javascript
  match /delivery_logs/{logId} {
    allow read: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    allow write: if false; // Server-only
  }

  match /admins/{uid} {
    allow read: if request.auth != null && request.auth.uid == uid;
    allow write: if false; // Immutable from client app
  }
  ```

---

## E. Server-Side Idempotency, Jitter Tolerance & Test Isolation

### 1. Robust Idempotency Handling for Vercel Hobby Crons
Vercel Hobby crons can trigger with delays or be retried. The processor implements deterministic idempotency:
- **Date-Window Evaluation**:
  Instead of an exact timestamp comparison (`effectiveDueDate - now == exactly 3 days`), the worker scans:
  `daysRemaining = Math.ceil((effectiveDueDate.toMillis() - now) / (1000 * 60 * 60 * 24))`
  If `daysRemaining <= rule.daysBeforeDeadline` and the deadline has not expired:
- **Deterministic Idempotency Key**:
  `idempotencyKey = `${rule.id}_${deadline.id}_${period}_${client.uid}``
- **Atomic Pre-Check & Write**:
  The worker executes a Firestore transaction:
  ```typescript
  const logRef = db.collection('delivery_logs').doc(idempotencyKey);
  const doc = await transaction.get(logRef);
  if (doc.exists) {
    // Already delivered for this cycle; skip silently
    return;
  }
  // Proceed to dispatch and write log within the same cycle
  ```

### 2. Server-Enforced Test Allowlist (Non-Bypassable)
To prevent accidental messages to real clients during testing:
- In `/api/cron/reminders.ts` and `/api/admin/send.ts`:
  ```typescript
  const TEST_UID_ALLOWLIST = (process.env.TEST_ADMIN_UIDS || '').split(',').map(s => s.trim());

  if (rule.isTestRule || req.body.isTestMode) {
    // Server enforces filtering regardless of what client payload sent
    targetUids = targetUids.filter(uid => TEST_UID_ALLOWLIST.includes(uid));
    if (targetUids.length === 0) {
      return res.status(200).json({ status: 'skipped_no_whitelisted_test_recipients' });
    }
  }
  ```

### 3. Server-Side Admin Authentication
Every admin route (`/api/admin/*`) executes:
```typescript
const authHeader = req.headers.authorization;
if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
const idToken = authHeader.split('Bearer ')[1];
const decoded = await admin.auth().verifyIdToken(idToken);

// Independent database check - not trusting frontend flags
const adminDoc = await admin.firestore().collection('admins').doc(decoded.uid).get();
if (!adminDoc.exists) {
  return res.status(403).json({ error: 'Forbidden: Admin authorization required' });
}
```

---

## F. Realistic Pricing Assessment & Quota Assumptions

### 1. Vercel Limits
- **Hobby Plan**: $0/month.
- **Assumptions**: 1 cron job allowed (`/api/cron/reminders`).
- **Potential Risk & Scaling Threshold**:
  - Maximum Serverless Function duration: **10 seconds**.
  - Sending push notifications via FCM takes ~50–100ms per batch of 500 tokens.
  - As long as active client base is under 1,000 clients, the cron completes in 1–3 seconds ($0 cost).
  - If client volume grows to 5,000+ tokens, Vercel Hobby will timeout, requiring Vercel Pro ($20/month) or an asynchronous queue.

### 2. Firebase Limits
- **Spark Plan**: $0/month (Free).
- **Quota Headroom**:
  - Daily document reads: 50,000 (a daily cron check for 100 clients uses ~150 reads).
  - Daily document writes: 20,000 (writing delivery logs uses ~100 writes).
  - FCM Transmissions: **Always 100% free** (no Google fee for sending push messages).
- **Potential Risk**:
  - Spark enforces a hard cutoff: if daily reads exceed 50,000, operations fail until midnight PST.
  - To prevent read surges, client app uses local caching and indexed queries.

---

## G. Numbered Phased Implementation Plan

### Phase 1: In-App Notification Center UI & Client Tax Preferences
*Smallest safe, zero-risk foundation. Operates completely within Spark plan without touching external push services.*
- **Files Modified/Created**:
  - `src/types.ts`: Define `InAppNotification`, `ClientPreference`.
  - `src/components/NotificationModal.tsx`: Connect to live Firestore query `in_app_notifications` scoped to `request.auth.uid`.
  - `src/components/TaxPreferencesModal.tsx` (New): Client modal to select relevant tax obligations (GST, ITR).
  - `src/components/Header.tsx`: Unread bell badge for logged-in clients.
- **Rollback**: Revert `NotificationModal.tsx` and `Header.tsx`.

### Phase 2: Service Worker & Web/TWA Push Token Registration
*Enables device push token capture on Chrome and Android TWA.*
- **Files Modified/Created**:
  - `public/firebase-messaging-sw.js` (New): Web push service worker with background push handler.
  - `src/config/firebase.ts`: Export `registerFCMToken()` and `isSupported()` check.
  - `src/components/TaxPreferencesModal.tsx`: Add push permission toggle.
- **Rollback**: Delete `public/firebase-messaging-sw.js`.

### Phase 3: Serverless Backend & Idempotent Reminder Engine
*Deploys the secure serverless routes and Vercel cron.*
- **Files Modified/Created**:
  - `api/admin/send.ts` (New): Token-verified admin dispatch route.
  - `api/cron/reminders.ts` (New): Idempotent daily cron processor with `TEST_UID_ALLOWLIST` filter.
  - `vercel.json`: Configure daily schedule for `/api/cron/reminders`.
- **Rollback**: Delete `api/` routes and `vercel.json` cron entry.

### Phase 4: Admin Control Dashboard
*Provides the UI for deadlines, rules, and delivery audits.*
- **Files Modified/Created**:
  - `src/components/admin/AdminDashboard.tsx` (New): Deadlines, rules, manual broadcast, and log viewer.
  - `src/App.tsx`: Secure route accessible only after Firestore `admins/{uid}` confirmation.
- **Rollback**: Remove admin route from `App.tsx`.

### Phase 5: GSTR-1 Test Case Verification
*Validates the end-to-end pipeline using the exact test scenario requested.*
- Configure GSTR-1 deadline test date (3 days ahead).
- Associate rule to `TEST_UID_ALLOWLIST` (admin UID only).
- Trigger dispatch; verify arrival on Desktop Chrome and Android TWA, verify idempotency ledger entry, and confirm zero other clients were targeted.

---

## H. List of Decisions Requiring Your Approval

1. **Backend Environment**: Do you confirm proceeding with **Vercel Serverless + Vercel Cron** (keeps Firebase on the free Spark plan within the 10-second Hobby execution limit)?
2. **Initial Admin UID**: Which Google Account UID / email will be the designated administrator for the initial seed in `admins/{uid}`?
3. **Approval to Begin Phase 1**: Are you ready to proceed with Phase 1 (In-App Notification Center UI & Client Tax Preferences)?

*Awaiting your review and explicit approval.*
