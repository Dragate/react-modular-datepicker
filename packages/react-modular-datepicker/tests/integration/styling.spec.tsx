import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar, defaultClassNames } from 'react-modular-datepicker';

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
  test('should render custom styling component and semantic class names', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<StylingTestWrapper />);
    });

    const rootElement = container.querySelector('.rmd');
    expect(rootElement?.className).toContain('custom-root-style');

    const selectedDay = Array.from(container.querySelectorAll('button')).find(
      (btn) => btn.textContent?.trim() === '13'
    );
    expect(selectedDay?.className).toContain('custom-selected-day');
    expect(selectedDay?.className).toContain('rmd-day');
  });

  test('defaultClassNames uses semantic class names without inline utility classes', () => {
    expect(defaultClassNames.root).toBe('rmd-root');
    expect(defaultClassNames.header).toBe('rmd-header');
    expect(defaultClassNames.day.day).toBe('rmd-day');
    expect(defaultClassNames.day.selected).toBe('rmd-day-selected');
  });
});
