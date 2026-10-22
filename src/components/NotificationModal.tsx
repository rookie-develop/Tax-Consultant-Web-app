import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, CheckCircle2, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = React.memo(({
  isOpen,
  onClose,
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
            className="fixed inset-0 bg-[#081E23]/70 cursor-pointer"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl border border-[#E2DDD2] shadow-2xl p-5 sm:p-6 z-10 space-y-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="notification-modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E8E3D9] pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-[#E6F9F0] border border-[#BFF2DA] flex items-center justify-center text-[#0E9355]">
                  <Bell className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <h3 id="notification-modal-title" className="text-base font-extrabold text-[#0F201C]">
                    Tax Alerts & Notices
                  </h3>
                  <p className="text-[11px] text-[#5C6E6A]">ARSCA Real-time Compliance Advisory</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5C6E6A] hover:text-[#0F201C] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                aria-label="Close notifications"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Status Item */}
            <div className="bg-[#E6F9F0]/60 border border-[#BFF2DA] rounded-xl p-3 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-[#0E9355] shrink-0 mt-0.5" />
              <div className="text-left text-xs">
                <p className="font-bold text-[#0E9355]">All Clear — No Pending Portal Notices</p>
                <p className="text-[#3A5952] text-[11px] mt-0.5">
                  Your registered PAN & GSTIN profiles have no unaddressed show-cause notices or pending compliance demands.
                </p>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-black uppercase tracking-wider text-[#5C6E6A]">
                Upcoming Compliance Deadlines
              </h4>
              <div className="space-y-2">
                <div className="bg-[#F8F6F0] rounded-xl p-3 border border-[#E8E3D9] flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <Calendar className="w-4 h-4 text-[#23A87B] shrink-0" />
                    <div>
                      <p className="font-bold text-[#0F201C]">Monthly GSTR-3B Return</p>
                      <p className="text-[11px] text-[#5C6E6A]">Monthly GST return for regular tax payers</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#23A87B]/15 text-[#14664B] shrink-0">
                    20th Monthly
                  </span>
                </div>

                <div className="bg-[#F8F6F0] rounded-xl p-3 border border-[#E8E3D9] flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#23A87B] shrink-0" />
                    <div>
                      <p className="font-bold text-[#0F201C]">Advance Tax Installment</p>
                      <p className="text-[11px] text-[#5C6E6A]">Quarterly Advance Income Tax installment</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#23A87B]/15 text-[#14664B] shrink-0">
                    15th Q-End
                  </span>
                </div>
              </div>
            </div>

            {/* Action */}
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-[#081E23] hover:bg-[#23A87B] active:bg-[#1E9E73] text-white font-black py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer min-h-[42px] touch-manipulation"
            >
              Acknowledge & Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

NotificationModal.displayName = 'NotificationModal';
