import React, { useState } from 'react';
import {
  MessageCircle,
  Copy,
  Check,
  CheckCheck,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppConfig, ServiceCategory, SubService } from '../types';
import { buildWhatsAppUrl, generateWhatsAppMessage } from '../utils/whatsapp';

interface WhatsAppRequestViewProps {
  category: ServiceCategory;
  subService: SubService;
  config: AppConfig;
  onBackToSubServices: () => void;
  onBackToCategories: () => void;
}

export const WhatsAppRequestView: React.FC<WhatsAppRequestViewProps> = ({
  category,
  subService,
  config,
  onBackToSubServices,
  onBackToCategories,
}) => {
  const [copied, setCopied] = useState(false);
  const [requestInitiated, setRequestInitiated] = useState(false);
  const waitingForReturnRef = React.useRef(false);

  React.useEffect(() => {
    const handleReturn = () => {
      if (waitingForReturnRef.current) {
        setRequestInitiated(true);
      }
    };

    window.addEventListener('focus', handleReturn);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && waitingForReturnRef.current) {
        setRequestInitiated(true);
      }
    });

    return () => {
      window.removeEventListener('focus', handleReturn);
    };
  }, []);

  // Generate the exact service-specific message
  const generatedMessage = generateWhatsAppMessage(category, subService, config);
  const whatsappUrl = buildWhatsAppUrl(config.whatsappNumber, generatedMessage);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const handleInitiateRequest = () => {
    waitingForReturnRef.current = true;
    setRequestInitiated(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto w-full">
      {/* Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
        <button
          id="btn-back-to-subservices"
          type="button"
          onClick={onBackToSubServices}
          className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 px-3.5 py-2.5 rounded-lg transition-colors cursor-pointer min-h-[44px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Change Service</span>
        </button>

        <div className="flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
          <button
            id="breadcrumb-categories"
            type="button"
            onClick={onBackToCategories}
            className="hover:underline hover:text-slate-700 text-slate-500 py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded"
          >
            {category.title}
          </button>
          <span>/</span>
          <span className="text-slate-900 font-extrabold truncate max-w-[160px] sm:max-w-xs">{subService.title}</span>
        </div>
      </div>

      {/* Main Request Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Header Block */}
        <div className="bg-slate-900 text-white p-5 sm:p-7 border-b border-slate-800">
          <div className="text-[11px] font-black uppercase tracking-wider text-emerald-400 mb-1.5">
            {category.title}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1.5 break-words">
            {subService.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            {subService.shortDesc}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6">
          {/* WhatsApp Message Preview Box */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500">
                Prepared Request Message
              </label>
              <button
                id="btn-copy-whatsapp-text"
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 transition-colors cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-emerald-700 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            {/* WhatsApp Theme Message Preview Box with Blue Tick Indication */}
            <div className="bg-[#EFEAE2] rounded-xl border border-[#DAD2C7] p-3.5 sm:p-5 shadow-inner">
              {/* WhatsApp chat header */}
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#DFD7CD] text-xs text-slate-700 font-medium">
                <div className="flex items-center space-x-2 truncate">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-bold text-slate-800 truncate">To: {config.firmName}</span>
                  <span className="text-slate-500 font-mono text-[11px] shrink-0">({config.displayPhone})</span>
                </div>
                <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider shrink-0 ml-2">
                  Preview
                </span>
              </div>

              {/* WhatsApp outgoing chat bubble */}
              <div className="flex justify-end">
                <div className="w-full sm:max-w-[95%] bg-[#DCF8C6] text-slate-900 rounded-2xl rounded-tr-xs p-3.5 sm:p-4 shadow-xs border border-[#C7E8B3] text-xs sm:text-sm font-sans whitespace-pre-wrap break-words leading-relaxed relative">
                  <div>{generatedMessage}</div>

                  {/* Timestamp & Blue Double Tick Indication */}
                  <div className="flex items-center justify-end space-x-1.5 mt-2.5 pt-1.5 border-t border-[#CCE9B8] text-[11px] text-slate-600 font-medium select-none">
                    <span>Drafted for WhatsApp</span>
                    <span className="text-slate-400">•</span>
                    <span className="inline-flex items-center space-x-1 text-[#0284c7] font-bold">
                      <CheckCheck className="w-4 h-4 text-[#34B7F1] stroke-[2.5]" />
                      <span>Ready</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Animation & Status Feedback */}
          <AnimatePresence>
            {requestInitiated && (
              <motion.div
                id="request-success-alert"
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="p-4 sm:p-5 bg-emerald-50/95 border-2 border-emerald-500 rounded-xl flex items-center space-x-3.5 shadow-2xs"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center shrink-0 shadow-xs">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25, delay: 0.05 }}
                  >
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                  </motion.div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                    Your requested submitted successfully.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Primary Action Button */}
          <div className="pt-2">
            <a
              id="btn-send-request-to-arsca"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleInitiateRequest}
              className="w-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-900 font-black px-6 sm:px-8 py-4 sm:py-4.5 rounded-xl flex items-center justify-center space-x-3 uppercase tracking-wider text-sm sm:text-base transition-all active:scale-[0.99] cursor-pointer shadow-sm hover:shadow-md min-h-[54px] sm:min-h-[58px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 text-center"
            >
              <MessageCircle className="w-5 h-5 fill-slate-900 shrink-0" />
              <span className="break-words">SEND REQUEST TO ARSCA</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </a>
          </div>

          {/* Quick Guidance & Reset */}
          <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span className="font-medium">
              Opens WhatsApp with pre-filled details for review before sending.
            </span>

            <button
              id="btn-choose-different-category"
              type="button"
              onClick={onBackToCategories}
              className="inline-flex items-center space-x-1 text-slate-600 hover:text-slate-900 active:text-emerald-700 font-bold underline cursor-pointer py-1 px-1.5 rounded touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Choose different category</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


