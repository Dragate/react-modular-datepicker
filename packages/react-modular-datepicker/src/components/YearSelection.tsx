import React, { useEffect, useRef } from 'react';
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

  const gridClassName = clsx('rmd-years-grid', classNames?.yearsGrid);

  return (
    <div ref={yearListRef} className={gridClassName}>
      {years.map((y) => {
        const isSelected = y === year;
        const buttonClassName = clsx(
          'rmd-year-button',
          isSelected ? 'rmd-year-button-selected' : 'rmd-year-button-unselected',
          classNames?.yearButton,
          isSelected ? classNames?.yearButtonSelected : classNames?.yearButtonUnselected
        );

        return (
          <button
            key={y}
            data-selected={isSelected}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onYearSelect(y)}
            className={buttonClassName}
          >
            {y}
          </button>
        );
      })}
    </div>
  );
};
