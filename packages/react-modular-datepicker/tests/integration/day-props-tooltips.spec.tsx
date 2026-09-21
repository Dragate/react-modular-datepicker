import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

describe('Day Props and Tooltips Integration', () => {
  test('passes dynamic attributes and custom event handlers via getDayProps', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const handleCustomClick = vi.fn();

    act(() => {
      root.render(
        <Calendar
          date={new Date(2025, 4, 15)}
          getDayProps={(dateObj) => {
            if (dateObj.date.getDate() === 15) {
              return {
                'data-tooltip': 'Payday',
                'aria-label': 'Special Payday May 15',
                onClick: handleCustomClick,
              };
            }
            return {};
          }}
        />
      );
    });

    const day15Btn = Array.from(container.querySelectorAll('.rmd-days-grid button')).find(
      (btn) => btn.textContent?.trim() === '15'
    ) as HTMLButtonElement;

    expect(day15Btn).not.toBeNull();
    expect(day15Btn.getAttribute('data-tooltip')).toBe('Payday');
    expect(day15Btn.getAttribute('aria-label')).toBe('Special Payday May 15');

    act(() => {
      day15Btn.click();
    });

    expect(handleCustomClick).toHaveBeenCalled();

    document.body.removeChild(container);
  });
});
