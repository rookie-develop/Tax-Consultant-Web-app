import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, CheckCircle2, Copy, Check, ExternalLink, AlertCircle, LogOut } from 'lucide-react';
import { AppConfig, ClientUser } from '../types';
import {
  signInWithGooglePopup,
  logoutFromFirebase,
  getAuthErrorDetails,
  AuthErrorInfo,
  getFirebaseEnvDiagnostics,
  getFirebaseAuth,
} from '../config/firebase';

interface LoginPageProps {
  config: AppConfig;
  clientUser?: ClientUser | null;
  onBack: () => void;
  onLoginSuccess: (user: ClientUser) => void;
  onLogout?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = React.memo(({
  config,
  clientUser,
  onBack,
  onLoginSuccess,
  onLogout,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [authError, setAuthError] = useState<AuthErrorInfo | null>(null);
  const [copiedDomain, setCopiedDomain] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<ClientUser | null>(
    clientUser || null
  );
  const envDiagnostics = React.useMemo(() => getFirebaseEnvDiagnostics(), []);

  // Sync authenticated session from props or Firebase Auth
  useEffect(() => {
    if (clientUser) {
      setAuthenticatedUser(clientUser);
    } else {
      const auth = getFirebaseAuth();
      if (auth.currentUser) {
        setAuthenticatedUser({
          uid: auth.currentUser.uid,
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photoURL: auth.currentUser.photoURL,
        });
      }
    }
  }, [clientUser]);

  useEffect(() => {
    console.log('[Firebase Environment Variables Diagnostic]');
    envDiagnostics.forEach((item) => {
      console.log(`  ${item.name}: ${item.status}`);
    });
  }, [envDiagnostics]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);
    setCopiedDomain(false);
    try {
      const user = await signInWithGooglePopup();
      setAuthenticatedUser(user);
      onLoginSuccess(user);
    } catch (error: unknown) {
      const details = getAuthErrorDetails(error);
      if (details.code === 'auth/popup-closed-by-user' || details.code === 'auth/cancelled-popup-request') {
        console.info('Google sign-in popup was closed by user.');
      } else {
        console.error('Firebase Google Sign-In error:', error);
      }
      setAuthError(details);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = useCallback(async () => {
    setIsSigningOut(true);
    try {
      if (onLogout) {
        await onLogout();
      } else {
        await logoutFromFirebase();
      }
      setAuthenticatedUser(null);
    } catch (err) {
      console.error('Sign-out error:', err);
    } finally {
      setIsSigningOut(false);
    }
  }, [onLogout]);

  const handleCopyDomain = async (domainToCopy: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(domainToCopy);
      } else {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = domainToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedDomain(true);
      setTimeout(() => setCopiedDomain(false), 2500);
    } catch (err) {
      console.warn('Failed to copy domain to clipboard:', err);
    }
  };
  // 1. AUTHENTICATED PROFILE VIEW (Exact match to ARSCA Profile Welcome Screen)
  if (authenticatedUser) {
    const initialLetter = (
      authenticatedUser.displayName?.trim() ||
      authenticatedUser.email?.trim() ||
      'U'
    ).charAt(0).toUpperCase();

    return (
      <motion.div
        key="arsca-authenticated-profile-view"
        initial={{ opacity: 0, y: 8, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.99 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="py-8 sm:py-16 px-4 flex flex-col items-center justify-center min-h-[60vh] w-full transform-gpu"
      >
        {/* Authoritative ARSCA Profile Card */}
        <div className="w-full max-w-[360px] sm:max-w-[380px] bg-white rounded-3xl border border-[#ECE7DE] shadow-[0_12px_32px_rgba(0,0,0,0.05),0_2px_6px_rgba(0,0,0,0.02)] px-7 py-8 sm:py-9 flex flex-col items-center text-center transition-all duration-200">
          
          {/* Circular Pale Mint Avatar with overlapping green check badge */}
          <div className="relative mb-5 flex items-center justify-center">
            <div className="w-26 h-26 sm:w-28 sm:h-28 rounded-full bg-[#D8F3E5] flex items-center justify-center select-none shadow-xs">
              <span className="text-3xl sm:text-4xl font-black text-[#081E23] leading-none">
                {initialLetter}
              </span>
            </div>

            {/* Overlapping green checkmark circle badge */}
            <div
              className="absolute bottom-0 right-1 w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#10B981] flex items-center justify-center shadow-xs border-2 border-white"
              aria-label="Verified logged in"
            >
              <Check className="w-4 h-4 text-white stroke-[3.5]" />
            </div>
          </div>

          {/* Heading: Welcome back! */}
          <h1 className="text-2xl sm:text-[26px] font-black text-[#081E23] tracking-tight leading-tight">
            Welcome back!
          </h1>

          {/* User Display Name */}
          <p className="mt-2 text-base sm:text-lg font-bold text-[#0F201C] leading-snug">
            {authenticatedUser.displayName || 'Client'}
          </p>

          {/* User Email */}
          {authenticatedUser.email && (
            <p className="mt-0.5 text-sm font-normal text-[#627D82] leading-relaxed">
              {authenticatedUser.email}
            </p>
          )}

          {/* Status Pill: Successfully logged in */}
          <div className="mt-4 px-5 py-2 rounded-full bg-[#E8F8F0] inline-flex items-center space-x-2 select-none">
            <span className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[3.5]" />
            </span>
            <span className="text-xs sm:text-[13px] font-semibold text-[#16A34A]">
              Successfully logged in
            </span>
          </div>

          {/* Hairline Horizontal Divider */}
          <div className="w-full border-t border-[#EFEBE4] my-7" />

          {/* Sign out Button */}
          <button
            id="btn-profile-sign-out"
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="w-full py-3.5 px-6 rounded-2xl border border-[#D5CEC2] bg-white hover:bg-[#FAF8F5] active:bg-[#F2ECE1] transition-all duration-150 flex items-center justify-center space-x-2.5 cursor-pointer touch-manipulation active:scale-[0.98] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20BA68]"
          >
            {isSigningOut ? (
              <Loader2 className="w-5 h-5 animate-spin text-[#081E23]" />
            ) : (
              <LogOut className="w-5 h-5 text-[#081E23] stroke-[2]" />
            )}
            <span className="text-sm sm:text-base font-bold text-[#081E23]">
              Sign out
            </span>
          </button>

        </div>
      </motion.div>
    );
  }

  // 2. UNAUTHENTICATED LOGIN VIEW
  return (
    <motion.div
      key="simple-login-page"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="py-8 sm:py-16 px-4 flex flex-col items-center justify-center min-h-[60vh] transform-gpu"
    >
      {/* Clean Centered Login Card */}
      <div className={`w-full ${authError?.isUnauthorizedDomain ? 'max-w-md' : 'max-w-sm'} bg-white rounded-2xl border border-[#E2DDD2] shadow-sm p-6 sm:p-8 transition-all duration-200`}>
        {/* Minimal Header */}
        <div className="text-center mb-6">
          <p className="text-xs font-black tracking-widest text-[#20BA68] uppercase mb-1">
            {config.firmName}
          </p>
          <h1 className="text-2xl font-black text-[#0F201C] tracking-tight">
            Client Login
          </h1>
        </div>

        {/* Error Notification */}
        {authError && (
          <div className="mb-5 space-y-3">
            {authError.isUnauthorizedDomain ? (
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs space-y-2.5">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="font-bold text-amber-900 text-xs">
                    Firebase Authorized Domain Required
                  </div>
                </div>

                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Firebase Authentication blocks Google sign-in until this app’s domain is added to your Firebase project.
                </p>

                {/* Domain copy box */}
                <div className="flex items-center justify-between bg-white border border-amber-300 rounded-lg px-2.5 py-1.5 font-mono text-[11px] text-amber-950">
                  <span className="truncate mr-2 select-all font-semibold">
                    {authError.domain || (typeof window !== 'undefined' ? window.location.hostname : '')}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyDomain(authError.domain || window.location.hostname)}
                    className="shrink-0 inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-bold transition-colors cursor-pointer"
                  >
                    {copiedDomain ? (
                      <>
                        <Check className="w-3 h-3 text-[#20BA68]" />
                        <span className="text-[#20BA68]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-amber-700" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Diagnostic technical details */}
                <div className="bg-white/80 rounded border border-amber-300 p-2 font-mono text-[10.5px] space-y-0.5 text-amber-950">
                  <div><span className="font-bold text-amber-900">error.code:</span> {authError.code}</div>
                  <div><span className="font-bold text-amber-900">error.name:</span> {authError.name}</div>
                  <div className="break-words"><span className="font-bold text-amber-900">error.message:</span> {authError.message}</div>
                </div>

                {/* Quick Steps */}
                <div className="text-[11px] text-amber-800 space-y-1 pt-1 border-t border-amber-200/60">
                  <p className="font-semibold text-amber-900">How to authorize in 30 seconds:</p>
                  <ol className="list-decimal list-inside space-y-0.5 pl-0.5 text-[10.5px]">
                    <li>Open <strong>Firebase Console</strong> → <strong>Authentication</strong></li>
                    <li>Select the <strong>Settings</strong> tab → <strong>Authorized domains</strong></li>
                    <li>Click <strong>Add domain</strong> and paste the domain above</li>
                  </ol>
                </div>

                {authError.projectId && (
                  <div className="pt-1">
                    <a
                      href={`https://console.firebase.google.com/project/${authError.projectId}/authentication/settings`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-[11px] font-bold text-amber-900 underline hover:text-amber-950"
                    >
                      <span>Open Firebase Console Settings</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ) : (authError.code === 'auth/popup-closed-by-user' || authError.code === 'auth/cancelled-popup-request') ? (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs leading-relaxed space-y-2">
                <div className="flex items-center space-x-2 font-bold text-slate-800 text-xs">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Sign-in window was closed</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Google sign-in was not completed because the window was closed. Click <strong>Continue with Google</strong> below to try again.
                </p>
                {typeof window !== 'undefined' && window.self !== window.top && (
                  <div className="text-[10.5px] text-slate-500 pt-1.5 border-t border-slate-200/70">
                    If the popup closed automatically without prompting, your browser may be blocking cross-origin popups inside the preview frame.{' '}
                    <a
                      href={window.location.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#20BA68] font-bold underline hover:text-[#189653] inline-flex items-center space-x-0.5 ml-1"
                    >
                      <span>Open in new tab</span>
                      <ExternalLink className="w-2.5 h-2.5 inline ml-0.5" />
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium leading-relaxed space-y-1.5">
                <div className="font-bold text-red-900 text-xs flex items-center space-x-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Firebase Authentication Error</span>
                </div>
                <div className="bg-white/90 rounded border border-red-200 p-2 font-mono text-[11px] space-y-1 text-red-950">
                  <div><span className="font-bold text-red-800">error.code:</span> {authError.code}</div>
                  <div><span className="font-bold text-red-800">error.name:</span> {authError.name}</div>
                  <div className="break-words"><span className="font-bold text-red-800">error.message:</span> {authError.message}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Google Sign-in Action */}
        <div className="space-y-3">
          <button
            id="btn-continue-with-google"
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-white hover:bg-[#F8F6F0] active:bg-[#ECE5D8] text-[#0F201C] font-bold rounded-xl border border-[#D5CEC2] shadow-xs transition-all duration-150 active:scale-[0.99] flex items-center justify-center space-x-2.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed touch-manipulation"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#20BA68]" />
                <span className="text-xs sm:text-sm">Connecting to Google...</span>
              </>
            ) : (
              <span className="text-xs sm:text-sm">Continue with Google</span>
            )}
          </button>

          {/* Subtle cancel/back link */}
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="w-full py-2 text-center text-xs font-semibold text-[#5C6E6A] hover:text-[#0F201C] transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>

      </div>
    </motion.div>
  );
});

LoginPage.displayName = 'LoginPage';
