import React from 'react';
import { ShieldCheck, MessageCircle } from 'lucide-react';
import { AppConfig } from '../types';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  config: AppConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  const directWaUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    `Hello ${config.firmName} Tax Team, I have an inquiry regarding tax consultation and filing services.`
  );

  return (
    <footer className="mt-16 bg-slate-900 text-slate-400 border-t-2 border-emerald-500 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-800">
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black tracking-tighter text-white">
                {config.firmName}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
                Tax Compliance v1.0
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Professional Tax Consultant & Compliance Advisory services. Dedicated to fast, frictionless service selection and instant WhatsApp request dispatching.
            </p>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">
              Consultant Office & Hours
            </h4>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p>• {config.workingHours}</p>
              <p>• ARSCA Tax Advisory & Filing Division</p>
              <div className="flex items-center gap-2 pt-1">
                <span>Official WhatsApp:</span>
                <a
                  href={directWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-mono font-bold inline-flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>{config.displayPhone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Confidentiality Notice */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Strict Client Confidentiality</span>
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              All financial documentation and tax filings handled by ARSCA are strictly confidential and protected under professional tax consultant standards.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
          <p>© {new Date().getFullYear()} {config.firmName} Tax Consultants. All Rights Reserved.</p>
          <p>Official Number: {config.displayPhone}</p>
        </div>
      </div>
    </footer>
  );
};

