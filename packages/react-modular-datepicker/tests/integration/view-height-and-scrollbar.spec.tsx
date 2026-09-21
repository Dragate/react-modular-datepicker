import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

describe('View Height and Scrollbar Integration', () => {
  let originalOffsetHeight: PropertyDescriptor | undefined;

  beforeEach(() => {
    originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get() {
        if (this.classList?.contains('rmd-calendar-container')) {
          return 285;
        }
        return 0;
      },
    });
  });

  afterEach(() => {
    if (originalOffsetHeight) {
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
    } else {
      Reflect.deleteProperty(HTMLElement.prototype, 'offsetHeight');
    }
  });

  test('retains container height when switching to month or year selector view', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2026, 8, 15);

    act(() => {
      root.render(<Calendar date={testDate} />);
    });

    const calendarContainer = container.querySelector('.rmd-calendar-container') as HTMLDivElement;
    expect(calendarContainer).not.toBeNull();

    // Click month button to enter month view
    const monthBtn = Array.from(container.querySelectorAll('.rmd-month-year-button'))[0] as HTMLButtonElement;
    expect(monthBtn).not.toBeNull();

    act(() => {
      monthBtn.click();
    });

    const monthContainer = container.querySelector('.rmd-calendar-container') as HTMLDivElement;
    expect(monthContainer.style.height).toBe('285px');

    // Click year button from header in month view or switch back to days and click year
    const yearHeaderBtn = Array.from(container.querySelectorAll('.rmd-month-year-button'))[1] as HTMLButtonElement;
    expect(yearHeaderBtn).not.toBeNull();

    act(() => {
      yearHeaderBtn.click();
    });

    const yearContainer = container.querySelector('.rmd-calendar-container') as HTMLDivElement;
    expect(yearContainer.style.height).toBe('285px');

    document.body.removeChild(container);
  });

  test('renders month grid and year grid with semantic layout classes', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2026, 8, 15);

    act(() => {
      root.render(<Calendar date={testDate} />);
    });

    // Switch to month view
    const monthBtn = Array.from(container.querySelectorAll('.rmd-month-year-button'))[0] as HTMLButtonElement;
    act(() => {
      monthBtn.click();
    });

    const monthsGrid = container.querySelector('.rmd-months-grid');
    expect(monthsGrid).not.toBeNull();
    expect(monthsGrid?.className).toContain('rmd-months-grid');

    // Switch to year view
    const yearBtn = Array.from(container.querySelectorAll('.rmd-month-year-button'))[1] as HTMLButtonElement;
    act(() => {
      yearBtn.click();
    });

    const yearsGrid = container.querySelector('.rmd-years-grid');
    expect(yearsGrid).not.toBeNull();
    expect(yearsGrid?.className).toContain('rmd-years-grid');

    document.body.removeChild(container);
  });
});
