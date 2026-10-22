import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Radio, Users, Sparkles, Clock } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  feature: string;
  onClose: () => void;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = React.memo(({
  isOpen,
  feature,
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

  const renderIcon = () => {
    switch (feature) {
      case 'Channels':
        return <Radio className="w-6 h-6 text-[#20BA68]" />;
      case 'Community':
        return <Users className="w-6 h-6 text-[#20BA68]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#20BA68]" />;
    }
  };

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
            className="fixed inset-0 bg-[#081E23]/70 cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-xs sm:max-w-sm bg-white rounded-3xl border border-[#E2DDD2] shadow-2xl p-6 sm:p-7 text-center z-10 space-y-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="coming-soon-title"
          >
            {/* Top Close Button */}
            <button
              id="btn-close-coming-soon"
              type="button"
              onClick={onClose}
              className="absolute top-3.5 right-3.5 p-1.5 text-[#5C6E6A] hover:text-[#0F201C] hover:bg-[#ECE5D8] rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon badge */}
            <div className="mx-auto w-12 h-12 rounded-2xl bg-[#20BA68]/15 border border-[#20BA68]/30 flex items-center justify-center shadow-xs">
              {renderIcon()}
            </div>

            {/* Content */}
            <div className="space-y-1.5 pt-0.5">
              <h3
                id="coming-soon-title"
                className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight"
              >
                {feature}
              </h3>
              <p className="text-sm font-bold text-[#0F201C]">
                This feature is coming soon!
              </p>
              <p className="text-xs text-[#5C6E6A] font-medium leading-relaxed">
                We're working on something useful for you.
              </p>
            </div>

            {/* Action Button: Okay */}
            <div className="pt-2">
              <button
                id="btn-dismiss-coming-soon"
                type="button"
                onClick={onClose}
                className="w-full bg-[#081E23] hover:bg-[#20BA68] active:bg-[#1DA85E] text-white hover:text-[#081E23] font-black py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors min-h-[42px] touch-manipulation cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20BA68]"
              >
                Okay
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

ComingSoonModal.displayName = 'ComingSoonModal';
