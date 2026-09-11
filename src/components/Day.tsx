import React from 'react';
import type { CalendarClassNames, DateObj } from '../types';

interface DayProps {
  dateObj: DateObj | null;
  getDateProps: (args: { dateObj: DateObj, [key: string]: any }) => any;
  tooltip?: React.ReactNode;
  classNames: Required<CalendarClassNames>;
}

export const Day: React.FC<DayProps> = ({ dateObj, getDateProps, classNames, tooltip }) => {
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
      {tooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
          <div className="bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap shadow-lg">
            {tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-800" />
          </div>
        </div>
      )}
    </button>
  );
};
