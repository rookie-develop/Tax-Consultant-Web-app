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
      className={`w-full flex items-center justify-between p-4 sm:p-5 bg-white rounded-xl text-left group transition-all duration-150 cursor-pointer min-h-[84px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-[0.99] ${
        isSelected
          ? 'border-2 border-emerald-500 shadow-sm bg-emerald-50/25'
          : 'border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 shadow-2xs hover:shadow-xs'
      }`}
    >
      <div className="flex items-center space-x-3.5 sm:space-x-4 flex-1 min-w-0 pr-2">
        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
            isSelected
              ? 'bg-emerald-500 text-slate-900'
              : 'bg-slate-900 text-white group-hover:bg-slate-800'
          }`}
        >
          <IconComponent className="w-5 h-5" />
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <span className="font-black text-base sm:text-lg text-slate-900 group-hover:text-emerald-950 transition-colors break-words leading-snug">
            {category.title}
          </span>
          <p className="text-xs sm:text-sm text-slate-500 font-medium truncate mt-0.5">
            {category.tagline}
          </p>
        </div>
      </div>

      <div
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all group-hover:translate-x-0.5 ml-2 ${
          isSelected
            ? 'bg-emerald-500 text-slate-900 shadow-xs'
            : 'bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-700'
        }`}
      >
        <ArrowRight className="w-4 h-4" />
      </div>
    </button>
  );
};


