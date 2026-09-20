import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

const customClassNames = {
  root: 'custom-root-style',
};

function StylingTestWrapper() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 8, 13));
  return (
    <Calendar
      date={selectedDate}
      selected={selectedDate}
      onChange={(d) => setSelectedDate(d as Date)}
      classNames={customClassNames}
    />
  );
}

describe('Custom Styling & Class Consistency', () => {
  test('should render custom styling component', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<StylingTestWrapper />);
    });

    const rootElement = container.querySelector('.rmdp');
    expect(rootElement?.className).toContain('custom-root-style');
  });

  test('should apply rmdp-* default state classes consistently on day elements', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    // Selected Sept 13, 2026. Sept 1 2026 is Tuesday. Front buffer includes Aug 30 and 31.
    const selectedDate = new Date(2026, 8, 13);

    act(() => {
      root.render(
        <Calendar
          date={selectedDate}
          selected={selectedDate}
        />
      );
    });

    const buttons = container.querySelectorAll('.rmdp-day');
    expect(buttons.length).toBeGreaterThan(0);

    // Check outside day
    const outsideDay = Array.from(buttons).find(btn => btn.textContent === '30');
    expect(outsideDay?.className).toContain('rmdp-day-outside');

    // Check selected day
    const selectedDay = Array.from(buttons).find(btn => btn.textContent === '13');
    expect(selectedDay?.className).toContain('rmdp-day-selected');

    // Check unselected day
    const unselectedDay = Array.from(buttons).find(btn => btn.textContent === '14');
    expect(unselectedDay?.className).toContain('rmdp-day-unselected');
  });
});
