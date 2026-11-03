import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  FileCheck2,
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  X,
} from 'lucide-react';
import { AppConfig, ServiceCategory, SubService, ClientUser, ClientRecord } from './types';
import { DEFAULT_CONFIG, SERVICE_CATEGORIES } from './data/servicesData';
import { Header } from './components/Header';
import { CategoryCard } from './components/CategoryCard';
import { SubServiceCard } from './components/SubServiceCard';
import { SearchBar } from './components/SearchBar';
import { Footer } from './components/Footer';
import {
  subscribeToAuthChanges,
  logoutFromFirebase,
  getClientByUid,
} from './config/firebase';

import { BottomNav, BottomNavTab } from './components/BottomNav';
import {
  AppScreen,
  AppOverlay,
  NavigationHistoryState,
  buildUrlForScreen,
  parseLocationToState,
  findCategoryById,
  findSubServiceById,
} from './utils/navigation';
import { useDynamicGreeting } from './utils/greeting';

// Lazy load secondary views & modals to keep initial bundle lightweight on mobile
const WhatsAppRequestView = lazy(() =>
  import('./components/WhatsAppRequestView').then((m) => ({ default: m.WhatsAppRequestView }))
);
const LoginPage = lazy(() =>
  import('./components/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const ComplaintPage = lazy(() =>
  import('./components/ComplaintPage').then((m) => ({ default: m.ComplaintPage }))
);
const ChannelsPage = lazy(() =>
  import('./components/ChannelsPage').then((m) => ({ default: m.ChannelsPage }))
);
const PrivacyPolicyPage = lazy(() =>
  import('./components/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage }))
);
const DataSafetyPage = lazy(() =>
  import('./components/DataSafetyPage').then((m) => ({ default: m.DataSafetyPage }))
);
const DeleteAccountView = lazy(() =>
  import('./components/DeleteAccountView').then((m) => ({ default: m.DeleteAccountView }))
);
const CloudAccessModal = lazy(() =>
  import('./components/CloudAccessModal').then((m) => ({ default: m.CloudAccessModal }))
);
const ComingSoonModal = lazy(() =>
  import('./components/ComingSoonModal').then((m) => ({ default: m.ComingSoonModal }))
);
const NotificationModal = lazy(() =>
  import('./components/NotificationModal').then((m) => ({ default: m.NotificationModal }))
);

// High-performance scroll to top helper
const scrollToTop = () => {
  try {
    const isMobile = window.innerWidth < 640;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: isMobile || prefersReducedMotion ? 'auto' : 'smooth',
    });
  } catch {
    window.scrollTo(0, 0);
  }
};

