import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Shield,
  Lock,
  UserCheck,
  FileText,
  Mail,
  ExternalLink,
  FolderLock,
  Database,
  CalendarCheck,
  Clock,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { AppConfig } from '../types';
import { ACCOUNT_DELETION_FORM_URL } from '../data/servicesData';

interface PrivacyPolicyPageProps {
  config: AppConfig;
  onBack: () => void;
  onNavigateToDataSafety?: () => void;
  onNavigateToDeleteAccount?: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = React.memo(({
  config,
  onBack,
  onNavigateToDataSafety,
  onNavigateToDeleteAccount,
}) => {
  const verifiedContactEmail = 'ps2akash@gmail.com';

  useEffect(() => {
    document.title = 'Privacy Policy | ARSCA Tax Consultant';
  }, []);

  return (
    <motion.div
      key="privacy-policy-view"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-2 sm:py-6"
    >
      {/* Top Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-2.5">
        <button
          id="btn-back-from-privacy"
          type="button"
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-[#0F201C] hover:text-[#23A87B] bg-white border border-[#E2DDD2] hover:bg-[#FAF8F5] active:bg-[#ECE5D8] px-4 py-2.5 rounded-xl transition-colors cursor-pointer min-h-[44px] touch-manipulation shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23A87B]"
          aria-label="Back to Services"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Back to Services</span>
        </button>

        <div className="flex items-center flex-wrap gap-2">
          {onNavigateToDataSafety && (
            <button
              id="btn-goto-data-safety"
              type="button"
              onClick={onNavigateToDataSafety}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#23A87B] hover:text-[#081E23] bg-white border border-[#20BA68]/30 hover:border-[#20BA68] px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer min-h-[44px] touch-manipulation shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Data Safety</span>
            </button>
          )}

          {onNavigateToDeleteAccount && (
            <button
              id="btn-goto-delete-account-from-privacy"
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
          <Shield className="w-3.5 h-3.5" />
          <span>Privacy & Transparency</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#A0B7B2] font-medium leading-relaxed max-w-2xl">
          At <strong className="text-white">{config.firmName}</strong>, we are committed to upholding strict confidentiality, data privacy, and ethical standards for all tax compliance, consulting, and accounting engagements.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-[#7F9D97] border-t border-[#0F2D33]/60">
          <span>Effective Date: <strong>October 2026</strong></span>
          <span>•</span>
          <span>Last Updated: <strong>October 26, 2026</strong></span>
          <span>•</span>
          <span>Applicable: <strong>ARSCA Web & Android Application</strong></span>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] p-6 sm:p-10 shadow-sm space-y-8 sm:space-y-10 text-[#0F201C]">
        
        {/* Section 1: Overview and Purpose */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center font-bold text-sm shrink-0">
              1
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
              Scope & Application Purpose
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4A5D58] leading-relaxed pl-10 sm:pl-10.5">
            This Privacy Policy describes how <strong>{config.firmName}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, processes, and protects information when you use our official web application and Android application. Our digital platform is designed to assist verified consultancy clients in discovering compliance services, generating structured WhatsApp inquiries, securely accessing tax documents, and submitting client service communications.
          </p>
        </section>

        {/* Section 2: Information We Collect */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center font-bold text-sm shrink-0">
              2
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
              Information We Collect
            </h2>
          </div>
          <div className="pl-0 sm:pl-10 space-y-3">
            <p className="text-xs sm:text-sm text-[#4A5D58] leading-relaxed">
              We collect only the minimum information necessary to authenticate clients and deliver requested professional tax consulting services:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              <div className="bg-[#FAF8F5] border border-[#E2DDD2] rounded-2xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-[#081E23] font-bold text-xs sm:text-sm">
                  <UserCheck className="w-4 h-4 text-[#20BA68]" />
                  <span>Google Account Profile (Auth)</span>
                </div>
                <p className="text-[12px] text-[#5C6E6A] leading-relaxed">
                  When you sign in using Google Sign-In, Firebase Authentication securely provides your name, verified email address, Google profile picture URL, and a unique Firebase user ID (UID).
                </p>
              </div>

              <div className="bg-[#FAF8F5] border border-[#E2DDD2] rounded-2xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-[#081E23] font-bold text-xs sm:text-sm">
                  <FolderLock className="w-4 h-4 text-[#20BA68]" />
                  <span>Client Cloud Access Mapping</span>
                </div>
                <p className="text-[12px] text-[#5C6E6A] leading-relaxed">
                  In our secure Cloud Firestore database, we store an internal record linking your authenticated Firebase UID to your designated private Google Drive folder identifier for authorized document access.
                </p>
              </div>

              <div className="bg-[#FAF8F5] border border-[#E2DDD2] rounded-2xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-[#081E23] font-bold text-xs sm:text-sm">
                  <FileText className="w-4 h-4 text-[#20BA68]" />
                  <span>Service Inquiries & Complaints</span>
                </div>
                <p className="text-[12px] text-[#5C6E6A] leading-relaxed">
                  When you draft a service request via WhatsApp or reach out via our complaint address, you provide contact details and inquiry descriptions voluntarily for service execution.
                </p>
              </div>

              <div className="bg-[#FAF8F5] border border-[#E2DDD2] rounded-2xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-[#081E23] font-bold text-xs sm:text-sm">
                  <Lock className="w-4 h-4 text-[#20BA68]" />
                  <span>No Ad Tracking or Push Tokens</span>
                </div>
                <p className="text-[12px] text-[#5C6E6A] leading-relaxed">
                  We do not collect advertising identifiers, location data, biometric data, device sensors, contacts, or push notification tokens. Push notifications have been completely removed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Document Storage & Google Drive Integration */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center font-bold text-sm shrink-0">
              3
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
              Tax Document Storage & Google Drive Access
            </h2>
          </div>
          <div className="pl-0 sm:pl-10 space-y-3 text-xs sm:text-sm text-[#4A5D58] leading-relaxed">
            <p>
              Confidential client tax filings, computational sheets, returns, and compliance documents are stored and organized directly in <strong>Google Drive</strong> folders controlled by the firm.
            </p>
            <div className="bg-[#F4F0E8] border border-[#E2DDD2] rounded-2xl p-4 space-y-2 text-[12px] text-[#0F201C]">
              <div className="flex items-center space-x-2 font-bold text-[#081E23]">
                <Database className="w-4 h-4 text-[#20BA68]" />
                <span>Zero File Hosting on Web Application Servers</span>
              </div>
              <p className="text-[#5C6E6A]">
                The ARSCA web application and hosting servers do not ingest, upload, or store your tax files on application servers. When you click &ldquo;Cloud Access&rdquo;, you are redirected directly to Google Drive over Google&rsquo;s authenticated transport layer. Access to your folder requires authorization matching your Google account permissions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Use of Information */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center font-bold text-sm shrink-0">
              4
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
              How We Use Information
            </h2>
          </div>
          <div className="pl-0 sm:pl-10 text-xs sm:text-sm text-[#4A5D58] leading-relaxed space-y-2">
            <p>We use the collected information strictly for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#0F201C]">
              <li>Authenticating your client session and verifying your eligibility for Cloud Access.</li>
              <li>Connecting you to your dedicated Google Drive document folder.</li>
              <li>Responding to tax consulting, GST, audit, and compliance inquiries you initiate.</li>
              <li>Investigating and resolving service complaints or technical inquiries submitted to our team.</li>
              <li>Fulfilling legal and statutory recordkeeping duties required under applicable tax and accounting laws in India.</li>
            </ul>
          </div>
        </section>

        {/* Section 5: No Sale of Personal Data */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center font-bold text-sm shrink-0">
              5
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
              No Sale or Marketing Disclosure of Data
            </h2>
          </div>
          <div className="pl-0 sm:pl-10 text-xs sm:text-sm text-[#4A5D58] leading-relaxed space-y-2">
            <p>
              <strong>We do not sell, rent, monetize, or trade client personal or financial information.</strong>
            </p>
            <p>
              We do not share your information with third-party advertisers, data brokers, or marketing networks. Information is disclosed only to verified service providers (Google Firebase for authentication, Google Drive for storage, and Vercel for web hosting) strictly as required to operate the service.
            </p>
          </div>
        </section>

        {/* Section 6: Security and Encryption */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center font-bold text-sm shrink-0">
              6
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
              Data Security & Encryption
            </h2>
          </div>
          <div className="pl-0 sm:pl-10 text-xs sm:text-sm text-[#4A5D58] leading-relaxed space-y-2">
            <p>
              We employ industry-standard security safeguards to protect your personal information:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#0F201C]">
              <li><strong>Encryption in Transit:</strong> All web and mobile communications are encrypted using secure HTTPS / Transport Layer Security (TLS).</li>
              <li><strong>Access Control:</strong> Database records in Cloud Firestore are protected by server-side security rules restricting access to verified users.</li>
              <li><strong>Folder Authorization:</strong> Google Drive folders are governed by Google Workspace identity and access management controls.</li>
            </ul>
          </div>
        </section>

        {/* Section 7: Data Retention & Statutory Duties */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center font-bold text-sm shrink-0">
              7
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
              Data Retention
            </h2>
          </div>
          <div className="pl-0 sm:pl-10 text-xs sm:text-sm text-[#4A5D58] leading-relaxed space-y-2">
            <p>
              Account identification records are maintained as long as you maintain an active client relationship with <strong>{config.firmName}</strong>. Tax filings, financial computation records, and statutory books are maintained in accordance with mandatory statutory retention periods established by Indian tax laws (e.g. Income Tax Act, 1961 and CGST Act, 2017) and professional regulatory requirements.
            </p>
          </div>
        </section>

        {/* Section 8: Your Rights & Account Deletion Requests */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center font-bold text-sm shrink-0">
              8
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
              Your Rights & Account Deletion Requests
            </h2>
          </div>
          <div className="pl-0 sm:pl-10 text-xs sm:text-sm text-[#4A5D58] leading-relaxed space-y-3">
            <p>
              You have the right to inspect, update, or request the permanent deletion of your personal account data held in our application.
            </p>
            <div className="bg-[#FAF8F5] border border-[#E2DDD2] rounded-2xl p-5 sm:p-6 space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-[#081E23]">
                Account Deletion Process (Google Form):
              </h3>
              <p className="text-xs text-[#5C6E6A] leading-relaxed">
                You can submit an account-deletion request using our publicly accessible Google Form. The form is accessible at any time without requiring you to sign in to the {config.firmName} app:
              </p>

              {/* Action Button */}
              <div className="pt-1">
                <a
                  id="btn-privacy-submit-deletion-form"
                  href={ACCOUNT_DELETION_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#081E23] hover:bg-[#0E333B] active:bg-[#06181C] text-white font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer text-xs shadow-xs"
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
                  • <strong>Email Confirmation:</strong> Once deletion is completed, {config.firmName} will send a confirmation email to the verified email address associated with your account.
                </p>
                <p>
                  • <strong>Additional Verification:</strong> If additional verification is necessary to protect your account security, processing may require additional time and you will be informed accordingly.
                </p>
                <p>
                  • <strong>Account Scope:</strong> This process concerns your {config.firmName} app account profile and associated Firebase authentication data. It does <em>not</em> automatically delete your Google Account.
                </p>
                <p>
                  • <strong>Statutory Record Retention:</strong> Client tax computation files, filed tax returns, and statutory records must be retained in accordance with mandatory retention periods prescribed under Indian tax laws (such as the Income Tax Act, 1961 and CGST Act, 2017).
                </p>
              </div>

              <div className="pt-2">
                <p className="text-[11px] text-[#7F9D97] leading-relaxed">
                  You may also email your request directly to our compliance officer at:
                </p>
                <div className="inline-flex items-center space-x-2 bg-white border border-[#E2DDD2] rounded-xl px-3 py-1.5 mt-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#20BA68]" />
                  <a
                    href={`mailto:${verifiedContactEmail}?subject=Account%20and%20Data%20Deletion%20Request`}
                    className="font-mono text-xs font-bold text-[#081E23] hover:text-[#23A87B]"
                  >
                    {verifiedContactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Contact Information */}
        <section className="space-y-3 pt-2 border-t border-[#E2DDD2]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center font-bold text-sm shrink-0">
              9
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
              Contact & Privacy Inquiries
            </h2>
          </div>
          <div className="pl-0 sm:pl-10 text-xs sm:text-sm text-[#4A5D58] leading-relaxed space-y-2">
            <p>
              If you have any questions, clarifications, or privacy concerns regarding this policy, please reach out directly:
            </p>
            <div className="bg-[#FAF8F5] border border-[#E2DDD2] rounded-2xl p-4 text-xs space-y-1.5 text-[#0F201C]">
              <div><strong>Practice:</strong> {config.firmName} Tax Consultant</div>
              <div>
                <strong>Inquiries & Grievances:</strong>{' '}
                <a href={`mailto:${verifiedContactEmail}`} className="font-mono text-[#23A87B] hover:underline">
                  {verifiedContactEmail}
                </a>
              </div>
              <div><strong>WhatsApp Assistance:</strong> +91 {config.whatsappNumber}</div>
              <div><strong>Working Hours:</strong> {config.workingHours}</div>
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  );
});

PrivacyPolicyPage.displayName = 'PrivacyPolicyPage';
