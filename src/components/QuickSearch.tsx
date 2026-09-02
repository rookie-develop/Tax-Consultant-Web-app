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
          className="w-full pl-10 sm:pl-11 pr-12 py-3 sm:py-3.5 bg-white border border-slate-300 rounded-xl text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-2xs transition-all touch-manipulation"
        />
        {query && (
          <button
            id="btn-clear-search"
            type="button"
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-3 pl-2 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer min-w-[44px] min-h-[44px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-r-xl"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Instant Search Results Dropdown */}
      {query.trim() && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl border-2 border-emerald-500 shadow-xl z-20 max-h-[55vh] sm:max-h-80 overflow-y-auto p-1.5 sm:p-2 space-y-1 overscroll-contain">
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
                className="w-full text-left p-2.5 sm:p-3 rounded-lg hover:bg-emerald-50/70 active:bg-emerald-100/70 border border-transparent hover:border-emerald-200 transition-all flex items-center justify-between gap-2.5 group cursor-pointer min-h-[48px] touch-manipulation"
              >
                <div className="min-w-0 flex-1 pr-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="text-[9px] sm:text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0">
                      {category.shortTitle}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-950 truncate">
                      {subService.title}
                    </h5>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {subService.shortDesc}
                  </p>
                </div>
                <div className="shrink-0 flex items-center space-x-1 text-[11px] sm:text-xs font-black uppercase tracking-wider text-emerald-600 group-hover:text-emerald-700">
                  <span className="hidden min-[380px]:inline">Select</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-xs text-slate-500 font-medium">
              No matching service found for &ldquo;{query}&rdquo;. Browse categories or request direct WhatsApp assistance.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

