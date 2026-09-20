import { act, useState } from 'react';
import { Calendar } from 'react-modular-datepicker';
import { describe, expect, test } from 'vitest';
import { setupComponent } from '../test-utils';

function MultipleTestWrapper() {
  const [dates, setDates] = useState<Date[]>([new Date(2025, 4, 10), new Date(2025, 4, 15)]);
  return (
    <div>
      <Calendar
        date={new Date(2025, 4, 1)}
        selectionMode="multiple"
        selected={dates}
        onChange={(d) => setDates(d as Date[])}
      />
      <div data-testid="count">Selected count: {dates.length}</div>
    </div>
  );
}

describe('Multiple Selection Recipe', () => {
  const env = setupComponent(<MultipleTestWrapper />);

  test('should render multiple selection component', () => {
    expect(env.container.querySelector('[data-testid="count"]')?.textContent).toBe('Selected count: 2');

    const day20Btn = Array.from(env.container.querySelectorAll('.rmdp button')).find((b) => b.textContent?.trim() === '20');
    act(() => {
      day20Btn?.click();
    });

    expect(env.container.querySelector('[data-testid="count"]')?.textContent).toBe('Selected count: 3');
  });
});
