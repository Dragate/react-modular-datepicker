import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import type { DateAdapter } from '../types';

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(localeData);

export class DayjsAdapter implements DateAdapter<Dayjs> {
  date(value?: any): Dayjs {
    return dayjs(value);
  }

  add(date: Dayjs, amount: number, unit: 'day' | 'month' | 'year'): Dayjs {
    return date.add(amount, unit);
  }

  subtract(date: Dayjs, amount: number, unit: 'day' | 'month' | 'year'): Dayjs {
    return date.subtract(amount, unit);
  }

  startOf(date: Dayjs, unit: 'day' | 'month' | 'year'): Dayjs {
    return date.startOf(unit);
  }

  endOf(date: Dayjs, unit: 'day' | 'month' | 'year'): Dayjs {
    return date.endOf(unit);
  }

  isBefore(date: Dayjs, comparison: Dayjs, unit?: 'day' | 'month' | 'year'): boolean {
    return date.isBefore(comparison, unit);
  }

  isAfter(date: Dayjs, comparison: Dayjs, unit?: 'day' | 'month' | 'year'): boolean {
    return date.isAfter(comparison, unit);
  }

  isSame(date: Dayjs, comparison: Dayjs, unit?: 'day' | 'month' | 'year'): boolean {
    return date.isSame(comparison, unit);
  }

  set(date: Dayjs, unit: 'day' | 'month' | 'year', value: number): Dayjs {
    if (unit === 'day') return date.date(value);
    return date.set(unit, value);
  }

  get(date: Dayjs, unit: 'day' | 'month' | 'year'): number {
    if (unit === 'day') return date.date();
    return date.get(unit);
  }

  format(date: Dayjs, formatStr: string, locale?: string): string {
    if (locale) {
      return date.locale(locale).format(formatStr);
    }
    return date.format(formatStr);
  }

  getDaysInMonth(date: Dayjs): number {
    return date.daysInMonth();
  }

  toDate(date: Dayjs): Date {
    return date.toDate();
  }

  diff(date: Dayjs, comparison: Dayjs, unit: 'month' | 'year'): number {
    return date.diff(comparison, unit);
  }

  getMonths(locale?: string): string[] {
    return locale ? dayjs().locale(locale).localeData().months() : dayjs.localeData().months();
  }

  getWeekdays(locale?: string): string[] {
    return locale ? dayjs().locale(locale).localeData().weekdaysShort().map(d => d.toUpperCase()) : dayjs.localeData().weekdaysShort().map(d => d.toUpperCase());
  }
}

export const defaultAdapter = new DayjsAdapter();
