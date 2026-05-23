import React from 'react';
import type { DateObj, CalendarClassNames } from '../types';

interface DayProps {
  dateObj: DateObj | null;
  getDateProps: (args: { dateObj: DateObj, [key: string]: any }) => any;
  tooltip?: React.ReactNode;
  classNames: Required<CalendarClassNames>;
}

export const Day: React.FC<DayProps> = ({ dateObj, getDateProps, classNames, tooltip }) => {
  if (!dateObj) {
    return <div className="aspect-square" />;
  }

  const { date, selected, selectable, today, prevMonth, nextMonth, isRangeStart, isRangeEnd, isRangeBetween, isRangeHovering, isRangeActive } = dateObj;
  const isOutside = prevMonth || nextMonth;

  let stateClasses = "rounded-full";
  if (isRangeStart && isRangeEnd) {
    stateClasses = `${classNames.daySelected} rounded-full`;
  } else if (isRangeStart) {
    stateClasses = `${classNames.dayRangeStart} ${isRangeActive ? 'rounded-l-full rounded-r-none' : 'rounded-full'}`;
  } else if (isRangeEnd) {
    stateClasses = `${classNames.dayRangeEnd} ${isRangeActive ? 'rounded-r-full rounded-l-none' : 'rounded-full'}`;
  } else if (isRangeBetween) {
    stateClasses = classNames.dayRangeBetween;
  } else if (isRangeHovering) {
    stateClasses = classNames.dayRangeHovering;
  } else if (selected) {
    stateClasses = classNames.daySelected;
  } else if (today) {
    stateClasses = classNames.dayToday;
  } else if (!selectable) {
    stateClasses = classNames.dayDisabled;
  } else if (isOutside) {
    stateClasses = classNames.dayOutside;
  } else {
    stateClasses = classNames.dayUnselected;
  }

  const className = [
    classNames.day,
    stateClasses,
    ...(dateObj.modifiers || []).map(m => (classNames as any)[`day${m.charAt(0).toUpperCase() + m.slice(1)}`] || m)
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
