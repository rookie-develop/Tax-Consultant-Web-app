import React, { useState } from 'react';
import {
  MessageCircle,
  Copy,
  Check,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
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

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
      {/* Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
        <button
          id="btn-back-to-subservices"
          type="button"
          onClick={onBackToSubServices}
          className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 px-3.5 py-2.5 rounded-lg transition-colors cursor-pointer min-h-[44px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Change Sub-Service</span>
        </button>

        <div className="flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
          <button
            id="breadcrumb-categories"
            type="button"
            onClick={onBackToCategories}
            className="hover:underline hover:text-slate-700 text-slate-500 py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded"
          >
            {category.shortTitle}
          </button>
          <span>/</span>
          <span className="text-slate-900 font-extrabold truncate max-w-[160px] sm:max-w-xs">{subService.title}</span>
        </div>
      </div>

      {/* Main Request Container */}
      <div className="bg-white rounded-xl border-2 border-emerald-500 shadow-sm overflow-hidden">
        {/* Header Banner */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 md:p-8 border-b-2 border-emerald-500">
          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
            <span className="inline-flex items-center space-x-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Ready to Send via WhatsApp</span>
            </span>
            <div className="flex items-center space-x-1.5 text-[11px] sm:text-xs text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct to {config.firmName} Consultant Team</span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white mb-2 break-words">
            {subService.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-medium break-words">
            {subService.shortDesc}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
          {/* Key coverage points */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2.5">
              Included Consultation & Filing Scope:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
              {subService.keyHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-bold text-slate-800 flex items-center space-x-2"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="break-words leading-snug">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Message Preview Section */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-3.5 sm:p-5 md:p-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">
                  Pre-filled WhatsApp Message Preview
                </h4>
              </div>
              <button
                id="btn-copy-whatsapp-text"
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 active:bg-slate-200 text-slate-700 transition-colors shadow-2xs cursor-pointer min-h-[40px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-emerald-700 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            {/* WhatsApp Chat Preview Card */}
            <div className="bg-[#EFEAE2] p-3 sm:p-5 rounded-xl border border-[#DAD2C7] shadow-inner overflow-hidden">
              <div className="max-w-xl bg-white text-slate-900 rounded-xl rounded-tl-xs p-3.5 sm:p-4 shadow-sm text-xs sm:text-sm leading-relaxed font-sans whitespace-pre-wrap break-words relative border border-slate-200/80">
                {generatedMessage}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1 text-[10px] text-slate-400">
                  <span>Drafted for {config.firmName} ({config.displayPhone})</span>
                  <span className="text-emerald-600 font-bold">Instant Routing ✓✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Action Button (High impact across mobile, tablet & desktop) */}
          <div className="bg-slate-900 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 text-white">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400 block mb-1">
                Instant WhatsApp Connection
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-200">
                Send request directly to ARSCA Consultants:
              </p>
              <span className="text-xs text-emerald-400 font-mono font-bold">
                {config.displayPhone}
              </span>
            </div>

            <a
              id="btn-send-whatsapp-request"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-900 font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg flex items-center justify-center space-x-2.5 sm:space-x-3 uppercase tracking-wider text-xs sm:text-sm transition-transform active:scale-95 cursor-pointer shadow-md shrink-0 min-h-[50px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle className="w-5 h-5 fill-slate-900 shrink-0" />
              <span className="whitespace-nowrap">Send WhatsApp Request</span>
              <ExternalLink className="w-4 h-4 text-slate-900 shrink-0" />
            </a>
          </div>

          {/* Explanation for Non-Tech Users */}
          <div className="flex items-start space-x-2.5 text-xs text-slate-600 bg-slate-50 p-3.5 sm:p-4 rounded-lg border border-slate-200 leading-relaxed font-medium">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-900">How it works:</strong> Clicking the button above opens WhatsApp on your device with your request message already prepared. You can review or add details before sending. An ARSCA tax consultant will respond during working hours.
            </p>
          </div>

          {/* Secondary Actions / Fallback */}
          <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center space-x-2 font-medium">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Standard Response: <strong>Within 30–60 minutes</strong></span>
            </div>

            <button
              id="btn-choose-different-category"
              type="button"
              onClick={onBackToCategories}
              className="text-slate-700 hover:text-slate-950 active:text-emerald-700 font-bold underline cursor-pointer py-1.5 px-2 rounded touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              ← Choose another service category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

