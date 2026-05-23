import React from 'react';
import type { DateObj } from '../types';

interface DayProps {
  dateObj: DateObj | null;
  getDateProps: (args: { dateObj: DateObj, [key: string]: any }) => any;
  classNames?: {
    day?: string;
    today?: string;
    selected?: string;
    disabled?: string;
    outside?: string;
    rangeStart?: string;
    rangeEnd?: string;
    rangeBetween?: string;
  };
}

export const Day: React.FC<DayProps> = ({ dateObj, getDateProps, classNames }) => {
  if (!dateObj) {
    return <div className="aspect-square" />;
  }

  const { date, selected, selectable, today, prevMonth, nextMonth, isRangeStart, isRangeEnd, isRangeBetween } = dateObj;
  const isOutside = prevMonth || nextMonth;

  const baseClasses = "aspect-square flex items-center justify-center text-sm font-medium transition-colors relative cursor-pointer rounded-full";

  let stateClasses = "";
  if (selected) {
    stateClasses = "bg-brand-gold text-white";
  } else if (today) {
    stateClasses = "text-brand-gold border border-brand-gold";
  } else if (!selectable) {
    stateClasses = "text-gray-300 cursor-not-allowed";
  } else if (isOutside) {
    stateClasses = "text-gray-400";
  } else {
    stateClasses = "hover:bg-brand-gray-light text-brand-text";
  }

  if (isRangeBetween && !isRangeStart && !isRangeEnd) {
      stateClasses = "bg-brand-gray-light text-brand-text rounded-none";
  }
  if (isRangeStart) {
      stateClasses = "bg-brand-gold text-white rounded-r-none";
  }
  if (isRangeEnd) {
      stateClasses = "bg-brand-gold text-white rounded-l-none";
  }
  if (isRangeStart && isRangeEnd) {
      stateClasses = "bg-brand-gold text-white rounded-full";
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
    ...(dateObj.modifiers || [])
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
