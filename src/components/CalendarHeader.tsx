import React from 'react';
import { Calendar } from '../types';

export interface HeaderProps {
  calendars: Calendar[];
  getBackProps: (args: any) => any;
  getForwardProps: (args: any) => any;
  setView: (view: 'days' | 'months' | 'years') => void;
  monthNames: string[];
  t: { back: string; forward: string };
  classNames?: {
    header?: string;
    monthName?: string;
    navButton?: string;
  };
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
  classNames
}) => {
  return (
    <div className={`flex items-center justify-between mb-6 ${classNames?.header || ''}`}>
      <button
        {...getBackProps({ calendars })}
        onMouseDown={(e) => e.preventDefault()}
        className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${classNames?.navButton || ''}`}
        aria-label={t.back}
      >
        <ChevronLeftIcon />
      </button>

      <div className="flex gap-8">
        {calendars.map((calendar) => (
          <div key={`${calendar.month}-${calendar.year}`} className={`flex gap-1 items-center font-semibold text-brand-text ${classNames?.monthName || ''}`}>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setView('months')}
              className="hover:bg-gray-100 px-2 py-1 rounded"
            >
              {monthNames[calendar.month]}
            </button>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setView('years')}
              className="hover:bg-gray-100 px-2 py-1 rounded"
            >
              {calendar.year}
            </button>
          </div>
        ))}
      </div>

      <button
        {...getForwardProps({ calendars })}
        onMouseDown={(e) => e.preventDefault()}
        className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${classNames?.navButton || ''}`}
        aria-label={t.forward}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};
