import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

function RangeInteractiveWrapper() {
  const [range, setRange] = useState<{ start?: Date; end?: Date }>({});
  return (
    <div>
      <Calendar
        date={new Date(2025, 4, 1)} // May 2025
        selectionMode="range"
        selected={range}
        onChange={(r) => setRange(r as { start?: Date; end?: Date })}
      />
      <div data-testid="range-result">
        {range.start ? range.start.getDate() : 'none'} - {range.end ? range.end.getDate() : 'none'}
      </div>
    </div>
  );
}

describe('Interactive Range Selection', () => {
  test('selects start, hovers over intermediate dates, and selects end date', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<RangeInteractiveWrapper />);
    });

    const getDayButton = (dayNumber: number) => {
      return Array.from(container.querySelectorAll('.rmd-days-grid button')).find(
        (btn) => btn.textContent?.trim() === String(dayNumber)
      ) as HTMLButtonElement;
    };

    // 1. Initially range display is 'none - none'
    expect(container.querySelector('[data-testid="range-result"]')?.textContent?.trim()).toBe('none - none');

    // 2. Click May 10 -> sets range start
    const day10 = getDayButton(10);
    act(() => {
      day10.click();
    });
    expect(container.querySelector('[data-testid="range-result"]')?.textContent?.trim()).toBe('10 - none');

    // 3. Hover over May 15 -> triggers hovering styles on May 11-15
    const day15 = getDayButton(15);
    act(() => {
      day15.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    });

    const day12 = getDayButton(12);
    expect(day12.className).toContain('rmd-day-range-hovering');

    // Leave mouse from May 15
    act(() => {
      day15.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
    });
    expect(day12.className).not.toContain('rmd-day-range-hovering');

    // 4. Click May 15 -> completes range (10 - 15)
    act(() => {
      day15.click();
    });
    expect(container.querySelector('[data-testid="range-result"]')?.textContent?.trim()).toBe('10 - 15');

    // Range start, between, and end classes applied
    expect(day10.className).toContain('rmd-day-range-start');
    expect(day12.className).toContain('rmd-day-range-between');
    expect(day15.className).toContain('rmd-day-range-end');

    // 5. Click May 5 when range is complete -> resets start to May 5
    const day5 = getDayButton(5);
    act(() => {
      day5.click();
    });
    expect(container.querySelector('[data-testid="range-result"]')?.textContent?.trim()).toBe('5 - none');

    document.body.removeChild(container);
  });
});
