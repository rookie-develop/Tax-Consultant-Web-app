import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SubService } from '../types';

interface SubServiceCardProps {
  subService: SubService;
  isSelected: boolean;
  onSelect: (subService: SubService) => void;
}

export const SubServiceCard: React.FC<SubServiceCardProps> = ({
  subService,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      id={`subservice-card-${subService.id}`}
      onClick={() => onSelect(subService)}
      className={`p-5 sm:p-6 rounded-xl cursor-pointer text-left transition-all duration-150 flex flex-col justify-between relative touch-manipulation active:scale-[0.99] select-none min-h-[140px] sm:min-h-[150px] ${
        isSelected
          ? 'border-2 border-emerald-500 bg-emerald-50/25 shadow-sm'
          : 'border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 shadow-2xs hover:shadow-xs'
      }`}
    >
      <div className="mb-4">
        <h4 className="font-black text-lg sm:text-xl text-slate-900 mb-1 leading-snug break-words">
          {subService.title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
          {subService.shortDesc}
        </p>
      </div>

      {/* Clean Select Button */}
      <button
        id={`btn-select-subservice-${subService.id}`}
        type="button"
        className={`w-full py-2.5 sm:py-3 px-4 rounded-lg font-black text-xs uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer min-h-[44px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
          isSelected
            ? 'bg-emerald-500 text-slate-900 shadow-xs'
            : 'bg-slate-900 group-hover:bg-slate-800 text-white'
        }`}
      >
        <span>Select Service</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};


