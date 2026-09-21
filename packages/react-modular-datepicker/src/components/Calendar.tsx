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
  const [daysHeight, setDaysHeight] = useState<number | null>(null);
  const daysContainerRef = React.useRef<HTMLDivElement | null>(null);

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

  React.useEffect(() => {
    if (view === 'days' && daysContainerRef.current) {
      const el = daysContainerRef.current;
      const updateHeight = () => {
        if (el.offsetHeight > 0) {
          setDaysHeight(el.offsetHeight);
        }
      };
      updateHeight();

      if (typeof ResizeObserver !== 'undefined') {
        const observer = new ResizeObserver(() => {
          updateHeight();
        });
        observer.observe(el);
        return () => observer.disconnect();
      }
    }
  }, [view, calendars]);

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

  return (
    <div className={clsx('rmd', 'rmd-root', classNames?.root)}>
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

      <div className={clsx('rmd-calendars-container', classNames?.calendarsContainer)}>
        {view === 'months' && calendars.map((calendar) => (
          <div
            key={`months-${calendar.year}`}
            className={clsx('rmd-calendar-container', classNames?.calendarContainer)}
            style={daysHeight ? { height: `${daysHeight}px` } : undefined}
          >
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
          <div
            key={`years-${calendar.year}`}
            className={clsx('rmd-calendar-container', classNames?.calendarContainer)}
            style={daysHeight ? { height: `${daysHeight}px` } : undefined}
          >
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
          <div
            key={`${calendar.month}-${calendar.year}`}
            ref={index === 0 ? daysContainerRef : undefined}
            className={clsx('rmd-calendar-container', classNames?.calendarContainer)}
          >
            {calendars.length > 1 && (
              <div className={clsx('rmd-header', classNames?.header)}>
                <div className={clsx('rmd-nav-button-slot-start', classNames?.navButtonSlotStart)}>
                  {index === 0 && calendars.length < 12 && (
                    <button
                      {...wrappedGetBackProps({ calendars })}
                      onMouseDown={(e) => e.preventDefault()}
                      className={clsx('rmd-nav-button', classNames?.navButton)}
                      aria-label={t.back}
                    >
                      <ChevronLeftIcon />
                    </button>
                  )}
                </div>
                <span className={clsx('rmd-header-title-container', classNames?.headerTitleContainer)}>
                  {monthNames[calendar.month]}
                  {calendars.length < 12 ? ` ${calendar.year}` : ''}
                </span>
                <div className={clsx('rmd-nav-button-slot-end', classNames?.navButtonSlotEnd)}>
                  {index === calendars.length - 1 && calendars.length < 12 && (
                    <button
                      {...wrappedGetForwardProps({ calendars })}
                      onMouseDown={(e) => e.preventDefault()}
                      className={clsx('rmd-nav-button', classNames?.navButton)}
                      aria-label={t.forward}
                    >
                      <ChevronRightIcon />
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className={clsx('rmd-weekday-grid', classNames?.weekdayGrid)}>
              {sortedWeekdays.map((day) => (
                <div key={day} className={clsx('rmd-weekday', classNames?.weekday)}>{day}</div>
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
      {footer && <div className={clsx('rmd-footer', classNames?.footer)}>{footer}</div>}
    </div>
  );
};
