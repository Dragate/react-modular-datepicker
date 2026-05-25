import React from 'react';
import { CalendarClassNames } from '../types';
import { ChevronLeftIcon } from './CalendarHeader';

interface MonthSelectionProps {
  year: number;
  month: number;
  monthNames: string[];
  minDate?: Date | null;
  maxDate?: Date | null;
  onMonthSelect: (month: number) => void;
  classNames: Required<CalendarClassNames>;
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

  return (
    <div className={classNames.monthsGrid}>
      {monthNames.map((name, idx) => {
        const disabled = isMonthDisabled(idx);
        return (
          <button
            key={name}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => !disabled && onMonthSelect(idx)}
            className={`${classNames.monthButton} ${idx === month ? classNames.monthButtonSelected : classNames.monthButtonUnselected}`}
            disabled={disabled}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};
