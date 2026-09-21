import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { CalendarClassNames, DateAdapter } from '../types';

interface YearSelectionProps {
  year: number;
  minDate?: Date | null;
  maxDate?: Date | null;
  adapter: DateAdapter;
  onYearSelect: (year: number) => void;
  classNames?: CalendarClassNames;
}

export const YearSelection: React.FC<YearSelectionProps> = ({
  year,
  minDate,
  maxDate,
  adapter,
  onYearSelect,
  classNames,
}) => {
  const yearListRef = useRef<HTMLDivElement>(null);
  const [focusedYear, setFocusedYear] = useState<number>(year);

  const startYear = minDate ? adapter.get(adapter.date(minDate), 'year') : year - 50;
  const endYear = maxDate ? adapter.get(adapter.date(maxDate), 'year') : year + 50;
  const years: number[] = [];
  for (let y = startYear; y <= endYear; y++) {
    years.push(y);
  }

  useEffect(() => {
    if (yearListRef.current) {
      const container = yearListRef.current;
      const selectedYearBtn = container.querySelector('[data-selected="true"]') as HTMLElement | null;
      if (selectedYearBtn) {
        const targetScrollTop =
          selectedYearBtn.offsetTop - container.clientHeight / 2 + selectedYearBtn.clientHeight / 2;
        container.scrollTop = Math.max(0, targetScrollTop);
      }
    }
  }, []);

  useEffect(() => {
    yearListRef.current?.querySelector<HTMLButtonElement>('.rmd-year-button[tabindex="0"]')?.focus();
  }, [focusedYear]);

  const handleKeyDown = (e: React.KeyboardEvent, y: number) => {
    let nextYear = focusedYear;
    switch (e.key) {
      case 'ArrowLeft': nextYear = Math.max(startYear, y - 1); break;
      case 'ArrowRight': nextYear = Math.min(endYear, y + 1); break;
      case 'ArrowUp': nextYear = Math.max(startYear, y - 3); break;
      case 'ArrowDown': nextYear = Math.min(endYear, y + 3); break;
      case 'PageUp': nextYear = Math.max(startYear, y - 10); break;
      case 'PageDown': nextYear = Math.min(endYear, y + 10); break;
      case 'Home': nextYear = startYear; break;
      case 'End': nextYear = endYear; break;
      case 'Enter':
      case ' ': e.preventDefault(); onYearSelect(y); return;
      default: return;
    }
    e.preventDefault();
    setFocusedYear(nextYear);
  };

  const rows = [];
  for (let i = 0; i < years.length; i += 3) {
    rows.push(years.slice(i, i + 3));
  }

  return (
    <div
      ref={yearListRef}
      role="grid"
      aria-label="Select year"
      className={clsx('rmd-years-grid', classNames?.yearsGrid)}
    >
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} role="row" className="rmd-selection-row">
          {row.map((y) => {
            const isSelected = y === year;
            const isFocused = y === focusedYear;
            return (
              <button
                key={y}
                data-selected={isSelected}
                role="gridcell"
                aria-selected={isSelected}
                tabIndex={isFocused ? 0 : -1}
                onClick={() => onYearSelect(y)}
                onKeyDown={(e) => handleKeyDown(e, y)}
                onFocus={() => setFocusedYear(y)}
                className={clsx(
                  'rmd-year-button',
                  isSelected ? 'rmd-year-button-selected' : 'rmd-year-button-unselected',
                  classNames?.yearButton,
                  isSelected ? classNames?.yearButtonSelected : classNames?.yearButtonUnselected
                )}
              >
                {y}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
