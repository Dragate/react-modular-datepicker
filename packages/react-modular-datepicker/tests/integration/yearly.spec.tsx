import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

describe('Yearly View Recipe', () => {
  test('should render 12 months in yearly view', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(
        <Calendar
          date={new Date(2025, 0, 1)}
          monthsToDisplay={12}
        />
      );
    });

    const monthContainers = container.querySelectorAll('.rmd > div:last-child > div');
    expect(monthContainers.length).toBe(12);
  });
});
