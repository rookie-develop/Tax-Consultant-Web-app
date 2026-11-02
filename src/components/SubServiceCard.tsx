import React from 'react';
import {
  ChevronRight,
  User,
  Building2,
  TrendingUp,
  Globe,
  FileText,
  Users,
  FileCheck2,
  Calendar,
  FileSpreadsheet,
  Send,
  ShieldAlert,
  Home,
  Car,
  Landmark,
  Wallet,
  FileWarning,
  Sliders,
  Scale,
  Sparkles,
  Calculator,
  LineChart,
  Target,
  Award,
  Store,
  CreditCard,
  Ship,
} from 'lucide-react';
import { SubService } from '../types';

interface SubServiceCardProps {
  subService: SubService;
  isSelected?: boolean;
  onSelect?: (subService: SubService) => void;
  onClick?: (subService: SubService) => void;
}

// Custom rendered icons that match the authoritative reference design
const renderSubServiceIcon = (id: string, title: string) => {
  const normId = id.toLowerCase();

  // 1. Salary ITR: Person with Briefcase
  if (normId === 'salary-itr') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#D8F3E5] flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#0D8A58]"
          fill="currentColor"
        >
          {/* Person Head */}
          <circle cx="8.5" cy="5.5" r="3" />
          {/* Person Torso */}
          <path d="M2.5 17c0-2.8 3.5-4.2 6-4.2.9 0 1.9.2 2.7.5-.7.8-1.2 1.8-1.2 2.9v2.8H2.5V17z" />
          {/* Briefcase Beside Hip */}
          <rect x="13" y="11" width="8.5" height="7" rx="1.5" />
          {/* Briefcase Handle */}
          <path
            d="M15.5 11v-1.5a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1V11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // 2. Business ITR: Dual Modern Buildings with Windows
  if (normId === 'business-itr') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#E0F2FE] flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#0284C7]"
          fill="currentColor"
        >
          {/* Left Building */}
          <rect x="3" y="10" width="5.5" height="11" rx="0.75" />
          <rect x="4.75" y="12" width="2" height="2" fill="#E0F2FE" />
          <rect x="4.75" y="16" width="2" height="5" fill="#E0F2FE" />
          {/* Right Building */}
          <rect x="10" y="4" width="10" height="17" rx="1" />
          {/* 6 Windows in Right Building */}
          <rect x="12" y="6.5" width="2" height="2" fill="#E0F2FE" />
          <rect x="16" y="6.5" width="2" height="2" fill="#E0F2FE" />
          <rect x="12" y="10.5" width="2" height="2" fill="#E0F2FE" />
          <rect x="16" y="10.5" width="2" height="2" fill="#E0F2FE" />
          <rect x="12" y="14.5" width="2" height="2" fill="#E0F2FE" />
          <rect x="16" y="14.5" width="2" height="2" fill="#E0F2FE" />
        </svg>
      </div>
    );
  }

  // 3. Capital Gains / Trading ITR: 3 Rising Bars + Diagonal Red/Orange Arrow
  if (normId === 'capital-gains-itr') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#FFEDD5] flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8">
          {/* Bar 1 */}
          <rect x="3.5" y="15" width="3.5" height="6" rx="0.75" fill="#EA580C" />
          {/* Bar 2 */}
          <rect x="9" y="11" width="3.5" height="10" rx="0.75" fill="#EA580C" />
          {/* Bar 3 */}
          <rect x="14.5" y="7" width="3.5" height="14" rx="0.75" fill="#EA580C" />
          {/* Diagonal Arrow Up-Right */}
          <path
            d="M13.5 5h6v6m0-6L11 13.5"
            fill="none"
            stroke="#DC2626"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  // 4. NRI & Foreign Income ITR: Globe with Longitude/Latitude Lines
  if (normId === 'nri-foreign-income-itr') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#F3E8FF] flex items-center justify-center shrink-0">
        <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-[#7C3AED] stroke-[2]" />
      </div>
    );
  }

  // 5. Revised / Belated Return & ITR-U: Crimson Document with Lines
  if (normId === 'revised-belated-itr') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#FFE4E6] flex items-center justify-center shrink-0">
        <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-[#E11D48] stroke-[2]" />
      </div>
    );
  }

  // 6. Tax Planning & Consultation: Two People / Advisory Silhouette
  if (normId === 'tax-planning-consultation' || normId === 'strategic-tax-planning-consultation') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#D8F3E5] flex items-center justify-center shrink-0">
        <Users className="w-7 h-7 sm:w-8 sm:h-8 text-[#0D8A58] stroke-[2]" />
      </div>
    );
  }

  // GST Compliance Sub-services
  if (normId === 'gst-registration') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#D8F3E5] flex items-center justify-center shrink-0">
        <FileCheck2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#0D8A58] stroke-[2]" />
      </div>
    );
  }
  if (normId === 'gst-monthly-quarterly-filing') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#E0F2FE] flex items-center justify-center shrink-0">
        <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-[#0284C7] stroke-[2]" />
      </div>
    );
  }
  if (normId === 'gst-annual-return-gstr9') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#F3E8FF] flex items-center justify-center shrink-0">
        <FileSpreadsheet className="w-7 h-7 sm:w-8 sm:h-8 text-[#7C3AED] stroke-[2]" />
      </div>
    );
  }
  if (normId === 'gst-lut-export-refund') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#FFEDD5] flex items-center justify-center shrink-0">
        <Send className="w-7 h-7 sm:w-8 sm:h-8 text-[#EA580C] stroke-[2]" />
      </div>
    );
  }
  if (normId === 'gst-notice-cancellation-revocation') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#FFE4E6] flex items-center justify-center shrink-0">
        <ShieldAlert className="w-7 h-7 sm:w-8 sm:h-8 text-[#E11D48] stroke-[2]" />
      </div>
    );
  }

  // Loans & Finance Sub-services
  if (normId === 'personal-loans') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#D8F3E5] flex items-center justify-center shrink-0">
        <User className="w-7 h-7 sm:w-8 sm:h-8 text-[#0D8A58] stroke-[2]" />
      </div>
    );
  }
  if (normId === 'business-loans') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#E0F2FE] flex items-center justify-center shrink-0">
        <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#0284C7] stroke-[2]" />
      </div>
    );
  }
  if (normId === 'home-loans') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#FFEDD5] flex items-center justify-center shrink-0">
        <Home className="w-7 h-7 sm:w-8 sm:h-8 text-[#EA580C] stroke-[2]" />
      </div>
    );
  }
  if (normId === 'vehicle-loans') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#F3E8FF] flex items-center justify-center shrink-0">
        <Car className="w-7 h-7 sm:w-8 sm:h-8 text-[#7C3AED] stroke-[2]" />
      </div>
    );
  }
  if (normId === 'loan-against-property') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#FEF3C7] flex items-center justify-center shrink-0">
        <Landmark className="w-7 h-7 sm:w-8 sm:h-8 text-[#D97706] stroke-[2]" />
      </div>
    );
  }
  if (normId === 'working-capital-finance') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#D8F3E5] flex items-center justify-center shrink-0">
        <Wallet className="w-7 h-7 sm:w-8 sm:h-8 text-[#0D8A58] stroke-[2]" />
      </div>
    );
  }

  // Tax Notices & Scrutiny
  if (normId === 'income-tax-notice-reply') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#FFE4E6] flex items-center justify-center shrink-0">
        <FileWarning className="w-7 h-7 sm:w-8 sm:h-8 text-[#E11D48] stroke-[2]" />
      </div>
    );
  }
  if (normId === 'ais-tis-demand-resolution') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#E0F2FE] flex items-center justify-center shrink-0">
        <Sliders className="w-7 h-7 sm:w-8 sm:h-8 text-[#0284C7] stroke-[2]" />
      </div>
    );
  }
  if (normId === 'cit-appeals-faceless-scrutiny') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#F3E8FF] flex items-center justify-center shrink-0">
        <Scale className="w-7 h-7 sm:w-8 sm:h-8 text-[#7C3AED] stroke-[2]" />
      </div>
    );
  }

  // ROC & Corporate
  if (normId === 'company-llp-annual-filing') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#E0F2FE] flex items-center justify-center shrink-0">
        <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#0284C7] stroke-[2]" />
      </div>
    );
  }
  if (normId === 'director-kyc-mca-changes') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#D8F3E5] flex items-center justify-center shrink-0">
        <User className="w-7 h-7 sm:w-8 sm:h-8 text-[#0D8A58] stroke-[2]" />
      </div>
    );
  }
  if (normId === 'business-incorporation-setup') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#FFEDD5] flex items-center justify-center shrink-0">
        <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-[#EA580C] stroke-[2]" />
      </div>
    );
  }

  // Accounting & Advisory
  if (normId === 'bookkeeping-financial-finalization') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#E0F2FE] flex items-center justify-center shrink-0">
        <Calculator className="w-7 h-7 sm:w-8 sm:h-8 text-[#0284C7] stroke-[2]" />
      </div>
    );
  }
  if (normId === 'cma-data-bank-loan-projects') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#FFEDD5] flex items-center justify-center shrink-0">
        <LineChart className="w-7 h-7 sm:w-8 sm:h-8 text-[#EA580C] stroke-[2]" />
      </div>
    );
  }

  // Law & Legal
  if (normId === 'legal-letters-debtors-recovery') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#FEF3C7] flex items-center justify-center shrink-0">
        <Scale className="w-7 h-7 sm:w-8 sm:h-8 text-[#D97706] stroke-[2]" />
      </div>
    );
  }

  // Other Services
  if (normId === 'msme-udyam-registration') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#D8F3E5] flex items-center justify-center shrink-0">
        <Award className="w-7 h-7 sm:w-8 sm:h-8 text-[#0D8A58] stroke-[2]" />
      </div>
    );
  }
  if (normId === 'trade-fssai-licence') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#FFEDD5] flex items-center justify-center shrink-0">
        <Store className="w-7 h-7 sm:w-8 sm:h-8 text-[#EA580C] stroke-[2]" />
      </div>
    );
  }
  if (normId === 'pan-tan-dsc-services') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#E0F2FE] flex items-center justify-center shrink-0">
        <CreditCard className="w-7 h-7 sm:w-8 sm:h-8 text-[#0284C7] stroke-[2]" />
      </div>
    );
  }
  if (normId === 'import-export-code-iec') {
    return (
      <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#F3E8FF] flex items-center justify-center shrink-0">
        <Ship className="w-7 h-7 sm:w-8 sm:h-8 text-[#7C3AED] stroke-[2]" />
      </div>
    );
  }

  // Fallback for any newly added service
  return (
    <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#D8F3E5] flex items-center justify-center shrink-0">
      <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-[#0D8A58] stroke-[2]" />
    </div>
  );
};

