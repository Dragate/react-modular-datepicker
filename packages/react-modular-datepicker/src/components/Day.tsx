import React from 'react';
import clsx from 'clsx';
import type { CalendarClassNames, DateAdapter, DateObj } from '../types';

/** Props for the `Day` cell component */
interface DayProps {
  /** Date cell data and flags (null for empty grid cell placeholders) */
  dateObj: DateObj | null;
  /** Prop getter method from `useDates` to retrieve click handlers and ARIA attributes */
  getDateProps: (args: { dateObj: DateObj, [key: string]: unknown }) => Record<string, unknown>;
  /** Additional custom attributes to pass to day button element */
  dayProps?: Record<string, unknown>;
  /** Class name customization object */
  classNames?: CalendarClassNames;
  /** TabIndex for roving tabindex keyboard navigation (0 for active/focused, -1 otherwise) */
  tabIndex?: number;
  /** Optional date adapter for formatting screen reader labels */
  adapter?: DateAdapter;
  /** Optional locale code for formatted date labels */
  locale?: string;
  /** Keyboard navigation event handler */
  onKeyDown?: (e: React.KeyboardEvent, dateObj: DateObj) => void;
  /** Focus event handler */
  onFocus?: (dateObj: DateObj) => void;
  /** Ref callback to store reference to underlying HTML button element */
  buttonRef?: (el: HTMLButtonElement | null) => void;
}

/**
 * Individual calendar day button component.
 * Handles rendering date numbers, semantic and custom selection/range states,
 * modifier class name composition, and accessible WAI-ARIA gridcell attributes.
 */
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
  // Render empty cell placeholder for padding days
  if (!dateObj) {
    return <div role="gridcell" aria-hidden="true" className={clsx('rmd-day-empty', classNames?.day?.empty)} />;
  }

  const { date, selected, selectable, isRangeStart, isRangeEnd, isRangeBetween, isRangeHovering, isRangeActive } = dateObj;
  const dayClasses = classNames?.day;

  // Determine semantic library state class and custom override class
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

  // Map active modifiers to semantic/custom class names
  const modifierClasses = (dateObj.modifiers || [])
    .map(m => (dayClasses as Record<string, string | undefined> | undefined)?.[m] || m)
    .filter(Boolean);

  // Accessible full date string label for screen readers
  const formattedDateLabel = adapter
    ? adapter.format(adapter.date(date), 'dddd, MMMM D, YYYY', locale)
    : date.toDateString();

  const isSelected = !!(selected || isRangeStart || isRangeEnd);

  const baseProps = getDateProps({ dateObj, ...dayProps }) as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      role="gridcell"
      aria-selected={isSelected}
      aria-disabled={!selectable}
      aria-label={formattedDateLabel}
      tabIndex={tabIndex}
      {...(baseProps as React.HTMLAttributes<HTMLButtonElement>)}
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
