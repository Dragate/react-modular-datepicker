import React, { useEffect, useRef } from 'react';
import { CalendarClassNames, DateAdapter } from '../types';
import { ChevronLeftIcon } from './CalendarHeader';

interface YearSelectionProps {
  year: number;
  minDate?: Date | null;
  maxDate?: Date | null;
  adapter: DateAdapter;
  onYearSelect: (year: number) => void;
  onBack: () => void;
  classNames: Required<CalendarClassNames>;
}

export const YearSelection: React.FC<YearSelectionProps> = ({
  year,
  minDate,
  maxDate,
  adapter,
  onYearSelect,
  onBack,
  classNames,
}) => {
  const yearListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (yearListRef.current) {
      const selectedYearBtn = yearListRef.current.querySelector('[data-selected="true"]');
      if (selectedYearBtn) {
        selectedYearBtn.scrollIntoView({ block: 'center' });
      }
    }
  }, []);

  const startYear = minDate ? adapter.get(adapter.date(minDate), 'year') : year - 50;
  const endYear = maxDate ? adapter.get(adapter.date(maxDate), 'year') : year + 50;
  const years = [];
  for (let y = startYear; y <= endYear; y++) {
    years.push(y);
  }

  return (
    <div className={classNames.yearsRoot}>
      <div className={classNames.yearsHeader}>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={onBack}
          className={classNames.yearsBackButton}
        >
          <ChevronLeftIcon />
        </button>
        <div className={classNames.yearsTitle}>Select Year</div>
        <div className="w-9" />
      </div>
      <div ref={yearListRef} className={classNames.yearsGrid}>
        {years.map((y) => (
          <button
            key={y}
            data-selected={y === year}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onYearSelect(y)}
            className={`${classNames.yearButton} ${y === year ? classNames.yearButtonSelected : classNames.yearButtonUnselected}`}
          >
            {y}
          </button>
        ))}
      </div>
    </div>
  );
};
