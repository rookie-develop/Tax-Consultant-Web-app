import React from 'react';
import { MessageCircle, Clock } from 'lucide-react';
import { AppConfig } from '../types';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface HeaderProps {
  config: AppConfig;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ config, onReset }) => {
  const directWaUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    `Hello ${config.firmName} Team, I would like to connect with a Tax Consultant regarding compliance services.`
  );

  return (
    <header className="bg-slate-900 text-white border-b-4 border-emerald-500 sticky top-0 z-30 shadow-md">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <button
          id="btn-brand-home"
          onClick={onReset}
          className="flex items-baseline space-x-1.5 sm:space-x-2 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg p-1 transition-all cursor-pointer select-none min-w-0"
          aria-label="ARSCA Tax Compliance Home"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter text-white group-hover:text-emerald-400 transition-colors">
            {config.firmName}
          </span>
          <span className="text-[9px] sm:text-xs uppercase tracking-widest text-slate-400 font-bold hidden min-[420px]:inline-block">
            Tax Compliance v1.0
          </span>
        </button>

        {/* Quick Contact & WhatsApp Action */}
        <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 text-xs sm:text-sm font-medium shrink-0">
          <button
            onClick={onReset}
            className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer hidden md:inline-flex items-center py-2 px-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            All Services
          </button>

          <div className="hidden lg:flex items-center space-x-1.5 text-slate-400 text-xs">
            <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{config.workingHours}</span>
          </div>

          <a
            id="btn-header-direct-whatsapp"
            href={directWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-900 font-black px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs uppercase tracking-wider transition-transform active:scale-95 shadow-sm min-h-[44px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
            aria-label="Direct WhatsApp Help"
          >
            <MessageCircle className="w-4 h-4 fill-slate-900 shrink-0" />
            <span className="font-black whitespace-nowrap">WhatsApp Help</span>
          </a>
        </div>
      </div>
    </header>
  );
};

