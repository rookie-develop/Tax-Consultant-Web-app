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
  FileText,
  Mail,
  ExternalLink,
  Info,
  Server,
  UserCheck,
  Clock,
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
    document.title = 'Data Safety & Privacy | ARSCA Tax Consultant';
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
          <span>Google Play Compliance</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
          Data Safety Disclosure
        </h1>
        <p className="text-xs sm:text-sm text-[#A0B7B2] font-medium leading-relaxed max-w-2xl">
          Detailed breakdown of data collection, processing, and security standards for the <strong className="text-white">{config.firmName}</strong> application, structured to meet Google Play Console requirements.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-[#7F9D97] border-t border-[#0F2D33]/60">
          <span>Target Audience: <strong>Verified Tax Clients</strong></span>
          <span>•</span>
          <span>Ad-Free: <strong>100% Free of Third-Party Ads</strong></span>
          <span>•</span>
          <span>Data Sharing: <strong>Zero Data Sold or Shared for Marketing</strong></span>
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
            All data transferred between the application and servers is encrypted using standard HTTPS/TLS protocols.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2DDD2] p-4.5 sm:p-5 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center">
            <XCircle className="w-4 h-4 text-[#20BA68]" />
          </div>
          <h2 className="text-sm font-bold text-[#081E23]">No Data Shared</h2>
          <p className="text-xs text-[#5C6E6A] leading-relaxed">
            Personal data is not sold or shared with any third-party marketing, analytics, or advertising brokers.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2DDD2] p-4.5 sm:p-5 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center">
            <UserCheck className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-[#081E23]">Deletion Available</h2>
          <p className="text-xs text-[#5C6E6A] leading-relaxed">
            Users may request complete deletion of their account profile and app data via our official Google Form or by emailing support.
          </p>
        </div>
      </div>

      {/* Google Play Data Safety Table */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
            Data Collection & Handling Breakdown
          </h2>
          <p className="text-xs sm:text-sm text-[#5C6E6A] mt-1">
            This table reflects the actual data collected by the application and services.
          </p>
        </div>

        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-y border-[#E2DDD2] text-[#081E23] font-bold">
                <th className="py-3 px-4 sm:px-6">Data Category & Type</th>
                <th className="py-3 px-4">Collected</th>
                <th className="py-3 px-4">Shared</th>
                <th className="py-3 px-4">Purpose</th>
                <th className="py-3 px-4">Optional / Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DDD2] text-[#4A5D58]">
              {/* Name */}
              <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="font-bold text-[#081E23]">Personal Info: Name</div>
                  <div className="text-[11px] text-[#7F9D97]">Obtained from Google Sign-In profile</div>
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
                <td className="py-3.5 px-4">App functionality, Account management</td>
                <td className="py-3.5 px-4">Optional (Only on login)</td>
              </tr>

              {/* Email */}
              <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="font-bold text-[#081E23]">Personal Info: Email address</div>
                  <div className="text-[11px] text-[#7F9D97]">Primary client account identifier</div>
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
                <td className="py-3.5 px-4">App functionality, Account management, Support</td>
                <td className="py-3.5 px-4">Required for Login</td>
              </tr>

              {/* User IDs */}
              <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="font-bold text-[#081E23]">Personal Info: User IDs</div>
                  <div className="text-[11px] text-[#7F9D97]">Firebase Authentication UID</div>
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
                <td className="py-3.5 px-4">Account authorization, Cloud Access Drive folder mapping</td>
                <td className="py-3.5 px-4">Required for Login</td>
              </tr>

              {/* Financial Information */}
              <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="font-bold text-[#081E23]">Financial Info / Tax Documents</div>
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
                <td className="py-3.5 px-4">*Managed externally via Google Drive; not stored on app servers</td>
                <td className="py-3.5 px-4">External</td>
              </tr>

              {/* Location */}
              <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="font-bold text-[#081E23]">Location (Approx / Precise)</div>
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
                <td className="py-3.5 px-4">N/A</td>
              </tr>

              {/* Device & Other IDs */}
              <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="font-bold text-[#081E23]">Device or other IDs (FCM / Ad ID)</div>
                  <div className="text-[11px] text-[#7F9D97]">Push notifications permanently removed</div>
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
                <td className="py-3.5 px-4">N/A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Play Console Declaration Guidance Card */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center space-x-2 text-[#081E23]">
          <Info className="w-5 h-5 text-[#20BA68] shrink-0" />
          <h2 className="text-base sm:text-lg font-black tracking-tight">
            Google Play Console Questionnaire Reference
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#4A5D58] leading-relaxed">
          For app developers and administrators completing the Google Play Console Data Safety questionnaire, use the verified answers below:
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="font-semibold text-[#081E23]">Does your app collect or share any of the required user data types?</span>
            <span className="font-bold text-[#23A87B]">Yes (Name, Email, User IDs for Auth)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="font-semibold text-[#081E23]">Is all user data collected by your app encrypted in transit?</span>
            <span className="font-bold text-[#23A87B]">Yes (HTTPS/TLS)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="font-semibold text-[#081E23]">Do you provide a way for users to request that their data be deleted?</span>
            <span className="font-bold text-[#23A87B]">Yes (Via Google Form &amp; {verifiedContactEmail})</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="font-semibold text-[#081E23]">Is the data shared with third parties for advertising or tracking?</span>
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
          In compliance with Google Play Developer Policies, users can submit an account-deletion request using our publicly accessible Google Form without requiring you to log in to the app:
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
            • <strong>Processing Timeline:</strong> After receiving a valid request, {config.firmName} aims to complete account deletion within <strong>24–48 hours</strong>.
          </p>
          <p>
            • <strong>Email Confirmation:</strong> Once completed, a formal confirmation email is sent to the verified email address associated with your account.
          </p>
          <p>
            • <strong>Scope:</strong> Deletes your {config.firmName} app account profile and Firebase authentication mapping. It does <em>not</em> delete your Google Account.
          </p>
          <p>
            • <strong>Statutory Retention:</strong> Tax computation records and statutory filings are retained for mandatory legal retention periods under Indian tax laws.
          </p>
        </div>

        <div className="pt-1 text-[11px] text-[#7F9D97] flex flex-wrap items-center gap-2">
          <span>Alternative email request:</span>
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
