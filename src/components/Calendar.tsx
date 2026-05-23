import React from 'react';
import { useDates, UseDatesProps } from '../useDates';
import { Day } from './Day';
import { defaultAdapter } from '../adapters/dayjs';
import { getTranslations, Translations } from '../i18n';

interface CalendarProps extends UseDatesProps {
  classNames?: {
    root?: string;
    header?: string;
    monthName?: string;
    weekday?: string;
    grid?: string;
    day?: any;
    navButton?: string;
    monthYearSelectors?: string;
  };
  locale?: string;
  translations?: Partial<Translations>;
}

export const Calendar: React.FC<CalendarProps> = (props) => {
  const {
    classNames,
    locale,
    translations: customTranslations,
    adapter = defaultAdapter,
    firstDayOfWeek = 0,
    ...useDatesProps
  } = props;

  const t = getTranslations(adapter, locale, customTranslations);
  const weekdayNames = t.weekdays;
  const monthNames = t.months;

  const {
    calendars,
    getBackProps,
    getForwardProps,
    getDateProps,
    setOffset
  } = useDates({ ...useDatesProps, adapter, firstDayOfWeek });

  // Adjust weekday names based on firstDayOfWeek
  const sortedWeekdays = [...weekdayNames.slice(firstDayOfWeek), ...weekdayNames.slice(0, firstDayOfWeek)];

  return (
    <div className={`flex flex-col md:flex-row gap-8 p-4 bg-white rounded-lg shadow-lg ${classNames?.root || ''}`}>
      {calendars.map((calendar, i) => (
        <div key={`${calendar.month}-${calendar.year}`} className="flex-1 min-w-[300px]">
          <div className="flex items-center justify-between mb-6">
            {i === 0 ? (
              <button
                {...getBackProps({ calendars })}
                className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${classNames?.navButton || ''}`}
                aria-label={t.back}
              >
                <ChevronLeftIcon />
              </button>
            ) : <div className="w-9" />}

            <div className={`flex gap-2 items-center font-semibold text-brand-text ${classNames?.monthName || ''}`}>
              <select
                value={calendar.month}
                onChange={(e) => {
                    const newMonth = Number(e.target.value);
                    const currentMonth = adapter.set(adapter.set(adapter.date(props.date || new Date()), 'year', calendar.year), 'month', calendar.month);
                    const targetMonth = adapter.set(currentMonth, 'month', newMonth);
                    const baseMonth = adapter.startOf(adapter.date(props.date || new Date()), 'month');
                    const newOffset = adapter.diff(targetMonth, baseMonth, 'month');
                    setOffset(newOffset);
                }}
                className="bg-transparent border-none focus:ring-0 cursor-pointer appearance-none"
              >
                  {monthNames.map((name, idx) => (
                      <option key={name} value={idx}>{name}</option>
                  ))}
              </select>
              <select
                value={calendar.year}
                onChange={(e) => {
                    const newYear = Number(e.target.value);
                    const currentMonth = adapter.set(adapter.set(adapter.date(props.date || new Date()), 'year', calendar.year), 'month', calendar.month);
                    const targetMonth = adapter.set(currentMonth, 'year', newYear);
                    const baseMonth = adapter.startOf(adapter.date(props.date || new Date()), 'month');
                    const newOffset = adapter.diff(targetMonth, baseMonth, 'month');
                    setOffset(newOffset);
                }}
                className="bg-transparent border-none focus:ring-0 cursor-pointer appearance-none"
              >
                  {Array.from({ length: 20 }, (_, i) => calendar.year - 10 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                  ))}
              </select>
            </div>

            {i === calendars.length - 1 ? (
              <button
                {...getForwardProps({ calendars })}
                className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${classNames?.navButton || ''}`}
                aria-label={t.forward}
              >
                <ChevronRightIcon />
              </button>
            ) : <div className="w-9" />}
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {sortedWeekdays.map((day) => (
              <div
                key={day}
                className={`text-center text-xs font-bold text-gray-400 py-2 ${classNames?.weekday || ''}`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className={`grid grid-cols-7 gap-1 ${classNames?.grid || ''}`}>
            {calendar.weeks.map((week, wi) =>
              week.map((dateObj, di) => (
                <Day
                  key={`${wi}-${di}`}
                  dateObj={dateObj}
                  getDateProps={getDateProps}
                  classNames={classNames?.day}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);
