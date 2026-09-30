import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import type { DateAdapter } from '../types';

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(localeData);

/**
 * Default implementation of `DateAdapter` using Day.js.
 * Provides lightweight date parsing, manipulation, and localized month/weekday formatting.
 */
export class DayjsAdapter implements DateAdapter<Dayjs> {
  /** Wraps value into a Dayjs instance */
  date(value?: unknown): Dayjs {
    return dayjs(value as dayjs.ConfigType);
  }

  /** Adds amount of time unit to a Dayjs instance */
  add(date: Dayjs, amount: number, unit: 'day' | 'month' | 'year'): Dayjs {
    return date.add(amount, unit);
  }

  /** Subtracts amount of time unit from a Dayjs instance */
  subtract(date: Dayjs, amount: number, unit: 'day' | 'month' | 'year'): Dayjs {
    return date.subtract(amount, unit);
  }

  /** Gets start of given time unit */
  startOf(date: Dayjs, unit: 'day' | 'month' | 'year'): Dayjs {
    return date.startOf(unit);
  }

  /** Gets end of given time unit */
  endOf(date: Dayjs, unit: 'day' | 'month' | 'year'): Dayjs {
    return date.endOf(unit);
  }

  /** Checks if `date` is strictly before `comparison` */
  isBefore(date: Dayjs, comparison: Dayjs, unit?: 'day' | 'month' | 'year'): boolean {
    return date.isBefore(comparison, unit);
  }

  /** Checks if `date` is strictly after `comparison` */
  isAfter(date: Dayjs, comparison: Dayjs, unit?: 'day' | 'month' | 'year'): boolean {
    return date.isAfter(comparison, unit);
  }

  /** Checks if `date` is same as `comparison` within unit */
  isSame(date: Dayjs, comparison: Dayjs, unit?: 'day' | 'month' | 'year'): boolean {
    return date.isSame(comparison, unit);
  }

  /** Sets value for specific unit component */
  set(date: Dayjs, unit: 'day' | 'month' | 'year', value: number): Dayjs {
    if (unit === 'day') return date.date(value);
    return date.set(unit, value);
  }

  /** Gets value for specific unit component */
  get(date: Dayjs, unit: 'day' | 'month' | 'year'): number {
    if (unit === 'day') return date.date();
    return date.get(unit);
  }

  /** Formats date using format string and optional locale */
  format(date: Dayjs, formatStr: string, locale?: string): string {
    if (locale) {
      return date.locale(locale).format(formatStr);
    }
    return date.format(formatStr);
  }

  /** Returns number of days in current month */
  getDaysInMonth(date: Dayjs): number {
    return date.daysInMonth();
  }

  /** Converts Dayjs instance to native JavaScript Date object */
  toDate(date: Dayjs): Date {
    return date.toDate();
  }

  /** Calculates difference between two Dayjs instances in unit */
  diff(date: Dayjs, comparison: Dayjs, unit: 'month' | 'year'): number {
    return date.diff(comparison, unit);
  }

  /** Returns array of localized month names */
  getMonths(locale?: string): string[] {
    return locale ? dayjs().locale(locale).localeData().months() : dayjs.localeData().months();
  }

  /** Returns array of uppercase localized short weekday names */
  getWeekdays(locale?: string): string[] {
    return locale
      ? dayjs().locale(locale).localeData().weekdaysShort().map(d => d.toUpperCase())
      : dayjs.localeData().weekdaysShort().map(d => d.toUpperCase());
  }
}

/** Default singleton instance of DayjsAdapter */
export const defaultAdapter = new DayjsAdapter();
