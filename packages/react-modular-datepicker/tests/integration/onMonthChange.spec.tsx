import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

describe('onMonthChange prop test', () => {
  test('passes an array of the first days of displayed months to onMonthChange', () => {
    const onMonthChange = vi.fn();
    const baseDate = new Date(2025, 4, 15); // May 2025

    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(
        <Calendar
          date={baseDate}
          monthsToDisplay={2}
          onMonthChange={onMonthChange}
        />
      );
    });

    const nextButton = Array.from(container.querySelectorAll('button')).find(
      btn => btn.getAttribute('aria-label') === 'Next month' || btn.getAttribute('aria-label') === 'Forward'
    );

    expect(nextButton).toBeDefined();

    act(() => {
      nextButton?.click();
    });

    expect(onMonthChange).toHaveBeenCalledTimes(1);
    const datesArg = onMonthChange.mock.calls[0][0];
    expect(Array.isArray(datesArg)).toBe(true);
    expect(datesArg).toHaveLength(2);

    // May 2025 shifted by stepOffset=2 -> July 2025 and August 2025
    expect(datesArg[0].getFullYear()).toBe(2025);
    expect(datesArg[0].getMonth()).toBe(6); // July (0-indexed 6)
    expect(datesArg[0].getDate()).toBe(1);

    expect(datesArg[1].getFullYear()).toBe(2025);
    expect(datesArg[1].getMonth()).toBe(7); // August (0-indexed 7)
    expect(datesArg[1].getDate()).toBe(1);

    act(() => {
      root.unmount();
    });
    container.remove();
  });
});
