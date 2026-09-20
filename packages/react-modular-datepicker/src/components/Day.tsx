import React from 'react';
import type { CalendarClassNames, DateObj } from '../types';

interface DayProps {
  dateObj: DateObj | null;
  getDateProps: (args: { dateObj: DateObj, [key: string]: any }) => any;
  dayProps?: Record<string, any>;
  classNames?: CalendarClassNames;
}

export const Day: React.FC<DayProps> = ({ dateObj, getDateProps, dayProps, classNames }) => {
  if (!dateObj) {
    const emptyClassName = ['rmd-day-empty', classNames?.day?.empty].filter(Boolean).join(' ');
    return <div className={emptyClassName} />;
  }

  const { date, selected, selectable, isRangeStart, isRangeEnd, isRangeBetween, isRangeHovering, isRangeActive } = dateObj;
  const dayClasses = classNames?.day;

  let semanticStateClass = '';
  let customStateClass = '';

  if (isRangeStart && isRangeEnd) {
    semanticStateClass = 'rmd-day-selected';
    customStateClass = dayClasses?.selected || '';
  } else if (isRangeStart) {
    semanticStateClass = ['rmd-day-range-start', isRangeActive ? 'rmd-day-range-active' : ''].filter(Boolean).join(' ');
    customStateClass = dayClasses?.rangeStart || '';
  } else if (isRangeEnd) {
    semanticStateClass = ['rmd-day-range-end', isRangeActive ? 'rmd-day-range-active' : ''].filter(Boolean).join(' ');
    customStateClass = dayClasses?.rangeEnd || '';
  } else if (isRangeBetween) {
    semanticStateClass = 'rmd-day-range-between';
    customStateClass = dayClasses?.rangeBetween || '';
  } else if (isRangeHovering) {
    semanticStateClass = 'rmd-day-range-hovering';
    customStateClass = dayClasses?.rangeHovering || '';
  } else if (selected) {
    semanticStateClass = 'rmd-day-selected';
    customStateClass = dayClasses?.selected || '';
  } else if (!selectable) {
    semanticStateClass = 'rmd-day-disabled';
    customStateClass = dayClasses?.disabled || '';
  } else {
    semanticStateClass = 'rmd-day-unselected';
    customStateClass = dayClasses?.unselected || '';
  }

  const modifierClasses = (dateObj.modifiers || [])
    .map(m => (dayClasses as any)?.[m] || m)
    .filter(Boolean)
    .join(' ');

  const className = [
    'rmd-day',
    dayClasses?.day,
    semanticStateClass,
    customStateClass,
    modifierClasses
  ].filter(Boolean).join(' ');

  return (
    <button
      {...getDateProps({ dateObj, ...dayProps })}
      className={className}
    >
      {date.getDate()}
    </button>
  );
};
