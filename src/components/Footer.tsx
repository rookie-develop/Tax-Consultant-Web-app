import React from 'react';
import { ShieldCheck, MessageCircle, LogIn, Mail, Radio, Cloud } from 'lucide-react';
import { AppConfig } from '../types';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  config: AppConfig;
  onOpenModal?: (feature: 'Login' | 'Cloud Access') => void;
  onOpenComplaint?: () => void;
  onOpenChannel?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenModal,
  onOpenComplaint,
  onOpenChannel,
}) => {
  const directWaUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    `Hello ${config.firmName} Tax Team, I have an inquiry regarding tax consultation and filing services.`
  );

  return (
    <footer className="mt-10 sm:mt-16 bg-[#081E23] text-[#88A9A2] border-t border-[#0F2D33] text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-[#0F2D33]">
          {/* Brand & Purpose */}
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-baseline space-x-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {config.firmName}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#20BA68] font-bold">
                Tax Compliance v1.0
              </span>
            </div>
            <p className="text-[#88A9A2] text-xs leading-relaxed">
              Professional Tax Consultant & Compliance Advisory services. Dedicated to fast, frictionless service selection and instant WhatsApp request dispatching.
            </p>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-2 sm:space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">
              Consultant Office & Hours
            </h4>
            <div className="space-y-1.5 text-xs text-[#C5DAD4]">
              <p>• {config.workingHours}</p>
              <p>• ARSCA Tax Advisory & Filing Division</p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span>Official WhatsApp:</span>
                <a
                  href={directWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#20BA68] hover:text-[#23A87B] font-mono font-bold inline-flex items-center gap-1.5 transition-colors touch-manipulation py-0.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-[#20BA68] shrink-0" />
                  <span>{config.displayPhone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Confidentiality Notice & Utilities */}
          <div className="space-y-2 sm:space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#20BA68] shrink-0" />
              <span>Strict Client Confidentiality</span>
            </h4>
            <p className="text-[#88A9A2] text-xs leading-relaxed">
              All financial documentation and tax filings handled by ARSCA are strictly confidential and protected under professional tax consultant standards.
            </p>

            {/* Quick Links */}
            <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-semibold text-[#88A9A2]">
              {onOpenModal && (
                <button
                  type="button"
                  onClick={() => onOpenModal('Login')}
                  className="hover:text-white transition-colors cursor-pointer inline-flex items-center space-x-1"
                >
                  <LogIn className="w-3 h-3 text-[#20BA68]" />
                  <span>Login</span>
                </button>
              )}
              {onOpenComplaint && (
                <button
                  type="button"
                  onClick={onOpenComplaint}
                  className="hover:text-white transition-colors cursor-pointer inline-flex items-center space-x-1"
                >
                  <Mail className="w-3 h-3 text-[#20BA68]" />
                  <span>Complaint</span>
                </button>
              )}
              {onOpenChannel && (
                <button
                  id="footer-nav-channel"
                  type="button"
                  onClick={onOpenChannel}
                  className="hover:text-white transition-colors cursor-pointer inline-flex items-center space-x-1"
                >
                  <Radio className="w-3 h-3 text-[#20BA68]" />
                  <span>Channel</span>
                </button>
              )}
              {onOpenModal && (
                <button
                  type="button"
                  onClick={() => onOpenModal('Cloud Access')}
                  className="hover:text-white transition-colors cursor-pointer inline-flex items-center space-x-1"
                >
                  <Cloud className="w-3 h-3 text-[#20BA68]" />
                  <span>Cloud Access</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] uppercase tracking-wider text-[#63847D] font-bold text-center sm:text-left">
          <p>© {new Date().getFullYear()} {config.firmName} Tax Consultants. All Rights Reserved.</p>
          <p>Official Number: {config.displayPhone}</p>
        </div>
      </div>
    </footer>
  );
};
