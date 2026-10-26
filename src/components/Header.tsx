import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  Clock,
  LogIn,
  Mail,
  Radio,
  Cloud,
  User,
  Bell,
  ShieldCheck,
  Shield,
  ShieldAlert,
  ChevronDown,
} from 'lucide-react';
import { AppConfig, ClientUser } from '../types';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface HeaderProps {
  config: AppConfig;
  onReset: () => void;
  onOpenModal: (feature: 'Login' | 'Cloud Access') => void;
  onOpenComplaint: () => void;
  onOpenChannels?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenDataSafety?: () => void;
  onOpenDeleteAccount?: () => void;
  clientUser?: ClientUser | null;
  onOpenLogin: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = React.memo(({
  config,
  onReset,
  onOpenModal,
  onOpenComplaint,
  onOpenChannels,
  onOpenPrivacyPolicy,
  onOpenDataSafety,
  onOpenDeleteAccount,
  clientUser,
  onOpenLogin,
  onLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPrivacyDropdownOpen, setIsPrivacyDropdownOpen] = useState(false);
  const privacyDropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop privacy dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        privacyDropdownRef.current &&
        !privacyDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPrivacyDropdownOpen(false);
      }
    };
    if (isPrivacyDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPrivacyDropdownOpen]);

  const directWaUrl = React.useMemo(
    () =>
      buildWhatsAppUrl(
        config.whatsappNumber,
        `Hello ${config.firmName} Team, I would like to connect with a Tax Consultant regarding compliance services.`
      ),
    [config.whatsappNumber, config.firmName]
  );

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

            {onOpenChannels && (
              <button
                id="header-nav-channels"
                type="button"
                onClick={onOpenChannels}
                className="text-white/80 hover:text-white transition-colors py-2 px-2.5 rounded-lg hover:bg-white/10 inline-flex items-center space-x-1.5 cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5 text-[#20BA68]" />
                <span>Channels</span>
              </button>
            )}

            <button
              id="header-nav-complaint"
              type="button"
              onClick={onOpenComplaint}
              className="text-white/80 hover:text-white transition-colors py-2 px-2.5 rounded-lg hover:bg-white/10 inline-flex items-center space-x-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-[#20BA68]" />
              <span>Complaint</span>
            </button>

            <button
              id="header-nav-cloud-access"
              type="button"
              onClick={() => onOpenModal('Cloud Access')}
              className="text-white/80 hover:text-white transition-colors py-2 px-2.5 rounded-lg hover:bg-white/10 inline-flex items-center space-x-1.5 cursor-pointer"
            >
              <Cloud className="w-3.5 h-3.5 text-[#20BA68]" />
              <span>Cloud Access</span>
            </button>

            {/* Desktop Privacy & Safety Dropdown */}
            {(onOpenPrivacyPolicy || onOpenDataSafety || onOpenDeleteAccount) && (
              <div className="relative" ref={privacyDropdownRef}>
                <button
                  id="header-nav-privacy-safety"
                  type="button"
                  onClick={() => setIsPrivacyDropdownOpen(!isPrivacyDropdownOpen)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setIsPrivacyDropdownOpen(false);
                  }}
                  className={`text-white/80 hover:text-white transition-colors py-2 px-2.5 rounded-lg hover:bg-white/10 inline-flex items-center space-x-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20BA68] ${
                    isPrivacyDropdownOpen ? 'bg-white/10 text-white' : ''
                  }`}
                  aria-expanded={isPrivacyDropdownOpen}
                  aria-haspopup="true"
                  aria-label="Privacy & Data Safety Menu"
                >
                  <Shield className="w-3.5 h-3.5 text-[#20BA68]" />
                  <span>Privacy & Safety</span>
                  <ChevronDown
                    className={`w-3 h-3 text-white/60 transition-transform duration-200 ${
                      isPrivacyDropdownOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isPrivacyDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-[#0A262D] border border-[#16444E] rounded-2xl shadow-2xl p-1.5 z-50 text-left space-y-1"
                    >
                      {onOpenPrivacyPolicy && (
                        <button
                          id="desktop-dropdown-privacy-policy"
                          type="button"
                          onClick={() => {
                            setIsPrivacyDropdownOpen(false);
                            onOpenPrivacyPolicy();
                          }}
                          className="w-full flex items-center space-x-2.5 p-2 rounded-xl hover:bg-white/10 text-white transition-colors text-xs font-semibold cursor-pointer text-left focus-visible:outline-none focus-visible:bg-white/15"
                        >
                          <div className="w-6 h-6 rounded-lg bg-[#20BA68]/15 flex items-center justify-center shrink-0">
                            <Shield className="w-3.5 h-3.5 text-[#20BA68]" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-white">Privacy Policy</span>
                            <span className="text-[10px] text-[#88A9A2] font-normal leading-tight">
                              Client data confidentiality & handling
                            </span>
                          </div>
                        </button>
                      )}

                      {onOpenDataSafety && (
                        <button
                          id="desktop-dropdown-data-safety"
                          type="button"
                          onClick={() => {
                            setIsPrivacyDropdownOpen(false);
                            onOpenDataSafety();
                          }}
                          className="w-full flex items-center space-x-2.5 p-2 rounded-xl hover:bg-white/10 text-white transition-colors text-xs font-semibold cursor-pointer text-left focus-visible:outline-none focus-visible:bg-white/15"
                        >
                          <div className="w-6 h-6 rounded-lg bg-[#20BA68]/15 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#20BA68]" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-white">Data Privacy / Safety</span>
                            <span className="text-[10px] text-[#88A9A2] font-normal leading-tight">
                              Collection, storage & encryption practices
                            </span>
                          </div>
                        </button>
                      )}

                      {onOpenDeleteAccount && (
                        <button
                          id="desktop-dropdown-delete-account"
                          type="button"
                          onClick={() => {
                            setIsPrivacyDropdownOpen(false);
                            onOpenDeleteAccount();
                          }}
                          className="w-full flex items-center space-x-2.5 p-2 rounded-xl hover:bg-white/10 text-white transition-colors text-xs font-semibold cursor-pointer text-left border-t border-[#16444E] pt-2 focus-visible:outline-none focus-visible:bg-white/15"
                        >
                          <div className="w-6 h-6 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
                            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-white">Request Account Deletion</span>
                            <span className="text-[10px] text-[#88A9A2] font-normal leading-tight">
                              Official Google Form submission (24–48h)
                            </span>
                          </div>
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

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
            className="hidden sm:inline-flex bg-[#20BA68] hover:bg-[#1DA85E] active:bg-[#189452] text-[#081E23] font-black px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs uppercase tracking-wider transition-transform active:scale-95 shadow-sm min-h-[42px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
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
            <div className="px-4 py-3.5 space-y-3 text-xs font-semibold">
              {clientUser && (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 text-white min-h-[42px]">
                  <div className="flex items-center space-x-2 min-w-0">
                    {clientUser.photoURL ? (
                      <img
                        src={clientUser.photoURL}
                        alt={clientUser.displayName || 'Client'}
                        referrerPolicy="no-referrer"
                        className="w-4 h-4 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <User className="w-4 h-4 text-[#20BA68] shrink-0" />
                    )}
                    <span className="font-bold text-[#20BA68] text-xs truncate">
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
                      className="text-[10px] font-black uppercase text-white/70 hover:text-white px-2 py-1 rounded bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
                    >
                      Logout
                    </button>
                  )}
                </div>
              )}

              {/* Complaint Menu Item */}
              <button
                id="menu-item-complaint"
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenComplaint();
                }}
                className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-white transition-colors cursor-pointer text-left w-full"
              >
                <Mail className="w-4 h-4 text-[#20BA68] shrink-0" />
                <span className="font-semibold text-xs text-white">Complaint</span>
              </button>

              {/* Privacy Policy Menu Item */}
              {onOpenPrivacyPolicy && (
                <button
                  id="menu-item-privacy-policy"
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenPrivacyPolicy();
                  }}
                  className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-white transition-colors cursor-pointer text-left w-full"
                >
                  <Shield className="w-4 h-4 text-[#20BA68] shrink-0" />
                  <span className="font-semibold text-xs text-white">Privacy Policy</span>
                </button>
              )}

              {/* Data Safety Menu Item */}
              {onOpenDataSafety && (
                <button
                  id="menu-item-data-safety"
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenDataSafety();
                  }}
                  className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-white transition-colors cursor-pointer text-left w-full"
                >
                  <ShieldCheck className="w-4 h-4 text-[#20BA68] shrink-0" />
                  <span className="font-semibold text-xs text-white">Data Safety</span>
                </button>
              )}

              {/* Account Deletion Menu Item */}
              {onOpenDeleteAccount && (
                <button
                  id="menu-item-delete-account"
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenDeleteAccount();
                  }}
                  className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-white transition-colors cursor-pointer text-left w-full"
                >
                  <ShieldAlert className="w-4 h-4 text-[#20BA68] shrink-0" />
                  <span className="font-semibold text-xs text-white">Request Deletion</span>
                </button>
              )}

              <div className="flex items-center justify-between pt-1 border-t border-[#0F2D33] text-[11px] text-[#88A9A2]">
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
});

Header.displayName = 'Header';
