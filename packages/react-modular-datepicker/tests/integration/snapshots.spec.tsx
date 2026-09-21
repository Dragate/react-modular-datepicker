import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

describe('Component Snapshot Tests', () => {
  test('renders single date selection calendar DOM snapshot', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2026, 8, 15);

    act(() => {
      root.render(<Calendar date={testDate} selected={testDate} />);
    });

    expect(container.innerHTML).toMatchSnapshot();
  });

  test('renders date range selection calendar DOM snapshot', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const startDate = new Date(2026, 8, 10);
    const endDate = new Date(2026, 8, 15);

    act(() => {
      root.render(
        <Calendar
          mode="range"
          date={startDate}
          selectedRange={{ startDate, endDate }}
        />
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
  });

  test('renders multi-month display calendar DOM snapshot', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2026, 8, 1);

    act(() => {
      root.render(
        <Calendar
          date={testDate}
          monthsToDisplay={2}
        />
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
  });

  test('renders calendar with custom classNames override DOM snapshot', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2026, 8, 15);

    act(() => {
      root.render(
        <Calendar
          date={testDate}
          selected={testDate}
          classNames={{
            root: 'custom-root-class',
            header: 'custom-header-class',
            day: {
              selected: 'custom-selected-class',
              unselected: 'custom-unselected-class',
            },
          }}
        />
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
  });
});
