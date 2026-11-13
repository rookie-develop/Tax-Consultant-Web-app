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
          <span>Privacy & Confidentiality</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#A0B7B2] font-medium leading-relaxed max-w-2xl">
          At <strong className="text-white">{config.firmName} Tax Consultant</strong>, we value your trust and are committed to protecting your personal and financial information across all tax, accounting, and compliance services.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-[#7F9D97] border-t border-[#0F2D33]/60">
          <span>Effective Date: <strong>October 2026</strong></span>
          <span>•</span>
          <span>Last Updated: <strong>October 26, 2026</strong></span>
          <span>•</span>
          <span>Applies to: <strong>ARSCA Website &amp; Android App</strong></span>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] p-6 sm:p-10 shadow-sm space-y-8 sm:space-y-10 text-[#0F201C]">
        
        {/* Section 1: Overview */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center font-bold text-sm shrink-0">
              1
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
              Overview
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4A5D58] leading-relaxed pl-10 sm:pl-10.5">
            This Privacy Policy explains how <strong>{config.firmName} Tax Consultant</strong> (referred to as &ldquo;ARSCA&rdquo; throughout this policy) collects, uses, and protects your information when you use our website or Android application. Our platform allows visitors and clients to browse tax and compliance services, send service inquiries via WhatsApp, access assigned client folders in Google Drive, and contact our team.
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
              You can browse our service categories without signing in. We collect information only when you choose to sign in, send an inquiry, or access client features:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              <div className="bg-[#FAF8F5] border border-[#E2DDD2] rounded-2xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-[#081E23] font-bold text-xs sm:text-sm">
                  <UserCheck className="w-4 h-4 text-[#20BA68]" />
                  <span>Google Sign-In Information</span>
                </div>
                <p className="text-[12px] text-[#5C6E6A] leading-relaxed">
                  If you sign in with Google, Firebase Authentication provides your name, verified email address, profile photo URL, and a unique user ID so we can recognize your account.
                </p>
              </div>

              <div className="bg-[#FAF8F5] border border-[#E2DDD2] rounded-2xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-[#081E23] font-bold text-xs sm:text-sm">
                  <FolderLock className="w-4 h-4 text-[#20BA68]" />
                  <span>Client Document Access Details</span>
                </div>
                <p className="text-[12px] text-[#5C6E6A] leading-relaxed">
                  For clients with Cloud Access enabled, we maintain a record in Cloud Firestore that links your signed-in user ID to your assigned Google Drive folder.
                </p>
              </div>

              <div className="bg-[#FAF8F5] border border-[#E2DDD2] rounded-2xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-[#081E23] font-bold text-xs sm:text-sm">
                  <FileText className="w-4 h-4 text-[#20BA68]" />
                  <span>Service Requests &amp; Complaints</span>
                </div>
                <p className="text-[12px] text-[#5C6E6A] leading-relaxed">
                  When you send a service request through WhatsApp or email our support address regarding a complaint or question, we receive the contact details and information you choose to share.
                </p>
              </div>

              <div className="bg-[#FAF8F5] border border-[#E2DDD2] rounded-2xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-[#081E23] font-bold text-xs sm:text-sm">
                  <Lock className="w-4 h-4 text-[#20BA68]" />
                  <span>Information We Do Not Collect</span>
                </div>
                <p className="text-[12px] text-[#5C6E6A] leading-relaxed">
                  We do not collect your device location, contacts, biometric data, sensor data, advertising identifiers, or push notification tokens, and we do not use third-party advertising trackers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Tax Documents & Google Drive Access */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center font-bold text-sm shrink-0">
              3
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
              Tax Documents &amp; Google Drive Access
            </h2>
          </div>
          <div className="pl-0 sm:pl-10 space-y-3 text-xs sm:text-sm text-[#4A5D58] leading-relaxed">
            <p>
              Client tax returns, computation sheets, and compliance records are organized and stored in <strong>Google Drive</strong> folders managed by {config.firmName} Tax Consultant.
            </p>
            <div className="bg-[#F4F0E8] border border-[#E2DDD2] rounded-2xl p-4 space-y-2 text-[12px] text-[#0F201C]">
              <div className="flex items-center space-x-2 font-bold text-[#081E23]">
                <Database className="w-4 h-4 text-[#20BA68]" />
                <span>Documents Are Not Stored on This Website</span>
              </div>
              <p className="text-[#5C6E6A]">
                The ARSCA website and app do not upload or store your tax files directly. When you select &ldquo;Cloud Access&rdquo;, you are redirected to your assigned folder on Google Drive, where access depends on your authorized Google account permissions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: How We Use Your Information */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center font-bold text-sm shrink-0">
              4
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
              How We Use Your Information
            </h2>
          </div>
          <div className="pl-0 sm:pl-10 text-xs sm:text-sm text-[#4A5D58] leading-relaxed space-y-2">
            <p>We use the information we collect only to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#0F201C]">
              <li>Sign you in and verify your eligibility for Cloud Access.</li>
              <li>Connect your account to your assigned Google Drive document folder.</li>
              <li>Respond to tax consulting, GST, audit, or compliance requests you initiate.</li>
              <li>Review and resolve client complaints or support inquiries sent to our team.</li>
              <li>Meet legal and recordkeeping obligations under applicable Indian tax and accounting laws.</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Information Sharing & Third-Party Services */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center font-bold text-sm shrink-0">
              5
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
              Information Sharing &amp; Third-Party Services
            </h2>
          </div>
          <div className="pl-0 sm:pl-10 text-xs sm:text-sm text-[#4A5D58] leading-relaxed space-y-2">
            <p>
              <strong>We do not sell, rent, or trade your personal or financial information.</strong>
            </p>
            <p>
              We do not share your information with advertisers, data brokers, or marketing companies. Your data is processed only through the technical services needed to run the platform—Google (Firebase Authentication, Cloud Firestore, and Google Drive) and Vercel (website hosting)—or when required by law. When you choose to send a service inquiry, the app opens WhatsApp so you can review and send your message directly.
            </p>
          </div>
        </section>

        {/* Section 6: How We Protect Your Information */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center font-bold text-sm shrink-0">
              6
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
              How We Protect Your Information
            </h2>
          </div>
          <div className="pl-0 sm:pl-10 text-xs sm:text-sm text-[#4A5D58] leading-relaxed space-y-2">
            <p>
              We apply standard technical safeguards to help protect your account information:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#0F201C]">
              <li><strong>Encrypted Connections:</strong> Data sent between your browser or device and our services is encrypted in transit using HTTPS / Transport Layer Security (TLS).</li>
              <li><strong>Database Access Controls:</strong> Client mapping records in Cloud Firestore are protected by access rules intended to restrict access to authorized users.</li>
              <li><strong>Document Permissions:</strong> Google Drive folders are protected by Google account authentication and folder-level sharing permissions.</li>
            </ul>
          </div>
        </section>

        {/* Section 7: Data Retention */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center font-bold text-sm shrink-0">
              7
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
              How Long We Keep Information
            </h2>
          </div>
          <div className="pl-0 sm:pl-10 text-xs sm:text-sm text-[#4A5D58] leading-relaxed space-y-2">
            <p>
              App account mapping records are kept while you remain an active client of <strong>{config.firmName} Tax Consultant</strong> or until you request account deletion. Tax returns, financial statements, and compliance documents may be retained longer where required under Indian statutory laws (such as the Income Tax Act, 1961 and the CGST Act, 2017) and applicable professional regulations.
            </p>
          </div>
        </section>

        {/* Section 8: Your Rights & Account Deletion */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#20BA68]/10 text-[#20BA68] flex items-center justify-center font-bold text-sm shrink-0">
              8
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#081E23] tracking-tight">
              Your Rights &amp; Account Deletion
            </h2>
          </div>
          <div className="pl-0 sm:pl-10 text-xs sm:text-sm text-[#4A5D58] leading-relaxed space-y-3">
            <p>
              You may ask to review, update, or delete your {config.firmName} app account profile and linked app data at any time.
            </p>
            <div className="bg-[#FAF8F5] border border-[#E2DDD2] rounded-2xl p-5 sm:p-6 space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-[#081E23]">
                How to Request Account Deletion
              </h3>
              <p className="text-xs text-[#5C6E6A] leading-relaxed">
                You can submit a deletion request using our public Google Form below. You do not need to sign in to the {config.firmName} app to submit this form:
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
                  • <strong>Processing Time:</strong> After receiving and verifying a valid request, {config.firmName} aims to complete account deletion within <strong>24–48 hours</strong>.
                </p>
                <p>
                  • <strong>Email Confirmation:</strong> Once completed, we send a confirmation email to the verified email address associated with your account.
                </p>
                <p>
                  • <strong>Identity Verification:</strong> If additional verification is needed to confirm your identity and protect your account, processing may take longer and we will notify you.
                </p>
                <p>
                  • <strong>What Is Deleted:</strong> This removes your {config.firmName} app account profile and Firebase sign-in mapping. It does <em>not</em> delete your personal Google Account.
                </p>
                <p>
                  • <strong>Records Retained by Law:</strong> Client tax computation files, filed returns, and statutory business records must be retained where required under Indian tax laws (such as the Income Tax Act, 1961 and CGST Act, 2017) and professional regulations.
                </p>
              </div>

              <div className="pt-2">
                <p className="text-[11px] text-[#7F9D97] leading-relaxed">
                  You may also send your deletion request by email to:
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
              Contact Us
            </h2>
          </div>
          <div className="pl-0 sm:pl-10 text-xs sm:text-sm text-[#4A5D58] leading-relaxed space-y-2">
            <p>
              If you have questions about this Privacy Policy or how your information is handled, please contact us:
            </p>
            <div className="bg-[#FAF8F5] border border-[#E2DDD2] rounded-2xl p-4 text-xs space-y-1.5 text-[#0F201C]">
              <div><strong>Practice:</strong> {config.firmName} Tax Consultant</div>
              <div>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${verifiedContactEmail}`} className="font-mono text-[#23A87B] hover:underline">
                  {verifiedContactEmail}
                </a>
              </div>
              <div><strong>WhatsApp:</strong> {config.displayPhone}</div>
              <div><strong>Working Hours:</strong> {config.workingHours}</div>
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  );
});

PrivacyPolicyPage.displayName = 'PrivacyPolicyPage';