export const SubServiceCard: React.FC<SubServiceCardProps> = React.memo(({
  subService,
  isSelected = false,
  onSelect,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect) onSelect(subService);
    if (onClick) onClick(subService);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onSelect) onSelect(subService);
      if (onClick) onClick(subService);
    }
  };

  return (
    <div
      id={`subservice-card-${subService.id}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Select ${subService.title}`}
      className={`p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl cursor-pointer text-left transition-all duration-150 flex flex-col justify-start relative touch-manipulation active:scale-[0.98] select-none bg-white border shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20BA68] ${
        isSelected
          ? 'border-[#20BA68] ring-2 ring-[#20BA68]/20'
          : 'border-[#ECE7DE] hover:border-[#20BA68]'
      }`}
    >
      {/* Top: Circular Pale-Tinted Icon */}
      <div className="shrink-0 mb-2 sm:mb-2.5">
        {renderSubServiceIcon(subService.id, subService.title)}
      </div>

      {/* Bottom: Service Title & Subtle Pale-Mint Chevron Indicator */}
      <div className="flex items-end justify-between gap-1.5 w-full mt-0">
        <h3 className="font-bold sm:font-extrabold text-[13px] sm:text-[15px] md:text-[16px] text-[#081E23] leading-snug tracking-tight text-left break-words flex-1">
          {subService.title}
        </h3>

        {/* Pale-Mint Circular Chevron Indicator */}
        <div
          className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#E8F8F0] flex items-center justify-center shrink-0 ml-1 shadow-2xs"
          aria-hidden="true"
        >
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16A34A] stroke-[3]" />
        </div>
      </div>
    </div>
  );
});

SubServiceCard.displayName = 'SubServiceCard';
