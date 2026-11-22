'use client';

import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { DATE_RANGES } from './overview-data';

interface OverviewHeaderProps {
  selectedRange?: string;
  onRangeChange?: (range: string) => void;
}

export function OverviewHeader({
  selectedRange = DATE_RANGES[0],
  onRangeChange,
}: OverviewHeaderProps) {
  const [currentRange, setCurrentRange] = useState(selectedRange);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (range: string) => {
    setCurrentRange(range);
    setIsDropdownOpen(false);
    onRangeChange?.(range);
  };

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-[28px]">
          Business overview
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Your store at a glance. Make every day a little smarter.
        </p>
      </div>

      <div className="relative self-start">
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="inline-flex items-center gap-2.5 rounded-md bg-neutral-100 px-4 py-2.5 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200/80"
        >
          <span>{currentRange}</span>
          <ArrowDown className="h-3.5 w-3.5 text-neutral-700" strokeWidth={2} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 z-20 mt-1.5 w-40 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
            {DATE_RANGES.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => handleSelect(range)}
                className={`block w-full px-3.5 py-2 text-left text-xs transition-colors hover:bg-neutral-50 ${
                  currentRange === range
                    ? 'font-semibold text-neutral-950'
                    : 'text-neutral-600'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
