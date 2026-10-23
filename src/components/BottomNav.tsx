import React from 'react';
import { motion } from 'motion/react';
import { Home, Users, Cloud, Radio, User } from 'lucide-react';
import { ClientUser } from '../types';

export type BottomNavTab = 'home' | 'community' | 'cloud' | 'channels' | 'login' | 'requests' | 'complaint';

interface BottomNavProps {
  activeTab: BottomNavTab;
  onSelectHome: () => void;
  onSelectCommunity: () => void;
  onSelectCloudAccess: () => void;
  onSelectChannels: () => void;
  onSelectLogin: () => void;
  onSelectComplaint?: () => void;
  onSelectRequests?: () => void;
  clientUser?: ClientUser | null;
}

export const BottomNav: React.FC<BottomNavProps> = React.memo(({
  activeTab,
  onSelectHome,
  onSelectCommunity,
  onSelectCloudAccess,
  onSelectChannels,
  onSelectLogin,
  clientUser,
}) => {
  // Determine if Cloud Access should display its green circular background:
  // In idle/default state on Home: Cloud Access retains its distinctive raised green circle.
  // When Cloud Access is selected: Cloud Access has its active raised green circle.
  // When another tab (community, channels, login) is active: Cloud Access clears its green
  // highlight to avoid two competing green selection circles.
  const isCloudGreen = activeTab === 'home' || activeTab === 'cloud';
  const isCloudSelected = activeTab === 'cloud';

  return (
    <nav
      id="bottom-navigation-bar"
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#081E23] border-t border-[#0F2D33] shadow-[0_-4px_24px_rgba(0,0,0,0.3)] pb-[max(0.35rem,env(safe-area-inset-bottom))]"
    >
      <div className="max-w-md sm:max-w-xl md:max-w-2xl mx-auto px-2 sm:px-4 h-16 sm:h-18 flex items-end justify-between relative">
        {/* 1. HOME */}
        <button
          id="btn-bottom-nav-home"
          type="button"
          onClick={onSelectHome}
          className="flex-1 flex flex-col items-center justify-center pb-1.5 pt-1 group cursor-pointer touch-manipulation min-w-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20BA68] rounded-xl"
          aria-label="Home"
          aria-current={activeTab === 'home' ? 'page' : undefined}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Note: No second green circle on Home in idle state to prevent duplicate green circles with Cloud Access */}
            <Home
              className={`w-5 h-5 relative z-10 transition-colors ${
                activeTab === 'home'
                  ? 'text-[#20BA68] stroke-[2.4]'
                  : 'text-[#88A9A2] group-hover:text-white stroke-[2]'
              }`}
            />
          </div>
          <span
            className={`text-[10px] sm:text-[11px] tracking-tight mt-0.5 leading-none transition-colors ${
              activeTab === 'home'
                ? 'font-bold text-[#20BA68]'
                : 'font-medium text-[#88A9A2] group-hover:text-white'
            }`}
          >
            Home
          </span>
        </button>

        {/* 2. COMMUNITY */}
        <button
          id="btn-bottom-nav-community"
          type="button"
          onClick={onSelectCommunity}
          className="flex-1 flex flex-col items-center justify-center pb-1.5 pt-1 group cursor-pointer touch-manipulation min-w-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20BA68] rounded-xl"
          aria-label="Community"
          aria-current={activeTab === 'community' ? 'page' : undefined}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            {activeTab === 'community' && (
              <motion.div
                layoutId="bottomNavCircle"
                className="absolute inset-0 rounded-full bg-[#20BA68] shadow-md shadow-[#20BA68]/20"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Users
              className={`w-5 h-5 relative z-10 transition-colors ${
                activeTab === 'community'
                  ? 'text-[#081E23] stroke-[2.4]'
                  : 'text-[#88A9A2] group-hover:text-white stroke-[2]'
              }`}
            />
          </div>
          <span
            className={`text-[10px] sm:text-[11px] tracking-tight mt-0.5 leading-none transition-colors whitespace-nowrap ${
              activeTab === 'community'
                ? 'font-bold text-[#20BA68]'
                : 'font-medium text-[#88A9A2] group-hover:text-white'
            }`}
          >
            Community
          </span>
        </button>

        {/* 3. CLOUD ACCESS (Distinctive Center Raised Button) */}
        <div className="flex-1 flex flex-col items-center justify-end pb-1.5 min-w-[68px]">
          <button
            id="btn-bottom-nav-cloud-access"
            type="button"
            onClick={onSelectCloudAccess}
            className={`relative -mt-5 sm:-mt-6 w-13 h-13 sm:w-14 sm:h-14 rounded-full border-[3.5px] shadow-[0_4px_16px_rgba(0,0,0,0.4)] flex items-center justify-center cursor-pointer touch-manipulation transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              isCloudGreen
                ? 'bg-[#20BA68] text-[#081E23] border-white'
                : 'bg-[#0A262D] text-[#88A9A2] border-[#163E47] hover:text-white hover:border-[#20BA68]/50'
            } ${
              isCloudSelected
                ? 'ring-4 ring-[#20BA68]/50 scale-105'
                : 'hover:scale-105'
            }`}
            aria-label="Cloud Access"
            aria-current={isCloudSelected ? 'page' : undefined}
          >
            <Cloud
              className={`w-6 h-6 stroke-[2.4] transition-colors ${
                isCloudGreen ? 'text-[#081E23]' : 'text-[#88A9A2]'
              }`}
            />
          </button>
          <span
            className={`text-[10px] sm:text-[11px] tracking-tight mt-1 leading-none whitespace-nowrap transition-colors ${
              isCloudSelected
                ? 'font-bold text-[#20BA68]'
                : 'font-medium text-[#88A9A2] hover:text-white'
            }`}
          >
            Cloud Access
          </span>
        </div>

        {/* 4. CHANNELS (Replaces Complaint) */}
        <button
          id="btn-bottom-nav-channels"
          type="button"
          onClick={onSelectChannels}
          className="flex-1 flex flex-col items-center justify-center pb-1.5 pt-1 group cursor-pointer touch-manipulation min-w-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20BA68] rounded-xl"
          aria-label="Channels"
          aria-current={activeTab === 'channels' ? 'page' : undefined}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            {activeTab === 'channels' && (
              <motion.div
                layoutId="bottomNavCircle"
                className="absolute inset-0 rounded-full bg-[#20BA68] shadow-md shadow-[#20BA68]/20"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Radio
              className={`w-5 h-5 relative z-10 transition-colors ${
                activeTab === 'channels'
                  ? 'text-[#081E23] stroke-[2.4]'
                  : 'text-[#88A9A2] group-hover:text-white stroke-[2]'
              }`}
            />
          </div>
          <span
            className={`text-[10px] sm:text-[11px] tracking-tight mt-0.5 leading-none transition-colors ${
              activeTab === 'channels'
                ? 'font-bold text-[#20BA68]'
                : 'font-medium text-[#88A9A2] group-hover:text-white'
            }`}
          >
            Channels
          </span>
        </button>

        {/* 5. LOGIN / PROFILE */}
        <button
          id="btn-bottom-nav-login"
          type="button"
          onClick={onSelectLogin}
          className="flex-1 flex flex-col items-center justify-center pb-1.5 pt-1 group cursor-pointer touch-manipulation min-w-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20BA68] rounded-xl"
          aria-label={clientUser ? 'Profile' : 'Login'}
          aria-current={activeTab === 'login' ? 'page' : undefined}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            {clientUser ? (
              activeTab === 'login' ? (
                <div className="w-8.5 h-8.5 rounded-full bg-[#D8F3E5] shadow-[0_0_14px_rgba(32,186,104,0.55)] flex items-center justify-center relative z-10 select-none">
                  <span className="text-[#081E23] font-black text-xs sm:text-sm">
                    {(clientUser.displayName?.trim() || clientUser.email?.trim() || 'U')
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full bg-[#103038] text-[#88A9A2] group-hover:text-white flex items-center justify-center font-bold text-xs select-none">
                  {(clientUser.displayName?.trim() || clientUser.email?.trim() || 'U')
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )
            ) : (
              <>
                {activeTab === 'login' && (
                  <motion.div
                    layoutId="bottomNavCircle"
                    className="absolute inset-0 rounded-full bg-[#20BA68] shadow-md shadow-[#20BA68]/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <User
                  className={`w-5 h-5 relative z-10 transition-colors ${
                    activeTab === 'login'
                      ? 'text-[#081E23] stroke-[2.4]'
                      : 'text-[#88A9A2] group-hover:text-white stroke-[2]'
                  }`}
                />
              </>
            )}
          </div>
          <span
            className={`text-[10px] sm:text-[11px] tracking-tight mt-0.5 leading-none transition-colors ${
              activeTab === 'login'
                ? 'font-bold text-[#20BA68]'
                : 'font-medium text-[#88A9A2] group-hover:text-white'
            }`}
          >
            {clientUser ? 'Profile' : 'Login'}
          </span>
        </button>
      </div>
    </nav>
  );
});

BottomNav.displayName = 'BottomNav';
