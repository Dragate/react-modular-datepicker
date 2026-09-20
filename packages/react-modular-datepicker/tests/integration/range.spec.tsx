import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

function RangeTestWrapper() {
  const [range, setRange] = useState<{ start?: Date; end?: Date }>({
    start: new Date(2025, 4, 10),
    end: new Date(2025, 4, 15),
  });
  return (
    <div>
      <Calendar
        date={new Date(2025, 4, 1)}
        selectionMode="range"
        monthsToDisplay={2}
        selected={range}
        onChange={(r) => setRange(r as { start?: Date; end?: Date })}
      />
      <div data-testid="range-display">
        {range.start?.getDate()} - {range.end?.getDate()}
      </div>
    </div>
  );
}

describe('Range Selection Recipe', () => {
  test('should render range selection component', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<RangeTestWrapper />);
    });

    expect(container.querySelector('[data-testid="range-display"]')?.textContent?.trim()).toBe('10 - 15');
  });
});
