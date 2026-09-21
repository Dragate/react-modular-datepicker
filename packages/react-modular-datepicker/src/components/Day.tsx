import React from 'react';
import clsx from 'clsx';
import type { CalendarClassNames, DateAdapter, DateObj } from '../types';

interface DayProps {
  dateObj: DateObj | null;
  getDateProps: (args: { dateObj: DateObj, [key: string]: any }) => any;
  dayProps?: Record<string, any>;
  classNames?: CalendarClassNames;
  tabIndex?: number;
  adapter?: DateAdapter;
  locale?: string;
  onKeyDown?: (e: React.KeyboardEvent, dateObj: DateObj) => void;
  onFocus?: (dateObj: DateObj) => void;
  buttonRef?: (el: HTMLButtonElement | null) => void;
}

export const Day: React.FC<DayProps> = ({
  dateObj,
  getDateProps,
  dayProps,
  classNames,
  tabIndex = -1,
  adapter,
  locale,
  onKeyDown,
  onFocus,
  buttonRef
}) => {
  if (!dateObj) {
    return <div role="gridcell" aria-hidden="true" className={clsx('rmd-day-empty', classNames?.day?.empty)} />;
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

  const formattedDateLabel = adapter
    ? adapter.format(adapter.date(date), 'dddd, MMMM D, YYYY', locale)
    : date.toDateString();

  const isSelected = !!(selected || isRangeStart || isRangeEnd);

  const baseProps = getDateProps({ dateObj, ...dayProps });
  const { role: _role, ...restBaseProps } = baseProps;

  return (
    <button
      role="gridcell"
      aria-selected={isSelected}
      aria-pressed={isSelected}
      aria-disabled={!selectable}
      aria-label={formattedDateLabel}
      tabIndex={tabIndex}
      {...restBaseProps}
      ref={buttonRef}
      onKeyDown={(e) => {
        baseProps.onKeyDown?.(e);
        onKeyDown?.(e, dateObj);
      }}
      onFocus={(e) => {
        baseProps.onFocus?.(e);
        onFocus?.(dateObj);
      }}
      className={clsx(
        'rmd-day',
        dayClasses?.day,
        semanticStateClass,
        customStateClass,
        modifierClasses
      )}
    >
      {date.getDate()}
    </button>
  );
};
