import React, { useState } from 'react';
import { useDates, UseDatesProps } from '../useDates';
import { Day } from './Day';
import { defaultAdapter } from '../adapters/dayjs';
import { getTranslations, Translations } from '../i18n';
import { CalendarHeader } from './CalendarHeader';
import { DateObj, CalendarClassNames } from '../types';
import { mergeClassNames } from '../classNames';
import { MonthSelection } from './MonthSelection';
import { YearSelection } from './YearSelection';

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
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

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
    setSlideDirection(null);
    setOffset(newOffset);
    setView('days');
  };

  const handleYearSelect = (newYear: number) => {
    const currentMonth = adapter.set(adapter.set(adapter.date(props.date || new Date()), 'year', year), 'month', month);
    const targetMonth = adapter.set(currentMonth, 'year', newYear);
    const baseMonth = adapter.startOf(adapter.date(props.date || new Date()), 'month');
    const newOffset = adapter.diff(targetMonth, baseMonth, 'month');
    setSlideDirection(null);
    setOffset(newOffset);
    setView('days');
  };

  const wrappedGetBackProps = (args: any) => {
    const props = getBackProps(args);
    return {
      ...props,
      onClick: (e: any) => {
        setSlideDirection('left');
        props.onClick?.(e);
      }
    };
  };

  const wrappedGetForwardProps = (args: any) => {
    const props = getForwardProps(args);
    return {
      ...props,
      onClick: (e: any) => {
        setSlideDirection('right');
        props.onClick?.(e);
      }
    };
  };

  const renderDefaultHeader = () => (
    <CalendarHeader
        calendars={calendars}
        getBackProps={wrappedGetBackProps}
        getForwardProps={wrappedGetForwardProps}
        setView={setView}
        monthNames={monthNames}
        t={t}
        classNames={classNames}
        slideDirection={slideDirection}
        currentView={view}
    />
  );

  return (
    <div className={classNames.root}>
      {typeof header === 'function' ? header({
          calendars,
          getBackProps: wrappedGetBackProps,
          getForwardProps: wrappedGetForwardProps,
          setView,
          monthNames,
          t,
          slideDirection,
          currentView: view
      }) : (header || renderDefaultHeader())}

      <div className={classNames.calendarsContainer}>
        {view === 'months' && calendars.map((calendar) => (
          <div key={`months-${calendar.year}`} className={classNames.calendarContainer}>
            <MonthSelection
              year={calendar.year}
              month={calendar.month}
              monthNames={monthNames}
              minDate={props.minDate}
              maxDate={props.maxDate}
              onMonthSelect={handleMonthSelect}
              classNames={classNames}
            />
          </div>
        ))}
        {view === 'years' && calendars.map((calendar) => (
          <div key={`years-${calendar.year}`} className={classNames.calendarContainer}>
            <YearSelection
              year={calendar.year}
              minDate={props.minDate}
              maxDate={props.maxDate}
              adapter={adapter}
              onYearSelect={handleYearSelect}
              classNames={classNames}
            />
          </div>
        ))}
        {view === 'days' && calendars.map((calendar) => (
          <div key={`${calendar.month}-${calendar.year}`} className={classNames.calendarContainer}>
            {calendars.length > 1 && (
              <button
                type="button"
                aria-label={monthNames[calendar.month]}
                className="block w-full text-center font-semibold mb-2 text-brand-text"
              >
                {monthNames[calendar.month]} {calendars[0].year !== calendars[calendars.length - 1].year ? calendar.year : ''}
              </button>
            )}
            <div className={classNames.weekdayGrid}>
              {sortedWeekdays.map((day) => (
                <div key={day} className={classNames.weekday}>{day}</div>
              ))}
            </div>
            <div className={`${classNames.daysGrid} ${slideDirection === 'left' ? 'animate-slide-in-left' : slideDirection === 'right' ? 'animate-slide-in-right' : ''}`}>
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
};
