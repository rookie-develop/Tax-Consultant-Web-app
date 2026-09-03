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
  ArrowRight,
} from 'lucide-react';
import { ServiceCategory } from '../types';

interface CategoryCardProps {
  category: ServiceCategory;
  isSelected: boolean;
  onSelect: (category: ServiceCategory) => void;
}

const iconMap = {
  FileText,
  Receipt,
  PieChart,
  Building2,
  ShieldAlert,
  Calculator,
  Briefcase,
  Scale,
  Landmark,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onSelect,
}) => {
  const IconComponent = iconMap[category.iconName] || FileText;

  return (
    <button
      type="button"
      id={`category-card-${category.id}`}
      onClick={() => onSelect(category)}
      className={`w-full flex items-center justify-between bg-white rounded-2xl text-left group transition-all duration-150 cursor-pointer overflow-hidden touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23A87B] active:scale-[0.99] min-h-[78px] sm:min-h-[86px] ${
        isSelected
          ? 'border-2 border-[#23A87B] shadow-md ring-2 ring-[#23A87B]/20'
          : 'border border-[#E2DDD2] hover:border-[#23A87B] shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:shadow-sm'
      }`}
    >
      <div className="flex items-center flex-1 min-w-0 self-stretch">
        {/* Full-height Left Green Accent Block matching user reference image */}
        <div
          className={`w-14 sm:w-16 md:w-18 shrink-0 flex items-center justify-center self-stretch transition-colors ${
            isSelected
              ? 'bg-[#1E9E73]'
              : 'bg-[#23A87B] group-hover:bg-[#1E9E73]'
          }`}
        >
          <IconComponent className="w-6 h-6 text-[#063326] stroke-[2.2]" />
        </div>

        {/* Text Section */}
        <div className="flex flex-col min-w-0 flex-1 py-3.5 sm:py-4 px-3.5 sm:px-5">
          <span className="font-extrabold text-base sm:text-lg text-[#0F201C] group-hover:text-[#1E9E73] transition-colors break-words leading-snug">
            {category.title}
          </span>
          <p className="text-xs sm:text-sm text-[#5C6E6A] font-medium truncate mt-0.5">
            {category.tagline}
          </p>
        </div>
      </div>

      {/* Retained Arrow Icon */}
      <div className="pr-3.5 sm:pr-5 shrink-0">
        <div
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all group-hover:translate-x-0.5 ${
            isSelected
              ? 'bg-[#23A87B] text-white shadow-xs'
              : 'bg-[#F2ECE1] text-[#23A87B] group-hover:bg-[#23A87B] group-hover:text-white'
          }`}
        >
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </div>
      </div>
    </button>
  );
};


