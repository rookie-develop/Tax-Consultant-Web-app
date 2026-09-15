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
import { ClientUser } from '../types';

export const getFirebaseConfig = () => ({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
});

export const firebaseConfig = getFirebaseConfig();

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
  message: string;
  isUnauthorizedDomain: boolean;
  domain: string;
  projectId: string;
}

export const getAuthErrorDetails = (error: unknown): AuthErrorInfo => {
  const currentDomain = typeof window !== 'undefined' ? window.location.hostname : '';
  const projId = firebaseConfig.projectId || '';

  if (!error || typeof error !== 'object') {
    return {
      code: 'unknown',
      message: 'Authentication could not be completed. Please try again.',
      isUnauthorizedDomain: false,
      domain: currentDomain,
      projectId: projId,
    };
  }

  const err = error as { code?: string; message?: string };
  const code = err.code || '';

  if (code === 'auth/unauthorized-domain') {
    return {
      code,
      message: `The domain "${currentDomain}" is not in the Authorized Domains list of your Firebase project.`,
      isUnauthorizedDomain: true,
      domain: currentDomain,
      projectId: projId,
    };
  }

  return {
    code,
    message: getAuthErrorMessage(error),
    isUnauthorizedDomain: false,
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
