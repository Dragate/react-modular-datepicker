'use client';

import { useState } from 'react';
import { Calendar, DateAdapter } from 'react-modular-datepicker';
import {
  addDays,
  addMonths,
  addYears,
  subDays,
  subMonths,
  subYears,
  startOfDay,
  startOfMonth,
  startOfYear,
  endOfDay,
  endOfMonth,
  endOfYear,
  isBefore,
  isAfter,
  isSameDay,
  isSameMonth,
  isSameYear,
  setDate,
  setMonth,
  setYear,
  getDate,
  getMonth,
  getYear,
  format,
  getDaysInMonth,
  differenceInCalendarMonths,
  differenceInCalendarYears,
} from 'date-fns';

export class DateFnsAdapter implements DateAdapter<Date> {
  date(value?: any): Date {
    return value ? new Date(value) : new Date();
  }

  add(date: Date, amount: number, unit: 'day' | 'month' | 'year'): Date {
    if (unit === 'day') return addDays(date, amount);
    if (unit === 'month') return addMonths(date, amount);
    return addYears(date, amount);
  }

  subtract(date: Date, amount: number, unit: 'day' | 'month' | 'year'): Date {
    if (unit === 'day') return subDays(date, amount);
    if (unit === 'month') return subMonths(date, amount);
    return subYears(date, amount);
  }

  startOf(date: Date, unit: 'day' | 'month' | 'year'): Date {
    if (unit === 'day') return startOfDay(date);
    if (unit === 'month') return startOfMonth(date);
    return startOfYear(date);
  }

  endOf(date: Date, unit: 'day' | 'month' | 'year'): Date {
    if (unit === 'day') return endOfDay(date);
    if (unit === 'month') return endOfMonth(date);
    return endOfYear(date);
  }

  isBefore(date: Date, comparison: Date, unit?: 'day' | 'month' | 'year'): boolean {
    if (unit === 'day') return startOfDay(date) < startOfDay(comparison);
    if (unit === 'month') return startOfMonth(date) < startOfMonth(comparison);
    if (unit === 'year') return startOfYear(date) < startOfYear(comparison);
    return date < comparison;
  }

  isAfter(date: Date, comparison: Date, unit?: 'day' | 'month' | 'year'): boolean {
    if (unit === 'day') return startOfDay(date) > startOfDay(comparison);
    if (unit === 'month') return startOfMonth(date) > startOfMonth(comparison);
    if (unit === 'year') return startOfYear(date) > startOfYear(comparison);
    return date > comparison;
  }

  isSame(date: Date, comparison: Date, unit?: 'day' | 'month' | 'year'): boolean {
    if (unit === 'day') return isSameDay(date, comparison);
    if (unit === 'month') return isSameMonth(date, comparison);
    if (unit === 'year') return isSameYear(date, comparison);
    return date.getTime() === comparison.getTime();
  }

  set(date: Date, unit: 'day' | 'month' | 'year', value: number): Date {
    if (unit === 'day') return setDate(date, value);
    if (unit === 'month') return setMonth(date, value);
    return setYear(date, value);
  }

  get(date: Date, unit: 'day' | 'month' | 'year'): number {
    if (unit === 'day') return getDate(date);
    if (unit === 'month') return getMonth(date);
    return getYear(date);
  }

  format(date: Date, formatStr: string, _locale?: string): string {
    const dateFnsFormat = formatStr.replace(/YYYY/g, 'yyyy').replace(/YY/g, 'yy').replace(/D/g, 'd');
    return format(date, dateFnsFormat);
  }

  getDaysInMonth(date: Date): number {
    return getDaysInMonth(date);
  }

  toDate(date: Date): Date {
    return date;
  }

  diff(date: Date, comparison: Date, unit: 'month' | 'year'): number {
    if (unit === 'month') return differenceInCalendarMonths(date, comparison);
    return differenceInCalendarYears(date, comparison);
  }

  getMonths(_locale?: string): string[] {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }

  getWeekdays(_locale?: string): string[] {
    return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  }
}

const dateFnsAdapter = new DateFnsAdapter();

export default function CustomAdapterPage() {
  const [selected, setSelected] = useState<Date | null>(new Date());

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Custom Adapter (date-fns)</h1>
      <p className="mb-4 text-gray-600">
        This calendar uses a custom <code>DateAdapter</code> implementation powered by <code>date-fns</code> instead of the default <code>DayjsAdapter</code>.
      </p>
      <Calendar adapter={dateFnsAdapter} selected={selected} onChange={(val) => setSelected(val as Date)} />
      <p className="mt-4">Selected: {selected?.toDateString() ?? 'None'}</p>
    </div>
  );
}
