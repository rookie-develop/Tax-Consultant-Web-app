import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, CheckCircle2, Copy, Check, ExternalLink, AlertCircle } from 'lucide-react';
import { AppConfig, ClientUser } from '../types';
import { signInWithGooglePopup, getAuthErrorDetails, AuthErrorInfo } from '../config/firebase';

interface LoginPageProps {
  config: AppConfig;
  onBack: () => void;
  onLoginSuccess: (user: ClientUser) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  config,
  onBack,
  onLoginSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<AuthErrorInfo | null>(null);
  const [copiedDomain, setCopiedDomain] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<ClientUser | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);
    setCopiedDomain(false);
    try {
      const user = await signInWithGooglePopup();
      setAuthenticatedUser(user);
      setShowSuccessModal(true);
    } catch (error: unknown) {
      console.error('Firebase Google Sign-In error:', error);
      const details = getAuthErrorDetails(error);
      setAuthError(details);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleContinue = () => {
    setShowSuccessModal(false);
    if (authenticatedUser) {
      onLoginSuccess(authenticatedUser);
    } else {
      onBack();
    }
  };

  return (
    <motion.div
      key="simple-login-page"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="py-8 sm:py-16 px-4 flex flex-col items-center justify-center min-h-[60vh]"
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
            ) : (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium leading-relaxed">
                {authError.message}
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

      {/* Clean Success Popup */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#081E23]/60 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="relative w-full max-w-sm bg-white rounded-2xl border border-[#E2DDD2] shadow-xl p-6 text-center z-10 space-y-4"
              role="dialog"
              aria-modal="true"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-[#20BA68]/15 text-[#20BA68] flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-[#0F201C]">
                  Welcome to ARSCA
                </h3>
                <p className="text-xs text-[#5C6E6A] leading-relaxed">
                  You are successfully signed in.
                  <br />
                  Cloud Access will be available from your ARSCA account.
                </p>
              </div>

              {authenticatedUser && (
                <div className="bg-[#F8F6F0] border border-[#E2DDD2] rounded-xl p-3 text-left flex items-center space-x-3">
                  {authenticatedUser.photoURL ? (
                    <img
                      src={authenticatedUser.photoURL}
                      alt={authenticatedUser.displayName || 'Client'}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover border border-[#E2DDD2] shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#20BA68] text-[#081E23] flex items-center justify-center font-bold text-xs shrink-0">
                      {(authenticatedUser.displayName || authenticatedUser.email || 'C')
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-[#0F201C] truncate">
                      {authenticatedUser.displayName || 'Client'}
                    </div>
                    {authenticatedUser.email && (
                      <div className="text-[11px] text-[#5C6E6A] truncate">
                        {authenticatedUser.email}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  id="btn-login-success-continue"
                  type="button"
                  onClick={handleContinue}
                  className="w-full py-2.5 px-4 bg-[#20BA68] hover:bg-[#1DA85E] active:bg-[#189452] text-[#081E23] font-black rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-150 shadow-sm active:scale-[0.99] cursor-pointer"
                >
                  CONTINUE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
