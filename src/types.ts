export interface DateAdapter<T = any> {
  date(value?: any): T;
  add(date: T, amount: number, unit: 'day' | 'month' | 'year'): T;
  subtract(date: T, amount: number, unit: 'day' | 'month' | 'year'): T;
  startOf(date: T, unit: 'day' | 'month' | 'year'): T;
  endOf(date: T, unit: 'day' | 'month' | 'year'): T;
  isBefore(date: T, comparison: T, unit?: 'day' | 'month' | 'year'): boolean;
  isAfter(date: T, comparison: T, unit?: 'day' | 'month' | 'year'): boolean;
  isSame(date: T, comparison: T, unit?: 'day' | 'month' | 'year'): boolean;
  set(date: T, unit: 'day' | 'month' | 'year', value: number): T;
  get(date: T, unit: 'day' | 'month' | 'year'): number;
  format(date: T, formatStr: string, locale?: string): string;
  getDaysInMonth(date: T): number;
  toDate(date: T): Date;
  diff(date: T, comparison: T, unit: 'month' | 'year'): number;
  getMonths(locale?: string): string[];
  getWeekdays(locale?: string): string[];
}

export type SelectionMode = 'single' | 'range' | 'multiple';

export interface DateObj {
  date: Date;
  selected: boolean;
  selectable: boolean;
  today: boolean;
  prevMonth: boolean;
  nextMonth: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isRangeBetween?: boolean;
  isRangeHovering?: boolean;
  modifiers?: string[];
}

export interface Calendar {
  firstDayOfMonth: Date;
  lastDayOfMonth: Date;
  month: number;
  year: number;
  weeks: (DateObj | null)[][];
}
