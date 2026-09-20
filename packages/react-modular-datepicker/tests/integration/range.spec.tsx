import { useState } from 'react';
import { Calendar } from 'react-modular-datepicker';
import { describe, expect, test } from 'vitest';
import { setupComponent } from '../test-utils';

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
  const env = setupComponent(<RangeTestWrapper />);

  test('should render range selection component', () => {
    expect(env.container.querySelector('[data-testid="range-display"]')?.textContent?.trim()).toBe('10 - 15');
  });
});
