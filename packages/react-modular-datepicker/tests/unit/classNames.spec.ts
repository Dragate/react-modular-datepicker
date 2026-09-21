import { describe, expect, test } from 'vitest';
import type { CalendarClassNames, DayClassNames } from 'react-modular-datepicker';

describe('classNames interfaces', () => {
  test('type definitions allow full custom classNames object', () => {
    const customDay: DayClassNames = {
      day: 'custom-day',
      selected: 'custom-selected',
      unselected: 'custom-unselected',
    };

    const customCalendar: CalendarClassNames = {
      root: 'custom-root',
      header: 'custom-header',
      day: customDay,
    };

    expect(customCalendar.root).toBe('custom-root');
    expect(customCalendar.day?.selected).toBe('custom-selected');
  });
});
