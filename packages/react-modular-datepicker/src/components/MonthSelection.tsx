import React from 'react';
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
  const isMonthDisabled = (monthIdx: number) => {
    if (minDate && year === minDate.getFullYear() && monthIdx < minDate.getMonth()) {
      return true;
    }
    if (maxDate && year === maxDate.getFullYear() && monthIdx > maxDate.getMonth()) {
      return true;
    }
    return false;
  };

  const gridClassName = ['rmd-months-grid', classNames?.monthsGrid].filter(Boolean).join(' ');

  return (
    <div className={gridClassName}>
      {monthNames.map((name, idx) => {
        const disabled = isMonthDisabled(idx);
        const isSelected = idx === month;
        const buttonClassName = [
          'rmd-month-button',
          isSelected ? 'rmd-month-button-selected' : 'rmd-month-button-unselected',
          classNames?.monthButton,
          isSelected ? classNames?.monthButtonSelected : classNames?.monthButtonUnselected,
        ].filter(Boolean).join(' ');

        return (
          <button
            key={name}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => !disabled && onMonthSelect(idx)}
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
