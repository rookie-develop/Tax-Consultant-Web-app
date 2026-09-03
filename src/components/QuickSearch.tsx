import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { ServiceCategory, SubService } from '../types';

interface QuickSearchProps {
  categories: ServiceCategory[];
  onSelectSubService: (category: ServiceCategory, subService: SubService) => void;
}

export const QuickSearch: React.FC<QuickSearchProps> = ({
  categories,
  onSelectSubService,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    const results: { category: ServiceCategory; subService: SubService }[] = [];

    categories.forEach((category) => {
      category.subServices.forEach((sub) => {
        const matchTitle = sub.title.toLowerCase().includes(q);
        const matchDesc = sub.shortDesc.toLowerCase().includes(q);
        const matchHighlights = sub.keyHighlights.some((h) => h.toLowerCase().includes(q));
        const matchCategory = category.title.toLowerCase().includes(q);

        if (matchTitle || matchDesc || matchHighlights || matchCategory) {
          results.push({ category, subService: sub });
        }
      });
    });

    return results;
  }, [query, categories]);

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-6 sm:mb-8">
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <input
          id="input-quick-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setQuery('');
          }}
          placeholder="Search compliance service (e.g. Salary ITR, GST, Notice, Trading)..."
          className="w-full pl-10 sm:pl-11 pr-12 py-3.5 sm:py-4 bg-white border border-[#E2DDD2] rounded-2xl text-sm sm:text-base font-medium text-[#0F201C] placeholder:text-[#889B96] focus:outline-none focus:ring-2 focus:ring-[#23A87B] focus:border-[#23A87B] shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all touch-manipulation"
        />
        {query && (
          <button
            id="btn-clear-search"
            type="button"
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-3 pl-2 flex items-center justify-center text-[#889B96] hover:text-[#0F201C] cursor-pointer min-w-[44px] min-h-[44px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23A87B] rounded-r-2xl"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Instant Search Results Dropdown */}
      {query.trim() && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl border-2 border-[#23A87B] shadow-xl z-20 max-h-[55vh] sm:max-h-80 overflow-y-auto p-1.5 sm:p-2 space-y-1 overscroll-contain">
          {searchResults.length > 0 ? (
            searchResults.map(({ category, subService }) => (
              <button
                key={`${category.id}-${subService.id}`}
                id={`search-result-${subService.id}`}
                type="button"
                onClick={() => {
                  onSelectSubService(category, subService);
                  setQuery('');
                }}
                className="w-full text-left p-2.5 sm:p-3 rounded-xl hover:bg-[#F4F0E8] active:bg-[#ECE5D8] border border-transparent hover:border-[#E2DDD2] transition-all flex items-center justify-between gap-2.5 group cursor-pointer min-h-[48px] touch-manipulation"
              >
                <div className="min-w-0 flex-1 pr-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="text-[9px] sm:text-[10px] uppercase font-black px-2 py-0.5 rounded-md bg-[#23A87B]/15 text-[#14664B] shrink-0">
                      {category.shortTitle}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-[#0F201C] group-hover:text-[#23A87B] truncate">
                      {subService.title}
                    </h5>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#5C6E6A] line-clamp-1 mt-0.5">
                    {subService.shortDesc}
                  </p>
                </div>
                <div className="shrink-0 flex items-center space-x-1 text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#23A87B] group-hover:text-[#1E9E73]">
                  <span className="hidden min-[380px]:inline">Select</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-xs text-[#5C6E6A] font-medium">
              No matching service found for &ldquo;{query}&rdquo;. Browse categories or request direct WhatsApp assistance.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

