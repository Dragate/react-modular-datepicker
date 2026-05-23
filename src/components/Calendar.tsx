import React, { useState, useRef, useEffect } from 'react';
import { useDates, UseDatesProps } from '../useDates';
import { Day } from './Day';
import { defaultAdapter } from '../adapters/dayjs';
import { getTranslations, Translations } from '../i18n';
import { CalendarHeader, ChevronLeftIcon } from './CalendarHeader';
import { DateObj, CalendarClassNames } from '../types';
import { mergeClassNames } from '../classNames';

interface CalendarProps extends UseDatesProps {
  classNames?: CalendarClassNames;
  locale?: string;
  translations?: Partial<Translations>;
  header?: React.ReactNode | ((props: any) => React.ReactNode);
  footer?: React.ReactNode;
  renderDayTooltip?: (dateObj: DateObj) => React.ReactNode;
}

type CalendarView = 'days' | 'months' | 'years';

export const Calendar: React.FC<CalendarProps> = (props) => {
  const {
    classNames: customClassNames,
    locale,
    translations: customTranslations,
    adapter = defaultAdapter,
    firstDayOfWeek = 0,
    header,
    footer,
    renderDayTooltip,
    ...useDatesProps
  } = props;

  const classNames = mergeClassNames(customClassNames);

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

  const renderDefaultHeader = () => (
    <CalendarHeader
        calendars={calendars}
        getBackProps={getBackProps}
        getForwardProps={getForwardProps}
        setView={setView}
        monthNames={monthNames}
        t={t}
        classNames={classNames}
    />
  );

  const renderDays = () => (
    <div className={classNames.root}>
      {typeof header === 'function' ? header({
          calendars,
          getBackProps,
          getForwardProps,
          setView,
          monthNames,
          t
      }) : (header || renderDefaultHeader())}

      <div className={classNames.calendarsContainer}>
        {calendars.map((calendar) => (
          <div key={`${calendar.month}-${calendar.year}`} className={classNames.calendarContainer}>
            <div className={classNames.weekdayGrid}>
              {sortedWeekdays.map((day) => (
                <div
                  key={day}
                  className={classNames.weekday}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className={classNames.daysGrid}>
              {calendar.weeks.map((week, wi) =>
                week.map((dateObj, di) => (
                  <Day
                    key={`${wi}-${di}`}
                    dateObj={dateObj}
                    getDateProps={getDateProps}
                    classNames={classNames}
                    tooltip={dateObj && renderDayTooltip?.(dateObj)}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
      {footer && <div className={classNames.footer}>{footer}</div>}
    </div>
  );

  const renderMonths = () => (
      <div className={classNames.monthsRoot}>
          <div className={classNames.monthsHeader}>
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setView('days')}
                className={classNames.monthsBackButton}
              >
                  <ChevronLeftIcon />
              </button>
              <div className={classNames.monthsYearLabel}>{year}</div>
              <div className="w-9" />
          </div>
          <div className={classNames.monthsGrid}>
              {monthNames.map((name, idx) => (
                  <button
                    key={name}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleMonthSelect(idx)}
                    className={`${classNames.monthButton} ${idx === month ? classNames.monthButtonSelected : classNames.monthButtonUnselected}`}
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
          <div className={classNames.yearsRoot}>
               <div className={classNames.yearsHeader}>
                    <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setView('days')}
                        className={classNames.yearsBackButton}
                    >
                        <ChevronLeftIcon />
                    </button>
                    <div className={classNames.yearsTitle}>Select Year</div>
                    <div className="w-9" />
                </div>
                <div ref={yearListRef} className={classNames.yearsGrid}>
                    {years.map(y => (
                        <button
                            key={y}
                            data-selected={y === year}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleYearSelect(y)}
                            className={`${classNames.yearButton} ${y === year ? classNames.yearButtonSelected : classNames.yearButtonUnselected}`}
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
