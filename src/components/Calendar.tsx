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

  switch (view) {
      case 'months':
          return (
              <MonthSelection
                year={year}
                month={month}
                monthNames={monthNames}
                onMonthSelect={handleMonthSelect}
                onBack={() => setView('days')}
                classNames={classNames}
              />
          );
      case 'years':
          return (
              <YearSelection
                year={year}
                minDate={props.minDate}
                maxDate={props.maxDate}
                adapter={adapter}
                onYearSelect={handleYearSelect}
                onBack={() => setView('days')}
                classNames={classNames}
              />
          );
      default: return renderDays();
  }
};
