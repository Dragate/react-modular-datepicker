import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

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
  test('should render multiple selection component', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<MultipleTestWrapper />);
    });

    expect(container.querySelector('[data-testid="count"]')?.textContent).toBe('Selected count: 2');

    const day20Btn = Array.from(container.querySelectorAll('.rmd button')).find((b) => b.textContent?.trim() === '20');
    act(() => {
      day20Btn?.click();
    });

    expect(container.querySelector('[data-testid="count"]')?.textContent).toBe('Selected count: 3');
  });
});
