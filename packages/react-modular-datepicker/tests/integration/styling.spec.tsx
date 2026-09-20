import { useState } from 'react';
import { Calendar } from 'react-modular-datepicker';
import { describe, expect, test } from 'vitest';
import { setupComponent } from '../test-utils';

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
  const env = setupComponent(<StylingTestWrapper />);

  test('should render custom styling component', () => {
    const rootElement = env.container.querySelector('.rmdp');
    expect(rootElement?.className).toContain('custom-root-style');
  });
});
