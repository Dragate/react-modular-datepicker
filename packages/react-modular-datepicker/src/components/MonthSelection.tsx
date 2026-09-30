import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { CalendarClassNames } from '../types';

/** Props for MonthSelection component */
interface MonthSelectionProps {
  /** Target year number */
  year: number;
  /** Currently active month index (0-11) */
  month: number;
  /** Array of localized month names */
  monthNames: string[];
  /** Optional lower date bound */
  minDate?: Date | null;
  /** Optional upper date bound */
  maxDate?: Date | null;
  /** Callback fired when user selects a month */
  onMonthSelect: (month: number) => void;
  /** Class name customization object */
  classNames?: CalendarClassNames;
}

/**
 * Month selection view grid component.
 * Allows switching to a specific month in 3x4 grid layout with keyboard navigation support.
 */
export const MonthSelection: React.FC<MonthSelectionProps> = ({
  year,
  month,
  monthNames,
  minDate,
  maxDate,
  onMonthSelect,
  classNames,
}) => {
  const [focusedMonth, setFocusedMonth] = useState<number>(month);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    buttonRefs.current[focusedMonth]?.focus();
  }, [focusedMonth]);

  // Checks minDate and maxDate limits for specific month option
  const isMonthDisabled = (monthIdx: number) => {
    if (minDate && year === minDate.getFullYear() && monthIdx < minDate.getMonth()) {
      return true;
    }
    if (maxDate && year === maxDate.getFullYear() && monthIdx > maxDate.getMonth()) {
      return true;
    }
    return false;
  };

  // Keyboard navigation across 3x4 grid using Arrow keys, Home, and End
  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIndex = focusedMonth;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = (idx - 1 + 12) % 12;
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = (idx + 1) % 12;
        break;
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = (idx - 3 + 12) % 12;
        break;
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (idx + 3) % 12;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = 11;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isMonthDisabled(idx)) {
          onMonthSelect(idx);
        }
        return;
      default:
        return;
    }

    setFocusedMonth(nextIndex);
  };

  const gridClassName = clsx('rmd-months-grid', classNames?.monthsGrid);

  return (
    <div
      role="grid"
      aria-label="Select month"
      className={gridClassName}
    >
      {monthNames.map((name, idx) => {
        const disabled = isMonthDisabled(idx);
        const isSelected = idx === month;
        const isFocused = idx === focusedMonth;
        const buttonClassName = clsx(
          'rmd-month-button',
          isSelected ? 'rmd-month-button-selected' : 'rmd-month-button-unselected',
          classNames?.monthButton,
          isSelected ? classNames?.monthButtonSelected : classNames?.monthButtonUnselected
        );

        return (
          <button
            key={name}
            ref={(el) => {
              buttonRefs.current[idx] = el;
            }}
            role="gridcell"
            aria-selected={isSelected}
            aria-disabled={disabled}
            tabIndex={isFocused ? 0 : -1}
            onClick={() => !disabled && onMonthSelect(idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onFocus={() => setFocusedMonth(idx)}
            className={buttonClassName}
            disabled={disabled}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};
