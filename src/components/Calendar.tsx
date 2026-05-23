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

  const commonViewClasses = "w-[300px] min-h-[380px] flex flex-col";

  const renderDays = () => (
    <div className={`w-fit flex flex-col md:flex-row gap-8 p-4 bg-white rounded-lg shadow-lg ${classNames?.root || ''}`}>
      {calendars.map((calendar, i) => (
        <div key={`${calendar.month}-${calendar.year}`} className={commonViewClasses}>
          <div className="flex items-center justify-between mb-4 relative pb-2 border-b border-brand-border h-12">
            {i === 0 && (
              <button
                {...getBackProps({ calendars })}
                onMouseDown={(e) => e.preventDefault()}
                className={`p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400 ${classNames?.navButton || ''}`}
                aria-label={t.back}
              >
                <ChevronLeftIcon />
              </button>
            )}

            <div className={`flex-1 flex gap-1 justify-center items-center font-semibold text-brand-text ${classNames?.monthName || ''}`}>
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

            {i === calendars.length - 1 && (
              <button
                {...getForwardProps({ calendars })}
                onMouseDown={(e) => e.preventDefault()}
                className={`p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400 ${classNames?.navButton || ''}`}
                aria-label={t.forward}
              >
                <ChevronRightIcon />
              </button>
            )}
          </div>

          <div className="grid grid-cols-7 gap-0">
            {sortedWeekdays.map((day, di) => (
              <div
                key={day}
                className={`text-center text-[10px] font-bold text-gray-400 py-3 uppercase border-r border-brand-border last:border-r-0 ${((di + firstDayOfWeek) % 7 === 0 || (di + firstDayOfWeek) % 7 === 6) ? 'bg-brand-weekend' : ''} ${classNames?.weekday || ''}`}
              >
                {day.substring(0, 3)}
              </div>
            ))}
          </div>

          <div className={`grid grid-cols-7 gap-0 border-t border-l border-brand-border flex-1 ${classNames?.grid || ''}`}>
            {calendar.weeks.map((week, wi) =>
              week.map((dateObj, di) => (
                <Day
                  key={`${wi}-${di}`}
                  dateObj={dateObj}
                  getDateProps={getDateProps}
                  classNames={classNames?.day}
                  isWeekend={(di + firstDayOfWeek) % 7 === 0 || (di + firstDayOfWeek) % 7 === 6}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderMonths = () => (
      <div className={`p-4 bg-white rounded-lg shadow-lg ${commonViewClasses}`}>
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-brand-border h-12">
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setView('days')}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
              >
                  <ChevronLeftIcon />
              </button>
              <div className="font-semibold text-brand-text">{year}</div>
              <div className="w-8" />
          </div>
          <div className="grid grid-cols-3 gap-2 flex-1 items-center">
              {monthNames.map((name, idx) => (
                  <button
                    key={name}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleMonthSelect(idx)}
                    className={`py-4 rounded-lg hover:bg-brand-gray-light transition-colors ${idx === month ? 'bg-brand-gold text-white' : 'text-brand-text'}`}
                  >
                      {name.substring(0, 3)}
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
          <div className={`p-4 bg-white rounded-lg shadow-lg ${commonViewClasses}`}>
               <div className="flex items-center justify-between mb-4 pb-2 border-b border-brand-border h-12">
                    <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setView('days')}
                        className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <div className="font-semibold text-brand-text">Select Year</div>
                    <div className="w-8" />
                </div>
                <div ref={yearListRef} className="grid grid-cols-3 gap-2 flex-1 overflow-y-auto pr-2">
                    {years.map(y => (
                        <button
                            key={y}
                            data-selected={y === year}
                            onMouseDown={(e) => e.preventDefault()}
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
