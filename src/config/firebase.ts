import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
  Auth,
} from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { ClientUser, ClientRecord } from '../types';

export const getFirebaseConfig = () => ({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
});

export const firebaseConfig = getFirebaseConfig();

export interface EnvDiagnosticItem {
  name: string;
  status: 'PRESENT' | 'MISSING';
}

export const getFirebaseEnvDiagnostics = (): EnvDiagnosticItem[] => [
  {
    name: 'VITE_FIREBASE_API_KEY',
    status: Boolean(import.meta.env.VITE_FIREBASE_API_KEY) ? 'PRESENT' : 'MISSING',
  },
  {
    name: 'VITE_FIREBASE_AUTH_DOMAIN',
    status: Boolean(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) ? 'PRESENT' : 'MISSING',
  },
  {
    name: 'VITE_FIREBASE_PROJECT_ID',
    status: Boolean(import.meta.env.VITE_FIREBASE_PROJECT_ID) ? 'PRESENT' : 'MISSING',
  },
  {
    name: 'VITE_FIREBASE_STORAGE_BUCKET',
    status: Boolean(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) ? 'PRESENT' : 'MISSING',
  },
  {
    name: 'VITE_FIREBASE_MESSAGING_SENDER_ID',
    status: Boolean(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) ? 'PRESENT' : 'MISSING',
  },
  {
    name: 'VITE_FIREBASE_APP_ID',
    status: Boolean(import.meta.env.VITE_FIREBASE_APP_ID) ? 'PRESENT' : 'MISSING',
  },
  {
    name: 'VITE_FIREBASE_VAPID_PUBLIC_KEY',
    status: Boolean(import.meta.env.VITE_FIREBASE_VAPID_PUBLIC_KEY) ? 'PRESENT' : 'MISSING',
  },
];

export const isFirebaseConfigured = (): boolean => {
  const config = getFirebaseConfig();
  return Boolean(config.apiKey && config.projectId);
};

let firebaseApp: FirebaseApp | null = null;
let authInstance: Auth | null = null;

export const getFirebaseApp = (): FirebaseApp => {
  if (!firebaseApp) {
    if (getApps().length > 0) {
      firebaseApp = getApp();
    } else {
      const config = getFirebaseConfig();
      if (!Boolean(config.apiKey && config.projectId)) {
        throw new Error(
          'Firebase configuration is required. Please set the VITE_FIREBASE_* environment variables.'
        );
      }
      firebaseApp = initializeApp(config);
    }
  }
  return firebaseApp;
};

export const getFirebaseAuth = (): Auth => {
  if (!authInstance) {
    const app = getFirebaseApp();
    authInstance = getAuth(app);
  }
  return authInstance;
};

let firestoreInstance: Firestore | null = null;

// In-memory cache to eliminate duplicate Firestore reads for the same authenticated client
const clientRecordCache = new Map<string, ClientRecord | null>();

export const getFirebaseFirestore = async (): Promise<Firestore> => {
  if (!firestoreInstance) {
    const { getFirestore } = await import('firebase/firestore');
    const app = getFirebaseApp();
    firestoreInstance = getFirestore(app);
  }
  return firestoreInstance;
};

export const getClientByUid = async (uid: string): Promise<ClientRecord | null> => {
  if (!isFirebaseConfigured() || !uid) {
    return null;
  }
  // Check memory cache first to prevent redundant network queries
  if (clientRecordCache.has(uid)) {
    return clientRecordCache.get(uid) || null;
  }
  try {
    const { collection, query, where, getDocs, limit } = await import('firebase/firestore');
    const db = await getFirebaseFirestore();
    const clientsRef = collection(db, 'clients');
    const q = query(clientsRef, where('uid', '==', uid), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      const data = docSnap.data();
      const record: ClientRecord = {
        id: docSnap.id,
        name: data.name || '',
        email: data.email || '',
        uid: data.uid || uid,
        driveFolderId: data.driveFolderId || '',
      };
      clientRecordCache.set(uid, record);
      return record;
    }
    clientRecordCache.set(uid, null);
    return null;
  } catch (error) {
    console.error('Error fetching client document by UID:', error);
    return null;
  }
};

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const mapFirebaseUserToClientUser = (user: User): ClientUser => {
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };
};

