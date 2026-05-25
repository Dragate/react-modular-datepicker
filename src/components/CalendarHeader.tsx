import React from 'react';
import { Calendar, CalendarClassNames } from '../types';

export interface HeaderProps {
  calendars: Calendar[];
  getBackProps: (args: any) => any;
  getForwardProps: (args: any) => any;
  setView: (view: 'days' | 'months' | 'years') => void;
  monthNames: string[];
  t: { back: string; forward: string };
  classNames: Required<CalendarClassNames>;
  slideDirection?: 'left' | 'right' | null;
}

export const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

export const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export const CalendarHeader: React.FC<HeaderProps> = ({
  calendars,
  getBackProps,
  getForwardProps,
  setView,
  monthNames,
  t,
  classNames,
  slideDirection
}) => {
  return (
    <div className={classNames.header}>
      <button
        {...getBackProps({ calendars })}
        onMouseDown={(e) => e.preventDefault()}
        className={classNames.navButton}
        aria-label={t.back}
      >
        <ChevronLeftIcon />
      </button>

      <div className={classNames.monthYearContainer}>
        {calendars.map((calendar) => (
          <div key={`${calendar.month}-${calendar.year}`} className={`${classNames.monthYearLabel} ${slideDirection === 'left' ? 'animate-slide-in-left' : slideDirection === 'right' ? 'animate-slide-in-right' : ''}`}>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setView('months')}
              className={classNames.monthYearButton}
            >
              {monthNames[calendar.month]}
            </button>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setView('years')}
              className={classNames.monthYearButton}
            >
              {calendar.year}
            </button>
          </div>
        ))}
      </div>

      <button
        {...getForwardProps({ calendars })}
        onMouseDown={(e) => e.preventDefault()}
        className={classNames.navButton}
        aria-label={t.forward}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};
