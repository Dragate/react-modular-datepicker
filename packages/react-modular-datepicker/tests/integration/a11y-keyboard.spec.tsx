import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

function A11yCalendarWrapper(props: any) {
  const [selected, setSelected] = useState<Date | null>(props.selected || null);
  return (
    <Calendar
      {...props}
      selected={selected || undefined}
      onChange={(d: any) => {
        setSelected(d as Date);
        props.onChange?.(d);
      }}
    />
  );
}

describe('WCAG Accessibility & Keyboard Navigation', () => {
  test('renders proper ARIA roles and attributes in days view', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2026, 8, 15); // Sep 15, 2026

    act(() => {
      root.render(<A11yCalendarWrapper date={testDate} selected={testDate} />);
    });

    // Grid container role and aria-label
    const grid = container.querySelector('[role="grid"]');
    expect(grid).not.toBeNull();
    expect(grid?.getAttribute('aria-label')).toBe('September 2026');

    // Weekday headers
    const colHeaders = container.querySelectorAll('[role="columnheader"]');
    expect(colHeaders.length).toBe(7);

    // Live region announcement
    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).not.toBeNull();
    expect(liveRegion?.textContent?.trim()).toBe('September 2026');

    // Grid cells / buttons
    const dayButtons = container.querySelectorAll('.rmd-day');
    expect(dayButtons.length).toBeGreaterThan(0);

    const selectedBtn = Array.from(dayButtons).find(
      (btn) => btn.getAttribute('aria-selected') === 'true'
    );
    expect(selectedBtn).toBeDefined();
    expect(selectedBtn?.textContent?.trim()).toBe('15');
    expect(selectedBtn?.getAttribute('aria-label')).toContain('September 15, 2026');

    document.body.removeChild(container);
  });

  test('navigates days with Arrow keys, Home, End, PageUp, and PageDown', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2026, 8, 15); // Tuesday, Sep 15, 2026

    act(() => {
      root.render(<A11yCalendarWrapper date={testDate} selected={testDate} />);
    });

    const getFocusedButton = () => container.querySelector('.rmd-day[tabindex="0"]') as HTMLButtonElement;

    expect(getFocusedButton()?.textContent?.trim()).toBe('15');

    // ArrowRight -> 16
    act(() => {
      getFocusedButton()?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      );
    });
    expect(getFocusedButton()?.textContent?.trim()).toBe('16');

    // ArrowLeft -> 15
    act(() => {
      getFocusedButton()?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      );
    });
    expect(getFocusedButton()?.textContent?.trim()).toBe('15');

    // ArrowDown -> 22 (+7 days)
    act(() => {
      getFocusedButton()?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      );
    });
    expect(getFocusedButton()?.textContent?.trim()).toBe('22');

    // ArrowUp -> 15 (-7 days)
    act(() => {
      getFocusedButton()?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true })
      );
    });
    expect(getFocusedButton()?.textContent?.trim()).toBe('15');

    // Home -> start of week (Sunday Sep 13)
    act(() => {
      getFocusedButton()?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Home', bubbles: true })
      );
    });
    expect(getFocusedButton()?.textContent?.trim()).toBe('13');

    // End -> end of week (Saturday Sep 19)
    act(() => {
      getFocusedButton()?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'End', bubbles: true })
      );
    });
    expect(getFocusedButton()?.textContent?.trim()).toBe('19');

    // PageDown -> Oct 19
    act(() => {
      getFocusedButton()?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true })
      );
    });
    expect(container.querySelector('[role="grid"]')?.getAttribute('aria-label')).toBe('October 2026');

    // PageUp -> Sep 19
    act(() => {
      getFocusedButton()?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true })
      );
    });
    expect(container.querySelector('[role="grid"]')?.getAttribute('aria-label')).toBe('September 2026');

    document.body.removeChild(container);
  });

  test('reverses left/right arrow key navigation in RTL direction', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2026, 8, 15);

    act(() => {
      root.render(
        <div dir="rtl">
          <A11yCalendarWrapper date={testDate} selected={testDate} />
        </div>
      );
    });

    const getFocusedButton = () => container.querySelector('.rmd-day[tabindex="0"]') as HTMLButtonElement;
    expect(getFocusedButton()?.textContent?.trim()).toBe('15');

    // ArrowLeft in RTL -> moves forward +1 day (16)
    act(() => {
      getFocusedButton()?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      );
    });
    expect(getFocusedButton()?.textContent?.trim()).toBe('16');

    // ArrowRight in RTL -> moves backward -1 day (15)
    act(() => {
      getFocusedButton()?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      );
    });
    expect(getFocusedButton()?.textContent?.trim()).toBe('15');

    document.body.removeChild(container);
  });

  test('handles keyboard navigation and ARIA attributes in Month selection view', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2026, 8, 15); // September (month index 8)

    act(() => {
      root.render(<A11yCalendarWrapper date={testDate} />);
    });

    const monthToggleBtn = container.querySelector('.rmd-month-year-button') as HTMLButtonElement;
    expect(monthToggleBtn.getAttribute('aria-expanded')).toBe('false');

    act(() => {
      monthToggleBtn.click();
    });

    expect(monthToggleBtn.getAttribute('aria-expanded')).toBe('true');

    const monthsGrid = container.querySelector('[role="grid"][aria-label="Select month"]');
    expect(monthsGrid).not.toBeNull();

    const focusedMonth = () => container.querySelector('.rmd-month-button[tabindex="0"]') as HTMLButtonElement;
    expect(focusedMonth()?.textContent?.trim()).toBe('September');

    // ArrowRight -> October
    act(() => {
      focusedMonth()?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      );
    });
    expect(focusedMonth()?.textContent?.trim()).toBe('October');

    // Enter key selects October
    act(() => {
      focusedMonth()?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      );
    });

    // View switched back to days view
    expect(container.querySelector('[role="grid"]')?.getAttribute('aria-label')).toBe('October 2026');

    document.body.removeChild(container);
  });

  test('handles keyboard navigation and ARIA attributes in Year selection view', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2026, 8, 15);

    act(() => {
      root.render(
        <A11yCalendarWrapper
          date={testDate}
          minDate={new Date(2020, 0, 1)}
          maxDate={new Date(2030, 11, 31)}
        />
      );
    });

    const yearToggleBtn = Array.from(container.querySelectorAll('.rmd-month-year-button'))[1] as HTMLButtonElement;
    expect(yearToggleBtn.getAttribute('aria-expanded')).toBe('false');

    act(() => {
      yearToggleBtn.click();
    });

    expect(yearToggleBtn.getAttribute('aria-expanded')).toBe('true');

    const yearsGrid = container.querySelector('[role="grid"][aria-label="Select year"]');
    expect(yearsGrid).not.toBeNull();

    const focusedYear = () => container.querySelector('.rmd-year-button[tabindex="0"]') as HTMLButtonElement;
    expect(focusedYear()?.textContent?.trim()).toBe('2026');

    // ArrowDown -> 2029 (+3 in grid)
    act(() => {
      focusedYear()?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      );
    });
    expect(focusedYear()?.textContent?.trim()).toBe('2029');

    // Enter selects 2029
    act(() => {
      focusedYear()?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      );
    });

    expect(container.querySelector('[role="grid"]')?.getAttribute('aria-label')).toBe('September 2029');

    document.body.removeChild(container);
  });
});
