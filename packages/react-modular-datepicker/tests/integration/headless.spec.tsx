import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { useDates } from 'react-modular-datepicker';


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
  test('should render headless custom layout component', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<HeadlessTestWrapper />);
    });

    expect(container.querySelector('[data-testid="headless-container"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="month-year"]')).not.toBeNull();
  });
});
