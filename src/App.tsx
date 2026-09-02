import React, { useState } from 'react';
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
} from 'lucide-react';
import { AppConfig, ServiceCategory, SubService } from './types';
import { DEFAULT_CONFIG, SERVICE_CATEGORIES } from './data/servicesData';
import { Header } from './components/Header';
import { CategoryCard } from './components/CategoryCard';
import { SubServiceCard } from './components/SubServiceCard';
import { WhatsAppRequestView } from './components/WhatsAppRequestView';
import { QuickSearch } from './components/QuickSearch';
import { Footer } from './components/Footer';
import { buildWhatsAppUrl } from './utils/whatsapp';

export default function App() {
  const config = DEFAULT_CONFIG;

  // State management for hierarchical flow:
  // Step 1: No category selected (shows all categories)
  // Step 2: Category selected, but no sub-service selected (shows sub-services)
  // Step 3: Sub-service selected (shows WhatsApp request generator)
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [selectedSubService, setSelectedSubService] = useState<SubService | null>(null);

  // Determine current step
  const currentStep: 1 | 2 | 3 = selectedSubService ? 3 : selectedCategory ? 2 : 1;

  // Handlers
  const handleSelectCategory = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setSelectedSubService(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSubService = (subService: SubService) => {
    setSelectedSubService(subService);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickSearchSelect = (category: ServiceCategory, subService: SubService) => {
    setSelectedCategory(category);
    setSelectedSubService(subService);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToStep1 = () => {
    setSelectedCategory(null);
    setSelectedSubService(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToStep2 = () => {
    setSelectedSubService(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-slate-900">
      {/* Top Header */}
      <Header config={config} onReset={handleGoToStep1} />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* View Transitions */}
        <AnimatePresence mode="wait">
          {/* STEP 1: Main Category Selection */}
          {currentStep === 1 && (
            <motion.div
              key="step-1-categories"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Hero Title & Description */}
              <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2 px-1">
                <h1 className="text-2xl xs:text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                  How can we help you today?
                </h1>
                <p className="text-sm sm:text-base text-slate-500 font-medium">
                  Choose a service to get started.
                </p>
              </div>

              {/* Quick Search */}
              <QuickSearch
                categories={SERVICE_CATEGORIES}
                onSelectSubService={handleQuickSearchSelect}
              />

              {/* Categories Grid */}
              <div>
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 mb-3 sm:mb-4">
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Compliance Service Categories ({SERVICE_CATEGORIES.length})
                  </h2>
                  <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
                    Tap any category to view available sub-services
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
                  {SERVICE_CATEGORIES.map((category) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      isSelected={selectedCategory?.id === category.id}
                      onSelect={handleSelectCategory}
                    />
                  ))}
                </div>
              </div>

              {/* Helpful Direct Contact Callout */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 shadow-2xs">
                <div className="space-y-1.5 text-center sm:text-left">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center justify-center sm:justify-start space-x-2">
                    <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Uncertain about which specific service you need?</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium leading-relaxed">
                    Connect directly with our senior tax consultants on WhatsApp for personalized advisory, assessment notice evaluation, or corporate compliance audits.
                  </p>
                </div>

                <a
                  id="btn-general-whatsapp-inquiry"
                  href={buildWhatsAppUrl(
                    config.whatsappNumber,
                    `Hello ${config.firmName} Team, I would like to consult regarding my tax situation. Please guide me.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto shrink-0 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-black px-6 py-3.5 sm:py-4 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-sm transition-transform active:scale-95 cursor-pointer min-h-[48px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400 shrink-0" />
                  <span className="whitespace-nowrap">General WhatsApp Inquiry</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </a>
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
              <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 md:p-6 shadow-2xs space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <button
                    id="btn-back-to-categories"
                    type="button"
                    onClick={handleGoToStep1}
                    className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 px-3.5 py-2.5 rounded-lg transition-colors cursor-pointer min-h-[44px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <ArrowLeft className="w-4 h-4 shrink-0" />
                    <span>All Categories</span>
                  </button>

                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 shrink-0">
                    Step 2: Choose Exact Service
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-3 sm:pt-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-1 break-words">
                    {selectedCategory.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium break-words">
                    {selectedCategory.tagline}
                  </p>
                </div>
              </div>

              {/* Sub-Services Grid */}
              <div>
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 mb-3 sm:mb-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Available Sub-Services in {selectedCategory.shortTitle} ({selectedCategory.subServices.length})
                  </h3>
                  <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
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
              <WhatsAppRequestView
                category={selectedCategory}
                subService={selectedSubService}
                config={config}
                onBackToSubServices={handleGoToStep2}
                onBackToCategories={handleGoToStep1}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer config={config} />
    </div>
  );
}

