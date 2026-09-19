import { expect, test } from '@playwright/test';
import { DayjsAdapter } from '../../src/adapters/dayjs';

test.describe('DayjsAdapter', () => {
  const adapter = new DayjsAdapter();

  test('creates date from string, number, or Date', () => {
    const d1 = adapter.date('2025-06-15');
    expect(adapter.get(d1, 'year')).toBe(2025);
    expect(adapter.get(d1, 'month')).toBe(5); // 0-indexed month
    expect(adapter.get(d1, 'day')).toBe(15);

    const now = new Date();
    const d2 = adapter.date(now);
    expect(adapter.toDate(d2).getTime()).toBe(now.getTime());
  });

  test('adds and subtracts days, months, and years', () => {
    const base = adapter.date('2025-01-15');

    const addedDay = adapter.add(base, 5, 'day');
    expect(adapter.get(addedDay, 'day')).toBe(20);

    const addedMonth = adapter.add(base, 2, 'month');
    expect(adapter.get(addedMonth, 'month')).toBe(2); // March

    const addedYear = adapter.add(base, 1, 'year');
    expect(adapter.get(addedYear, 'year')).toBe(2026);

    const subDay = adapter.subtract(base, 5, 'day');
    expect(adapter.get(subDay, 'day')).toBe(10);

    const subMonth = adapter.subtract(base, 1, 'month');
    expect(adapter.get(subMonth, 'month')).toBe(11); // December 2024
    expect(adapter.get(subMonth, 'year')).toBe(2024);
  });

  test('computes startOf and endOf correctly', () => {
    const d = adapter.date('2025-05-15T14:30:00');

    const startOfMonth = adapter.startOf(d, 'month');
    expect(adapter.get(startOfMonth, 'day')).toBe(1);

    const endOfMonth = adapter.endOf(d, 'month');
    expect(adapter.get(endOfMonth, 'day')).toBe(31);
  });

  test('compares dates with isBefore, isAfter, and isSame', () => {
    const d1 = adapter.date('2025-03-10');
    const d2 = adapter.date('2025-03-20');
    const d3 = adapter.date('2025-03-10');

    expect(adapter.isBefore(d1, d2)).toBe(true);
    expect(adapter.isBefore(d2, d1)).toBe(false);

    expect(adapter.isAfter(d2, d1)).toBe(true);
    expect(adapter.isAfter(d1, d2)).toBe(false);

    expect(adapter.isSame(d1, d3, 'day')).toBe(true);
    expect(adapter.isSame(d1, d2, 'day')).toBe(false);
  });

  test('get and set functions', () => {
    let d = adapter.date('2025-01-01');
    d = adapter.set(d, 'year', 2030);
    d = adapter.set(d, 'month', 6);
    d = adapter.set(d, 'day', 25);

    expect(adapter.get(d, 'year')).toBe(2030);
    expect(adapter.get(d, 'month')).toBe(6);
    expect(adapter.get(d, 'day')).toBe(25);
  });

  test('formats dates correctly', () => {
    const d = adapter.date('2025-04-09');
    expect(adapter.format(d, 'YYYY-MM-DD')).toBe('2025-04-09');
    expect(adapter.format(d, 'MMMM')).toBe('April');
  });

  test('returns accurate days in month including leap years', () => {
    const febNonLeap = adapter.date('2025-02-01');
    expect(adapter.getDaysInMonth(febNonLeap)).toBe(28);

    const febLeap = adapter.date('2024-02-01');
    expect(adapter.getDaysInMonth(febLeap)).toBe(29);
  });

  test('computes calendar differences in month and year', () => {
    const d1 = adapter.date('2025-01-01');
    const d2 = adapter.date('2025-05-01');
    expect(adapter.diff(d2, d1, 'month')).toBe(4);

    const d3 = adapter.date('2027-01-01');
    expect(adapter.diff(d3, d1, 'year')).toBe(2);
  });
});
