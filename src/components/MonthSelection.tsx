import React from 'react';
import { CalendarClassNames } from '../types';
import { ChevronLeftIcon } from './CalendarHeader';

interface MonthSelectionProps {
  year: number;
  month: number;
  monthNames: string[];
  onMonthSelect: (month: number) => void;
  onBack: () => void;
  classNames: Required<CalendarClassNames>;
}

export const MonthSelection: React.FC<MonthSelectionProps> = ({
  year,
  month,
  monthNames,
  onMonthSelect,
  onBack,
  classNames,
}) => {
  return (
    <div className={classNames.monthsRoot}>
      <div className={classNames.monthsHeader}>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={onBack}
          className={classNames.monthsBackButton}
        >
          <ChevronLeftIcon />
        </button>
        <div className={classNames.monthsYearLabel}>{year}</div>
        <div className="w-9" />
      </div>
      <div className={classNames.monthsGrid}>
        {monthNames.map((name, idx) => (
          <button
            key={name}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onMonthSelect(idx)}
            className={`${classNames.monthButton} ${idx === month ? classNames.monthButtonSelected : classNames.monthButtonUnselected}`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};
