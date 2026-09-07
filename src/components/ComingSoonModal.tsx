import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, LogIn, Cloud } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  isOpen,
  title,
  onClose,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#081E23]/60 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-sm bg-white rounded-2xl border border-[#E2DDD2] shadow-2xl p-6 sm:p-7 text-center z-10 space-y-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3.5 right-3.5 p-1.5 text-[#5C6E6A] hover:text-[#0F201C] hover:bg-[#ECE5D8] rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon badge */}
            <div className="mx-auto w-12 h-12 rounded-2xl bg-[#ECE5D8] text-[#14664B] flex items-center justify-center shadow-xs">
              {title === 'Login' ? (
                <LogIn className="w-6 h-6 text-[#23A87B]" />
              ) : title === 'Cloud Access' ? (
                <Cloud className="w-6 h-6 text-[#23A87B]" />
              ) : (
                <Clock className="w-6 h-6 text-[#23A87B]" />
              )}
            </div>

            {/* Content */}
            <div className="space-y-1.5">
              <h3
                id="modal-title"
                className="text-base sm:text-lg font-black text-[#0F201C] tracking-tight"
              >
                {title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#5C6E6A]">
                This feature will be coming soon
              </p>
            </div>

            {/* Simple Close action */}
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-[#081E23] hover:bg-[#23A87B] text-white font-black py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23A87B]"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
