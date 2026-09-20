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

  const { date, selected, selectable, isRangeStart, isRangeEnd, isRangeBetween, isRangeHovering, isRangeActive } = dateObj;
  const dayClasses = classNames.day;

  let stateClasses = "rmd:rounded-full";
  if (isRangeStart && isRangeEnd) {
    stateClasses = `${dayClasses.selected} rmd:rounded-full`;
  } else if (isRangeStart) {
    stateClasses = `${dayClasses.rangeStart} ${isRangeActive ? 'rmd:rounded-l-full rmd:rounded-r-none' : 'rmd:rounded-full'}`;
  } else if (isRangeEnd) {
    stateClasses = `${dayClasses.rangeEnd} ${isRangeActive ? 'rmd:rounded-r-full rmd:rounded-l-none' : 'rmd:rounded-full'}`;
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

  const modifierClasses = (dateObj.modifiers || [])
    .map(m => (dayClasses as any)[m] || m)
    .filter(Boolean)
    .join(' ');

  const className = [dayClasses.day, stateClasses, modifierClasses]
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
