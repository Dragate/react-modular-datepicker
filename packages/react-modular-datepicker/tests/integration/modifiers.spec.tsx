import { useState } from 'react';
import { Calendar } from 'react-modular-datepicker';
import { describe, expect, test } from 'vitest';
import { setupComponent } from '../test-utils';

function ModifiersTestWrapper() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 4, 15));
  return (
    <Calendar
      date={new Date(2025, 4, 15)}
      selected={selectedDate}
      onChange={(d) => setSelectedDate(d as Date)}
      modifiers={{
        weekend: (date) => date.getDay() === 0 || date.getDay() === 6,
        special: (date) => date.getDate() === 15,
      }}
      classNames={{
        day: {
          weekend: 'is-weekend',
          special: 'is-special',
        },
      }}
    />
  );
}

describe('Modifiers Recipe', () => {
  const env = setupComponent(<ModifiersTestWrapper />);

  test('should render modifiers demo with weekend and special highlights', () => {
    const specialDay = Array.from(env.container.querySelectorAll('.rmdp button')).find((b) => b.textContent?.trim() === '15');
    expect(specialDay?.className).toContain('is-special');
  });
});