export const signInWithGooglePopup = async (): Promise<ClientUser> => {
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase configuration is required. Please set the VITE_FIREBASE_* environment variables.');
  }
  const auth = getFirebaseAuth();
  const result = await signInWithPopup(auth, googleProvider);
  return mapFirebaseUserToClientUser(result.user);
};

export const logoutFromFirebase = async (): Promise<void> => {
  clientRecordCache.clear();
  if (!isFirebaseConfigured()) {
    return;
  }
  try {
    const auth = getFirebaseAuth();
    await signOut(auth);
  } catch (err) {
    console.error('Error signing out from Firebase:', err);
  }
};

export const subscribeToAuthChanges = (
  callback: (user: ClientUser | null) => void
): (() => void) => {
  if (!isFirebaseConfigured()) {
    callback(null);
    return () => {};
  }
  try {
    const auth = getFirebaseAuth();
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        callback(mapFirebaseUserToClientUser(firebaseUser));
      } else {
        callback(null);
      }
    });
  } catch (error) {
    console.warn('Firebase Auth state listener error:', error);
    callback(null);
    return () => {};
  }
};

export interface AuthErrorInfo {
  code: string;
  name: string;
  message: string;
  isUnauthorizedDomain: boolean;
  domain: string;
  projectId: string;
}

export const getAuthErrorDetails = (error: unknown): AuthErrorInfo => {
  const currentDomain = typeof window !== 'undefined' ? window.location.hostname : '';
  const projId = firebaseConfig.projectId || '';

  if (!error) {
    return {
      code: 'no-error-object',
      name: 'Error',
      message: 'An unknown error occurred (null or undefined error received).',
      isUnauthorizedDomain: false,
      domain: currentDomain,
      projectId: projId,
    };
  }

  const err = error as { code?: string; message?: string; name?: string };
  const code = err.code || (error instanceof Error && 'code' in error ? String((error as any).code) : 'no-code');
  const name = err.name || (error instanceof Error ? error.name : 'UnknownError');
  const rawMessage = err.message || (error instanceof Error ? error.message : String(error));

  const isUnauthorized = code === 'auth/unauthorized-domain' || rawMessage.includes('auth/unauthorized-domain');
  const isCancelled = code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request';

  if (!isCancelled) {
    console.error('[Firebase Auth Error]', {
      code,
      name,
      message: rawMessage,
      error,
    });
  } else {
    console.info('[Firebase Auth Info] Popup was closed before completion.');
  }

  return {
    code,
    name,
    message: rawMessage,
    isUnauthorizedDomain: isUnauthorized,
    domain: currentDomain,
    projectId: projId,
  };
};

export const getAuthErrorMessage = (error: unknown): string => {
  if (!error || typeof error !== 'object') {
    return 'Authentication could not be completed. Please try again.';
  }

  const err = error as { code?: string; message?: string };
  const code = err.code || '';
  const currentDomain = typeof window !== 'undefined' ? window.location.hostname : '';

  switch (code) {
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was closed before completing. Please try again.';
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled. Please try again.';
    case 'auth/popup-blocked':
      return 'The Google sign-in popup was blocked by your browser. Please allow popups for this site and retry.';
    case 'auth/network-request-failed':
      return 'A network error occurred. Please check your internet connection and try again.';
    case 'auth/unauthorized-domain':
      return `Domain not authorized (${currentDomain}). Add this domain in Firebase Console > Authentication > Settings > Authorized domains.`;
    case 'auth/operation-not-allowed':
      return 'Google Sign-In is not enabled in your Firebase Console. Please enable Google provider in Firebase Console > Authentication > Sign-in method.';
    default:
      if (err.message && err.message.includes('Firebase is not configured')) {
        return 'Firebase configuration is required. Please set the VITE_FIREBASE_* environment variables.';
      }
      return 'Authentication could not be completed. Please try again.';
  }
};

