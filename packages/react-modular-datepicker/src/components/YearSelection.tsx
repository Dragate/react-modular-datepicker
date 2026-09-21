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
      const container = yearListRef.current;
      const selectedYearBtn = container.querySelector('[data-selected="true"]') as HTMLElement | null;
      if (selectedYearBtn) {
        const targetScrollTop =
          selectedYearBtn.offsetTop - container.clientHeight / 2 + selectedYearBtn.clientHeight / 2;
        container.scrollTop = Math.max(0, targetScrollTop);
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
    <div ref={yearListRef} className={clsx('rmd-years-grid', classNames?.yearsGrid)}>
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
