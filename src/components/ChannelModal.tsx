import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Radio } from 'lucide-react';

interface ChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChannelModal: React.FC<ChannelModalProps> = ({
  isOpen,
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
          {/* Dimmed Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#081E23]/60 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl border border-[#E2DDD2] shadow-2xl p-5 sm:p-7 text-center z-10 space-y-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="channel-modal-title"
          >
            {/* Top Close Button */}
            <button
              id="btn-close-channel-modal"
              type="button"
              onClick={onClose}
              className="absolute top-3.5 right-3.5 p-1.5 text-[#5C6E6A] hover:text-[#0F201C] hover:bg-[#ECE5D8] rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon badge */}
            <div className="mx-auto w-12 h-12 rounded-2xl bg-[#ECE5D8] text-[#14664B] flex items-center justify-center shadow-xs">
              <Radio className="w-6 h-6 text-[#20BA68]" />
            </div>

            {/* Title */}
            <div className="space-y-1.5 pt-1">
              <h3
                id="channel-modal-title"
                className="text-lg sm:text-xl font-black text-[#0F201C] tracking-tight"
              >
                Want to visit the channel?
              </h3>
            </div>

            {/* Action Buttons: CANCEL and YES, VISIT CHANNEL */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
              <button
                id="btn-cancel-channel"
                type="button"
                onClick={onClose}
                className="flex-1 bg-[#ECE5D8] hover:bg-[#E2DDD2] active:bg-[#D5CEBF] text-[#0F201C] font-black py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors min-h-[42px] touch-manipulation cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23A87B]"
              >
                CANCEL
              </button>

              <a
                id="btn-confirm-visit-channel"
                href="https://whatsapp.com/channel/0029VbBC1JjFcovyKOtAaI2z"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex-1 bg-[#081E23] hover:bg-[#23A87B] active:bg-[#1E9E73] text-white font-black py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors text-center inline-flex items-center justify-center min-h-[42px] touch-manipulation cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                YES, VISIT CHANNEL
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
