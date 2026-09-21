import { describe, expect, test } from 'vitest';
import { defaultAdapter } from 'react-modular-datepicker';
import {
  addMonth,
  composeEventHandlers,
  getCalendars,
  isBackDisabled,
  isForwardDisabled,
  subtractMonth,
} from 'react-modular-datepicker';

describe('utils: composeEventHandlers', () => {
  test('calls each provided handler in sequence', () => {
    const order: number[] = [];
    const fn1 = () => { order.push(1); };
    const fn2 = () => { order.push(2); };

    const composed = composeEventHandlers(fn1, fn2);
    composed({});
    expect(order).toEqual([1, 2]);
  });

  test('passes event arguments to handlers', () => {
    let capturedEvent: any = null;
    let capturedArg: any = null;
    const fn = (e: any, arg: any) => {
      capturedEvent = e;
      capturedArg = arg;
    };

    const composed = composeEventHandlers(fn);
    const mockEvent = { type: 'click' };
    composed(mockEvent, 'extra');

    expect(capturedEvent).toBe(mockEvent);
    expect(capturedArg).toBe('extra');
  });

  test('skips null, undefined, or falsy handlers', () => {
    let called = false;
    const fn = () => { called = true; };

    const composed = composeEventHandlers(undefined, null, fn, false);
    composed({});
    expect(called).toBe(true);
  });

  test('halts execution when defaultPrevented is set to true', () => {
    let secondCalled = false;
    const fn1 = (e: any) => {
      e.defaultPrevented = true;
    };
    const fn2 = () => {
      secondCalled = true;
    };

    const composed = composeEventHandlers(fn1, fn2);
    const event = { defaultPrevented: false };
    composed(event);

    expect(secondCalled).toBe(false);
  });
});

