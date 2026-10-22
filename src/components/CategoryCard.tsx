import React from 'react';
import {
  FileText,
  Receipt,
  PieChart,
  Building2,
  ShieldAlert,
  Calculator,
  Briefcase,
  Scale,
  Landmark,
  IndianRupee,
  ReceiptIndianRupee,
} from 'lucide-react';
import { ServiceCategory } from '../types';

interface CategoryCardProps {
  category: ServiceCategory;
  isSelected: boolean;
  onSelect: (category: ServiceCategory) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Receipt,
  PieChart,
  Building2,
  ShieldAlert,
  Calculator,
  Briefcase,
  Scale,
  Landmark,
  IndianRupee,
  ReceiptIndianRupee,
};

// Curated pastel icon backgrounds and border accents matching the approved mockup visual direction
const pastelStyles: Record<string, { bg: string; text: string; border: string }> = {
  'itr-services': { bg: 'bg-[#EBF3FF]', text: 'text-[#1D63ED]', border: 'border-[#D0E2FF]' },
  'gst-compliance': { bg: 'bg-[#E6F9F0]', text: 'text-[#0E9355]', border: 'border-[#BFF2DA]' },
  'loans-finance': { bg: 'bg-[#E6F7F7]', text: 'text-[#0E8A8A]', border: 'border-[#B8ECEC]' },
  'tax-notices-scrutiny': { bg: 'bg-[#FEECEF]', text: 'text-[#D92546]', border: 'border-[#FDC9D2]' },
  'corporate-roc-compliance': { bg: 'bg-[#EEF0FE]', text: 'text-[#4F5AE5]', border: 'border-[#D8DCFC]' },
  'accounting-advisory': { bg: 'bg-[#F4EFFE]', text: 'text-[#7C3AED]', border: 'border-[#E3D5FC]' },
  'law-legal': { bg: 'bg-[#FEF6E6]', text: 'text-[#B45309]', border: 'border-[#FDE5B3]' },
  'other-services': { bg: 'bg-[#EBF7F9]', text: 'text-[#088395]', border: 'border-[#BFE5EB]' },
};

export const CategoryCard: React.FC<CategoryCardProps> = React.memo(({
  category,
  isSelected,
  onSelect,
}) => {
  const IconComponent = iconMap[category.iconName] || FileText;
  const pastel = pastelStyles[category.id] || {
    bg: 'bg-emerald-50',
    text: 'text-[#1E9E73]',
    border: 'border-emerald-200',
  };

  return (
    <button
      type="button"
      id={`category-card-${category.id}`}
      onClick={() => onSelect(category)}
      className={`w-full flex flex-col items-center justify-center bg-white rounded-2xl p-2.5 sm:p-3.5 md:p-4 text-center group transition-all duration-150 cursor-pointer overflow-hidden touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23A87B] active:scale-[0.96] min-h-[102px] sm:min-h-[118px] md:min-h-[128px] ${
        isSelected
          ? 'border-2 border-[#23A87B] shadow-md ring-2 ring-[#23A87B]/20'
          : 'border border-[#E5E0D5] hover:border-[#23A87B] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-sm'
      }`}
    >
      {/* Pastel Icon Box */}
      <div
        className={`w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-2xl flex items-center justify-center shrink-0 mb-1.5 sm:mb-2 transition-transform duration-200 group-hover:scale-105 border ${
          pastel.bg
        } ${pastel.border}`}
      >
        <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${pastel.text} stroke-[2.2]`} />
      </div>

      {/* Title */}
      <span className="font-extrabold text-[11px] sm:text-xs md:text-sm text-[#0F201C] group-hover:text-[#1E9E73] transition-colors leading-tight line-clamp-2 px-0.5">
        {category.title}
      </span>
    </button>
  );
});

CategoryCard.displayName = 'CategoryCard';
