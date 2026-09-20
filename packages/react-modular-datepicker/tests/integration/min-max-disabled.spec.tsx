import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

function BoundsTestWrapper() {
  const [selected, setSelected] = useState<Date | null>(new Date(2025, 4, 15));
  const minDate = new Date(2025, 4, 5);
  const maxDate = new Date(2025, 4, 25);
  const disabledDates = [new Date(2025, 4, 10)];

  return (
    <Calendar
      date={new Date(2025, 4, 15)}
      selected={selected || undefined}
      onChange={(d) => setSelected(d as Date)}
      minDate={minDate}
      maxDate={maxDate}
      disabledDates={disabledDates}
    />
  );
}

describe('Min Max Disabled Recipe', () => {
  test('should render bounds and disabled dates component', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<BoundsTestWrapper />);
    });

    const day4Btn = Array.from(container.querySelectorAll('.rmdp button')).find((b) => b.textContent?.trim() === '4');
    const day10Btn = Array.from(container.querySelectorAll('.rmdp button')).find((b) => b.textContent?.trim() === '10');
    const day15Btn = Array.from(container.querySelectorAll('.rmdp button')).find((b) => b.textContent?.trim() === '15');

    expect(day4Btn?.hasAttribute('disabled')).toBe(true);
    expect(day10Btn?.hasAttribute('disabled')).toBe(true);
    expect(day15Btn?.hasAttribute('disabled')).toBe(false);
  });
});
