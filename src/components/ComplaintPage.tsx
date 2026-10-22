import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { AppConfig, ClientUser } from '../types';

interface ComplaintPageProps {
  config: AppConfig;
  clientUser?: ClientUser | null;
  onBack: () => void;
}

export const ComplaintPage: React.FC<ComplaintPageProps> = React.memo(({
  onBack,
}) => {
  const [copied, setCopied] = useState(false);
  const complaintEmail = 'ps2akash@gmail.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(complaintEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <motion.div
      key="complaint-page-view"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="max-w-xl mx-auto space-y-5 sm:space-y-6 py-2 sm:py-6"
    >
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          id="btn-back-from-complaint"
          type="button"
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-[#0F201C] hover:text-[#23A87B] bg-white border border-[#E2DDD2] hover:bg-[#FAF8F5] active:bg-[#ECE5D8] px-4 py-2.5 rounded-xl transition-colors cursor-pointer min-h-[44px] touch-manipulation shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23A87B]"
          aria-label="Back to Services"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Back to Services</span>
        </button>
      </div>

      {/* Minimal Clean Email Contact Card */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] p-7 sm:p-10 shadow-lg text-center space-y-6">
        {/* Recognizable Google Gmail Logo */}
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F8F9FA] border border-[#E2DDD2] flex items-center justify-center p-3 sm:p-4 shadow-xs">
          <svg
            className="w-full h-full"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Google Gmail"
          >
            <path
              d="M20.5 4H3.5C2.67 4 2 4.67 2 5.5V18.5C2 19.33 2.67 20 3.5 20H20.5C21.33 20 22 19.33 22 18.5V5.5C22 4.67 21.33 4 20.5 4Z"
              fill="#FFFFFF"
            />
            <path
              d="M2 6.2L12 13.5L22 6.2V5.5C22 4.67 21.33 4 20.5 4H3.5C2.67 4 2 4.67 2 5.5V6.2Z"
              fill="#EA4335"
            />
            <path
              d="M2 6.2V18.5C2 19.33 2.67 20 3.5 20H6V9.1L2 6.2Z"
              fill="#4285F4"
            />
            <path
              d="M22 6.2V18.5C22 19.33 21.33 20 20.5 20H18V9.1L22 6.2Z"
              fill="#34A853"
            />
            <path
              d="M18 9.1V20H6V9.1L12 13.5L18 9.1Z"
              fill="#FBBC05"
            />
          </svg>
        </div>

        {/* Heading & Friendly Assistance Message */}
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#081E23] tracking-tight">
            Contact Us for Complaints
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6E6A] font-medium max-w-md mx-auto leading-relaxed">
            For any complaints or assistance, please contact us by email.
          </p>
        </div>

        {/* Existing Complaint Email Address */}
        <div className="inline-flex items-center justify-center space-x-2 bg-[#F4F0E8] border border-[#E2DDD2] rounded-2xl px-4 py-2.5 max-w-full">
          <span className="font-mono text-sm sm:text-base font-bold text-[#081E23] select-all break-all">
            {complaintEmail}
          </span>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="p-1.5 text-[#5C6E6A] hover:text-[#081E23] rounded-lg hover:bg-white/60 transition-colors cursor-pointer shrink-0"
            title="Copy email address"
            aria-label="Copy email address"
          >
            {copied ? (
              <Check className="w-4 h-4 text-[#20BA68]" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Clear Actions: Email Us / Open Gmail */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          {/* Primary Mailto Action */}
          <a
            id="btn-email-us"
            href={`mailto:${complaintEmail}`}
            className="w-full sm:flex-1 bg-[#081E23] hover:bg-[#20BA68] active:bg-[#1DA85E] text-white hover:text-[#081E23] font-black py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all min-h-[46px] flex items-center justify-center space-x-2 shadow-sm touch-manipulation cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20BA68]"
          >
            <span>Email Us</span>
          </a>

          {/* Direct Gmail Web Action */}
          <a
            id="btn-open-gmail"
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(complaintEmail)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 bg-[#FAF8F5] hover:bg-[#F4F0E8] active:bg-[#ECE5D8] text-[#081E23] border border-[#D5CEBF] font-black py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all min-h-[46px] flex items-center justify-center space-x-2 shadow-xs touch-manipulation cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20BA68]"
          >
            <span>Open Gmail</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
});

ComplaintPage.displayName = 'ComplaintPage';
