import React from 'react';
import type { DateObj } from '../types';

interface DayProps {
  dateObj: DateObj | null;
  getDateProps: (args: { dateObj: DateObj, [key: string]: any }) => any;
  tooltip?: React.ReactNode;
  classNames?: {
    day?: string;
    today?: string;
    selected?: string;
    disabled?: string;
    outside?: string;
    rangeStart?: string;
    rangeEnd?: string;
    rangeBetween?: string;
    rangeHovering?: string;
  };
}

export const Day: React.FC<DayProps> = ({ dateObj, getDateProps, classNames, tooltip }) => {
  if (!dateObj) {
    return <div className="aspect-square" />;
  }

  const { date, selected, selectable, today, prevMonth, nextMonth, isRangeStart, isRangeEnd, isRangeBetween, isRangeHovering, isRangeActive } = dateObj;
  const isOutside = prevMonth || nextMonth;

  const baseClasses = "aspect-square flex items-center justify-center text-sm font-medium transition-all relative cursor-pointer group";

  let stateClasses = "rounded-full";
  if (isRangeStart && isRangeEnd) {
    stateClasses = "bg-brand-gold text-white rounded-full";
  } else if (isRangeStart) {
    stateClasses = `bg-brand-gold text-white ${isRangeActive ? 'rounded-l-full rounded-r-none' : 'rounded-full'}`;
  } else if (isRangeEnd) {
    stateClasses = `bg-brand-gold text-white ${isRangeActive ? 'rounded-r-full rounded-l-none' : 'rounded-full'}`;
  } else if (isRangeBetween || isRangeHovering) {
    stateClasses = "bg-brand-gray-light text-brand-text rounded-none";
  } else if (selected) {
    stateClasses = "bg-brand-gold text-white rounded-full";
  } else if (today) {
    stateClasses = "text-brand-gold border border-brand-gold rounded-full";
  } else if (!selectable) {
    stateClasses = "text-gray-300 cursor-not-allowed";
  } else if (isOutside) {
    stateClasses = "text-gray-400 rounded-full";
  } else {
    stateClasses = "hover:bg-brand-gray-light text-brand-text rounded-full";
  }

  const className = [
    baseClasses,
    stateClasses,
    classNames?.day,
    today && classNames?.today,
    selected && classNames?.selected,
    !selectable && classNames?.disabled,
    isOutside && classNames?.outside,
    isRangeStart && classNames?.rangeStart,
    isRangeEnd && classNames?.rangeEnd,
    isRangeBetween && classNames?.rangeBetween,
    isRangeHovering && classNames?.rangeHovering,
    ...(dateObj.modifiers || []).map(m => classNames?.[m as keyof typeof classNames] || m)
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
