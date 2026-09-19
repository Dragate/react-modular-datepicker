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
  currentView?: 'days' | 'months' | 'years';
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
  slideDirection,
  currentView
}) => {
  if (calendars.length > 1 && calendars.length < 12) {
    return null;
  }

  const first = calendars[0];
  const last = calendars[calendars.length - 1];

  const headerClassName = [
    classNames.header,
    calendars.length > 1 ? classNames.headerMultiMonth : ''
  ].filter(Boolean).join(' ');

  const navButtonClassName = (isHidden: boolean) => [
    classNames.navButton,
    isHidden ? classNames.navButtonHidden : ''
  ].filter(Boolean).join(' ');

  const isNavHidden = !!(currentView && currentView !== 'days');

  return (
    <div className={headerClassName}>
      <button
        {...getBackProps({ calendars })}
        onMouseDown={(e) => e.preventDefault()}
        className={navButtonClassName(isNavHidden)}
        aria-label={t.back}
      >
        <ChevronLeftIcon />
      </button>

      <div className={classNames.monthYearContainer}>
        {calendars.length === 1 ? (
          <div key={`${calendars[0].month}-${calendars[0].year}`} className={`${classNames.monthYearLabel} ${slideDirection === 'left' ? 'animate-slide-in-left' : slideDirection === 'right' ? 'animate-slide-in-right' : ''}`}>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setView(currentView === 'months' ? 'days' : 'months')}
              className={classNames.monthYearButton}
            >
              {monthNames[calendars[0].month]}
            </button>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setView(currentView === 'years' ? 'days' : 'years')}
              className={classNames.monthYearButton}
            >
              {calendars[0].year}
            </button>
          </div>
        ) : (
          <div className={`${classNames.monthYearLabel} ${slideDirection === 'left' ? 'animate-slide-in-left' : slideDirection === 'right' ? 'animate-slide-in-right' : ''}`}>
            <span>
              {first.year === last.year ? first.year : `${first.year} - ${last.year}`}
            </span>
          </div>
        )}
      </div>

      <button
        {...getForwardProps({ calendars })}
        onMouseDown={(e) => e.preventDefault()}
        className={navButtonClassName(isNavHidden)}
        aria-label={t.forward}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};
