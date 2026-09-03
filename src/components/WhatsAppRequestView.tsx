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
      <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-[#E2DDD2] shadow-[0_2px_6px_rgba(0,0,0,0.03)]">
        <button
          id="btn-back-to-subservices"
          type="button"
          onClick={onBackToSubServices}
          className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-[#0F201C] hover:text-[#23A87B] bg-[#ECE5D8] hover:bg-[#E2DDD2] active:bg-[#D5CEBF] px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer min-h-[44px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23A87B]"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Change Service</span>
        </button>

        <div className="flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#5C6E6A] min-w-0">
          <button
            id="breadcrumb-categories"
            type="button"
            onClick={onBackToCategories}
            className="hover:underline hover:text-[#23A87B] text-[#5C6E6A] py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#23A87B] rounded truncate max-w-[110px] min-[400px]:max-w-[150px] sm:max-w-none"
          >
            {category.title}
          </button>
          <span>/</span>
          <span className="text-[#0F201C] font-extrabold truncate max-w-[120px] min-[400px]:max-w-[180px] sm:max-w-xs">{subService.title}</span>
        </div>
      </div>

      {/* Main Request Container */}
      <div className="bg-white rounded-2xl border border-[#E2DDD2] shadow-[0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Header Block */}
        <div className="bg-[#081E23] text-white p-4 sm:p-6 md:p-7 border-b border-[#0F2D33]">
          <div className="text-[11px] font-black uppercase tracking-wider text-[#20BA68] mb-1.5">
            {category.title}
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white mb-1.5 break-words">
            {subService.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#9BB1AC] font-medium">
            {subService.shortDesc}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-3.5 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
          {/* WhatsApp Message Preview Box */}
          <div className="space-y-2 sm:space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs font-black uppercase tracking-wider text-[#5C6E6A]">
                Prepared Request Message
              </label>
              <button
                id="btn-copy-whatsapp-text"
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#ECE5D8] hover:bg-[#E2DDD2] active:bg-[#D5CEBF] text-[#5C6E6A] hover:text-[#0F201C] transition-colors cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23A87B] min-h-[36px]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#14664B] shrink-0 stroke-[2.5]" />
                    <span className="text-[#14664B] font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#5C6E6A] shrink-0" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            {/* WhatsApp Theme Message Preview Box with Blue Tick Indication */}
            <div className="bg-[#EFEAE2] rounded-xl border border-[#DAD2C7] p-3 sm:p-4 md:p-5 shadow-inner">
              {/* WhatsApp chat header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 sm:mb-3 border-b border-[#DFD7CD] text-xs text-[#54656F] font-medium gap-2">
                <div className="flex items-center space-x-2 truncate min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#20BA68] shrink-0" />
                  <span className="font-bold text-[#111B21] truncate">To: {config.firmName}</span>
                  <span className="text-[#54656F] font-mono text-[10px] sm:text-[11px] shrink-0 hidden min-[380px]:inline">({config.displayPhone})</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-[#54656F] font-semibold uppercase tracking-wider shrink-0">
                  Preview
                </span>
              </div>

              {/* WhatsApp outgoing chat bubble */}
              <div className="flex justify-end">
                <div className="w-full sm:max-w-[95%] bg-[#DCF8C6] text-[#111B21] rounded-2xl rounded-tr-xs p-3 sm:p-4 shadow-xs border border-[#C7E8B3] text-xs sm:text-sm font-sans whitespace-pre-wrap break-words leading-relaxed relative">
                  <div>{generatedMessage}</div>

                  {/* Timestamp & Blue Double Tick Indication */}
                  <div className="flex flex-wrap items-center justify-end gap-1.5 mt-2.5 pt-1.5 border-t border-[#CCE9B8] text-[10px] sm:text-[11px] text-[#54656F] font-medium select-none">
                    <span>Drafted for WhatsApp</span>
                    <span className="text-slate-400">•</span>
                    <span className="inline-flex items-center space-x-1 text-[#0284c7] font-bold">
                      <CheckCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#34B7F1] stroke-[2.5]" />
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
                className="p-3.5 sm:p-5 bg-[#DCF8C6] border-2 border-[#20BA68] rounded-xl flex items-center space-x-3 sm:space-x-3.5 shadow-xs"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#20BA68] text-[#081E23] flex items-center justify-center shrink-0 shadow-xs">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25, delay: 0.05 }}
                  >
                    <Check className="w-4 h-4 sm:w-6 sm:h-6 stroke-[3]" />
                  </motion.div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-base font-black text-[#081E23] leading-snug">
                    Your requested submitted successfully.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Primary Action Button */}
          <div className="pt-1 sm:pt-2">
            <a
              id="btn-send-request-to-arsca"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleInitiateRequest}
              className="w-full bg-[#20BA68] hover:bg-[#1DA85E] active:bg-[#189452] text-[#081E23] font-black px-4 sm:px-8 py-3.5 sm:py-4.5 rounded-xl flex items-center justify-center space-x-2 sm:space-x-3 uppercase tracking-wider text-xs min-[360px]:text-sm sm:text-base transition-all active:scale-[0.99] cursor-pointer shadow-sm hover:shadow-md min-h-[50px] sm:min-h-[58px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20BA68] focus-visible:ring-offset-2 text-center"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-[#081E23] shrink-0" />
              <span className="break-words">SEND REQUEST TO ARSCA</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 stroke-[2.5]" />
            </a>
          </div>

          {/* Quick Guidance & Reset */}
          <div className="border-t border-[#E2DDD2] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5C6E6A]">
            <span className="font-medium">
              Opens WhatsApp with pre-filled details for review before sending.
            </span>

            <button
              id="btn-choose-different-category"
              type="button"
              onClick={onBackToCategories}
              className="inline-flex items-center space-x-1 text-[#14664B] hover:text-[#23A87B] active:text-[#20BA68] font-bold underline cursor-pointer py-1 px-1.5 rounded touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#23A87B]"
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


