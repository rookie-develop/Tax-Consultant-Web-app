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
      className={`p-5 sm:p-6 rounded-2xl cursor-pointer text-left transition-all duration-150 flex flex-col justify-between relative touch-manipulation active:scale-[0.99] select-none min-h-[140px] sm:min-h-[150px] ${
        isSelected
          ? 'border-2 border-[#23A87B] bg-white shadow-md ring-2 ring-[#23A87B]/20'
          : 'border border-[#E2DDD2] bg-white hover:border-[#23A87B] shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:shadow-sm'
      }`}
    >
      <div className="mb-4">
        <h4 className="font-extrabold text-lg sm:text-xl text-[#0F201C] mb-1.5 leading-snug break-words">
          {subService.title}
        </h4>
        <p className="text-xs sm:text-sm text-[#5C6E6A] font-medium leading-relaxed">
          {subService.shortDesc}
        </p>
      </div>

      {/* Clean Select Button */}
      <button
        id={`btn-select-subservice-${subService.id}`}
        type="button"
        className={`w-full py-2.5 sm:py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer min-h-[44px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23A87B] ${
          isSelected
            ? 'bg-[#23A87B] text-white shadow-xs'
            : 'bg-[#081E23] hover:bg-[#23A87B] text-white shadow-xs'
        }`}
      >
        <span>Select Service</span>
        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};