/* -------------------------------------------------------------------------- */
/* Firebase Cloud Messaging (FCM) - Web Push & Android TWA Support (Phase 1)   */
/* -------------------------------------------------------------------------- */

let fcmMessagingInstance: import('firebase/messaging').Messaging | null = null;
let fcmSwRegistrationPromise: Promise<ServiceWorkerRegistration | null> | null = null;

export const isPushMessagingSupported = async (): Promise<boolean> => {
  if (
    typeof window === 'undefined' ||
    !('serviceWorker' in navigator) ||
    !('PushManager' in window) ||
    !('Notification' in window)
  ) {
    return false;
  }
  try {
    const { isSupported } = await import('firebase/messaging');
    return await isSupported();
  } catch {
    return false;
  }
};

export const getFirebaseMessaging = async (): Promise<import('firebase/messaging').Messaging | null> => {
  if (!fcmMessagingInstance) {
    const supported = await isPushMessagingSupported();
    if (!supported) return null;
    const { getMessaging } = await import('firebase/messaging');
    const app = getFirebaseApp();
    fcmMessagingInstance = getMessaging(app);
  }
  return fcmMessagingInstance;
};

export const registerFCMServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }
  if (!fcmSwRegistrationPromise) {
    fcmSwRegistrationPromise = (async () => {
      try {
        const config = getFirebaseConfig();
        const params = new URLSearchParams({
          apiKey: config.apiKey || '',
          authDomain: config.authDomain || '',
          projectId: config.projectId || '',
          storageBucket: config.storageBucket || '',
          messagingSenderId: config.messagingSenderId || '',
          appId: config.appId || '',
        });
        const swUrl = `/firebase-messaging-sw.js?${params.toString()}`;
        const reg = await navigator.serviceWorker.register(swUrl, { scope: '/' });
        return reg;
      } catch (err) {
        console.warn('[FCM] Service worker registration notice:', err);
        return null;
      }
    })();
  }
  return fcmSwRegistrationPromise;
};

export interface PushRegistrationResult {
  success: boolean;
  token?: string;
  permission: NotificationPermission;
  error?: string;
  isSupported: boolean;
}

export const requestPushNotificationToken = async (): Promise<PushRegistrationResult> => {
  if (typeof window === 'undefined') {
    return {
      success: false,
      permission: 'default',
      error: 'Window environment not available.',
      isSupported: false,
    };
  }

  const supported = await isPushMessagingSupported();
  if (!supported) {
    return {
      success: false,
      permission: 'denied',
      error: 'Web Push notifications are not supported on this browser or in incognito mode.',
      isSupported: false,
    };
  }

  const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_PUBLIC_KEY || '';
  if (!vapidKey) {
    return {
      success: false,
      permission: typeof Notification !== 'undefined' ? Notification.permission : 'default',
      error: 'VITE_FIREBASE_VAPID_PUBLIC_KEY is not configured in Vercel environment variables.',
      isSupported: true,
    };
  }

  try {
    // Explicit user gesture: request browser permission
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      return {
        success: false,
        permission,
        error:
          permission === 'denied'
            ? 'Notifications are blocked in your browser site settings. Please allow notifications to receive tax reminders.'
            : 'Notification permission request was dismissed.',
        isSupported: true,
      };
    }

    const registration = await registerFCMServiceWorker();
    const messaging = await getFirebaseMessaging();
    if (!messaging) {
      return {
        success: false,
        permission,
        error: 'Unable to initialize Firebase Messaging instance.',
        isSupported: true,
      };
    }

    const { getToken } = await import('firebase/messaging');
    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration || undefined,
    });

    if (!token) {
      return {
        success: false,
        permission: 'granted',
        error: 'FCM did not return a valid registration token.',
        isSupported: true,
      };
    }

    return {
      success: true,
      token,
      permission: 'granted',
      isSupported: true,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[FCM] Error acquiring notification token:', err);
    return {
      success: false,
      permission: typeof Notification !== 'undefined' ? Notification.permission : 'default',
      error: message,
      isSupported: true,
    };
  }
};

