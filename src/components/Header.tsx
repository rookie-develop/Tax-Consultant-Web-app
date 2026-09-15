import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Clock, LogIn, Mail, Radio, Cloud, User } from 'lucide-react';
import { AppConfig, ClientUser } from '../types';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface HeaderProps {
  config: AppConfig;
  onReset: () => void;
  onOpenModal: (feature: 'Login' | 'Cloud Access') => void;
  onOpenComplaint: () => void;
  onOpenChannel: () => void;
  clientUser?: ClientUser | null;
  onOpenLogin: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onReset,
  onOpenModal,
  onOpenComplaint,
  onOpenChannel,
  clientUser,
  onOpenLogin,
  onLogout,
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

            {clientUser ? (
              <div className="flex items-center space-x-2 py-1 px-2.5 rounded-lg bg-white/10 text-white text-xs">
                {clientUser.photoURL ? (
                  <img
                    src={clientUser.photoURL}
                    alt={clientUser.displayName || 'Client'}
                    referrerPolicy="no-referrer"
                    className="w-4 h-4 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <User className="w-3.5 h-3.5 text-[#20BA68]" />
                )}
                <span className="font-bold text-[#20BA68]">
                  Hi, {clientUser.displayName || clientUser.email?.split('@')[0] || 'Client'}
                </span>
                {onLogout && (
                  <button
                    id="header-nav-logout"
                    type="button"
                    onClick={onLogout}
                    className="text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors cursor-pointer pl-1.5 border-l border-white/20"
                    title="Logout"
                  >
                    Logout
                  </button>
                )}
              </div>
            ) : (
              <button
                id="header-nav-login"
                type="button"
                onClick={onOpenLogin}
                className="text-white/80 hover:text-white transition-colors py-2 px-2.5 rounded-lg hover:bg-white/10 inline-flex items-center space-x-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#20BA68]" />
                <span>Login</span>
              </button>
            )}
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
            className="lg:hidden p-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors cursor-pointer min-h-[42px] min-w-[42px] flex items-center justify-center touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23A87B]"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-5 h-4 relative flex flex-col justify-between items-center" aria-hidden="true">
              <span
                className={`w-5 h-[2px] bg-white rounded-full transition-all duration-300 ease-in-out origin-center ${
                  isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : 'translate-y-0 rotate-0'
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-white rounded-full transition-all duration-200 ease-in-out ${
                  isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-white rounded-full transition-all duration-300 ease-in-out origin-center ${
                  isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : 'translate-y-0 rotate-0'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence initial={false}>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-nav-dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.28, ease: [0.32, 0.72, 0, 1] },
              opacity: { duration: 0.2, ease: 'easeInOut' },
            }}
            className="lg:hidden overflow-hidden bg-[#0A262D] border-t border-[#0F2D33]"
          >
            <div className="px-4 py-3.5 space-y-2 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-2">
                {clientUser ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 text-white min-h-[42px]">
                    <div className="flex items-center space-x-1.5 min-w-0">
                      {clientUser.photoURL ? (
                        <img
                          src={clientUser.photoURL}
                          alt={clientUser.displayName || 'Client'}
                          referrerPolicy="no-referrer"
                          className="w-3.5 h-3.5 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <User className="w-3.5 h-3.5 text-[#20BA68] shrink-0" />
                      )}
                      <span className="font-bold text-[#20BA68] text-[11px] truncate">
                        Hi, {clientUser.displayName || clientUser.email?.split('@')[0] || 'Client'}
                      </span>
                    </div>
                    {onLogout && (
                      <button
                        id="mobile-nav-logout"
                        type="button"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onLogout();
                        }}
                        className="text-[10px] font-black uppercase text-white/70 hover:text-white px-1.5 py-0.5 rounded bg-white/10 transition-colors cursor-pointer shrink-0 ml-1"
                      >
                        Logout
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    id="mobile-nav-login"
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenLogin();
                    }}
                    className="flex items-center space-x-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer text-left min-h-[42px]"
                  >
                    <LogIn className="w-4 h-4 text-[#20BA68]" />
                    <span>Login</span>
                  </button>
                )}

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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
