import React, { useState } from 'react';
import clsx from 'clsx';
import { defaultAdapter } from '../adapters/dayjs';
import { getTranslations, Translations } from '../i18n';
import { CalendarClassNames, DateObj } from '../types';
import { useDates, UseDatesProps } from '../useDates';
import { CalendarHeader, ChevronLeftIcon, ChevronRightIcon } from './CalendarHeader';
import { Day } from './Day';
import { MonthSelection } from './MonthSelection';
import { YearSelection } from './YearSelection';

interface CalendarProps extends UseDatesProps {
  classNames?: CalendarClassNames;
  locale?: string;
  translations?: Partial<Translations>;
  header?: React.ReactNode | ((props: any) => React.ReactNode);
  footer?: React.ReactNode;
  getDayProps?: (dateObj: DateObj) => Record<string, any>;
}

type CalendarView = 'days' | 'months' | 'years';

export const Calendar: React.FC<CalendarProps> = (props) => {
  const {
    classNames,
    locale,
    translations: customTranslations,
    adapter = defaultAdapter,
    firstDayOfWeek = 0,
    header,
    footer,
    getDayProps,
    ...useDatesProps
  } = props;

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

  const stepOffset = useDatesProps.monthsToDisplay || 1;

  const wrappedGetBackProps = (args: any) => {
    const props = getBackProps({ offset: stepOffset, ...args });
    return {
      ...props,
      onClick: (e: any) => {
        setSlideDirection('left');
        props.onClick?.(e);
      }
    };
  };

  const wrappedGetForwardProps = (args: any) => {
    const props = getForwardProps({ offset: stepOffset, ...args });
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

  const rootClassName = clsx('rmd', 'rmd-root', classNames?.root);
  const calendarsContainerClassName = clsx('rmd-calendars-container', classNames?.calendarsContainer);
  const calendarContainerClassName = clsx('rmd-calendar-container', classNames?.calendarContainer);
  const monthHeaderClassName = clsx('rmd-header', classNames?.header);
  const navButtonSlotStartClassName = clsx('rmd-nav-button-slot-start', classNames?.navButtonSlotStart);
  const navButtonSlotEndClassName = clsx('rmd-nav-button-slot-end', classNames?.navButtonSlotEnd);
  const navButtonClassName = clsx('rmd-nav-button', classNames?.navButton);
  const headerTitleContainerClassName = clsx('rmd-header-title-container', classNames?.headerTitleContainer);
  const weekdayGridClassName = clsx('rmd-weekday-grid', classNames?.weekdayGrid);
  const weekdayClassName = clsx('rmd-weekday', classNames?.weekday);
  const footerClassName = clsx('rmd-footer', classNames?.footer);

  return (
    <div className={rootClassName}>
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

      <div className={calendarsContainerClassName}>
        {view === 'months' && calendars.map((calendar) => (
          <div key={`months-${calendar.year}`} className={calendarContainerClassName}>
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
          <div key={`years-${calendar.year}`} className={calendarContainerClassName}>
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
        {view === 'days' && calendars.map((calendar, index) => (
          <div key={`${calendar.month}-${calendar.year}`} className={calendarContainerClassName}>
            {calendars.length > 1 && (
              <div className={monthHeaderClassName}>
                <div className={navButtonSlotStartClassName}>
                  {index === 0 && calendars.length < 12 && (
                    <button
                      {...wrappedGetBackProps({ calendars })}
                      onMouseDown={(e) => e.preventDefault()}
                      className={navButtonClassName}
                      aria-label={t.back}
                    >
                      <ChevronLeftIcon />
                    </button>
                  )}
                </div>
                <span className={headerTitleContainerClassName}>
                  {monthNames[calendar.month]}
                  {calendars.length < 12 ? ` ${calendar.year}` : ''}
                </span>
                <div className={navButtonSlotEndClassName}>
                  {index === calendars.length - 1 && calendars.length < 12 && (
                    <button
                      {...wrappedGetForwardProps({ calendars })}
                      onMouseDown={(e) => e.preventDefault()}
                      className={navButtonClassName}
                      aria-label={t.forward}
                    >
                      <ChevronRightIcon />
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className={weekdayGridClassName}>
              {sortedWeekdays.map((day) => (
                <div key={day} className={weekdayClassName}>{day}</div>
              ))}
            </div>
            <div
              key={`daysGrid-${calendar.month}-${calendar.year}`}
              className={clsx(
                'rmd-days-grid',
                slideDirection === 'left' && 'rmd-slide-left',
                slideDirection === 'right' && 'rmd-slide-right',
                classNames?.daysGrid
              )}
            >
              {calendar.weeks.map((week, wi) =>
                week.map((dateObj, di) => (
                  <Day
                    key={`${wi}-${di}`}
                    dateObj={dateObj}
                    getDateProps={getDateProps}
                    dayProps={dateObj ? getDayProps?.(dateObj) : undefined}
                    classNames={classNames}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
      {footer && <div className={footerClassName}>{footer}</div>}
    </div>
  );
};
