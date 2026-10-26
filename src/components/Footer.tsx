import React from 'react';
import {
  ShieldCheck,
  Shield,
  ShieldAlert,
  MessageCircle,
  LogIn,
  Mail,
  Radio,
  Cloud,
  User,
  ChevronRight,
} from 'lucide-react';
import { AppConfig, ClientUser } from '../types';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  config: AppConfig;
  onOpenModal?: (feature: 'Login' | 'Cloud Access') => void;
  onOpenComplaint?: () => void;
  onOpenChannels?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenDataSafety?: () => void;
  onOpenDeleteAccount?: () => void;
  clientUser?: ClientUser | null;
  onOpenLogin?: () => void;
  onReset?: () => void;
}

export const Footer: React.FC<FooterProps> = React.memo(({
  config,
  onOpenModal,
  onOpenComplaint,
  onOpenChannels,
  onOpenPrivacyPolicy,
  onOpenDataSafety,
  onOpenDeleteAccount,
  clientUser,
  onOpenLogin,
  onReset,
}) => {
  const directWaUrl = React.useMemo(
    () =>
      buildWhatsAppUrl(
        config.whatsappNumber,
        `Hello ${config.firmName} Tax Team, I have an inquiry regarding tax consultation and filing services.`
      ),
    [config.whatsappNumber, config.firmName]
  );

  return (
    <footer
      id="app-footer"
      className="mt-12 sm:mt-16 bg-[#081E23] text-[#88A9A2] border-t border-[#0F2D33] text-xs pb-28 lg:pb-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 pb-8 border-b border-[#0F2D33]">
          {/* Column 1: Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-baseline space-x-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {config.firmName}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#20BA68] font-bold">
                Tax Advisory
              </span>
            </div>
            <p className="text-[#88A9A2] text-xs leading-relaxed">
              Professional Tax Consultant & Compliance Advisory. Dedicated to fast, frictionless service selection and instant WhatsApp request dispatching.
            </p>
            <div className="pt-1 text-[11px] text-[#5C7872]">
              <p>Registered Division: Tax Filings & Regulatory Compliance</p>
            </div>
          </div>

          {/* Column 2: Consultant Office & Hours */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">
              Consultant Office & Hours
            </h4>
            <div className="space-y-2 text-xs text-[#C5DAD4]">
              <p className="text-[#88A9A2]">• {config.workingHours}</p>
              <p className="text-[#88A9A2]">• ARSCA Tax Advisory & Filing Division</p>
              <div className="pt-2">
                <span className="text-[11px] text-[#88A9A2] block mb-1">Official WhatsApp Assistance:</span>
                <a
                  href={directWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#20BA68] hover:text-[#23A87B] font-mono font-bold inline-flex items-center gap-1.5 transition-colors touch-manipulation py-1 px-2.5 rounded-lg bg-white/5 hover:bg-white/10"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-[#20BA68] shrink-0" />
                  <span>{config.displayPhone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">
              Quick Navigation
            </h4>
            <div className="flex flex-col space-y-2 text-xs font-medium">
              {onReset && (
                <button
                  type="button"
                  onClick={onReset}
                  className="hover:text-white transition-colors cursor-pointer inline-flex items-center space-x-1.5 text-left text-[#88A9A2]"
                >
                  <ChevronRight className="w-3 h-3 text-[#20BA68]" />
                  <span>All Tax Services</span>
                </button>
              )}
              {onOpenChannels && (
                <button
                  id="footer-nav-channels"
                  type="button"
                  onClick={onOpenChannels}
                  className="hover:text-white transition-colors cursor-pointer inline-flex items-center space-x-1.5 text-left text-[#88A9A2]"
                >
                  <Radio className="w-3 h-3 text-[#20BA68]" />
                  <span>Tax Channels & Updates</span>
                </button>
              )}
              {onOpenComplaint && (
                <button
                  id="footer-nav-complaint"
                  type="button"
                  onClick={onOpenComplaint}
                  className="hover:text-white transition-colors cursor-pointer inline-flex items-center space-x-1.5 text-left text-[#88A9A2]"
                >
                  <Mail className="w-3 h-3 text-[#20BA68]" />
                  <span>Grievance & Complaints</span>
                </button>
              )}
              {onOpenModal && (
                <button
                  type="button"
                  onClick={() => onOpenModal('Cloud Access')}
                  className="hover:text-white transition-colors cursor-pointer inline-flex items-center space-x-1.5 text-left text-[#88A9A2]"
                >
                  <Cloud className="w-3 h-3 text-[#20BA68]" />
                  <span>Cloud Folder Access</span>
                </button>
              )}
              {clientUser ? (
                <div className="pt-1 text-[#20BA68] font-bold inline-flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-[#20BA68]" />
                  <span className="truncate">Hi, {clientUser.displayName || clientUser.email?.split('@')[0] || 'Client'}</span>
                </div>
              ) : onOpenLogin ? (
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="hover:text-white transition-colors cursor-pointer inline-flex items-center space-x-1.5 text-left text-[#88A9A2]"
                >
                  <LogIn className="w-3 h-3 text-[#20BA68]" />
                  <span>Client Login</span>
                </button>
              ) : null}
            </div>
          </div>

          {/* Column 4: Data Privacy, Safety & Legal */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#20BA68] shrink-0" />
              <span>Data Privacy & Safety</span>
            </h4>
            <p className="text-[#88A9A2] text-xs leading-relaxed">
              All financial documentation and tax filings handled by ARSCA are strictly confidential and protected under professional tax consultant standards.
            </p>

            <div className="pt-2 flex flex-col space-y-2.5 font-semibold text-xs">
              {onOpenPrivacyPolicy && (
                <button
                  id="footer-link-privacy-policy"
                  type="button"
                  onClick={onOpenPrivacyPolicy}
                  className="w-full inline-flex items-center space-x-2 text-[#C5DAD4] hover:text-white hover:bg-white/5 py-1.5 px-2 rounded-lg transition-colors cursor-pointer text-left"
                >
                  <Shield className="w-3.5 h-3.5 text-[#20BA68] shrink-0" />
                  <span>Privacy Policy</span>
                </button>
              )}

              {onOpenDataSafety && (
                <button
                  id="footer-link-data-safety"
                  type="button"
                  onClick={onOpenDataSafety}
                  className="w-full inline-flex items-center space-x-2 text-[#C5DAD4] hover:text-white hover:bg-white/5 py-1.5 px-2 rounded-lg transition-colors cursor-pointer text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#20BA68] shrink-0" />
                  <span>Data Privacy / Safety</span>
                </button>
              )}

              {onOpenDeleteAccount && (
                <button
                  id="footer-link-delete-account"
                  type="button"
                  onClick={onOpenDeleteAccount}
                  className="w-full inline-flex items-center space-x-2 text-amber-300 hover:text-amber-200 hover:bg-white/5 py-1.5 px-2 rounded-lg transition-colors cursor-pointer text-left"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Request Account Deletion</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright & Direct Privacy Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-center md:text-left">
          <div className="text-[11px] text-[#63847D]">
            <p>© {new Date().getFullYear()} {config.firmName} Tax Consultants. All Rights Reserved.</p>
            <p className="mt-0.5">Official Number: {config.displayPhone}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[#88A9A2]">
            {onOpenPrivacyPolicy && (
              <button
                id="footer-bottom-privacy"
                type="button"
                onClick={onOpenPrivacyPolicy}
                className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline"
              >
                Privacy Policy
              </button>
            )}
            <span className="text-[#0F353C] hidden sm:inline">•</span>
            {onOpenDataSafety && (
              <button
                id="footer-bottom-data-safety"
                type="button"
                onClick={onOpenDataSafety}
                className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline"
              >
                Data Safety
              </button>
            )}
            <span className="text-[#0F353C] hidden sm:inline">•</span>
            {onOpenDeleteAccount && (
              <button
                id="footer-bottom-delete-account"
                type="button"
                onClick={onOpenDeleteAccount}
                className="text-amber-300 hover:text-amber-200 transition-colors cursor-pointer underline-offset-4 hover:underline"
              >
                Request Account Deletion
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
