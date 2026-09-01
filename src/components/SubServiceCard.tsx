import React from 'react';
import { Check, ArrowRight, MessageCircle } from 'lucide-react';
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
      className={`p-4 sm:p-5 md:p-6 rounded-xl cursor-pointer text-left transition-all duration-150 flex flex-col justify-between relative touch-manipulation active:scale-[0.99] select-none h-full ${
        isSelected
          ? 'border-2 border-emerald-500 bg-emerald-50/30 shadow-sm'
          : 'border border-slate-200 bg-white hover:bg-slate-50/80 hover:border-slate-300 shadow-2xs hover:shadow-xs'
      }`}
    >
      {/* Top indicator & badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div
            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-colors shrink-0 ${
              isSelected
                ? 'bg-emerald-500 text-white'
                : 'border-2 border-slate-300 bg-white'
            }`}
          >
            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>

          {subService.badge && (
            <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
              {subService.badge}
            </span>
          )}
        </div>

        {/* Title & description */}
        <h4 className="font-black text-base sm:text-lg text-slate-900 mb-1 leading-snug break-words">
          {subService.title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed font-medium break-words">
          {subService.shortDesc}
        </p>

        {/* Highlights */}
        <div className="bg-slate-50/90 rounded-lg p-3 border border-slate-100 mb-5">
          <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
            Coverage Scope:
          </p>
          <ul className="space-y-1.5">
            {subService.keyHighlights.map((highlight, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-xs text-slate-700 font-medium"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                <span className="break-words leading-tight">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Button Action */}
      <button
        id={`btn-select-subservice-${subService.id}`}
        type="button"
        className={`w-full py-3 px-4 rounded-lg font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer min-h-[46px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
          isSelected
            ? 'bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-900 shadow-sm'
            : 'bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white'
        }`}
      >
        <MessageCircle className="w-4 h-4 fill-current shrink-0" />
        <span className="whitespace-nowrap">Generate WhatsApp Request</span>
        <ArrowRight className="w-4 h-4 shrink-0" />
      </button>
    </div>
  );
};

