import React, { useState } from 'react';
import { MessageCircle, Clock, LogIn, Mail, Radio, Cloud, Menu, X } from 'lucide-react';
import { AppConfig } from '../types';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface HeaderProps {
  config: AppConfig;
  onReset: () => void;
  onOpenModal: (feature: 'Login' | 'Cloud Access') => void;
  onOpenComplaint: () => void;
  onOpenChannel: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onReset,
  onOpenModal,
  onOpenComplaint,
  onOpenChannel,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const directWaUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    `Hello ${config.firmName} Team, I would like to connect with a Tax Consultant regarding compliance services.`
  );

  const handleOpenFeatureModal = (feature: 'Login' | 'Cloud Access') => {
    setIsMobileMenuOpen(false);
    onOpenModal(feature);
  };

  const handleOpenComplaint = () => {
    setIsMobileMenuOpen(false);
    onOpenComplaint();
  };

  const handleOpenChannel = () => {
    setIsMobileMenuOpen(false);
    onOpenChannel();
  };

  return (
    <header className="bg-[#081E23] text-white border-b border-[#0F2D33] sticky top-0 z-30 shadow-md">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <button
          id="btn-brand-home"
          onClick={() => {
            setIsMobileMenuOpen(false);
            onReset();
          }}
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

        {/* Right Navigation & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 text-xs sm:text-sm font-medium shrink-0">
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-semibold text-xs">
            <button
              type="button"
              onClick={onReset}
              className="text-white/80 hover:text-white transition-colors cursor-pointer py-2 px-2.5 rounded-lg hover:bg-white/10"
            >
              Services
            </button>

            <button
              id="header-nav-channel"
              type="button"
              onClick={handleOpenChannel}
              className="text-white/80 hover:text-white transition-colors py-2 px-2.5 rounded-lg hover:bg-white/10 inline-flex items-center space-x-1.5 cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-[#20BA68]" />
              <span>Channel</span>
            </button>

            <button
              id="header-nav-complaint"
              type="button"
              onClick={handleOpenComplaint}
              className="text-white/80 hover:text-white transition-colors py-2 px-2.5 rounded-lg hover:bg-white/10 inline-flex items-center space-x-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-[#20BA68]" />
              <span>Complaint</span>
            </button>

            <button
              id="header-nav-cloud-access"
              type="button"
              onClick={() => handleOpenFeatureModal('Cloud Access')}
              className="text-white/80 hover:text-white transition-colors py-2 px-2.5 rounded-lg hover:bg-white/10 inline-flex items-center space-x-1.5 cursor-pointer"
            >
              <Cloud className="w-3.5 h-3.5 text-[#20BA68]" />
              <span>Cloud Access</span>
            </button>

            <button
              id="header-nav-login"
              type="button"
              onClick={() => handleOpenFeatureModal('Login')}
              className="text-white/80 hover:text-white transition-colors py-2 px-2.5 rounded-lg hover:bg-white/10 inline-flex items-center space-x-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-[#20BA68]" />
              <span>Login</span>
            </button>
          </nav>

          {/* Direct WhatsApp Button */}
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

          {/* Mobile Menu Toggle Button */}
          <button
            id="btn-mobile-nav-toggle"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer min-h-[42px] min-w-[42px] flex items-center justify-center touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23A87B]"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0A262D] border-t border-[#0F2D33] px-4 py-3.5 space-y-2 text-xs font-semibold animate-in fade-in duration-150">
          <div className="grid grid-cols-2 gap-2">
            <button
              id="mobile-nav-login"
              type="button"
              onClick={() => handleOpenFeatureModal('Login')}
              className="flex items-center space-x-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer text-left"
            >
              <LogIn className="w-4 h-4 text-[#20BA68]" />
              <span>Login</span>
            </button>

            <button
              id="mobile-nav-cloud-access"
              type="button"
              onClick={() => handleOpenFeatureModal('Cloud Access')}
              className="flex items-center space-x-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer text-left"
            >
              <Cloud className="w-4 h-4 text-[#20BA68]" />
              <span>Cloud Access</span>
            </button>

            <button
              id="mobile-nav-channel"
              type="button"
              onClick={handleOpenChannel}
              className="flex items-center space-x-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer text-left"
            >
              <Radio className="w-4 h-4 text-[#20BA68]" />
              <span>Channel</span>
            </button>

            <button
              id="mobile-nav-complaint"
              type="button"
              onClick={handleOpenComplaint}
              className="flex items-center space-x-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer text-left"
            >
              <Mail className="w-4 h-4 text-[#20BA68]" />
              <span>Complaint</span>
            </button>
          </div>

          <div className="pt-2 border-t border-[#0F2D33] flex items-center justify-between text-[11px] text-[#88A9A2]">
            <span className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-[#20BA68]" />
              <span>{config.workingHours}</span>
            </span>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onReset();
              }}
              className="text-[#20BA68] hover:underline font-bold"
            >
              All Services
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
