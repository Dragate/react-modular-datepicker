import type { CalendarClassNames } from './classNames';

/**
 * Adapter interface for date manipulation and formatting.
 * Allows `react-modular-datepicker` to remain lightweight and decoupled from any specific date library.
 */
export interface DateAdapter<T = unknown> {
  /** Create or parse a date object wrapper */
  date(value?: unknown): T;
  /** Add specified time amount to a date */
  add(date: T, amount: number, unit: 'day' | 'month' | 'year'): T;
  /** Subtract specified time amount from a date */
  subtract(date: T, amount: number, unit: 'day' | 'month' | 'year'): T;
  /** Return start of specified time unit for a date */
  startOf(date: T, unit: 'day' | 'month' | 'year'): T;
  /** Return end of specified time unit for a date */
  endOf(date: T, unit: 'day' | 'month' | 'year'): T;
  /** Check if `date` is strictly before `comparison` */
  isBefore(date: T, comparison: T, unit?: 'day' | 'month' | 'year'): boolean;
  /** Check if `date` is strictly after `comparison` */
  isAfter(date: T, comparison: T, unit?: 'day' | 'month' | 'year'): boolean;
  /** Check if `date` is the same as `comparison` within unit threshold */
  isSame(date: T, comparison: T, unit?: 'day' | 'month' | 'year'): boolean;
  /** Set unit component (day, month, or year) on a date */
  set(date: T, unit: 'day' | 'month' | 'year', value: number): T;
  /** Get unit component value from a date */
  get(date: T, unit: 'day' | 'month' | 'year'): number;
  /** Format date to a string using pattern and optional locale */
  format(date: T, formatStr: string, locale?: string): string;
  /** Get number of days in given month */
  getDaysInMonth(date: T): number;
  /** Convert wrapper object to standard JS Date object */
  toDate(date: T): Date;
  /** Calculate difference between two dates in given unit */
  diff(date: T, comparison: T, unit: 'month' | 'year'): number;
  /** Get localized month names */
  getMonths(locale?: string): string[];
  /** Get localized short weekday names */
  getWeekdays(locale?: string): string[];
}

/**
 * Selection mode for datepicker:
 * - `'single'`: Select a single date.
 * - `'range'`: Select a date range with start and end dates.
 * - `'multiple'`: Select multiple individual dates.
 */
export type SelectionMode = 'single' | 'range' | 'multiple';

/**
 * Represents metadata and state for an individual day cell in a calendar view.
 */
export interface DateObj {
  /** The standard JavaScript Date object represented by this cell */
  date: Date;
  /** Whether this date is currently selected */
  selected: boolean;
  /** Whether this date is selectable (not disabled or outside min/max bounds) */
  selectable: boolean;
  /** Whether this date is today */
  today: boolean;
  /** Whether this date belongs to the previous month buffer */
  prevMonth: boolean;
  /** Whether this date belongs to the next month buffer */
  nextMonth: boolean;
  /** In range mode, whether this date is the start of the range */
  isRangeStart?: boolean;
  /** In range mode, whether this date is the end of the range */
  isRangeEnd?: boolean;
  /** In range mode, whether this date falls strictly between start and end */
  isRangeBetween?: boolean;
  /** In range mode, whether this date is hovered while picking a range end */
  isRangeHovering?: boolean;
  /** In range mode, whether an active range selection exists */
  isRangeActive?: boolean;
  /** Active modifier class names applied to this date */
  modifiers?: string[];
}

/**
 * Represents calendar grid data for a single displayed month.
 */
export interface Calendar {
  /** JavaScript Date for the first day of this month */
  firstDayOfMonth: Date;
  /** JavaScript Date for the last day of this month */
  lastDayOfMonth: Date;
  /** Zero-indexed month number (0 = January, 11 = December) */
  month: number;
  /** Full year number (e.g. 2025) */
  year: number;
  /** 2D grid of weeks containing DateObj cells (7 cells per week) */
  weeks: (DateObj | null)[][];
}

export type { CalendarClassNames };
