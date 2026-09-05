import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { ServiceCategory, SubService } from '../types';

interface SearchBarProps {
  categories: ServiceCategory[];
  onSelectService: (category: ServiceCategory, subService: SubService) => void;
  placeholder?: string;
  autoFocus?: boolean;
  onClose?: () => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  categories,
  onSelectService,
  placeholder = 'Search for a service...',
  autoFocus = false,
  onClose,
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus if requested (e.g. on mobile expand)
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Forgiving search across categories and their sub-services
  const searchResults = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return [];

    const results: { category: ServiceCategory; subService: SubService; score: number }[] = [];

    categories.forEach((cat) => {
      const catTitle = cat.title.toLowerCase();
      const catShort = cat.shortTitle.toLowerCase();
      const catTagline = cat.tagline.toLowerCase();
      const isCatMatch =
        catTitle.includes(cleanQuery) ||
        catShort.includes(cleanQuery) ||
        catTagline.includes(cleanQuery);

      cat.subServices.forEach((sub) => {
        const subTitle = sub.title.toLowerCase();
        const subDesc = sub.shortDesc.toLowerCase();
        const subHighlights = sub.keyHighlights.join(' ').toLowerCase();

        let score = 0;

        if (subTitle.startsWith(cleanQuery)) {
          score += 100;
        } else if (subTitle.includes(cleanQuery)) {
          score += 60;
        } else if (isCatMatch) {
          score += 40;
        } else if (subDesc.includes(cleanQuery)) {
          score += 30;
        } else if (subHighlights.includes(cleanQuery)) {
          score += 20;
        }

        if (score > 0) {
          results.push({ category: cat, subService: sub, score });
        }
      });
    });

    return results.sort((a, b) => b.score - a.score).slice(0, 7);
  }, [categories, query]);

  const handleSelect = (category: ServiceCategory, subService: SubService) => {
    onSelectService(category, subService);
    setQuery('');
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Input Box */}
      <div className="relative flex items-center w-full">
        <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-[#5C6E6A]">
          <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false);
              if (onClose && !query) onClose();
            }
          }}
          placeholder={placeholder}
          className="w-full pl-10 sm:pl-11 pr-16 sm:pr-20 py-2.5 sm:py-3.5 bg-white border border-[#E2DDD2] rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-medium text-[#0F201C] placeholder:text-[#889B96] focus:outline-none focus:ring-2 focus:ring-[#23A87B] focus:border-[#23A87B] shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all touch-manipulation"
        />

        {/* Action buttons on the right */}
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center space-x-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 sm:p-1.5 text-[#889B96] hover:text-[#0F201C] active:scale-95 rounded-full transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1 text-[11px] sm:text-xs font-bold text-[#5C6E6A] hover:text-[#0F201C] bg-[#ECE5D8] hover:bg-[#E2DDD2] active:scale-95 rounded-lg transition-colors cursor-pointer"
              aria-label="Close search"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Results Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl sm:rounded-2xl border-2 border-[#23A87B] shadow-xl z-30 max-h-[55vh] sm:max-h-80 overflow-y-auto p-1.5 sm:p-2 space-y-1 overscroll-contain">
          {searchResults.length > 0 ? (
            searchResults.map(({ category, subService }) => (
              <button
                key={`${category.id}-${subService.id}`}
                type="button"
                onClick={() => handleSelect(category, subService)}
                className="w-full text-left p-2.5 sm:p-3 rounded-lg sm:rounded-xl hover:bg-[#F4F0E8] active:bg-[#ECE5D8] border border-transparent hover:border-[#E2DDD2] transition-all flex items-center justify-between gap-2.5 group cursor-pointer min-h-[48px] touch-manipulation"
              >
                <div className="min-w-0 flex-1 pr-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-0.5">
                    <span className="text-[9px] sm:text-[10px] uppercase font-black px-2 py-0.5 rounded-md bg-[#23A87B]/15 text-[#14664B] shrink-0">
                      {category.shortTitle}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-[#0F201C] group-hover:text-[#23A87B] truncate">
                      {subService.title}
                    </h5>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#5C6E6A] line-clamp-1">
                    {subService.shortDesc}
                  </p>
                </div>

                <div className="shrink-0 flex items-center space-x-1 text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#23A87B] group-hover:text-[#1E9E73]">
                  <span className="hidden min-[380px]:inline">Select</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-xs sm:text-sm text-[#5C6E6A] font-medium">
              No matching service found for &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
