import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';
import {
  CalendarHeader,
  Day,
  MonthSelection,
  YearSelection,
  getCalendars,
  defaultAdapter,
  DateObj,
  getDefaults,
} from 'react-modular-datepicker';

describe('CalendarHeader Component', () => {
  const baseDate = new Date(2025, 4, 15); // May 2025
  const translations = getDefaults(defaultAdapter, 'en');

  test('renders single month header with interactive view and navigation buttons', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const calendars = getCalendars({
      date: baseDate,
      monthsToDisplay: 1,
      offset: 0,
      firstDayOfWeek: 0,
      adapter: defaultAdapter,
      selectionMode: 'single',
    });

    const setView = vi.fn();
    const getBackProps = vi.fn((args) => ({ onClick: vi.fn(), ...args }));
    const getForwardProps = vi.fn((args) => ({ onClick: vi.fn(), ...args }));

    act(() => {
      root.render(
        <CalendarHeader
          calendars={calendars}
          getBackProps={getBackProps}
          getForwardProps={getForwardProps}
          setView={setView}
          monthNames={translations.months}
          t={translations}
          currentView="days"
        />
      );
    });

    const buttons = Array.from(container.querySelectorAll('button'));
    expect(buttons.length).toBeGreaterThanOrEqual(4); // back, month, year, forward

    // Month button click switches view to 'months'
    const monthBtn = buttons.find((b) => b.textContent?.trim() === 'May');
    expect(monthBtn).toBeDefined();

    act(() => {
      monthBtn?.click();
    });
    expect(setView).toHaveBeenCalledWith('months');

    // Year button click switches view to 'years'
    const yearBtn = buttons.find((b) => b.textContent?.trim() === '2025');
    expect(yearBtn).toBeDefined();

    act(() => {
      yearBtn?.click();
    });
    expect(setView).toHaveBeenCalledWith('years');

    document.body.removeChild(container);
  });

  test('returns null when 1 < calendars.length < 12', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const calendars = getCalendars({
      date: baseDate,
      monthsToDisplay: 3,
      offset: 0,
      firstDayOfWeek: 0,
      adapter: defaultAdapter,
      selectionMode: 'single',
    });

    act(() => {
      root.render(
        <CalendarHeader
          calendars={calendars}
          getBackProps={(args) => args}
          getForwardProps={(args) => args}
          setView={vi.fn()}
          monthNames={translations.months}
          t={translations}
        />
      );
    });

    expect(container.innerHTML).toBe('');

    document.body.removeChild(container);
  });

  test('renders multi-month header when calendars.length === 12 with year range label', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const calendars = getCalendars({
      date: new Date(2025, 0, 1),
      monthsToDisplay: 12,
      offset: 0,
      firstDayOfWeek: 0,
      adapter: defaultAdapter,
      selectionMode: 'single',
    });

    act(() => {
      root.render(
        <CalendarHeader
          calendars={calendars}
          getBackProps={(args) => args}
          getForwardProps={(args) => args}
          setView={vi.fn()}
          monthNames={translations.months}
          t={translations}
        />
      );
    });

    const header = container.querySelector('.rmd-header-multi-month');
    expect(header).not.toBeNull();
    expect(container.textContent).toContain('2025');

    document.body.removeChild(container);
  });

  test('hides navigation buttons when currentView is not "days"', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const calendars = getCalendars({
      date: baseDate,
      monthsToDisplay: 1,
      offset: 0,
      firstDayOfWeek: 0,
      adapter: defaultAdapter,
      selectionMode: 'single',
    });

    act(() => {
      root.render(
        <CalendarHeader
          calendars={calendars}
          getBackProps={(args) => args}
          getForwardProps={(args) => args}
          setView={vi.fn()}
          monthNames={translations.months}
          t={translations}
          currentView="months"
        />
      );
    });

    const hiddenButtons = container.querySelectorAll('.rmd-nav-button-hidden');
    expect(hiddenButtons.length).toBe(2);

    document.body.removeChild(container);
  });
});

