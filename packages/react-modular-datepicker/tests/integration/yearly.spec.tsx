import { Calendar } from 'react-modular-datepicker';
import { describe, expect, test } from 'vitest';
import { setupComponent } from '../test-utils';

describe('Yearly View Recipe', () => {
  const env = setupComponent(
    <Calendar
      date={new Date(2025, 0, 1)}
      monthsToDisplay={12}
    />
  );

  test('should render 12 months in yearly view', () => {
    const monthContainers = env.container.querySelectorAll('.rmdp > div:last-child > div');
    expect(monthContainers.length).toBe(12);
  });
});
