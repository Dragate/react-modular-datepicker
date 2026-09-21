import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

function ViewNavigationWrapper() {
  const [selected, setSelected] = useState<Date | null>(new Date(2025, 4, 15));
  return (
    <Calendar
      date={new Date(2025, 4, 15)}
      selected={selected || undefined}
      onChange={(d) => setSelected(d as Date)}
      minDate={new Date(2025, 2, 1)} // March 2025 minDate
      maxDate={new Date(2025, 9, 31)} // October 2025 maxDate
    />
  );
}

describe('View Navigation Integration', () => {
  test('switches to months view and selects a new month', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<ViewNavigationWrapper />);
    });

    // 1. Initial view is days view showing May 2025
    const monthYearButtons = container.querySelectorAll('.rmd-month-year-button');
    expect(monthYearButtons.length).toBe(2);
    expect(monthYearButtons[0].textContent).toBe('May');
    expect(monthYearButtons[1].textContent).toBe('2025');

    // 2. Click month label 'May' -> enters months view
    act(() => {
      (monthYearButtons[0] as HTMLButtonElement).click();
    });

    const monthsGrid = container.querySelector('.rmd-months-grid');
    expect(monthsGrid).not.toBeNull();

    // 3. Click 'August' in months grid -> switches back to days view on August 2025
    const monthBtns = Array.from(container.querySelectorAll('.rmd-month-button')) as HTMLButtonElement[];
    const augustBtn = monthBtns.find((b) => b.textContent === 'August')!;

    act(() => {
      augustBtn.click();
    });

    expect(container.querySelector('.rmd-months-grid')).toBeNull();
    const updatedMonthYearButtons = container.querySelectorAll('.rmd-month-year-button');
    expect(updatedMonthYearButtons[0].textContent).toBe('August');
    expect(updatedMonthYearButtons[1].textContent).toBe('2025');

    document.body.removeChild(container);
  });

  test('switches to years view and selects a new year', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<ViewNavigationWrapper />);
    });

    // 1. Click year label '2025' -> enters years view
    const monthYearButtons = container.querySelectorAll('.rmd-month-year-button');
    act(() => {
      (monthYearButtons[1] as HTMLButtonElement).click();
    });

    const yearsGrid = container.querySelector('.rmd-years-grid');
    expect(yearsGrid).not.toBeNull();

    // 2. Click '2025' in years grid -> returns to days view
    const year2025Btn = Array.from(container.querySelectorAll('.rmd-year-button')).find(
      (b) => b.textContent === '2025'
    ) as HTMLButtonElement;

    act(() => {
      year2025Btn.click();
    });

    expect(container.querySelector('.rmd-years-grid')).toBeNull();

    document.body.removeChild(container);
  });
});
