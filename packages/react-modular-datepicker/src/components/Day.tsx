import React from 'react';
import type { CalendarClassNames, DateObj } from '../types';

interface DayProps {
  dateObj: DateObj | null;
  getDateProps: (args: { dateObj: DateObj, [key: string]: any }) => any;
  classNames: Required<CalendarClassNames>;
}

export const Day: React.FC<DayProps> = ({ dateObj, getDateProps, classNames }) => {
  if (!dateObj) {
    return <div className="aspect-square bg-white" />;
  }

  const { date, selected, selectable, isRangeStart, isRangeEnd, isRangeBetween, isRangeHovering, isRangeActive } = dateObj;
  const dayClasses = classNames.day;

  let stateClasses = "rounded-full";
  if (isRangeStart && isRangeEnd) {
    stateClasses = `${dayClasses.selected} rounded-full`;
  } else if (isRangeStart) {
    stateClasses = `${dayClasses.rangeStart} ${isRangeActive ? 'rounded-l-full rounded-r-none' : 'rounded-full'}`;
  } else if (isRangeEnd) {
    stateClasses = `${dayClasses.rangeEnd} ${isRangeActive ? 'rounded-r-full rounded-l-none' : 'rounded-full'}`;
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

  const className = [
    dayClasses.day,
    stateClasses,
    ...(dateObj.modifiers || []).map(m => (dayClasses as any)[m] || m)
  ].filter(Boolean).join(' ');

  return (
    <button
      {...getDateProps({ dateObj })}
      className={className}
    >
      {date.getDate()}
    </button>
  );
};
