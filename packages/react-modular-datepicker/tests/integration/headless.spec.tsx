import { useState } from 'react';
import { useDates } from 'react-modular-datepicker';
import { describe, expect, test } from 'vitest';
import { setupComponent } from '../test-utils';

function HeadlessTestWrapper() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { calendars, getBackProps, getForwardProps, getDateProps } = useDates({
    selected: selectedDate,
    onChange: (d) => setSelectedDate(d as Date),
  });

  const calendar = calendars[0];
  if (!calendar) return null;

  return (
    <div data-testid="headless-container">
      <button {...getBackProps({ calendars })} data-testid="prev-btn">Prev</button>
      <span data-testid="month-year">{calendar.month}-{calendar.year}</span>
      <button {...getForwardProps({ calendars })} data-testid="next-btn">Next</button>
      <div>
        {calendar.weeks.flat().map((dateObj, idx) => {
          if (!dateObj) return null;
          return (
            <button key={idx} {...getDateProps({ dateObj })}>
              {dateObj.date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

describe('Headless Usage Recipe', () => {
  const env = setupComponent(<HeadlessTestWrapper />);

  test('should render headless custom layout component', () => {
    expect(env.container.querySelector('[data-testid="headless-container"]')).not.toBeNull();
    expect(env.container.querySelector('[data-testid="month-year"]')).not.toBeNull();
  });
});
