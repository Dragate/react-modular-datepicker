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
  const buttonRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

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
    const btn = buttonRefs.current.get(focusedYear);
    if (btn) {
      btn.focus();
    }
  }, [focusedYear]);

  const handleKeyDown = (e: React.KeyboardEvent, y: number) => {
    let nextYear = focusedYear;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        nextYear = Math.max(startYear, y - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextYear = Math.min(endYear, y + 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        nextYear = Math.max(startYear, y - 3);
        break;
      case 'ArrowDown':
        e.preventDefault();
        nextYear = Math.min(endYear, y + 3);
        break;
      case 'PageUp':
        e.preventDefault();
        nextYear = Math.max(startYear, y - 10);
        break;
      case 'PageDown':
        e.preventDefault();
        nextYear = Math.min(endYear, y + 10);
        break;
      case 'Home':
        e.preventDefault();
        nextYear = startYear;
        break;
      case 'End':
        e.preventDefault();
        nextYear = endYear;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onYearSelect(y);
        return;
      default:
        return;
    }

    setFocusedYear(nextYear);
  };

  return (
    <div
      ref={yearListRef}
      role="grid"
      aria-label="Select year"
      className={clsx('rmd-years-grid', classNames?.yearsGrid)}
    >
      {years.map((y) => {
        const isSelected = y === year;
        const isFocused = y === focusedYear;
        const buttonClassName = clsx(
          'rmd-year-button',
          isSelected ? 'rmd-year-button-selected' : 'rmd-year-button-unselected',
          classNames?.yearButton,
          isSelected ? classNames?.yearButtonSelected : classNames?.yearButtonUnselected
        );

        return (
          <button
            key={y}
            ref={(el) => {
              if (el) buttonRefs.current.set(y, el);
              else buttonRefs.current.delete(y);
            }}
            data-selected={isSelected}
            role="gridcell"
            aria-selected={isSelected}
            tabIndex={isFocused ? 0 : -1}
            onClick={() => onYearSelect(y)}
            onKeyDown={(e) => handleKeyDown(e, y)}
            onFocus={() => setFocusedYear(y)}
            className={buttonClassName}
          >
            {y}
          </button>
        );
      })}
    </div>
  );
};
