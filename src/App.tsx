import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ChevronRight,
  Clock,
  Search,
  Users,
  X,
} from 'lucide-react';
import { AppConfig, ServiceCategory, SubService, ClientUser, ClientRecord } from './types';
import { DEFAULT_CONFIG, SERVICE_CATEGORIES } from './data/servicesData';
import { Header } from './components/Header';
import { CategoryCard } from './components/CategoryCard';
import { SubServiceCard } from './components/SubServiceCard';
import { SearchBar } from './components/SearchBar';
import { Footer } from './components/Footer';
import { buildWhatsAppUrl } from './utils/whatsapp';
import { subscribeToAuthChanges, logoutFromFirebase, getClientByUid } from './config/firebase';

import { BottomNav, BottomNavTab } from './components/BottomNav';

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

  // State management for hierarchical flow:
  // Step 1: No category selected (shows all categories)
  // Step 2: Category selected, but no sub-service selected (shows sub-services)
  // Step 3: Sub-service selected (shows WhatsApp request generator)
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [selectedSubService, setSelectedSubService] = useState<SubService | null>(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);
  const [isComplaintPageOpen, setIsComplaintPageOpen] = useState(false);
  const [isChannelsPageOpen, setIsChannelsPageOpen] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState<'Community' | 'Channels' | null>(null);
  const [modalFeature, setModalFeature] = useState<'Login' | 'Cloud Access' | 'My Requests' | null>(null);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  // Authenticated Client Session - Firebase Auth & Firestore Client Record
  const [clientUser, setClientUser] = useState<ClientUser | null>(null);
  const [clientRecord, setClientRecord] = useState<ClientRecord | null>(null);
  const [cloudModalType, setCloudModalType] = useState<'unauthenticated' | 'not-found' | null>(null);

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

  // Listen to browser back/forward buttons and URL hash
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash === '#complaint') {
        setIsComplaintPageOpen(true);
        setIsChannelsPageOpen(false);
        setIsLoginPageOpen(false);
      } else if (hash === '#channels') {
        setIsChannelsPageOpen(true);
        setIsComplaintPageOpen(false);
        setIsLoginPageOpen(false);
      } else if (hash === '#login') {
        setIsLoginPageOpen(true);
        setIsChannelsPageOpen(false);
        setIsComplaintPageOpen(false);
      } else {
        setIsComplaintPageOpen(false);
        setIsChannelsPageOpen(false);
        setIsLoginPageOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Determine current step
  const currentStep: 1 | 2 | 3 = selectedSubService ? 3 : selectedCategory ? 2 : 1;

  // Handlers with useCallback to prevent unnecessary re-renders of memoized components
  const handleSelectCategory = useCallback((category: ServiceCategory) => {
    setIsLoginPageOpen(false);
    setIsComplaintPageOpen(false);
    setIsChannelsPageOpen(false);
    setSelectedCategory(category);
    setSelectedSubService(null);
    scrollToTop();
  }, []);

  const handleSelectSubService = useCallback((subService: SubService) => {
    setIsLoginPageOpen(false);
    setIsComplaintPageOpen(false);
    setIsChannelsPageOpen(false);
    setSelectedSubService(subService);
    scrollToTop();
  }, []);

  const handleSelectServiceFromSearch = useCallback(
    (category: ServiceCategory, subService: SubService) => {
      setIsLoginPageOpen(false);
      setIsComplaintPageOpen(false);
      setIsChannelsPageOpen(false);
      setSelectedCategory(category);
      setSelectedSubService(subService);
      setIsMobileSearchOpen(false);
      scrollToTop();
    },
    []
  );

  const handleGoToStep1 = useCallback(() => {
    setIsLoginPageOpen(false);
    setIsComplaintPageOpen(false);
    setIsChannelsPageOpen(false);
    setSelectedCategory(null);
    setSelectedSubService(null);
    setIsMobileSearchOpen(false);
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname);
    }
    scrollToTop();
  }, []);

  const handleGoToStep2 = useCallback(() => {
    setIsLoginPageOpen(false);
    setIsComplaintPageOpen(false);
    setIsChannelsPageOpen(false);
    setSelectedSubService(null);
    scrollToTop();
  }, []);

  const handleOpenLogin = useCallback(() => {
    setIsLoginPageOpen(true);
    setIsComplaintPageOpen(false);
    setIsChannelsPageOpen(false);
    setIsMobileSearchOpen(false);
    if (window.location.hash !== '#login') {
      window.history.pushState({ page: 'login' }, '', '#login');
    }
    scrollToTop();
  }, []);

  const handleCloseLogin = useCallback(() => {
    setIsLoginPageOpen(false);
    if (window.location.hash === '#login') {
      window.history.back();
    }
    scrollToTop();
  }, []);

  const handleLoginSuccess = useCallback(async (user: ClientUser) => {
    setClientUser(user);
    if (user?.uid) {
      const record = await getClientByUid(user.uid);
      setClientRecord(record);
    }
    setIsLoginPageOpen(false);
    handleGoToStep1();
  }, [handleGoToStep1]);

  const handleLogout = useCallback(async () => {
    await logoutFromFirebase();
    setClientUser(null);
    setClientRecord(null);
  }, []);

  const handleCloudAccess = useCallback(async () => {
    // 1. If not authenticated, prompt login
    if (!clientUser) {
      setCloudModalType('unauthenticated');
      return;
    }

    // 2. Resolve client record if already loaded or fetch if pending
    let record = clientRecord;
    if (!record && clientUser.uid) {
      try {
        record = await getClientByUid(clientUser.uid);
        if (record) {
          setClientRecord(record);
        }
      } catch (err) {
        console.error('Error fetching client record on cloud access:', err);
      }
    }

    // 3. If no matching record or missing driveFolderId, show error modal
    if (!record || !record.driveFolderId || !record.driveFolderId.trim()) {
      setCloudModalType('not-found');
      return;
    }

    // 4. Construct Drive URL from driveFolderId and open folder in new tab
    const folderId = record.driveFolderId.trim();
    const driveUrl = `https://drive.google.com/drive/folders/${encodeURIComponent(folderId)}`;
    window.open(driveUrl, '_blank', 'noopener,noreferrer');
  }, [clientUser, clientRecord]);

  const handleOpenModalFeature = useCallback((feat: 'Login' | 'Cloud Access') => {
    if (feat === 'Login') {
      handleOpenLogin();
    } else if (feat === 'Cloud Access') {
      handleCloudAccess();
    } else {
      setModalFeature(feat);
    }
  }, [handleOpenLogin, handleCloudAccess]);

  const handleOpenComplaint = useCallback(() => {
    setModalFeature(null);
    setCloudModalType(null);
    setComingSoonFeature(null);
    setIsLoginPageOpen(false);
    setIsChannelsPageOpen(false);
    setIsComplaintPageOpen(true);
    if (window.location.hash !== '#complaint') {
      window.history.pushState({ page: 'complaint' }, '', '#complaint');
    }
    scrollToTop();
  }, []);

  const handleBackFromComplaint = useCallback(() => {
    setIsComplaintPageOpen(false);
    if (window.location.hash === '#complaint') {
      window.history.back();
    }
    scrollToTop();
  }, []);

  const handleOpenChannels = useCallback(() => {
    setModalFeature(null);
    setCloudModalType(null);
    setComingSoonFeature(null);
    setIsLoginPageOpen(false);
    setIsComplaintPageOpen(false);
    setIsChannelsPageOpen(true);
    if (window.location.hash !== '#channels') {
      window.history.pushState({ page: 'channels' }, '', '#channels');
    }
    scrollToTop();
  }, []);

  const handleSelectCommunity = useCallback(() => {
    setComingSoonFeature('Community');
  }, []);

  const handleSelectChannels = useCallback(() => {
    handleOpenChannels();
  }, [handleOpenChannels]);

  const handleCloseComingSoon = useCallback(() => {
    setComingSoonFeature(null);
  }, []);

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
    setModalFeature(null);
    setIsComplaintPageOpen(false);
    setIsChannelsPageOpen(false);
    setCloudModalType(null);
    setComingSoonFeature(null);
    setIsNotificationModalOpen(false);
    setIsLoginPageOpen(false);
    handleGoToStep1();
  }, [handleGoToStep1]);

  const handleBottomSelectRequests = useCallback(() => {
    setIsComplaintPageOpen(false);
    setIsChannelsPageOpen(false);
    setCloudModalType(null);
    setComingSoonFeature(null);
    setIsNotificationModalOpen(false);
    setIsLoginPageOpen(false);
    setModalFeature('My Requests');
  }, []);

  const handleBottomSelectLogin = useCallback(() => {
    setModalFeature(null);
    setIsComplaintPageOpen(false);
    setIsChannelsPageOpen(false);
    setCloudModalType(null);
    setComingSoonFeature(null);
    setIsNotificationModalOpen(false);
    handleOpenLogin();
  }, [handleOpenLogin]);

  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#0F201C] flex flex-col font-sans selection:bg-[#23A87B]/25 selection:text-[#081E23]">
      {/* Top Header */}
      <Header
        config={config}
        onReset={handleGoToStep1}
        onOpenModal={handleOpenModalFeature}
        onOpenComplaint={handleOpenComplaint}
        onOpenChannels={handleOpenChannels}
        clientUser={clientUser}
        onOpenLogin={handleOpenLogin}
        onLogout={handleLogout}
      />

      {/* HOME PAGE HEADER: Greeting, Heading, Rounded Search Bar */}
      {currentStep === 1 && !isLoginPageOpen && !isComplaintPageOpen && !isChannelsPageOpen && (
        <section className="bg-[#081E23] text-white border-b border-[#0F2D33] px-3.5 sm:px-6 lg:px-8 pt-4 pb-6 sm:pb-8 shadow-sm">
          <div className="max-w-6xl mx-auto space-y-3 sm:space-y-4">
            {/* Greeting */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-[#20BA68]">
                <span className="w-2 h-2 rounded-full bg-[#20BA68] animate-pulse" />
                <span>Good Morning{clientUser?.displayName ? `, ${clientUser.displayName.split(' ')[0]}` : ''}</span>
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
                onBack={handleCloseLogin}
                onLoginSuccess={handleLoginSuccess}
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
                    <span className="text-[11px] text-[#5C6E6A] font-medium hidden sm:inline">
                      Tap a service category to explore filings & advisory
                    </span>
                  </div>

                  {/* 3-Column Service Grid on mobile, 4-column on tablet/desktop */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4.5">
                    {SERVICE_CATEGORIES.map((category) => (
                      <CategoryCard
                        key={category.id}
                        category={category}
                        isSelected={selectedCategory?.id === category.id}
                        onSelect={handleSelectCategory}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

          {/* STEP 2: Sub-Services for Selected Category */}
          {currentStep === 2 && selectedCategory && (
            <motion.div
              key="step-2-subservices"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-5 sm:space-y-6"
            >
              {/* Top Bar with Category Context */}
              <div className="bg-white rounded-2xl border border-[#E2DDD2] p-4 sm:p-5 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <button
                    id="btn-back-to-categories"
                    type="button"
                    onClick={handleGoToStep1}
                    className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-[#0F201C] hover:text-[#23A87B] bg-[#ECE5D8] hover:bg-[#E2DDD2] active:bg-[#D5CEBF] px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer min-h-[44px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23A87B]"
                  >
                    <ArrowLeft className="w-4 h-4 shrink-0" />
                    <span>All Categories</span>
                  </button>

                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#23A87B]/15 text-[#14664B] border border-[#23A87B]/30 shrink-0">
                    Step 2: Choose Exact Service
                  </span>
                </div>

                <div className="border-t border-[#E2DDD2] pt-3 sm:pt-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0F201C] tracking-tight mb-1 break-words">
                    {selectedCategory.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C6E6A] font-medium break-words">
                    {selectedCategory.tagline}
                  </p>
                </div>
              </div>

              {/* Sub-Services Grid */}
              <div>
                <div className="flex flex-col min-[480px]:flex-row min-[480px]:items-center justify-between gap-1 mb-3 sm:mb-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#5C6E6A]">
                    CATEGORIES
                  </h3>
                  <span className="text-[11px] sm:text-xs text-[#5C6E6A] font-medium">
                    Select a service to generate WhatsApp request
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
                  {selectedCategory.subServices.map((subService) => (
                    <SubServiceCard
                      key={subService.id}
                      subService={subService}
                      isSelected={selectedSubService?.id === subService.id}
                      onSelect={handleSelectSubService}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

              {/* STEP 3: WhatsApp Request Generation & Review */}
              {currentStep === 3 && selectedCategory && selectedSubService && (
                <motion.div
                  key="step-3-request"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                >
                  <Suspense
                    fallback={
                      <div className="py-16 flex items-center justify-center">
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

      {/* Footer */}
      <Footer
        config={config}
        onOpenModal={handleOpenModalFeature}
        onOpenComplaint={handleOpenComplaint}
        onOpenChannels={handleOpenChannels}
        clientUser={clientUser}
        onOpenLogin={handleOpenLogin}
      />

      {/* Cloud Access Auth / Client Status Modal */}
      <Suspense fallback={null}>
        <CloudAccessModal
          isOpen={!!cloudModalType}
          type={cloudModalType || 'unauthenticated'}
          onClose={() => setCloudModalType(null)}
          onLogin={() => {
            setCloudModalType(null);
            handleOpenLogin();
          }}
        />
      </Suspense>

      {/* Improved Coming Soon Modal for Channels, Community & Secondary Features */}
      <Suspense fallback={null}>
        <ComingSoonModal
          isOpen={comingSoonFeature !== null || !!modalFeature}
          feature={comingSoonFeature || modalFeature || ''}
          onClose={() => {
            setComingSoonFeature(null);
            setModalFeature(null);
          }}
        />
      </Suspense>

      {/* Tax Alerts & Notifications Modal */}
      <Suspense fallback={null}>
        <NotificationModal
          isOpen={isNotificationModalOpen}
          onClose={() => setIsNotificationModalOpen(false)}
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

