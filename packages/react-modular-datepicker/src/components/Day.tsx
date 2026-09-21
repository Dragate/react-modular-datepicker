import React from 'react';
import clsx from 'clsx';
import type { CalendarClassNames, DateObj } from '../types';

interface DayProps {
  dateObj: DateObj | null;
  getDateProps: (args: { dateObj: DateObj, [key: string]: any }) => any;
  dayProps?: Record<string, any>;
  classNames?: CalendarClassNames;
}

export const Day: React.FC<DayProps> = ({ dateObj, getDateProps, dayProps, classNames }) => {
  if (!dateObj) {
    return <div className={clsx('rmd-day-empty', classNames?.day?.empty)} />;
  }

  const { date, selected, selectable, isRangeStart, isRangeEnd, isRangeBetween, isRangeHovering, isRangeActive } = dateObj;
  const dayClasses = classNames?.day;

  let semanticStateClass = '';
  let customStateClass = '';

  if (isRangeStart && isRangeEnd) {
    semanticStateClass = 'rmd-day-selected';
    customStateClass = dayClasses?.selected || '';
  } else if (isRangeStart) {
    semanticStateClass = clsx('rmd-day-range-start', isRangeActive && 'rmd-day-range-active');
    customStateClass = dayClasses?.rangeStart || '';
  } else if (isRangeEnd) {
    semanticStateClass = clsx('rmd-day-range-end', isRangeActive && 'rmd-day-range-active');
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
    .filter(Boolean);

  const className = clsx(
    'rmd-day',
    dayClasses?.day,
    semanticStateClass,
    customStateClass,
    modifierClasses
  );

  return (
    <button
      {...getDateProps({ dateObj, ...dayProps })}
      className={className}
    >
      {date.getDate()}
    </button>
  );
};
