import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

describe('Component Snapshot Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 21));
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  test('renders single date selection calendar DOM snapshot', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2026, 8, 15);

    act(() => {
      root.render(<Calendar date={testDate} selected={testDate} />);
    });

    expect(container.innerHTML).toMatchSnapshot();
    document.body.removeChild(container);
  });

  test('renders multi-month range selection calendar DOM snapshot without highlighting outside buffer days', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const startDate = new Date(2026, 8, 10);
    const endDate = new Date(2026, 9, 21);

    act(() => {
      root.render(
        <Calendar
          selectionMode="range"
          date={new Date(2026, 8, 1)}
          monthsToDisplay={2}
          selected={{ start: startDate, end: endDate }}
        />
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
    document.body.removeChild(container);
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
          selectionMode="range"
          date={startDate}
          selected={{ start: startDate, end: endDate }}
        />
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
    document.body.removeChild(container);
  });

  test('renders multiple dates selection calendar DOM snapshot', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2026, 8, 1);
    const selectedDates = [
      new Date(2026, 8, 5),
      new Date(2026, 8, 12),
      new Date(2026, 8, 20),
    ];

    act(() => {
      root.render(
        <Calendar
          selectionMode="multiple"
          date={testDate}
          selected={selectedDates}
        />
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
    document.body.removeChild(container);
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
    document.body.removeChild(container);
  });

  test('renders yearly 12-month display calendar DOM snapshot', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2026, 0, 1);

    act(() => {
      root.render(
        <Calendar
          date={testDate}
          monthsToDisplay={12}
        />
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
    document.body.removeChild(container);
  });

  test('renders month selection picker view DOM snapshot', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2026, 8, 15);

    act(() => {
      root.render(<Calendar date={testDate} />);
    });

    const monthBtn = container.querySelector('.rmd-month-year-button') as HTMLButtonElement;
    act(() => {
      monthBtn.click();
    });

    expect(container.innerHTML).toMatchSnapshot();
    document.body.removeChild(container);
  });

  test('renders year selection picker view DOM snapshot', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2026, 8, 15);

    act(() => {
      root.render(<Calendar date={testDate} minDate={new Date(2020, 0, 1)} maxDate={new Date(2030, 11, 31)} />);
    });

    const yearBtn = Array.from(container.querySelectorAll('.rmd-month-year-button'))[1] as HTMLButtonElement;
    act(() => {
      yearBtn.click();
    });

    expect(container.innerHTML).toMatchSnapshot();
    document.body.removeChild(container);
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
    document.body.removeChild(container);
  });

  test('renders RTL layout with custom translations DOM snapshot', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2026, 8, 15);

    act(() => {
      root.render(
        <div dir="rtl">
          <Calendar
            date={testDate}
            translations={{
              back: 'Anterior',
              forward: 'Siguiente',
            }}
          />
        </div>
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
    document.body.removeChild(container);
  });

  test('renders custom function header and footer DOM snapshot', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const testDate = new Date(2026, 8, 15);

    act(() => {
      root.render(
        <Calendar
          date={testDate}
          header={({ monthNames, calendars }) => (
            <div className="custom-header">
              <h1>{monthNames[calendars[0].month]} {calendars[0].year}</h1>
            </div>
          )}
          footer={<div className="custom-footer">Footer Action Bar</div>}
        />
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
    document.body.removeChild(container);
  });
});
