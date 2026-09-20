import React, { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

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

describe('Custom Styling Recipe', () => {
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
});