export default function App() {
  const config = DEFAULT_CONFIG;
  const greeting = useDynamicGreeting();

  // State management for hierarchical flow:
  // Step 1: No category selected (shows all categories)
  // Step 2: Category selected, but no sub-service selected (shows sub-services)
  // Step 3: Sub-service selected (shows WhatsApp request generator)
  // Initial routing detection from pathname and hash
  const rawPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const initialPath = rawPath.replace(/\/$/, '') || '/';
  const initialHash = typeof window !== 'undefined' ? window.location.hash : '';

  // Initial routing detection from pathname, hash, and history.state
  const initialNavState =
    typeof window !== 'undefined'
      ? parseLocationToState(window.location.pathname, window.location.hash, window.history.state)
      : { screen: 'home' as AppScreen, depth: 0 };

  const initialCat = initialNavState.categoryId
    ? findCategoryById(initialNavState.categoryId)
    : null;
  const initialSub = initialNavState.subServiceId
    ? findSubServiceById(initialCat, initialNavState.subServiceId)
    : null;

  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(initialCat);
  const [selectedSubService, setSelectedSubService] = useState<SubService | null>(initialSub);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isLoginPageOpen, setIsLoginPageOpen] = useState(initialNavState.screen === 'login');
  const [isComplaintPageOpen, setIsComplaintPageOpen] = useState(initialNavState.screen === 'complaint');
  const [isChannelsPageOpen, setIsChannelsPageOpen] = useState(initialNavState.screen === 'channels');
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(initialNavState.screen === 'privacy-policy');
  const [isDataSafetyOpen, setIsDataSafetyOpen] = useState(initialNavState.screen === 'data-safety');
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(initialNavState.screen === 'delete-account');

  // Overlays (Priority 1 in Android Back handling)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(initialNavState.overlay === 'mobileMenu');
  const [cloudModalType, setCloudModalType] = useState<'unauthenticated' | 'not-found' | null>(
    initialNavState.cloudType || null
  );
  const [comingSoonFeature, setComingSoonFeature] = useState<'Community' | 'Channels' | null>(
    (initialNavState.comingSoonFeature as any) || null
  );
  const [modalFeature, setModalFeature] = useState<'Login' | 'Cloud Access' | 'My Requests' | null>(null);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(initialNavState.overlay === 'notifications');

  // Authenticated Client Session - Firebase Auth & Firestore Client Record
  const [clientUser, setClientUser] = useState<ClientUser | null>(null);
  const [clientRecord, setClientRecord] = useState<ClientRecord | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (user) => {
      setClientUser(user);
      if (user?.uid) {
        const record = await getClientByUid(user.uid);
        setClientRecord(record);
      } else {
        setClientRecord(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Centralized PopState Listener: Handles Android Native Back, Browser Back, and Forward
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Tag the root entry with depth: 0 so native back knows when it has reached root/home
    const currentState = parseLocationToState(
      window.location.pathname,
      window.location.hash,
      window.history.state
    );
    if (!window.history.state || typeof window.history.state.depth !== 'number') {
      window.history.replaceState(
        { ...currentState, depth: 0, timestamp: Date.now() },
        '',
        window.location.href
      );
    }

    const handlePopState = (event: PopStateEvent) => {
      const state = parseLocationToState(
        window.location.pathname,
        window.location.hash,
        event.state
      );

      // PRIORITY 1: Overlay Dismissal
      // If the popped state no longer has an overlay, close all overlays immediately
      setIsMobileMenuOpen(state.overlay === 'mobileMenu');
      setCloudModalType(state.cloudType || null);
      setComingSoonFeature((state.comingSoonFeature as any) || null);
      if (!state.overlay) {
        setModalFeature(null);
      }
      setIsNotificationModalOpen(state.overlay === 'notifications');

      // PRIORITY 2: Screen Synchronization
      setIsLoginPageOpen(state.screen === 'login');
      setIsComplaintPageOpen(state.screen === 'complaint');
      setIsChannelsPageOpen(state.screen === 'channels');
      setIsPrivacyPolicyOpen(state.screen === 'privacy-policy');
      setIsDataSafetyOpen(state.screen === 'data-safety');
      setIsDeleteAccountOpen(state.screen === 'delete-account');

      if (state.screen === 'subservice') {
        const cat = findCategoryById(state.categoryId);
        const sub = findSubServiceById(cat, state.subServiceId);
        setSelectedCategory(cat);
        setSelectedSubService(sub);
      } else if (state.screen === 'category') {
        const cat = findCategoryById(state.categoryId);
        setSelectedCategory(cat);
        setSelectedSubService(null);
      } else if (state.screen === 'home') {
        setSelectedCategory(null);
        setSelectedSubService(null);
      }

      scrollToTop();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Determine current step (Step 1: All categories, Step 2: Subservices, Step 3: WhatsApp preview)
  const currentStep: 1 | 2 | 3 = selectedSubService ? 3 : selectedCategory ? 2 : 1;

  // Centralized Navigation Push
  const navigateTo = useCallback(
    (screen: AppScreen, categoryId?: string | null, subServiceId?: string | null) => {
      const currentDepth = (window.history.state?.depth as number) ?? 0;
      const nextDepth = currentDepth + 1;
      const nextState: NavigationHistoryState = {
        screen,
        categoryId: categoryId || null,
        subServiceId: subServiceId || null,
        depth: nextDepth,
        timestamp: Date.now(),
      };
      const url = buildUrlForScreen(screen, categoryId, subServiceId);
      window.history.pushState(nextState, '', url);

      // Dismiss any open overlays
      setIsMobileMenuOpen(false);
      setCloudModalType(null);
      setComingSoonFeature(null);
      setModalFeature(null);
      setIsNotificationModalOpen(false);

      // Sync React state
      setIsLoginPageOpen(screen === 'login');
      setIsComplaintPageOpen(screen === 'complaint');
      setIsChannelsPageOpen(screen === 'channels');
      setIsPrivacyPolicyOpen(screen === 'privacy-policy');
      setIsDataSafetyOpen(screen === 'data-safety');
      setIsDeleteAccountOpen(screen === 'delete-account');

      if (screen === 'subservice') {
        const cat = findCategoryById(categoryId);
        const sub = findSubServiceById(cat, subServiceId);
        setSelectedCategory(cat);
        setSelectedSubService(sub);
      } else if (screen === 'category') {
        const cat = findCategoryById(categoryId);
        setSelectedCategory(cat);
        setSelectedSubService(null);
      } else if (screen === 'home') {
        setSelectedCategory(null);
        setSelectedSubService(null);
      }

      scrollToTop();
    },
    []
  );

  // Centralized Overlay Open / Close Helpers
  const openOverlay = useCallback(
    (
      overlay: AppOverlay,
      metadata?: { cloudType?: 'unauthenticated' | 'not-found'; comingSoonFeature?: string }
    ) => {
      const currentDepth = (window.history.state?.depth as number) ?? 0;
      const currentScreenState = parseLocationToState(
        window.location.pathname,
        window.location.hash,
        window.history.state
      );
      const nextState: NavigationHistoryState = {
        ...currentScreenState,
        overlay,
        cloudType: metadata?.cloudType || null,
        comingSoonFeature: metadata?.comingSoonFeature || null,
        depth: currentDepth + 1,
        timestamp: Date.now(),
      };
      window.history.pushState(nextState, '', window.location.href);

      if (overlay === 'mobileMenu') setIsMobileMenuOpen(true);
      if (overlay === 'cloudAccess') setCloudModalType(metadata?.cloudType || 'unauthenticated');
      if (overlay === 'comingSoon') {
        setComingSoonFeature((metadata?.comingSoonFeature as any) || 'Community');
        setModalFeature(null);
      }
      if (overlay === 'notifications') setIsNotificationModalOpen(true);
    },
    []
  );

  const closeOverlay = useCallback(() => {
    if (window.history.state?.overlay) {
      window.history.back();
    } else {
      setIsMobileMenuOpen(false);
      setCloudModalType(null);
      setComingSoonFeature(null);
      setModalFeature(null);
      setIsNotificationModalOpen(false);
    }
  }, []);

  // Centralized Back Navigation: pops history when inside an app sub-screen, or falls back to parent
  const navigateBack = useCallback(
    (fallbackFn?: () => void) => {
      const currentDepth = (window.history.state?.depth as number) ?? 0;
      if (currentDepth > 0) {
        window.history.back();
      } else if (fallbackFn) {
        fallbackFn();
      } else {
        navigateTo('home');
      }
    },
    [navigateTo]
  );

  // Service Selection Handlers
  const handleSelectCategory = useCallback(
    (category: ServiceCategory) => {
      navigateTo('category', category.id);
    },
    [navigateTo]
  );

  const handleSelectSubService = useCallback(
    (subService: SubService) => {
      if (selectedCategory) {
        navigateTo('subservice', selectedCategory.id, subService.id);
      }
    },
    [navigateTo, selectedCategory]
  );

  const handleSelectServiceFromSearch = useCallback(
    (category: ServiceCategory, subService: SubService) => {
      navigateTo('subservice', category.id, subService.id);
    },
    [navigateTo]
  );

  // Go To Step 1 (Home): Returns directly to root without piling up history entries
  const handleGoToStep1 = useCallback(() => {
    const currentDepth = (window.history.state?.depth as number) ?? 0;
    if (currentDepth > 0) {
      window.history.go(-currentDepth);
    } else {
      navigateTo('home');
    }
  }, [navigateTo]);

  // Go To Step 2 (Back from WhatsApp preview to subservices list)
  const handleGoToStep2 = useCallback(() => {
    navigateBack(() => {
      if (selectedCategory) {
        navigateTo('category', selectedCategory.id);
      } else {
        navigateTo('home');
      }
    });
  }, [navigateBack, selectedCategory, navigateTo]);

  const handleOpenLogin = useCallback(() => {
    navigateTo('login');
  }, [navigateTo]);

  const handleCloseLogin = useCallback(() => {
    navigateBack(handleGoToStep1);
  }, [navigateBack, handleGoToStep1]);

  const handleLoginSuccess = useCallback(async (user: ClientUser) => {
    setClientUser(user);
    if (user?.uid) {
      const record = await getClientByUid(user.uid);
      setClientRecord(record);
    }
    // Remain on login/profile screen after successful login
    setIsLoginPageOpen(true);
  }, []);

  const handleLogout = useCallback(async () => {
    await logoutFromFirebase();
    setClientUser(null);
    setClientRecord(null);
    setCloudModalType(null);
  }, []);

  const handleCloudAccess = useCallback(async () => {
    if (!clientUser) {
      openOverlay('cloudAccess', { cloudType: 'unauthenticated' });
      return;
    }

    let activeRecord = clientRecord;
    if (!activeRecord && clientUser.uid) {
      activeRecord = await getClientByUid(clientUser.uid);
      setClientRecord(activeRecord);
    }

    if (activeRecord && activeRecord.driveFolderId && activeRecord.driveFolderId.trim() !== '') {
      const driveUrl = `https://drive.google.com/drive/folders/${encodeURIComponent(
        activeRecord.driveFolderId.trim()
      )}`;
      const newTab = window.open(driveUrl, '_blank', 'noopener,noreferrer');
      if (!newTab) {
        window.location.href = driveUrl;
      }
    } else {
      openOverlay('cloudAccess', { cloudType: 'not-found' });
    }
  }, [clientUser, clientRecord, openOverlay]);

  const handleOpenModalFeature = useCallback(
    (feat: 'Login' | 'Cloud Access') => {
      if (feat === 'Login') {
        handleOpenLogin();
      } else if (feat === 'Cloud Access') {
        handleCloudAccess();
      } else {
        openOverlay('comingSoon', { comingSoonFeature: feat });
      }
    },
    [handleOpenLogin, handleCloudAccess, openOverlay]
  );

  const handleOpenComplaint = useCallback(() => {
    navigateTo('complaint');
  }, [navigateTo]);

  const handleBackFromComplaint = useCallback(() => {
    navigateBack(handleGoToStep1);
  }, [navigateBack, handleGoToStep1]);

  const handleOpenChannels = useCallback(() => {
    navigateTo('channels');
  }, [navigateTo]);

  const handleBackFromChannels = useCallback(() => {
    navigateBack(handleGoToStep1);
  }, [navigateBack, handleGoToStep1]);

  const handleOpenPrivacyPolicy = useCallback(() => {
    navigateTo('privacy-policy');
  }, [navigateTo]);

  const handleBackFromPrivacyPolicy = useCallback(() => {
    navigateBack(handleGoToStep1);
  }, [navigateBack, handleGoToStep1]);

  const handleOpenDataSafety = useCallback(() => {
    navigateTo('data-safety');
  }, [navigateTo]);

  const handleBackFromDataSafety = useCallback(() => {
    navigateBack(handleGoToStep1);
  }, [navigateBack, handleGoToStep1]);

  const handleOpenDeleteAccount = useCallback(() => {
    navigateTo('delete-account');
  }, [navigateTo]);

  const handleBackFromDeleteAccount = useCallback(() => {
    navigateBack(handleGoToStep1);
  }, [navigateBack, handleGoToStep1]);

  const handleSelectCommunity = useCallback(() => {
    openOverlay('comingSoon', { comingSoonFeature: 'Community' });
  }, [openOverlay]);

  const handleSelectChannels = useCallback(() => {
    handleOpenChannels();
  }, [handleOpenChannels]);

  // Bottom Navigation Active Tab Resolution
  const activeTab: BottomNavTab = isLoginPageOpen
    ? 'login'
    : isComplaintPageOpen
    ? 'complaint'
    : isChannelsPageOpen
    ? 'channels'
    : comingSoonFeature === 'Community'
    ? 'community'
    : cloudModalType !== null
    ? 'cloud'
    : modalFeature === 'My Requests'
    ? 'requests'
    : 'home';

  const handleBottomSelectHome = useCallback(() => {
    handleGoToStep1();
  }, [handleGoToStep1]);

  const handleBottomSelectRequests = useCallback(() => {
    openOverlay('comingSoon', { comingSoonFeature: 'My Requests' });
  }, [openOverlay]);

  const handleBottomSelectLogin = useCallback(() => {
    handleOpenLogin();
  }, [handleOpenLogin]);

  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#0F201C] flex flex-col font-sans selection:bg-[#23A87B]/25 selection:text-[#081E23]">
      {/* Top Header with Controlled Mobile Menu */}
      <Header
        config={config}
        onReset={handleGoToStep1}
        onOpenModal={handleOpenModalFeature}
        onOpenComplaint={handleOpenComplaint}
        onOpenChannels={handleOpenChannels}
        onOpenPrivacyPolicy={handleOpenPrivacyPolicy}
        onOpenDataSafety={handleOpenDataSafety}
        onOpenDeleteAccount={handleOpenDeleteAccount}
        clientUser={clientUser}
        onOpenLogin={handleOpenLogin}
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={(open) => {
          if (open) {
            openOverlay('mobileMenu');
          } else {
            closeOverlay();
          }
        }}
        onCloseMobileMenu={closeOverlay}
      />

      {/* HOME PAGE HEADER: Greeting, Heading, Rounded Search Bar */}
      {currentStep === 1 && !isLoginPageOpen && !isComplaintPageOpen && !isChannelsPageOpen && !isPrivacyPolicyOpen && !isDataSafetyOpen && !isDeleteAccountOpen && (
        <section className="bg-[#081E23] text-white border-b border-[#0F2D33] px-3.5 sm:px-6 lg:px-8 pt-4 pb-6 sm:pb-8 shadow-sm">
          <div className="max-w-6xl mx-auto space-y-3 sm:space-y-4">
            {/* Greeting */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-[#20BA68]">
                <span className="w-2 h-2 rounded-full bg-[#20BA68] animate-pulse" />
                <span>{greeting}{clientUser?.displayName ? `, ${clientUser.displayName.split(' ')[0]}` : ''}</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              How can we help you today?
            </h1>

            {/* Rounded Search Bar */}
            <div className="max-w-xl w-full">
              <SearchBar
                categories={SERVICE_CATEGORIES}
                onSelectService={handleSelectServiceFromSearch}
                placeholder="Search for a service..."
              />
            </div>
          </div>
        </section>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 pb-28 sm:pb-32">
        {/* View Transitions */}
        <AnimatePresence mode="wait">
          {/* CLIENT LOGIN PAGE VIEW */}
          {isLoginPageOpen ? (
            <Suspense
              fallback={
                <div className="py-16 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#23A87B] border-t-transparent animate-spin" />
                </div>
              }
            >
              <LoginPage
                key="login-page-view"
                config={config}
                clientUser={clientUser}
                onBack={handleCloseLogin}
                onLoginSuccess={handleLoginSuccess}
                onLogout={handleLogout}
                onRequestDeleteAccount={handleOpenDeleteAccount}
              />
            </Suspense>
          ) : isComplaintPageOpen ? (
            <Suspense
              fallback={
                <div className="py-16 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#23A87B] border-t-transparent animate-spin" />
                </div>
              }
            >
              <ComplaintPage
                key="complaint-page-view"
                config={config}
                clientUser={clientUser}
                onBack={handleBackFromComplaint}
              />
            </Suspense>
          ) : isChannelsPageOpen ? (
            <Suspense
              fallback={
                <div className="py-16 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#23A87B] border-t-transparent animate-spin" />
                </div>
              }
            >
              <ChannelsPage
                key="channels-page-view"
                config={config}
              />
            </Suspense>
          ) : isPrivacyPolicyOpen ? (
            <Suspense
              fallback={
                <div className="py-16 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#23A87B] border-t-transparent animate-spin" />
                </div>
              }
            >
              <PrivacyPolicyPage
                key="privacy-policy-view"
                config={config}
                onBack={handleBackFromPrivacyPolicy}
                onNavigateToDataSafety={handleOpenDataSafety}
                onNavigateToDeleteAccount={handleOpenDeleteAccount}
              />
            </Suspense>
          ) : isDataSafetyOpen ? (
            <Suspense
              fallback={
                <div className="py-16 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#23A87B] border-t-transparent animate-spin" />
                </div>
              }
            >
              <DataSafetyPage
                key="data-safety-view"
                config={config}
                onBack={handleBackFromDataSafety}
                onNavigateToPrivacyPolicy={handleOpenPrivacyPolicy}
                onNavigateToDeleteAccount={handleOpenDeleteAccount}
              />
            </Suspense>
          ) : isDeleteAccountOpen ? (
            <Suspense
              fallback={
                <div className="py-16 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#23A87B] border-t-transparent animate-spin" />
                </div>
              }
            >
              <DeleteAccountView
                key="delete-account-view"
                config={config}
                onBack={handleBackFromDeleteAccount}
                onNavigateToPrivacyPolicy={handleOpenPrivacyPolicy}
                onNavigateToDataSafety={handleOpenDataSafety}
              />
            </Suspense>
          ) : (
            <>
              {/* STEP 1: Main Category Selection */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1-categories"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-3.5 sm:space-y-5"
                >
                  <div className="flex items-center justify-between pt-1">
                    <h2 className="text-xs font-black uppercase tracking-widest text-[#5C6E6A]">
                      SERVICES
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
                    {SERVICE_CATEGORIES.map((category) => (
                      <CategoryCard
                        key={category.id}
                        category={category}
                        isSelected={selectedCategory?.id === category.id}
                        onSelect={handleSelectCategory}
                        onClick={handleSelectCategory}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Sub-services in Selected Category */}
              {currentStep === 2 && selectedCategory && (
                <motion.div
                  key="step-2-subservices"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleGoToStep1}
                      className="inline-flex items-center space-x-1.5 text-xs sm:text-[13px] font-bold text-[#0D6B4A] bg-[#E8F8F0] border border-[#D2EFE2] hover:bg-[#DCF5EB] px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-2xs"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0D6B4A] stroke-[2.5]" />
                      <span>Back to Services</span>
                    </button>
                    <span className="text-sm sm:text-base font-extrabold text-[#081E23] tracking-tight">
                      {selectedCategory.title}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
                    {selectedCategory.subServices.map((sub) => (
                      <SubServiceCard
                        key={sub.id}
                        subService={sub}
                        isSelected={selectedSubService?.id === sub.id}
                        onSelect={handleSelectSubService}
                        onClick={handleSelectSubService}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: WhatsApp Request Generator for Selected Sub-service */}
              {currentStep === 3 && selectedCategory && selectedSubService && (
                <motion.div
                  key="step-3-request"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleGoToStep2}
                      className="inline-flex items-center space-x-1.5 text-xs sm:text-[13px] font-bold text-[#0D6B4A] bg-[#E8F8F0] border border-[#D2EFE2] hover:bg-[#DCF5EB] px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-2xs"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0D6B4A] stroke-[2.5]" />
                      <span>Back to {selectedCategory.title}</span>
                    </button>
                    <span className="text-xs sm:text-sm font-bold text-[#081E23] truncate max-w-[180px] sm:max-w-[240px]">
                      {selectedSubService.title}
                    </span>
                  </div>

                  <Suspense
                    fallback={
                      <div className="py-12 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border-2 border-[#23A87B] border-t-transparent animate-spin" />
                      </div>
                    }
                  >
                    <WhatsAppRequestView
                      category={selectedCategory}
                      subService={selectedSubService}
                      config={config}
                      onBackToSubServices={handleGoToStep2}
                      onBackToCategories={handleGoToStep1}
                    />
                  </Suspense>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </main>

      {/* Desktop Footer */}
      <Footer
        config={config}
        onReset={handleGoToStep1}
        onOpenModal={handleOpenModalFeature}
        onOpenComplaint={handleOpenComplaint}
        onOpenChannels={handleOpenChannels}
        onOpenPrivacyPolicy={handleOpenPrivacyPolicy}
        onOpenDataSafety={handleOpenDataSafety}
        onOpenDeleteAccount={handleOpenDeleteAccount}
      />

      {/* Cloud Access Authentication/Link Modals */}
      <Suspense fallback={null}>
        {cloudModalType && (
          <CloudAccessModal
            isOpen={cloudModalType !== null}
            type={cloudModalType}
            onClose={closeOverlay}
            onLogin={handleOpenLogin}
          />
        )}
      </Suspense>

      {/* Improved Coming Soon Modal for Channels, Community & Secondary Features */}
      <Suspense fallback={null}>
        <ComingSoonModal
          isOpen={comingSoonFeature !== null || !!modalFeature}
          feature={comingSoonFeature || modalFeature || ''}
          onClose={closeOverlay}
        />
      </Suspense>

      {/* Tax Alerts & Notifications Modal */}
      <Suspense fallback={null}>
        <NotificationModal
          isOpen={isNotificationModalOpen}
          onClose={closeOverlay}
        />
      </Suspense>

      {/* Persistent Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onSelectHome={handleBottomSelectHome}
        onSelectCommunity={handleSelectCommunity}
        onSelectCloudAccess={handleCloudAccess}
        onSelectChannels={handleSelectChannels}
        onSelectLogin={handleBottomSelectLogin}
        onSelectComplaint={handleOpenComplaint}
        clientUser={clientUser}
      />
    </div>
  );
}
