import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

const customClassNames = {
  root: 'custom-root-style',
  day: {
    selected: 'custom-selected-day',
  },
};

const monthYearClassNames = {
  root: 'custom-root-style',
  monthsGrid: 'custom-months-grid',
  monthButton: 'custom-month-button',
  monthButtonSelected: 'custom-month-selected',
  monthButtonUnselected: 'custom-month-unselected',
  yearsGrid: 'custom-years-grid',
  yearButton: 'custom-year-button',
  yearButtonSelected: 'custom-year-selected',
  yearButtonUnselected: 'custom-year-unselected',
};

function StylingTestWrapper() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 8, 13));
  return (
    <Calendar
      date={selectedDate}
      selected={selectedDate}
      onChange={(d) => setSelectedDate(d as Date)}
      classNames={customClassNames}
    />
  );
}

function MonthYearStylingTestWrapper() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 8, 13));
  return (
    <Calendar
      date={selectedDate}
      selected={selectedDate}
      onChange={(d) => setSelectedDate(d as Date)}
      classNames={monthYearClassNames}
    />
  );
}

describe('Custom Styling Recipe', () => {
  test('should render custom styling component with semantic classes and custom overrides', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<StylingTestWrapper />);
    });

    const rootElement = container.querySelector('.rmd');
    expect(rootElement?.className).toContain('rmd-root');
    expect(rootElement?.className).toContain('custom-root-style');

    const selectedDay = Array.from(container.querySelectorAll('button')).find(
      (btn) => btn.textContent?.trim() === '13'
    );
    expect(selectedDay?.className).toContain('rmd-day');
    expect(selectedDay?.className).toContain('rmd-day-selected');
    expect(selectedDay?.className).toContain('custom-selected-day');

    const unselectedDay = Array.from(container.querySelectorAll('button')).find(
      (btn) => btn.textContent?.trim() === '14'
    );
    expect(unselectedDay?.className).toContain('rmd-day');
    expect(unselectedDay?.className).toContain('rmd-day-unselected');
  });

  test('should apply custom classNames for month and year selection views', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<MonthYearStylingTestWrapper />);
    });

    // Switch to month view by clicking month button in header
    const monthBtn = container.querySelector('button[aria-label*="Select month"]') as HTMLButtonElement;
    expect(monthBtn).not.toBeNull();

    act(() => {
      monthBtn.click();
    });

    const monthsGrid = container.querySelector('.rmd-months-grid');
    expect(monthsGrid?.className).toContain('custom-months-grid');

    const selectedMonth = container.querySelector('.rmd-month-button-selected');
    expect(selectedMonth?.className).toContain('rmd-month-button');
    expect(selectedMonth?.className).toContain('custom-month-button');
    expect(selectedMonth?.className).toContain('custom-month-selected');

    const unselectedMonth = container.querySelector('.rmd-month-button-unselected');
    expect(unselectedMonth?.className).toContain('rmd-month-button');
    expect(unselectedMonth?.className).toContain('custom-month-button');
    expect(unselectedMonth?.className).toContain('custom-month-unselected');

    // Switch to year view
    const yearBtn = container.querySelector('button[aria-label*="Select year"]') as HTMLButtonElement;
    expect(yearBtn).not.toBeNull();

    act(() => {
      yearBtn.click();
    });

    const yearsGrid = container.querySelector('.rmd-years-grid');
    expect(yearsGrid?.className).toContain('custom-years-grid');

    const selectedYear = container.querySelector('.rmd-year-button-selected');
    expect(selectedYear?.className).toContain('rmd-year-button');
    expect(selectedYear?.className).toContain('custom-year-button');
    expect(selectedYear?.className).toContain('custom-year-selected');

    const unselectedYear = container.querySelector('.rmd-year-button-unselected');
    expect(unselectedYear?.className).toContain('rmd-year-button');
    expect(unselectedYear?.className).toContain('custom-year-button');
    expect(unselectedYear?.className).toContain('custom-year-unselected');
  });
});
