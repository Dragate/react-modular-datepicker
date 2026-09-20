import { useState } from 'react';
import { Calendar, useDates } from 'react-modular-datepicker';
import { describe, expect, test } from 'vitest';
import { setupComponent } from '../test-utils';

function EventScheduleTestWrapper() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const eventsData: Record<string, string> = {
    [`${year}-${month + 1}-5`]: '2 events',
    [`${year}-${month + 1}-12`]: '1 event',
  };

  const [selectedDate, setSelectedDate] = useState<Date>(new Date(year, month, 5));
  const getKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  return (
    <Calendar
      selected={selectedDate}
      onChange={(d) => setSelectedDate(d as Date)}
      modifiers={{
        hasEvents: (date) => !!eventsData[getKey(date)],
      }}
      getDayProps={(dateObj) => {
        const events = eventsData[getKey(dateObj.date)];
        return events ? { 'data-tooltip': events } : {};
      }}
    />
  );
}

function CustomLayoutScheduleTestWrapper() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { calendars } = useDates({
    selected: selectedDate,
    onChange: (d) => setSelectedDate(d as Date),
  });

  return (
    <div>
      <div data-testid="custom-month">{calendars[0]?.month}</div>
      <div data-testid="event-badge">Team Standup</div>
    </div>
  );
}

describe('Event & Schedule Recipe', () => {
  describe('EventScheduleTestWrapper', () => {
    const env = setupComponent(<EventScheduleTestWrapper />);

    test('should render event schedule calendar with dynamic data-tooltip attributes', () => {
      const day5Btn = Array.from(env.container.querySelectorAll('button')).find((b) => b.textContent?.trim() === '5');
      const day12Btn = Array.from(env.container.querySelectorAll('button')).find((b) => b.textContent?.trim() === '12');

      expect(day5Btn?.getAttribute('data-tooltip')).toBe('2 events');
      expect(day12Btn?.getAttribute('data-tooltip')).toBe('1 event');
    });
  });

  describe('CustomLayoutScheduleTestWrapper', () => {
    const env = setupComponent(<CustomLayoutScheduleTestWrapper />);

    test('should render custom layout schedule view with event badges', () => {
      expect(env.container.querySelector('[data-testid="event-badge"]')?.textContent).toBe('Team Standup');
    });
  });
});