describe('utils: getCalendars and date object creation', () => {
  const baseDate = new Date(2025, 4, 15); // May 15, 2025

  test('generates expected calendar structure', () => {
    const calendars = getCalendars({
      date: baseDate,
      monthsToDisplay: 1,
      offset: 0,
      firstDayOfWeek: 0,
      adapter: defaultAdapter,
      selectionMode: 'single',
    });

    expect(calendars).toHaveLength(1);
    const cal = calendars[0];
    expect(cal.month).toBe(4);
    expect(cal.year).toBe(2025);
    expect(cal.weeks.length).toBeGreaterThanOrEqual(4);

    // Every week has 7 days
    cal.weeks.forEach(week => {
      expect(week).toHaveLength(7);
    });
  });

  test('handles multiple monthsToDisplay', () => {
    const calendars = getCalendars({
      date: baseDate,
      monthsToDisplay: 3,
      offset: 0,
      firstDayOfWeek: 0,
      adapter: defaultAdapter,
      selectionMode: 'single',
    });

    expect(calendars).toHaveLength(3);
    expect(calendars[0].month).toBe(4); // May
    expect(calendars[1].month).toBe(5); // June
    expect(calendars[2].month).toBe(6); // July
  });

  test('single selection mode identifies selected date', () => {
    const selectedDate = new Date(2025, 4, 20);
    const calendars = getCalendars({
      date: baseDate,
      selected: selectedDate,
      monthsToDisplay: 1,
      offset: 0,
      firstDayOfWeek: 0,
      adapter: defaultAdapter,
      selectionMode: 'single',
    });

    const flatDays = calendars[0].weeks.flat().filter(Boolean);
    const selectedDays = flatDays.filter(d => d?.selected);
    expect(selectedDays).toHaveLength(1);
    expect(selectedDays[0]?.date.getDate()).toBe(20);
  });

  test('multiple selection mode identifies all selected dates', () => {
    const selectedDates = [
      new Date(2025, 4, 10),
      new Date(2025, 4, 12),
      new Date(2025, 4, 25),
    ];
    const calendars = getCalendars({
      date: baseDate,
      selected: selectedDates,
      monthsToDisplay: 1,
      offset: 0,
      firstDayOfWeek: 0,
      adapter: defaultAdapter,
      selectionMode: 'multiple',
    });

    const flatDays = calendars[0].weeks.flat().filter(Boolean);
    const selectedDays = flatDays.filter(d => d?.selected);
    expect(selectedDays).toHaveLength(3);
  });

  test('range selection mode identifies start, end, between, and active status', () => {
    const range = {
      start: new Date(2025, 4, 10),
      end: new Date(2025, 4, 15),
    };
    const calendars = getCalendars({
      date: baseDate,
      selected: range,
      monthsToDisplay: 1,
      offset: 0,
      firstDayOfWeek: 0,
      adapter: defaultAdapter,
      selectionMode: 'range',
    });

    const flatDays = calendars[0].weeks.flat().filter(Boolean);
    const startDay = flatDays.find(d => d?.isRangeStart);
    const endDay = flatDays.find(d => d?.isRangeEnd);
    const betweenDays = flatDays.filter(d => d?.isRangeBetween);

    expect(startDay?.date.getDate()).toBe(10);
    expect(endDay?.date.getDate()).toBe(15);
    // May 11, 12, 13, 14 are between (4 days)
    expect(betweenDays).toHaveLength(4);
    expect(startDay?.isRangeActive).toBe(true);
  });

  test('outside buffer days in range selection are not highlighted or selected', () => {
    const range = {
      start: new Date(2026, 8, 10), // Sept 10, 2026
      end: new Date(2026, 9, 21),   // Oct 21, 2026
    };
    const calendars = getCalendars({
      date: new Date(2026, 8, 1),
      selected: range,
      monthsToDisplay: 2,
      offset: 0,
      firstDayOfWeek: 0,
      adapter: defaultAdapter,
      selectionMode: 'range',
    });

    const septOutsideDays = calendars[0].weeks.flat().filter((d): d is NonNullable<typeof d> => Boolean(d && (d.prevMonth || d.nextMonth)));
    const octOutsideDays = calendars[1].weeks.flat().filter((d): d is NonNullable<typeof d> => Boolean(d && (d.prevMonth || d.nextMonth)));

    expect(septOutsideDays.length).toBeGreaterThan(0);
    expect(octOutsideDays.length).toBeGreaterThan(0);

    septOutsideDays.forEach(d => {
      expect(d.selected).toBe(false);
      expect(d.isRangeBetween).toBe(false);
      expect(d.isRangeStart).toBe(false);
      expect(d.isRangeEnd).toBe(false);
    });

    octOutsideDays.forEach(d => {
      expect(d.selected).toBe(false);
      expect(d.isRangeBetween).toBe(false);
      expect(d.isRangeStart).toBe(false);
      expect(d.isRangeEnd).toBe(false);
    });
  });

  test('respects minDate, maxDate, and disabledDates', () => {
    const minDate = new Date(2025, 4, 5);
    const maxDate = new Date(2025, 4, 25);
    const disabledDates = [new Date(2025, 4, 15)];

    const calendars = getCalendars({
      date: baseDate,
      disabledDates,
      minDate,
      maxDate,
      monthsToDisplay: 1,
      offset: 0,
      firstDayOfWeek: 0,
      adapter: defaultAdapter,
      selectionMode: 'single',
    });

    const currentMonthDays = calendars[0].weeks
      .flat()
      .filter((d): d is NonNullable<typeof d> => Boolean(d && !d.prevMonth && !d.nextMonth));

    // Day 4 should not be selectable (before minDate)
    const day4 = currentMonthDays.find(d => d.date.getDate() === 4);
    expect(day4?.selectable).toBe(false);

    // Day 10 should be selectable
    const day10 = currentMonthDays.find(d => d.date.getDate() === 10);
    expect(day10?.selectable).toBe(true);

    // Day 15 is explicitly disabled
    const day15 = currentMonthDays.find(d => d.date.getDate() === 15);
    expect(day15?.selectable).toBe(false);

    // Day 26 should not be selectable (after maxDate)
    const day26 = currentMonthDays.find(d => d.date.getDate() === 26);
    expect(day26?.selectable).toBe(false);
  });

  test('applies custom modifiers', () => {
    const calendars = getCalendars({
      date: baseDate,
      modifiers: {
        'weekend-badge': (d) => d.getDay() === 0 || d.getDay() === 6,
      },
      monthsToDisplay: 1,
      offset: 0,
      firstDayOfWeek: 0,
      adapter: defaultAdapter,
      selectionMode: 'single',
    });

    const flatDays = calendars[0].weeks.flat().filter(Boolean);
    const weekendDays = flatDays.filter(d => d?.modifiers?.includes('weekend-badge'));
    expect(weekendDays.length).toBeGreaterThan(0);
    weekendDays.forEach(d => {
      const dayOfWeek = d?.date.getDay();
      expect(dayOfWeek === 0 || dayOfWeek === 6).toBe(true);
    });
  });
});