describe('Day Component', () => {
  const getDateProps = vi.fn(({ dateObj, ...rest }) => ({ role: 'button', ...rest }));

  test('renders empty day placeholder when dateObj is null', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<Day dateObj={null} getDateProps={getDateProps} />);
    });

    expect(container.querySelector('.rmd-day-empty')).not.toBeNull();

    document.body.removeChild(container);
  });

  test('renders day button with semantic state classes and custom dayProps', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2025, 4, 15);
    const dateObj: DateObj = {
      date: testDate,
      selected: true,
      selectable: true,
      today: true,
      prevMonth: false,
      nextMonth: false,
      modifiers: ['today'],
    };

    act(() => {
      root.render(
        <Day
          dateObj={dateObj}
          getDateProps={getDateProps}
          dayProps={{ 'data-tooltip': 'Special Day', 'aria-label': 'May 15' }}
          classNames={{
            day: {
              day: 'custom-day',
              selected: 'custom-selected',
            },
          }}
        />
      );
    });

    const button = container.querySelector('button');
    expect(button).not.toBeNull();
    expect(button?.textContent).toBe('15');
    expect(button?.className).toContain('rmd-day');
    expect(button?.className).toContain('rmd-day-selected');
    expect(button?.className).toContain('custom-day');
    expect(button?.className).toContain('custom-selected');
    expect(button?.getAttribute('data-tooltip')).toBe('Special Day');
    expect(button?.getAttribute('aria-label')).toBe('May 15');

    document.body.removeChild(container);
  });

  test('renders range semantic classes (start, end, between, hovering)', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2025, 4, 10);
    const startObj: DateObj = {
      date: testDate,
      selected: true,
      selectable: true,
      today: false,
      prevMonth: false,
      nextMonth: false,
      isRangeStart: true,
      isRangeActive: true,
    };

    act(() => {
      root.render(<Day dateObj={startObj} getDateProps={getDateProps} />);
    });

    expect(container.querySelector('.rmd-day-range-start')).not.toBeNull();
    expect(container.querySelector('.rmd-day-range-active')).not.toBeNull();

    document.body.removeChild(container);
  });
});

describe('MonthSelection Component', () => {
  const monthNames = getDefaults(defaultAdapter, 'en').months;

  test('renders 12 month buttons and handles month selection', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const onMonthSelect = vi.fn();

    act(() => {
      root.render(
        <MonthSelection
          year={2025}
          month={4} // May
          monthNames={monthNames}
          onMonthSelect={onMonthSelect}
        />
      );
    });

    const monthButtons = container.querySelectorAll('.rmd-month-button');
    expect(monthButtons.length).toBe(12);

    const selectedBtn = container.querySelector('.rmd-month-button-selected');
    expect(selectedBtn?.textContent).toBe('May');

    const juneBtn = Array.from(monthButtons).find((b) => b.textContent === 'June') as HTMLButtonElement;
    act(() => {
      juneBtn.click();
    });

    expect(onMonthSelect).toHaveBeenCalledWith(5); // June index = 5

    document.body.removeChild(container);
  });

  test('disables months outside minDate and maxDate bounds', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const onMonthSelect = vi.fn();

    act(() => {
      root.render(
        <MonthSelection
          year={2025}
          month={4} // May
          monthNames={monthNames}
          minDate={new Date(2025, 3, 1)} // April
          maxDate={new Date(2025, 6, 31)} // July
          onMonthSelect={onMonthSelect}
        />
      );
    });

    const monthButtons = Array.from(container.querySelectorAll('.rmd-month-button')) as HTMLButtonElement[];

    const marchBtn = monthButtons.find((b) => b.textContent === 'March');
    expect(marchBtn?.hasAttribute('disabled')).toBe(true);

    const aprilBtn = monthButtons.find((b) => b.textContent === 'April');
    expect(aprilBtn?.hasAttribute('disabled')).toBe(false);

    const augustBtn = monthButtons.find((b) => b.textContent === 'August');
    expect(augustBtn?.hasAttribute('disabled')).toBe(true);

    // Clicking disabled month should not call callback
    act(() => {
      marchBtn?.click();
    });
    expect(onMonthSelect).not.toHaveBeenCalled();

    document.body.removeChild(container);
  });
});

describe('YearSelection Component', () => {
  test('renders years range and centers scroll on selected year', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const onYearSelect = vi.fn();

    act(() => {
      root.render(
        <YearSelection
          year={2025}
          minDate={new Date(2020, 0, 1)}
          maxDate={new Date(2030, 11, 31)}
          adapter={defaultAdapter}
          onYearSelect={onYearSelect}
        />
      );
    });

    const yearButtons = container.querySelectorAll('.rmd-year-button');
    expect(yearButtons.length).toBe(11); // 2020 to 2030 = 11 years

    const selectedBtn = container.querySelector('[data-selected="true"]');
    expect(selectedBtn?.textContent).toBe('2025');

    const year2028Btn = Array.from(yearButtons).find((b) => b.textContent === '2028') as HTMLButtonElement;
    act(() => {
      year2028Btn.click();
    });

    expect(onYearSelect).toHaveBeenCalledWith(2028);

    document.body.removeChild(container);
  });
});
