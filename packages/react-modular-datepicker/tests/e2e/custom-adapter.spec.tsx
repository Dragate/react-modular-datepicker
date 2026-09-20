import React, { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar, DateAdapter } from 'react-modular-datepicker';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

class SimpleCustomAdapter implements DateAdapter<Date> {
  date(value?: any): Date { return value ? new Date(value) : new Date(); }
  add(date: Date, amount: number, unit: 'day' | 'month' | 'year'): Date {
    const d = new Date(date);
    if (unit === 'day') d.setDate(d.getDate() + amount);
    if (unit === 'month') d.setMonth(d.getMonth() + amount);
    if (unit === 'year') d.setFullYear(d.getFullYear() + amount);
    return d;
  }
  subtract(date: Date, amount: number, unit: 'day' | 'month' | 'year'): Date {
    return this.add(date, -amount, unit);
  }
  startOf(date: Date, unit: 'day' | 'month' | 'year'): Date {
    const d = new Date(date);
    if (unit === 'day') d.setHours(0, 0, 0, 0);
    if (unit === 'month') { d.setDate(1); d.setHours(0, 0, 0, 0); }
    if (unit === 'year') { d.setMonth(0, 1); d.setHours(0, 0, 0, 0); }
    return d;
  }
  endOf(date: Date, unit: 'day' | 'month' | 'year'): Date {
    const d = new Date(date);
    if (unit === 'day') d.setHours(23, 59, 59, 999);
    if (unit === 'month') { d.setMonth(d.getMonth() + 1, 0); d.setHours(23, 59, 59, 999); }
    if (unit === 'year') { d.setFullYear(d.getFullYear() + 1, 0, 0); d.setHours(23, 59, 59, 999); }
    return d;
  }
  isBefore(date: Date, comparison: Date, unit?: 'day' | 'month' | 'year'): boolean {
    return this.startOf(date, unit || 'day') < this.startOf(comparison, unit || 'day');
  }
  isAfter(date: Date, comparison: Date, unit?: 'day' | 'month' | 'year'): boolean {
    return this.startOf(date, unit || 'day') > this.startOf(comparison, unit || 'day');
  }
  isSame(date: Date, comparison: Date, unit?: 'day' | 'month' | 'year'): boolean {
    return this.startOf(date, unit || 'day').getTime() === this.startOf(comparison, unit || 'day').getTime();
  }
  set(date: Date, unit: 'day' | 'month' | 'year', value: number): Date {
    const d = new Date(date);
    if (unit === 'day') d.setDate(value);
    if (unit === 'month') d.setMonth(value);
    if (unit === 'year') d.setFullYear(value);
    return d;
  }
  get(date: Date, unit: 'day' | 'month' | 'year'): number {
    if (unit === 'day') return date.getDate();
    if (unit === 'month') return date.getMonth();
    return date.getFullYear();
  }
  format(date: Date, formatStr: string): string {
    return date.toISOString();
  }
  getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }
  toDate(date: Date): Date { return date; }
  diff(date: Date, comparison: Date, unit: 'month' | 'year'): number {
    if (unit === 'month') return (date.getFullYear() - comparison.getFullYear()) * 12 + (date.getMonth() - comparison.getMonth());
    return date.getFullYear() - comparison.getFullYear();
  }
  getMonths(): string[] {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }
  getWeekdays(): string[] {
    return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  }
}

const customAdapter = new SimpleCustomAdapter();

function CustomAdapterTestWrapper() {
  const [selected, setSelected] = useState<Date | null>(new Date(2025, 4, 15));
  return (
    <div>
      <Calendar adapter={customAdapter} selected={selected || undefined} onChange={(d) => setSelected(d as Date)} />
      <div data-testid="adapter-info">Custom adapter rendered</div>
    </div>
  );
}

describe('Custom Adapter Recipe', () => {
  test('should render calendar using custom adapter', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<CustomAdapterTestWrapper />);
    });

    expect(container.querySelector('[data-testid="adapter-info"]')?.textContent).toBe('Custom adapter rendered');
    expect(container.querySelector('.rmdp')).not.toBeNull();
  });
});
