import React, { useState, useRef, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { defaultAdapter } from '../adapters/dayjs';
import { getTranslations, Translations } from '../i18n';
import { CalendarClassNames, DateObj } from '../types';
import { useDates, UseDatesProps } from '../useDates';
import { CalendarHeader, ChevronLeftIcon, ChevronRightIcon, HeaderProps } from './CalendarHeader';
import { Day } from './Day';
import { MonthSelection } from './MonthSelection';
import { YearSelection } from './YearSelection';

interface CalendarProps extends UseDatesProps {
  classNames?: CalendarClassNames;
  locale?: string;
  translations?: Partial<Translations>;
  header?: React.ReactNode | ((props: HeaderProps) => React.ReactNode);
  footer?: React.ReactNode;
  getDayProps?: (dateObj: DateObj) => Record<string, unknown>;
}

type CalendarView = 'days' | 'months' | 'years';

const getDateKey = (d: Date): string =>
  `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

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
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);
  const [announcement, setAnnouncement] = useState<string>('');

  const daysContainerRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dayButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const isKeyboardNavigating = useRef<boolean>(false);

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

  useEffect(() => {
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

  useEffect(() => {
    if (view === 'days' && calendars.length > 0) {
      if (calendars.length === 1) {
        setAnnouncement(`${monthNames[calendars[0].month]} ${calendars[0].year}`);
      } else {
        setAnnouncement(
          `${monthNames[calendars[0].month]} ${calendars[0].year} to ${
            monthNames[calendars[calendars.length - 1].month]
          } ${calendars[calendars.length - 1].year}`
        );
      }
    } else if (view === 'months') {
      setAnnouncement('Month selection view');
    } else if (view === 'years') {
      setAnnouncement('Year selection view');
    }
  }, [view, calendars, monthNames]);

  // Determine default active focused date if focusedDate is not set
  const defaultFocusedDate = useMemo(() => {
    for (const cal of calendars) {
      for (const week of cal.weeks) {
        for (const dateObj of week) {
          if (dateObj?.selectable && dateObj.selected) {
            return dateObj.date;
          }
        }
      }
    }
    for (const cal of calendars) {
      for (const week of cal.weeks) {
        for (const dateObj of week) {
          if (dateObj?.selectable && dateObj.today) {
            return dateObj.date;
          }
        }
      }
    }
    for (const cal of calendars) {
      for (const week of cal.weeks) {
        for (const dateObj of week) {
          if (dateObj?.selectable && !dateObj.prevMonth && !dateObj.nextMonth) {
            return dateObj.date;
          }
        }
      }
    }
    return calendars[0]?.weeks[0]?.find((d) => d?.selectable)?.date || new Date();
  }, [calendars]);

  const currentFocusedDate = focusedDate || defaultFocusedDate;

  useEffect(() => {
    if (view === 'days' && currentFocusedDate && isKeyboardNavigating.current) {
      const key = getDateKey(currentFocusedDate);
      const btn = dayButtonRefs.current.get(key);
      if (btn) {
        btn.focus();
      }
    }
  }, [currentFocusedDate, calendars, view]);

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

  const wrappedGetBackProps = (args?: Record<string, unknown>) => {
    const props = getBackProps({ offset: stepOffset, ...args }) as { onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; [key: string]: unknown };
    return {
      ...props,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        setSlideDirection('left');
        props.onClick?.(e);
      }
    };
  };

  const wrappedGetForwardProps = (args?: Record<string, unknown>) => {
    const props = getForwardProps({ offset: stepOffset, ...args }) as { onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; [key: string]: unknown };
    return {
      ...props,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        setSlideDirection('right');
        props.onClick?.(e);
      }
    };
  };

  const handleDayKeyDown = (e: React.KeyboardEvent, dateObj: DateObj) => {
    const isRTL = Boolean(
      rootRef.current?.closest('[dir="rtl"]') ||
      (typeof document !== 'undefined' && document.documentElement.dir === 'rtl')
    );

    let newDate: Date | null = null;
    const current = adapter.date(dateObj.date);

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        newDate = adapter.toDate(adapter.add(current, isRTL ? 1 : -1, 'day'));
        break;
      case 'ArrowRight':
        e.preventDefault();
        newDate = adapter.toDate(adapter.add(current, isRTL ? -1 : 1, 'day'));
        break;
      case 'ArrowUp':
        e.preventDefault();
        newDate = adapter.toDate(adapter.subtract(current, 7, 'day'));
        break;
      case 'ArrowDown':
        e.preventDefault();
        newDate = adapter.toDate(adapter.add(current, 7, 'day'));
        break;
      case 'Home': {
        e.preventDefault();
        const currentDayOfWeek = adapter.toDate(current).getDay();
        const diff = (currentDayOfWeek - firstDayOfWeek + 7) % 7;
        newDate = adapter.toDate(adapter.subtract(current, diff, 'day'));
        break;
      }
      case 'End': {
        e.preventDefault();
        const currentDayOfWeek = adapter.toDate(current).getDay();
        const diff = 6 - ((currentDayOfWeek - firstDayOfWeek + 7) % 7);
        newDate = adapter.toDate(adapter.add(current, diff, 'day'));
        break;
      }
      case 'PageUp': {
        e.preventDefault();
        const unit = e.shiftKey ? 'year' : 'month';
        newDate = adapter.toDate(adapter.subtract(current, 1, unit));
        break;
      }
      case 'PageDown': {
        e.preventDefault();
        const unit = e.shiftKey ? 'year' : 'month';
        newDate = adapter.toDate(adapter.add(current, 1, unit));
        break;
      }
      case 'Enter':
      case ' ': {
        // Native button press handles click event
        return;
      }
      default:
        return;
    }

    if (newDate) {
      isKeyboardNavigating.current = true;
      setFocusedDate(newDate);

      const baseMonth = adapter.startOf(adapter.date(props.date || new Date()), 'month');
      const targetMonth = adapter.startOf(adapter.date(newDate), 'month');
      const newOffset = adapter.diff(targetMonth, baseMonth, 'month');
      setOffset(newOffset);
    }
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
    <div ref={rootRef} className={clsx('rmd', 'rmd-root', classNames?.root)}>
      <div className="rmd-sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

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
            role="grid"
            aria-label={`${monthNames[calendar.month]} ${calendar.year}`}
            className={clsx('rmd-calendar-container', classNames?.calendarContainer)}
          >
            {calendars.length > 1 && (
              <div className={clsx('rmd-header', classNames?.header)}>
                <div className={clsx('rmd-nav-button-slot-start', classNames?.navButtonSlotStart)}>
                  {index === 0 && calendars.length < 12 && (
                    <button
                      {...(wrappedGetBackProps({ calendars }) as React.ButtonHTMLAttributes<HTMLButtonElement>)}
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
                      {...(wrappedGetForwardProps({ calendars }) as React.ButtonHTMLAttributes<HTMLButtonElement>)}
                      className={clsx('rmd-nav-button', classNames?.navButton)}
                      aria-label={t.forward}
                    >
                      <ChevronRightIcon />
                    </button>
                  )}
                </div>
              </div>
            )}
            <div role="row" className={clsx('rmd-weekday-grid', classNames?.weekdayGrid)}>
              {sortedWeekdays.map((day) => (
                <div
                  key={day}
                  role="columnheader"
                  aria-label={day}
                  className={clsx('rmd-weekday', classNames?.weekday)}
                >
                  {day}
                </div>
              ))}
            </div>
            <div
              key={`daysGrid-${calendar.month}-${calendar.year}`}
              role="row"
              className={clsx(
                'rmd-days-grid',
                slideDirection === 'left' && 'rmd-slide-left',
                slideDirection === 'right' && 'rmd-slide-right',
                classNames?.daysGrid
              )}
            >
              {calendar.weeks.map((week, wi) =>
                week.map((dateObj, di) => {
                  if (!dateObj) {
                    return (
                      <Day
                        key={`${wi}-${di}`}
                        dateObj={null}
                        getDateProps={getDateProps}
                        classNames={classNames}
                      />
                    );
                  }

                  const dateKey = getDateKey(dateObj.date);
                  const isFocused = adapter.isSame(
                    adapter.date(dateObj.date),
                    adapter.date(currentFocusedDate),
                    'day'
                  );

                  return (
                    <Day
                      key={`${wi}-${di}`}
                      dateObj={dateObj}
                      getDateProps={getDateProps}
                      dayProps={getDayProps?.(dateObj)}
                      classNames={classNames}
                      tabIndex={isFocused ? 0 : -1}
                      adapter={adapter}
                      locale={locale}
                      onKeyDown={handleDayKeyDown}
                      onFocus={(dObj) => {
                        setFocusedDate(dObj.date);
                      }}
                      buttonRef={(el) => {
                        if (el) {
                          dayButtonRefs.current.set(dateKey, el);
                        } else {
                          dayButtonRefs.current.delete(dateKey);
                        }
                      }}
                    />
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>
      {footer && <div className={clsx('rmd-footer', classNames?.footer)}>{footer}</div>}
    </div>
  );
};
