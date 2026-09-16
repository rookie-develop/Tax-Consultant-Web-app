import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, AlertCircle } from 'lucide-react';

interface CloudAccessModalProps {
  isOpen: boolean;
  type: 'unauthenticated' | 'not-found';
  onClose: () => void;
  onLogin: () => void;
}

export const CloudAccessModal: React.FC<CloudAccessModalProps> = ({
  isOpen,
  type,
  onClose,
  onLogin,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#081E23]/60 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-sm bg-white rounded-2xl border border-[#E2DDD2] shadow-2xl p-6 sm:p-7 text-center z-10 space-y-4"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3.5 right-3.5 p-1.5 text-[#5C6E6A] hover:text-[#0F201C] hover:bg-[#ECE5D8] rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mx-auto w-12 h-12 rounded-2xl bg-[#ECE5D8] text-[#14664B] flex items-center justify-center shadow-xs">
              {type === 'unauthenticated' ? (
                <LogIn className="w-6 h-6 text-[#23A87B]" />
              ) : (
                <AlertCircle className="w-6 h-6 text-amber-600" />
              )}
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-black text-[#0F201C] tracking-tight">
                {type === 'unauthenticated' ? 'Client Login Required' : 'Client Record Not Found'}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-[#5C6E6A] leading-relaxed">
                {type === 'unauthenticated'
                  ? 'Please sign in with your client account to access your secure cloud documents.'
                  : 'No client cloud folder is linked to this account. Please contact ARSCA support for assistance.'}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {type === 'unauthenticated' ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onLogin();
                    }}
                    className="w-full bg-[#081E23] hover:bg-[#23A87B] text-white font-black py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer touch-manipulation flex items-center justify-center space-x-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Continue</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2 text-center text-xs font-semibold text-[#5C6E6A] hover:text-[#0F201C] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-[#081E23] hover:bg-[#23A87B] text-white font-black py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer touch-manipulation"
                >
                  Close
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
