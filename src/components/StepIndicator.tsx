import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
  categoryTitle?: string;
  subServiceTitle?: string;
  onGoToStep1: () => void;
  onGoToStep2: () => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  categoryTitle,
  subServiceTitle,
  onGoToStep1,
  onGoToStep2,
}) => {
  return (
    <nav aria-label="Progress" className="w-full mb-6">
      <div className="bg-white border border-slate-200 rounded-xl p-1.5 sm:p-2.5 shadow-2xs">
        <div className="grid grid-cols-3 gap-1 sm:gap-2.5 items-center">
          {/* Step 1: Main Category */}
          <button
            id="step-nav-1"
            type="button"
            onClick={onGoToStep1}
            disabled={currentStep === 1}
            aria-current={currentStep === 1 ? 'step' : undefined}
            className={`flex items-center gap-1.5 sm:gap-2.5 text-left rounded-lg p-2 sm:p-3 min-h-[46px] sm:min-h-[52px] transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              currentStep === 1
                ? 'bg-emerald-50/70 border-2 border-emerald-500 shadow-2xs'
                : 'hover:bg-slate-50 active:bg-slate-100 border border-transparent cursor-pointer'
            }`}
          >
            <div
              className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] xs:text-xs font-black shrink-0 transition-colors ${
                currentStep > 1
                  ? 'bg-emerald-500 text-slate-900'
                  : 'bg-slate-900 text-white'
              }`}
            >
              {currentStep > 1 ? (
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              ) : (
                '1'
              )}
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="text-[9px] xs:text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
                Step 1
              </p>
              <p className="text-[11px] xs:text-xs sm:text-sm font-bold text-slate-900 truncate">
                {categoryTitle ? categoryTitle : 'Category'}
              </p>
            </div>
          </button>

          {/* Step 2: Sub-Service */}
          <button
            id="step-nav-2"
            type="button"
            onClick={onGoToStep2}
            disabled={currentStep < 2 || currentStep === 2}
            aria-current={currentStep === 2 ? 'step' : undefined}
            className={`flex items-center gap-1.5 sm:gap-2.5 text-left rounded-lg p-2 sm:p-3 min-h-[46px] sm:min-h-[52px] transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              currentStep === 2
                ? 'bg-emerald-50/70 border-2 border-emerald-500 shadow-2xs'
                : currentStep > 2
                ? 'hover:bg-slate-50 active:bg-slate-100 border border-transparent cursor-pointer'
                : 'opacity-45 border border-transparent cursor-not-allowed select-none'
            }`}
          >
            <div
              className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] xs:text-xs font-black shrink-0 transition-colors ${
                currentStep > 2
                  ? 'bg-emerald-500 text-slate-900'
                  : currentStep === 2
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              {currentStep > 2 ? (
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              ) : (
                '2'
              )}
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="text-[9px] xs:text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
                Step 2
              </p>
              <p className="text-[11px] xs:text-xs sm:text-sm font-bold text-slate-900 truncate">
                {subServiceTitle ? subServiceTitle : 'Service'}
              </p>
            </div>
          </button>

          {/* Step 3: WhatsApp Request */}
          <div
            aria-current={currentStep === 3 ? 'step' : undefined}
            className={`flex items-center gap-1.5 sm:gap-2.5 text-left rounded-lg p-2 sm:p-3 min-h-[46px] sm:min-h-[52px] transition-all ${
              currentStep === 3
                ? 'bg-emerald-50/70 border-2 border-emerald-500 shadow-2xs'
                : 'opacity-45 border border-transparent select-none cursor-default'
            }`}
          >
            <div
              className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] xs:text-xs font-black shrink-0 ${
                currentStep === 3
                  ? 'bg-emerald-500 text-slate-900'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              3
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="text-[9px] xs:text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
                Step 3
              </p>
              <p className="text-[11px] xs:text-xs sm:text-sm font-bold text-slate-900 truncate">
                Send Request
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

