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
    <header className="bg-[#081E23] text-white border-b border-[#0F2D33] sticky top-0 z-30 shadow-md">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <button
          id="btn-brand-home"
          onClick={onReset}
          className="flex items-baseline space-x-2 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23A87B] rounded-lg p-1 transition-all cursor-pointer select-none min-w-0"
          aria-label="ARSCA Tax Compliance Home"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white group-hover:text-[#23A87B] transition-colors">
            {config.firmName}
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#7F9D97] font-semibold hidden min-[390px]:inline-block">
            Tax Compliance v1.0
          </span>
        </button>

        {/* Quick Contact & WhatsApp Action */}
        <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 text-xs sm:text-sm font-medium shrink-0">
          <button
            onClick={onReset}
            className="text-white/80 hover:text-white font-bold transition-colors cursor-pointer hidden md:inline-flex items-center py-2 px-2.5 rounded-lg hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23A87B]"
          >
            All Services
          </button>

          <div className="hidden lg:flex items-center space-x-1.5 text-[#88A9A2] text-xs">
            <Clock className="w-3.5 h-3.5 text-[#23A87B] shrink-0" />
            <span>{config.workingHours}</span>
          </div>

          <a
            id="btn-header-direct-whatsapp"
            href={directWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#20BA68] hover:bg-[#1DA85E] active:bg-[#189452] text-[#081E23] font-black px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs uppercase tracking-wider transition-transform active:scale-95 shadow-sm min-h-[42px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
            aria-label="Direct WhatsApp Help"
          >
            <MessageCircle className="w-4 h-4 fill-[#081E23] text-[#081E23] shrink-0" />
            <span className="font-extrabold whitespace-nowrap">WhatsApp Help</span>
          </a>
        </div>
      </div>
    </header>
  );
};

