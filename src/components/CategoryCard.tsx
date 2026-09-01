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
      className={`w-full flex items-center justify-between p-4 sm:p-5 bg-white rounded-xl text-left group transition-all duration-150 cursor-pointer min-h-[80px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-[0.99] ${
        isSelected
          ? 'border-2 border-emerald-500 shadow-sm bg-emerald-50/25'
          : 'border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 shadow-2xs hover:shadow-xs'
      }`}
    >
      <div className="flex flex-col pr-2.5 sm:pr-3 flex-1 min-w-0">
        <div className="flex items-center space-x-2 sm:space-x-2.5 mb-1">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
              isSelected
                ? 'bg-emerald-500 text-slate-900'
                : 'bg-slate-900 text-white group-hover:bg-slate-800'
            }`}
          >
            <IconComponent className="w-4 h-4" />
          </div>
          <span className="font-black text-base sm:text-lg text-slate-900 group-hover:text-emerald-950 transition-colors break-words leading-tight">
            {category.title}
          </span>
        </div>
        <div className="flex items-center space-x-2 mt-0.5">
          <span className="text-[10px] sm:text-[11px] text-emerald-700 font-black uppercase tracking-wider">
            {category.shortTitle}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-[10px] sm:text-[11px] text-slate-500 font-bold">
            {category.subServices.length} Services
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed break-words font-medium">
          {category.tagline}
        </p>
      </div>

      <div
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all group-hover:translate-x-0.5 ml-2 ${
          isSelected
            ? 'bg-emerald-500 text-slate-900 shadow-xs'
            : 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100 group-hover:text-emerald-800'
        }`}
      >
        <ArrowRight className="w-4 h-4 font-bold" />
      </div>
    </button>
  );
};