describe('utils: navigation boundary checks (isBackDisabled / isForwardDisabled)', () => {
  const baseDate = new Date(2025, 4, 15); // May 2025
  const calendars = getCalendars({
    date: baseDate,
    monthsToDisplay: 1,
    offset: 0,
    firstDayOfWeek: 0,
    adapter: defaultAdapter,
    selectionMode: 'single',
  });

  test('isBackDisabled returns false if minDate is not provided or earlier than current month', () => {
    expect(isBackDisabled({ calendars, adapter: defaultAdapter })).toBe(false);

    const earlierMin = new Date(2025, 2, 1); // March 2025
    expect(isBackDisabled({ calendars, minDate: earlierMin, adapter: defaultAdapter })).toBe(false);
  });

  test('isBackDisabled returns true when calendars first day is same month or before minDate', () => {
    const sameMonthMin = new Date(2025, 4, 10); // May 2025
    expect(isBackDisabled({ calendars, minDate: sameMonthMin, adapter: defaultAdapter })).toBe(true);

    const laterMin = new Date(2025, 6, 1); // July 2025
    expect(isBackDisabled({ calendars, minDate: laterMin, adapter: defaultAdapter })).toBe(true);
  });

  test('isForwardDisabled returns false if maxDate is not provided or after current month', () => {
    expect(isForwardDisabled({ calendars, adapter: defaultAdapter })).toBe(false);

    const futureMax = new Date(2025, 7, 1); // August 2025
    expect(isForwardDisabled({ calendars, maxDate: futureMax, adapter: defaultAdapter })).toBe(false);
  });

  test('isForwardDisabled returns true when calendars last day is same month or after maxDate', () => {
    const sameMonthMax = new Date(2025, 4, 20); // May 2025
    expect(isForwardDisabled({ calendars, maxDate: sameMonthMax, adapter: defaultAdapter })).toBe(true);

    const earlierMax = new Date(2025, 2, 1); // March 2025
    expect(isForwardDisabled({ calendars, maxDate: earlierMax, adapter: defaultAdapter })).toBe(true);
  });
});

describe('utils: subtractMonth and addMonth', () => {
  const baseDate = new Date(2025, 4, 15); // May 2025
  const calendars = getCalendars({
    date: baseDate,
    monthsToDisplay: 1,
    offset: 0,
    firstDayOfWeek: 0,
    adapter: defaultAdapter,
    selectionMode: 'single',
  });

  test('returns normal offset when boundaries are not breached', () => {
    expect(subtractMonth({ calendars, offset: 1, adapter: defaultAdapter })).toBe(1);
    expect(addMonth({ calendars, offset: 1, adapter: defaultAdapter })).toBe(1);
  });

  test('clamps offset when minDate is reached', () => {
    const minDate = new Date(2025, 3, 10); // April 2025 (1 month before May)
    // Attempting to jump back 3 months should be clamped to difference (1 month)
    const result = subtractMonth({ calendars, offset: 3, minDate, adapter: defaultAdapter });
    expect(result).toBe(1);
  });

  test('clamps offset when maxDate is reached', () => {
    const maxDate = new Date(2025, 6, 10); // July 2025 (2 months after May)
    // Attempting to jump forward 5 months should be clamped to difference (2 months)
    const result = addMonth({ calendars, offset: 5, maxDate, adapter: defaultAdapter });
    expect(result).toBe(2);
  });
});
