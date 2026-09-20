import React from 'react';
import type { CalendarClassNames, DateObj } from '../types';

interface DayProps {
  dateObj: DateObj | null;
  getDateProps: (args: { dateObj: DateObj, [key: string]: any }) => any;
  dayProps?: Record<string, any>;
  classNames: Required<CalendarClassNames>;
}

export const Day: React.FC<DayProps> = ({ dateObj, getDateProps, dayProps, classNames }) => {
  if (!dateObj) {
    return <div className={classNames.day.empty} />;
  }

  const { date, selected, selectable, isRangeStart, isRangeEnd, isRangeBetween, isRangeHovering, isRangeActive, today, prevMonth, nextMonth } = dateObj;
  const dayClasses = classNames.day;

  let stateClasses = '';
  if (isRangeStart && isRangeEnd) {
    stateClasses = dayClasses.selected || '';
  } else if (isRangeStart) {
    stateClasses = isRangeActive ? (dayClasses.rangeStart || '') : (dayClasses.selected || '');
  } else if (isRangeEnd) {
    stateClasses = isRangeActive ? (dayClasses.rangeEnd || '') : (dayClasses.selected || '');
  } else if (isRangeBetween) {
    stateClasses = dayClasses.rangeBetween || '';
  } else if (isRangeHovering) {
    stateClasses = dayClasses.rangeHovering || '';
  } else if (selected) {
    stateClasses = dayClasses.selected || '';
  } else if (!selectable) {
    stateClasses = dayClasses.disabled || '';
  } else {
    stateClasses = dayClasses.unselected || '';
  }

  const isOutside = prevMonth || nextMonth || dateObj.modifiers?.includes('outside');

  const modifierClasses = (dateObj.modifiers || [])
    .map(m => (dayClasses as any)[m] || m)
    .filter(Boolean)
    .join(' ');

  const autoClasses = [
    today && dayClasses.today,
    isOutside && dayClasses.outside,
  ]
    .filter(Boolean)
    .join(' ');

  const className = [dayClasses.day, stateClasses, autoClasses, modifierClasses]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...getDateProps({ dateObj, ...dayProps })}
      className={className}
    >
      {date.getDate()}
    </button>
  );
};
