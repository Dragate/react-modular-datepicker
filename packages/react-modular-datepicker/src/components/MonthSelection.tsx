import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { CalendarClassNames } from '../types';

interface MonthSelectionProps {
  year: number;
  month: number;
  monthNames: string[];
  minDate?: Date | null;
  maxDate?: Date | null;
  onMonthSelect: (month: number) => void;
  classNames?: CalendarClassNames;
}

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
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gridRef.current?.querySelector<HTMLButtonElement>('.rmd-month-button[tabindex="0"]')?.focus();
  }, [focusedMonth]);

  const isMonthDisabled = (idx: number) =>
    Boolean((minDate && year === minDate.getFullYear() && idx < minDate.getMonth()) ||
            (maxDate && year === maxDate.getFullYear() && idx > maxDate.getMonth()));

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let step = 0;
    switch (e.key) {
      case 'ArrowLeft': step = -1; break;
      case 'ArrowRight': step = 1; break;
      case 'ArrowUp': step = -3; break;
      case 'ArrowDown': step = 3; break;
      case 'Home': setFocusedMonth(0); e.preventDefault(); return;
      case 'End': setFocusedMonth(11); e.preventDefault(); return;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isMonthDisabled(idx)) onMonthSelect(idx);
        return;
      default: return;
    }
    if (step !== 0) {
      e.preventDefault();
      setFocusedMonth((idx + step + 12) % 12);
    }
  };

  const rows = [];
  for (let i = 0; i < monthNames.length; i += 3) {
    rows.push(monthNames.slice(i, i + 3).map((name, offset) => ({ name, idx: i + offset })));
  }

  return (
    <div
      ref={gridRef}
      role="grid"
      aria-label="Select month"
      className={clsx('rmd-months-grid', classNames?.monthsGrid)}
    >
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} role="row" className="rmd-selection-row">
          {row.map(({ name, idx }) => {
            const disabled = isMonthDisabled(idx);
            const isSelected = idx === month;
            const isFocused = idx === focusedMonth;
            return (
              <button
                key={name}
                role="gridcell"
                aria-selected={isSelected}
                aria-disabled={disabled}
                tabIndex={isFocused ? 0 : -1}
                onClick={() => !disabled && onMonthSelect(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onFocus={() => setFocusedMonth(idx)}
                className={clsx(
                  'rmd-month-button',
                  isSelected ? 'rmd-month-button-selected' : 'rmd-month-button-unselected',
                  classNames?.monthButton,
                  isSelected ? classNames?.monthButtonSelected : classNames?.monthButtonUnselected
                )}
                disabled={disabled}
              >
                {name}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
