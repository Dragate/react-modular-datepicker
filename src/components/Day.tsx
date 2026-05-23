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
    rangeHovering?: string;
    weekend?: string;
  };
  isWeekend?: boolean;
}

export const Day: React.FC<DayProps> = ({ dateObj, getDateProps, classNames, isWeekend: isWeekendCol }) => {
  const cellClasses = "aspect-square flex items-center justify-center transition-all relative border-r border-b border-brand-border";

  if (!dateObj) {
    return <div className={`${cellClasses} ${isWeekendCol ? 'bg-brand-weekend' : ''}`} />;
  }

  const { date, selected, selectable, today, prevMonth, nextMonth, isRangeStart, isRangeEnd, isRangeBetween, isRangeHovering, modifiers = [] } = dateObj;
  const isOutside = prevMonth || nextMonth;
  const isWeekend = modifiers.includes('weekend');

  const baseClasses = "w-full h-full flex items-center justify-center text-sm font-medium transition-all relative cursor-pointer";

  let stateClasses = "";
  if (isRangeStart && isRangeEnd) {
    stateClasses = "bg-brand-gold text-white rounded-full";
  } else if (isRangeStart) {
    stateClasses = "bg-brand-gold text-white rounded-l-full rounded-r-none";
  } else if (isRangeEnd) {
    stateClasses = "bg-brand-gold text-white rounded-r-full rounded-l-none";
  } else if (isRangeBetween || isRangeHovering) {
    stateClasses = "bg-brand-gray-light text-brand-text rounded-none";
  } else if (selected) {
    stateClasses = "bg-brand-gold text-white rounded-full";
  } else if (today) {
    stateClasses = "text-brand-text border border-brand-gold rounded-full";
  } else if (!selectable) {
    stateClasses = "text-gray-300 cursor-not-allowed";
  } else if (isOutside) {
    stateClasses = "text-gray-400";
  } else {
    stateClasses = "hover:bg-brand-gray-light text-brand-text";
  }

  const backgroundClass = isWeekend || isWeekendCol ? 'bg-brand-weekend' : 'bg-white';

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
    ...modifiers.map(m => classNames?.[m as keyof typeof classNames] || m)
  ].filter(Boolean).join(' ');

  return (
    <div className={`${cellClasses} ${backgroundClass}`}>
      <button
        {...getDateProps({ dateObj })}
        className={className}
        style={(today && !selected) ? { width: 'calc(100% - 8px)', height: 'calc(100% - 8px)' } : {}}
      >
        {date.getDate()}
      </button>
    </div>
  );
};
