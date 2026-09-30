import clsx from 'clsx';
import React from 'react';
import { Translations } from '../i18n';
import { Calendar, CalendarClassNames } from '../types';

/** Props passed to top-level calendar header or custom header render function */
export interface HeaderProps {
  /** Computed array of month grid calendar objects */
  calendars: Calendar[];
  /** Helper getter to acquire back navigation button props */
  getBackProps: (args?: Record<string, unknown>) => Record<string, unknown>;
  /** Helper getter to acquire forward navigation button props */
  getForwardProps: (args?: Record<string, unknown>) => Record<string, unknown>;
  /** Callback to change active view mode ('days', 'months', or 'years') */
  setView: (view: 'days' | 'months' | 'years') => void;
  /** Array of localized month names */
  monthNames: string[];
  /** Localized translation strings */
  t: Translations;
  /** Custom class names configuration */
  classNames?: CalendarClassNames;
  /** Slide animation direction when navigating months ('left', 'right', or null) */
  slideDirection?: 'left' | 'right' | null;
  /** Current active view mode */
  currentView?: 'days' | 'months' | 'years';
}

/** Left navigation chevron SVG icon */
export const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

/** Right navigation chevron SVG icon */
export const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

/**
 * Top header component displaying navigation controls and month/year selection trigger buttons.
 * Adjusts layout based on single-month, multi-month (2..11), or 12-month yearly displays.
 */
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
  // For multi-month views between 2 and 11 months, navigation is rendered in individual month headers
  if (calendars.length > 1 && calendars.length < 12) {
    return null;
  }

  const first = calendars[0];
  const last = calendars[calendars.length - 1];

  // Hide back/forward arrows when overlay views ('months' or 'years') are open
  const isNavHidden = !!(currentView && currentView !== 'days');
  const navButtonClassName = clsx(
    'rmd-nav-button',
    isNavHidden && 'rmd-nav-button-hidden',
    classNames?.navButton,
    isNavHidden && classNames?.navButtonHidden
  );

  const monthYearLabelClassName = clsx(
    'rmd-month-year-label',
    slideDirection === 'left' && 'rmd-slide-left',
    slideDirection === 'right' && 'rmd-slide-right',
    classNames?.monthYearLabel
  );

  return (
    <div className={clsx(
      'rmd-header',
      calendars.length > 1 && 'rmd-header-multi-month',
      classNames?.header,
      calendars.length > 1 && classNames?.headerMultiMonth
    )}>
      <button
        {...(getBackProps({ calendars }) as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        className={navButtonClassName}
        aria-label={t.back}
      >
        <ChevronLeftIcon />
      </button>

      <div className={clsx('rmd-month-year-container', classNames?.monthYearContainer)}>
        {calendars.length === 1 ? (
          <div key={`${calendars[0].month}-${calendars[0].year}`} className={monthYearLabelClassName}>
            <button
              onClick={() => setView(currentView === 'months' ? 'days' : 'months')}
              className={clsx('rmd-month-year-button', classNames?.monthYearButton)}
              aria-label={`${monthNames[calendars[0].month]}, ${t.selectMonth || 'Select month'}`}
              aria-expanded={currentView === 'months'}
            >
              {monthNames[calendars[0].month]}
            </button>
            <button
              onClick={() => setView(currentView === 'years' ? 'days' : 'years')}
              className={clsx('rmd-month-year-button', classNames?.monthYearButton)}
              aria-label={`${calendars[0].year}, ${t.selectYear || 'Select year'}`}
              aria-expanded={currentView === 'years'}
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
        {...(getForwardProps({ calendars }) as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        className={navButtonClassName}
        aria-label={t.forward}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};
