import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

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
  test('should render modifiers demo with weekend and special highlights', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<ModifiersTestWrapper />);
    });

    const specialDay = Array.from(container.querySelectorAll('.rmdp button')).find((b) => b.textContent?.trim() === '15');
    expect(specialDay?.className).toContain('is-special');
  });
});
