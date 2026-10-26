import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ExternalLink,
  ShieldAlert,
  Clock,
  Mail,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { AppConfig } from '../types';
import { ACCOUNT_DELETION_FORM_URL } from '../data/servicesData';

interface DeleteAccountViewProps {
  config: AppConfig;
  onBack: () => void;
  onNavigateToPrivacyPolicy?: () => void;
  onNavigateToDataSafety?: () => void;
}

export const DeleteAccountView: React.FC<DeleteAccountViewProps> = React.memo(({
  config,
  onBack,
  onNavigateToPrivacyPolicy,
  onNavigateToDataSafety,
}) => {
  const verifiedContactEmail = config.emailContact || 'compliance@arsca.in';

  React.useEffect(() => {
    document.title = 'Request Account Deletion | ARSCA Tax Consultant';
  }, []);

  return (
    <motion.div
      key="delete-account-view"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-3xl mx-auto space-y-6 sm:space-y-8"
    >
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between">
        <button
          id="btn-back-from-delete-account"
          type="button"
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-[#081E23] hover:text-[#23A87B] transition-colors cursor-pointer py-2 px-3 rounded-xl bg-white border border-[#E2DDD2] hover:bg-[#FAF8F5] shadow-2xs touch-manipulation"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center space-x-2">
          {onNavigateToPrivacyPolicy && (
            <button
              type="button"
              onClick={onNavigateToPrivacyPolicy}
              className="text-xs font-semibold text-[#5C6E6A] hover:text-[#081E23] underline transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          )}
          {onNavigateToDataSafety && (
            <>
              <span className="text-[#A4B6B1]">•</span>
              <button
                type="button"
                onClick={onNavigateToDataSafety}
                className="text-xs font-semibold text-[#5C6E6A] hover:text-[#081E23] underline transition-colors cursor-pointer"
              >
                Data Safety
              </button>
            </>
          )}
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="bg-[#081E23] text-white rounded-3xl p-6 sm:p-9 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#20BA68]/20 to-transparent blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-semibold text-[#20BA68]">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Account Management & Data Rights</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Request Account Deletion
          </h1>

          <p className="text-xs sm:text-sm text-[#C5DAD4] leading-relaxed max-w-xl">
            You can submit a request to delete your {config.firmName} Tax Consultant app account and associated app data. After verifying your request, {config.firmName} aims to complete the deletion within 24–48 hours. You will receive a confirmation email at your verified account email address once deletion is completed.
          </p>
        </div>
      </div>

      {/* Main Request Card */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] p-6 sm:p-8 shadow-sm space-y-6">
        {/* Core Deletion Form CTA */}
        <div className="bg-[#FAF8F5] border border-[#E2DDD2] rounded-2xl p-6 sm:p-7 space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#20BA68]/15 text-[#16A34A] flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5 text-[#20BA68]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-bold text-[#081E23]">
                Official Account Deletion Form
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6E6A] leading-relaxed">
                Click below to open our official, publicly accessible Google Form. No login required.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <a
              id="btn-submit-deletion-request"
              href={ACCOUNT_DELETION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-[#081E23] hover:bg-[#0E333B] active:bg-[#06181C] text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-150 cursor-pointer shadow-sm touch-manipulation active:scale-[0.98] text-sm group"
            >
              <span>Submit Deletion Request</span>
              <ExternalLink className="w-4 h-4 text-[#20BA68] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <p className="text-[11px] text-[#7F9D97] leading-relaxed">
            Opens in a secure new browser tab directly on Google Forms.
          </p>
        </div>

        {/* Process & Policy Details */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-[#081E23] uppercase tracking-wider">
            Important Information Regarding Account Deletion
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Timeline */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-2">
              <div className="flex items-center space-x-2 text-[#081E23] font-bold text-xs sm:text-sm">
                <Clock className="w-4 h-4 text-[#20BA68]" />
                <span>24–48 Hours Turnaround</span>
              </div>
              <p className="text-xs text-[#5C6E6A] leading-relaxed">
                After receiving and verifying your request, {config.firmName} aims to process the deletion within 24–48 hours. If additional identity verification is needed, you will be promptly contacted.
              </p>
            </div>

            {/* Email Confirmation */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-2">
              <div className="flex items-center space-x-2 text-[#081E23] font-bold text-xs sm:text-sm">
                <Mail className="w-4 h-4 text-[#20BA68]" />
                <span>Email Confirmation</span>
              </div>
              <p className="text-xs text-[#5C6E6A] leading-relaxed">
                A formal confirmation email will be sent to your verified registered account email address as soon as account deletion is completed.
              </p>
            </div>

            {/* Scope */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-2">
              <div className="flex items-center space-x-2 text-[#081E23] font-bold text-xs sm:text-sm">
                <Lock className="w-4 h-4 text-[#20BA68]" />
                <span>ARSCA App Account Only</span>
              </div>
              <p className="text-xs text-[#5C6E6A] leading-relaxed">
                This request deletes your {config.firmName} app account profile and Firebase authentication mapping. It does <strong>not</strong> delete your Google Account.
              </p>
            </div>

            {/* Statutory Record Retention */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-2">
              <div className="flex items-center space-x-2 text-[#081E23] font-bold text-xs sm:text-sm">
                <FileText className="w-4 h-4 text-[#20BA68]" />
                <span>Legal Record Retention</span>
              </div>
              <p className="text-xs text-[#5C6E6A] leading-relaxed">
                Certain tax or business records may need to be retained where required by Indian statutory law (Income Tax Act, CGST Act) and professional regulatory mandates.
              </p>
            </div>
          </div>
        </div>

        {/* Alternative Email Contact */}
        <div className="p-4.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-xs text-amber-950">
          <div className="flex items-center space-x-2 font-bold text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Need Help or Have Questions?</span>
          </div>
          <p className="text-amber-900/90 leading-relaxed">
            You can also contact our compliance officer directly at{' '}
            <a
              href={`mailto:${verifiedContactEmail}?subject=Account%20Deletion%20Assistance`}
              className="font-bold underline hover:text-amber-800"
            >
              {verifiedContactEmail}
            </a>
            {' '}if you need assistance with your request.
          </p>
        </div>
      </div>
    </motion.div>
  );
});

DeleteAccountView.displayName = 'DeleteAccountView';
