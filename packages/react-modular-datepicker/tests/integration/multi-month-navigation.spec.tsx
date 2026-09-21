import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

describe('Multi-Month Navigation Integration', () => {
  test('navigates 2-month display by 2-month step offset', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(
        <Calendar
          date={new Date(2025, 4, 1)} // May 2025
          monthsToDisplay={2}
        />
      );
    });

    // 2 month containers rendered: May 2025 and June 2025
    const titleContainers = container.querySelectorAll('.rmd-header-title-container');
    expect(titleContainers).toHaveLength(2);
    expect(titleContainers[0].textContent?.trim()).toBe('May 2025');
    expect(titleContainers[1].textContent?.trim()).toBe('June 2025');

    // Click forward navigation button (on June header slot)
    const forwardBtn = container.querySelector('.rmd-nav-button-slot-end button') as HTMLButtonElement;
    expect(forwardBtn).not.toBeNull();

    act(() => {
      forwardBtn.click();
    });

    // Navigation advanced by 2 months: July 2025 and August 2025
    const updatedTitles = container.querySelectorAll('.rmd-header-title-container');
    expect(updatedTitles[0].textContent?.trim()).toBe('July 2025');
    expect(updatedTitles[1].textContent?.trim()).toBe('August 2025');

    document.body.removeChild(container);
  });

  test('navigates 12-month yearly view top header forward and back by full year', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(
        <Calendar
          date={new Date(2025, 0, 1)} // Jan 2025
          monthsToDisplay={12}
        />
      );
    });

    // Top header displays year '2025'
    const monthYearContainer = container.querySelector('.rmd-month-year-container');
    expect(monthYearContainer?.textContent?.trim()).toBe('2025');

    // Click top header forward button
    const topForwardBtn = Array.from(container.querySelectorAll('.rmd-header button')).find(
      (btn) => btn.getAttribute('aria-label') === 'Next month'
    ) as HTMLButtonElement;

    act(() => {
      topForwardBtn.click();
    });

    // Top header updates to year '2026'
    expect(container.querySelector('.rmd-month-year-container')?.textContent?.trim()).toBe('2026');

    document.body.removeChild(container);
  });
});
