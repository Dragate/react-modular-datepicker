import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

const customClassNames = {
  root: 'custom-root-style',
  day: {
    selected: 'custom-selected-day',
  },
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

describe('Custom Styling Recipe', () => {
  test('should render custom styling component with semantic classes and custom overrides', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<StylingTestWrapper />);
    });

    const rootElement = container.querySelector('.rmd');
    expect(rootElement?.className).toContain('rmd-root');
    expect(rootElement?.className).toContain('custom-root-style');

    const selectedDay = Array.from(container.querySelectorAll('button')).find(
      (btn) => btn.textContent?.trim() === '13'
    );
    expect(selectedDay?.className).toContain('rmd-day');
    expect(selectedDay?.className).toContain('rmd-day-selected');
    expect(selectedDay?.className).toContain('custom-selected-day');

    const unselectedDay = Array.from(container.querySelectorAll('button')).find(
      (btn) => btn.textContent?.trim() === '14'
    );
    expect(unselectedDay?.className).toContain('rmd-day');
    expect(unselectedDay?.className).toContain('rmd-day-unselected');
  });
});
