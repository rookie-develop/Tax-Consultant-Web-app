import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ShieldCheck,
  Shield,
  ShieldAlert,
  Lock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Info,
  UserCheck,
} from 'lucide-react';
import { AppConfig } from '../types';
import { ACCOUNT_DELETION_FORM_URL } from '../data/servicesData';

interface DataSafetyPageProps {
  config: AppConfig;
  onBack: () => void;
  onNavigateToPrivacyPolicy?: () => void;
  onNavigateToDeleteAccount?: () => void;
}

export const DataSafetyPage: React.FC<DataSafetyPageProps> = React.memo(({
  config,
  onBack,
  onNavigateToPrivacyPolicy,
  onNavigateToDeleteAccount,
}) => {
  const verifiedContactEmail = 'ps2akash@gmail.com';

  useEffect(() => {
    document.title = 'Data Privacy & Safety | ARSCA Tax Consultant';
  }, []);

  return (
    <motion.div
      key="data-safety-view"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-2 sm:py-6"
    >
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2.5">
        <button
          id="btn-back-from-datasafety"
          type="button"
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-[#0F201C] hover:text-[#23A87B] bg-white border border-[#E2DDD2] hover:bg-[#FAF8F5] active:bg-[#ECE5D8] px-4 py-2.5 rounded-xl transition-colors cursor-pointer min-h-[44px] touch-manipulation shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23A87B]"
          aria-label="Back to Services"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Back to Services</span>
        </button>

        <div className="flex items-center flex-wrap gap-2">
          {onNavigateToPrivacyPolicy && (
            <button
              id="btn-goto-privacy-policy"
              type="button"
              onClick={onNavigateToPrivacyPolicy}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#23A87B] hover:text-[#081E23] bg-white border border-[#20BA68]/30 hover:border-[#20BA68] px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer min-h-[44px] touch-manipulation shadow-xs"
            >
              <Shield className="w-3.5 h-3.5 shrink-0" />
              <span>Privacy Policy</span>
            </button>
          )}

          {onNavigateToDeleteAccount && (
            <button
              id="btn-goto-delete-account-from-safety"
              type="button"
              onClick={onNavigateToDeleteAccount}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-700 hover:text-amber-900 bg-white border border-amber-200 hover:border-amber-300 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer min-h-[44px] touch-manipulation shadow-xs"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Request Deletion</span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="bg-[#081E23] text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-[#0F2D33] space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#20BA68]/15 border border-[#20BA68]/30 px-3 py-1 rounded-full text-xs font-bold text-[#20BA68]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Data Privacy &amp; Safety</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
          Data Safety
        </h1>
        <p className="text-xs sm:text-sm text-[#A0B7B2] font-medium leading-relaxed max-w-2xl">
          A clear summary of what information <strong className="text-white">{config.firmName} Tax Consultant</strong> collects, why it is needed, how it is protected, and how you can manage your account data.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-[#7F9D97] border-t border-[#0F2D33]/60">
          <span>No Third-Party Ads</span>
          <span>•</span>
          <span>No Personal Data Sold</span>
          <span>•</span>
          <span>HTTPS Encrypted Connections</span>
        </div>
      </div>

      {/* Summary Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-[#E2DDD2] p-4.5 sm:p-5 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-[#081E23]">Encrypted in Transit</h2>
          <p className="text-xs text-[#5C6E6A] leading-relaxed">
            Information transferred between your browser or device and our platform is encrypted in transit using HTTPS (TLS).
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2DDD2] p-4.5 sm:p-5 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center">
            <XCircle className="w-4 h-4 text-[#20BA68]" />
          </div>
          <h2 className="text-sm font-bold text-[#081E23]">No Sale or Ad Sharing</h2>
          <p className="text-xs text-[#5C6E6A] leading-relaxed">
            We never sell your personal information or share it with advertisers, data brokers, or marketing networks.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2DDD2] p-4.5 sm:p-5 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center">
            <UserCheck className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-[#081E23]">Account Deletion Available</h2>
          <p className="text-xs text-[#5C6E6A] leading-relaxed">
            You can request deletion of your ARSCA app account profile and linked app data at any time through our online form or by email.
          </p>
        </div>
      </div>

      {/* Data Collection & Handling Table */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
            Information Collected &amp; How It Is Used
          </h2>
          <p className="text-xs sm:text-sm text-[#5C6E6A] mt-1">
            An overview of the information handled by the {config.firmName} website and Android app.
          </p>
        </div>

        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-y border-[#E2DDD2] text-[#081E23] font-bold">
                <th className="py-3 px-4 sm:px-6">Data Type</th>
                <th className="py-3 px-4">Collected</th>
                <th className="py-3 px-4">Shared for Ads / Marketing</th>
                <th className="py-3 px-4">Why It Is Used</th>
                <th className="py-3 px-4">When It Applies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DDD2] text-[#4A5D58]">
              {/* Name */}
              <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="font-bold text-[#081E23]">Name</div>
                  <div className="text-[11px] text-[#7F9D97]">From your Google Sign-In profile</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center text-[#20BA68] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Yes
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center text-[#5C6E6A] font-bold">
                    <XCircle className="w-3.5 h-3.5 mr-1" /> No
                  </span>
                </td>
                <td className="py-3.5 px-4">Profile display and account sign-in</td>
                <td className="py-3.5 px-4">Optional (only if you sign in)</td>
              </tr>

              {/* Email */}
              <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="font-bold text-[#081E23]">Email Address</div>
                  <div className="text-[11px] text-[#7F9D97]">Primary account identifier</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center text-[#20BA68] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Yes
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center text-[#5C6E6A] font-bold">
                    <XCircle className="w-3.5 h-3.5 mr-1" /> No
                  </span>
                </td>
                <td className="py-3.5 px-4">Account sign-in, verification, and support</td>
                <td className="py-3.5 px-4">Required for Sign-In</td>
              </tr>

              {/* User IDs */}
              <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="font-bold text-[#081E23]">Account User ID</div>
                  <div className="text-[11px] text-[#7F9D97]">Firebase Authentication ID</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center text-[#20BA68] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Yes
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center text-[#5C6E6A] font-bold">
                    <XCircle className="w-3.5 h-3.5 mr-1" /> No
                  </span>
                </td>
                <td className="py-3.5 px-4">Linking your account to your assigned Google Drive folder</td>
                <td className="py-3.5 px-4">Required for Sign-In</td>
              </tr>

              {/* Service Inquiries & Complaints */}
              <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="font-bold text-[#081E23]">Service Inquiries &amp; Complaints</div>
                  <div className="text-[11px] text-[#7F9D97]">Details shared via WhatsApp or support email</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center text-[#20BA68] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Voluntary
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center text-[#5C6E6A] font-bold">
                    <XCircle className="w-3.5 h-3.5 mr-1" /> No
                  </span>
                </td>
                <td className="py-3.5 px-4">Responding to service requests and resolving complaints</td>
                <td className="py-3.5 px-4">Only when submitted by you</td>
              </tr>

              {/* Financial Information */}
              <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="font-bold text-[#081E23]">Tax Documents &amp; Financial Files</div>
                  <div className="text-[11px] text-[#7F9D97]">Returns, computation statements</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center text-[#5C6E6A] font-bold">
                    <XCircle className="w-3.5 h-3.5 mr-1" /> No*
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center text-[#5C6E6A] font-bold">
                    <XCircle className="w-3.5 h-3.5 mr-1" /> No
                  </span>
                </td>
                <td className="py-3.5 px-4">*Stored in Google Drive folders managed by the firm, not on website servers</td>
                <td className="py-3.5 px-4">External (Google Drive)</td>
              </tr>

              {/* Location */}
              <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="font-bold text-[#081E23]">Device Location</div>
                  <div className="text-[11px] text-[#7F9D97]">Approximate or precise location</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center text-[#5C6E6A] font-bold">
                    <XCircle className="w-3.5 h-3.5 mr-1" /> No
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center text-[#5C6E6A] font-bold">
                    <XCircle className="w-3.5 h-3.5 mr-1" /> No
                  </span>
                </td>
                <td className="py-3.5 px-4">Not collected</td>
                <td className="py-3.5 px-4">—</td>
              </tr>

              {/* Device & Other IDs */}
              <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="font-bold text-[#081E23]">Advertising IDs &amp; Push Tokens</div>
                  <div className="text-[11px] text-[#7F9D97]">Device ad trackers or notification tokens</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center text-[#5C6E6A] font-bold">
                    <XCircle className="w-3.5 h-3.5 mr-1" /> No
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center text-[#5C6E6A] font-bold">
                    <XCircle className="w-3.5 h-3.5 mr-1" /> No
                  </span>
                </td>
                <td className="py-3.5 px-4">Not collected</td>
                <td className="py-3.5 px-4">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[11px] sm:text-xs text-[#5C6E6A] leading-relaxed pt-1">
          Your information is processed only through the technical service providers required to run the platform—Google (Firebase Authentication, Cloud Firestore, and Google Drive) and Vercel (website hosting)—or when required by law.
        </p>
      </div>

      {/* Common Data Safety Questions */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center space-x-2 text-[#081E23]">
          <Info className="w-5 h-5 text-[#20BA68] shrink-0" />
          <h2 className="text-base sm:text-lg font-black tracking-tight">
            Common Questions About Your Data
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#4A5D58] leading-relaxed">
          Quick answers about how {config.firmName} Tax Consultant handles account sign-in, security, and deletion:
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="font-semibold text-[#081E23]">What information is collected when I use the app?</span>
            <span className="font-bold text-[#23A87B]">Name, Email &amp; User ID on sign-in, plus voluntary inquiries</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="font-semibold text-[#081E23]">Is my connection encrypted in transit?</span>
            <span className="font-bold text-[#23A87B]">Yes (HTTPS / TLS)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="font-semibold text-[#081E23]">Can I request deletion of my account and app data?</span>
            <span className="font-bold text-[#23A87B]">Yes (Via Google Form or {verifiedContactEmail})</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="font-semibold text-[#081E23]">Is my data shared with advertisers or trackers?</span>
            <span className="font-bold text-[#081E23]">No</span>
          </div>
        </div>
      </div>

      {/* Account Deletion Request Card */}
      <div className="bg-[#FAF8F5] rounded-3xl border border-[#E2DDD2] p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-base sm:text-lg font-black text-[#081E23] tracking-tight">
          Request Account and Data Deletion
        </h2>
        <p className="text-xs sm:text-sm text-[#5C6E6A] leading-relaxed">
          You can submit a request to delete your {config.firmName} app account and linked profile data at any time using our public Google Form. You do not need to sign in to submit this form:
        </p>

        {/* Action Button */}
        <div className="pt-1">
          <a
            id="btn-data-safety-submit-deletion-form"
            href={ACCOUNT_DELETION_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-xs font-bold text-white bg-[#081E23] hover:bg-[#0E333B] active:bg-[#06181C] px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            <span>Submit Deletion Request</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#20BA68]" />
          </a>
        </div>

        <div className="space-y-2 pt-2 border-t border-[#E8E2D6] text-[11px] sm:text-xs text-[#5C6E6A]">
          <p>
            • <strong>Processing Time:</strong> After receiving and verifying a valid request, {config.firmName} aims to complete account deletion within <strong>24–48 hours</strong>.
          </p>
          <p>
            • <strong>Email Confirmation:</strong> Once completed, we send a confirmation email to the verified email address associated with your account.
          </p>
          <p>
            • <strong>What Is Deleted:</strong> This removes your {config.firmName} app account profile and Firebase sign-in mapping. It does <em>not</em> delete your personal Google Account.
          </p>
          <p>
            • <strong>Records Retained by Law:</strong> Client tax computation files, filed returns, and statutory records must be retained where required under Indian tax laws and professional regulations.
          </p>
        </div>

        <div className="pt-1 text-[11px] text-[#7F9D97] flex flex-wrap items-center gap-2">
          <span>You can also request deletion by email:</span>
          <a
            href={`mailto:${verifiedContactEmail}?subject=ARSCA%20Account%20and%20Data%20Deletion%20Request`}
            className="font-mono font-bold text-[#081E23] hover:text-[#23A87B]"
          >
            {verifiedContactEmail}
          </a>
        </div>
      </div>
    </motion.div>
  );
});

DataSafetyPage.displayName = 'DataSafetyPage';
