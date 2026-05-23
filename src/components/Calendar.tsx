import React, { useState, useRef, useEffect } from 'react';
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

type CalendarView = 'days' | 'months' | 'years';

export const Calendar: React.FC<CalendarProps> = (props) => {
  const {
    classNames,
    locale,
    translations: customTranslations,
    adapter = defaultAdapter,
    firstDayOfWeek = 0,
    ...useDatesProps
  } = props;

  const [view, setView] = useState<CalendarView>('days');
  const yearListRef = useRef<HTMLDivElement>(null);

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

  const currentCalendar = calendars[0];
  const { month, year } = currentCalendar;

  const handleMonthSelect = (newMonth: number) => {
    const currentMonth = adapter.set(adapter.set(adapter.date(props.date || new Date()), 'year', year), 'month', month);
    const targetMonth = adapter.set(currentMonth, 'month', newMonth);
    const baseMonth = adapter.startOf(adapter.date(props.date || new Date()), 'month');
    const newOffset = adapter.diff(targetMonth, baseMonth, 'month');
    setOffset(newOffset);
    setView('days');
  };

  const handleYearSelect = (newYear: number) => {
    const currentMonth = adapter.set(adapter.set(adapter.date(props.date || new Date()), 'year', year), 'month', month);
    const targetMonth = adapter.set(currentMonth, 'year', newYear);
    const baseMonth = adapter.startOf(adapter.date(props.date || new Date()), 'month');
    const newOffset = adapter.diff(targetMonth, baseMonth, 'month');
    setOffset(newOffset);
    setView('days');
  };

  useEffect(() => {
    if (view === 'years' && yearListRef.current) {
        const selectedYearBtn = yearListRef.current.querySelector('[data-selected="true"]');
        if (selectedYearBtn) {
            selectedYearBtn.scrollIntoView({ block: 'center' });
        }
    }
  }, [view]);

  const renderDays = () => (
    <div className={`flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-lg ${classNames?.root || ''}`}>
      {calendars.map((calendar, i) => (
        <div key={`${calendar.month}-${calendar.year}`} className="flex-1 min-w-[280px]">
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

            <div className={`flex gap-1 items-center font-semibold text-brand-text ${classNames?.monthName || ''}`}>
                <button onClick={() => setView('months')} className="hover:bg-gray-100 px-2 py-1 rounded">
                    {monthNames[calendar.month]}
                </button>
                <button onClick={() => setView('years')} className="hover:bg-gray-100 px-2 py-1 rounded">
                    {calendar.year}
                </button>
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

  const renderMonths = () => (
      <div className="p-4 bg-white rounded-lg shadow-lg min-w-[280px]">
          <div className="flex items-center justify-between mb-4">
              <button onClick={() => setView('days')} className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronLeftIcon />
              </button>
              <div className="font-semibold">{year}</div>
              <div className="w-9" />
          </div>
          <div className="grid grid-cols-3 gap-2">
              {monthNames.map((name, idx) => (
                  <button
                    key={name}
                    onClick={() => handleMonthSelect(idx)}
                    className={`py-4 rounded-lg hover:bg-brand-gray-light transition-colors ${idx === month ? 'bg-brand-gold text-white' : 'text-brand-text'}`}
                  >
                      {name}
                  </button>
              ))}
          </div>
      </div>
  );

  const renderYears = () => {
      const startYear = props.minDate ? adapter.get(adapter.date(props.minDate), 'year') : year - 50;
      const endYear = props.maxDate ? adapter.get(adapter.date(props.maxDate), 'year') : year + 50;
      const years = [];
      for (let y = startYear; y <= endYear; y++) {
          years.push(y);
      }

      return (
          <div className="p-4 bg-white rounded-lg shadow-lg min-w-[280px]">
               <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setView('days')} className="p-2 hover:bg-gray-100 rounded-full">
                        <ChevronLeftIcon />
                    </button>
                    <div className="font-semibold">Select Year</div>
                    <div className="w-9" />
                </div>
                <div ref={yearListRef} className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2">
                    {years.map(y => (
                        <button
                            key={y}
                            data-selected={y === year}
                            onClick={() => handleYearSelect(y)}
                            className={`py-3 rounded-lg hover:bg-brand-gray-light transition-colors ${y === year ? 'bg-brand-gold text-white' : 'text-brand-text'}`}
                        >
                            {y}
                        </button>
                    ))}
                </div>
          </div>
      );
  };

  switch (view) {
      case 'months': return renderMonths();
      case 'years': return renderYears();
      default: return renderDays();
  }
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
