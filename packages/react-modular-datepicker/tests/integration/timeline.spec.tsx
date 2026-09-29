import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  category: string;
}

function TimelineTestWrapper() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const timelineEvents: Record<string, TimelineEvent[]> = {
    [`${year}-${month + 1}-8`]: [
      {
        id: '1',
        time: '09:00 AM',
        title: 'Sprint Planning',
        description: 'Planning sprint 24',
        status: 'completed',
        category: 'Product',
      },
      {
        id: '2',
        time: '02:00 PM',
        title: 'API Review',
        description: 'Review API architecture',
        status: 'in-progress',
        category: 'Engineering',
      },
    ],
    [`${year}-${month + 1}-15`]: [
      {
        id: '3',
        time: '10:00 AM',
        title: 'Frontend Verification',
        description: 'Verify accessibility standards',
        status: 'upcoming',
        category: 'Engineering',
      },
    ],
  };

  const [selectedDate, setSelectedDate] = useState<Date>(new Date(year, month, 8));

  const getKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  const currentKey = getKey(selectedDate);
  const events = timelineEvents[currentKey] || [];

  return (
    <div data-testid="timeline-wrapper">
      <Calendar
        selected={selectedDate}
        onChange={(d) => setSelectedDate(d as Date)}
        modifiers={{
          hasEvents: (date) => !!timelineEvents[getKey(date)],
        }}
      />
      <div data-testid="timeline-events-container">
        {events.length > 0 ? (
          events.map((ev) => (
            <div key={ev.id} data-testid="timeline-event-title">
              {ev.title}
            </div>
          ))
        ) : (
          <div data-testid="no-events-message">No events scheduled for this date</div>
        )}
      </div>
    </div>
  );
}

describe('Timeline Recipe Integration Test', () => {
  test('should render timeline events for selected date and update when selecting another date', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<TimelineTestWrapper />);
    });

    // Check initial events for day 8
    let eventTitles = Array.from(container.querySelectorAll('[data-testid="timeline-event-title"]')).map(
      (el) => el.textContent
    );
    expect(eventTitles).toEqual(['Sprint Planning', 'API Review']);

    // Find and click day 15 button
    const day15Btn = Array.from(container.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === '15'
    );
    expect(day15Btn).toBeDefined();

    act(() => {
      day15Btn?.click();
    });

    // Check updated events for day 15
    eventTitles = Array.from(container.querySelectorAll('[data-testid="timeline-event-title"]')).map(
      (el) => el.textContent
    );
    expect(eventTitles).toEqual(['Frontend Verification']);

    // Find and click day 20 button (which has no events)
    const day20Btn = Array.from(container.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === '20'
    );
    expect(day20Btn).toBeDefined();

    act(() => {
      day20Btn?.click();
    });

    // Check empty state
    const noEventsMsg = container.querySelector('[data-testid="no-events-message"]');
    expect(noEventsMsg?.textContent).toBe('No events scheduled for this date');
  });
});
