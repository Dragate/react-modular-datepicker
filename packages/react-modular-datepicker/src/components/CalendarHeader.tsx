import React from 'react';
import { Calendar, CalendarClassNames } from '../types';

export interface HeaderProps {
  calendars: Calendar[];
  getBackProps: (args: any) => any;
  getForwardProps: (args: any) => any;
  setView: (view: 'days' | 'months' | 'years') => void;
  monthNames: string[];
  t: { back: string; forward: string };
  classNames?: CalendarClassNames;
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
    'rmd-header',
    calendars.length > 1 ? 'rmd-header-multi-month' : '',
    classNames?.header,
    calendars.length > 1 ? classNames?.headerMultiMonth : ''
  ].filter(Boolean).join(' ');

  const isNavHidden = !!(currentView && currentView !== 'days');
  const navButtonClassName = [
    'rmd-nav-button',
    isNavHidden ? 'rmd-nav-button-hidden' : '',
    classNames?.navButton,
    isNavHidden ? classNames?.navButtonHidden : ''
  ].filter(Boolean).join(' ');

  const monthYearContainerClassName = [
    'rmd-month-year-container',
    classNames?.monthYearContainer
  ].filter(Boolean).join(' ');

  const monthYearLabelClassName = [
    'rmd-month-year-label',
    slideDirection === 'left' ? 'rmd-slide-left' : slideDirection === 'right' ? 'rmd-slide-right' : '',
    classNames?.monthYearLabel
  ].filter(Boolean).join(' ');

  const monthYearButtonClassName = [
    'rmd-month-year-button',
    classNames?.monthYearButton
  ].filter(Boolean).join(' ');

  return (
    <div className={headerClassName}>
      <button
        {...getBackProps({ calendars })}
        onMouseDown={(e) => e.preventDefault()}
        className={navButtonClassName}
        aria-label={t.back}
      >
        <ChevronLeftIcon />
      </button>

      <div className={monthYearContainerClassName}>
        {calendars.length === 1 ? (
          <div key={`${calendars[0].month}-${calendars[0].year}`} className={monthYearLabelClassName}>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setView(currentView === 'months' ? 'days' : 'months')}
              className={monthYearButtonClassName}
            >
              {monthNames[calendars[0].month]}
            </button>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setView(currentView === 'years' ? 'days' : 'years')}
              className={monthYearButtonClassName}
            >
              {calendars[0].year}
            </button>
          </div>
        ) : (
          <div className={monthYearLabelClassName}>
            <span>
              {first.year === last.year ? first.year : `${first.year} - ${last.year}`}
            </span>
          </div>
        )}
      </div>

      <button
        {...getForwardProps({ calendars })}
        onMouseDown={(e) => e.preventDefault()}
        className={navButtonClassName}
        aria-label={t.forward}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};
