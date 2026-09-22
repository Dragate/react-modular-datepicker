import React, { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';
import { Calendar } from '../../src/index';

describe('Controlled vs Uncontrolled Integration Tests', () => {
  const baseDate = new Date(2025, 4, 15); // May 15, 2025

  describe('Uncontrolled Offset Navigation', () => {
    test('navigates months using back/forward buttons when offset is uncontrolled', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      act(() => {
        root.render(<Calendar date={baseDate} />);
      });

      const monthYearButtons = container.querySelectorAll('.rmd-month-year-button');
      expect(monthYearButtons[0].textContent?.trim()).toBe('May');
      expect(monthYearButtons[1].textContent?.trim()).toBe('2025');

      const buttons = Array.from(container.querySelectorAll('.rmd-nav-button'));
      const backBtn = buttons[0];
      const forwardBtn = buttons[1];

      // Navigate forward -> June 2025
      act(() => {
        (forwardBtn as HTMLButtonElement).click();
      });
      const juneButtons = container.querySelectorAll('.rmd-month-year-button');
      expect(juneButtons[0].textContent?.trim()).toBe('June');
      expect(juneButtons[1].textContent?.trim()).toBe('2025');

      // Navigate back -> May 2025
      act(() => {
        (backBtn as HTMLButtonElement).click();
      });
      const mayButtons = container.querySelectorAll('.rmd-month-year-button');
      expect(mayButtons[0].textContent?.trim()).toBe('May');
      expect(mayButtons[1].textContent?.trim()).toBe('2025');

      document.body.removeChild(container);
    });

    test('navigates via month selection and year selection views when offset is uncontrolled', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      act(() => {
        root.render(<Calendar date={baseDate} />);
      });

      let monthYearButtons = container.querySelectorAll('.rmd-month-year-button');
      expect(monthYearButtons[0].textContent?.trim()).toBe('May');
      expect(monthYearButtons[1].textContent?.trim()).toBe('2025');

      // Switch to month view
      const monthViewBtn = monthYearButtons[0] as HTMLButtonElement;
      act(() => {
        monthViewBtn.click();
      });

      // Select October
      const monthButtons = Array.from(container.querySelectorAll('.rmd-month-button'));
      const octoberBtn = monthButtons.find((btn) => btn.textContent?.trim() === 'October') as HTMLButtonElement;
      expect(octoberBtn).toBeDefined();

      act(() => {
        octoberBtn.click();
      });

      monthYearButtons = container.querySelectorAll('.rmd-month-year-button');
      expect(monthYearButtons[0].textContent?.trim()).toBe('October');
      expect(monthYearButtons[1].textContent?.trim()).toBe('2025');

      // Switch to year view
      const yearViewBtn = monthYearButtons[1] as HTMLButtonElement;
      act(() => {
        yearViewBtn.click();
      });

      // Select 2026
      const yearButtons = Array.from(container.querySelectorAll('.rmd-year-button'));
      const year2026Btn = yearButtons.find((btn) => btn.textContent?.trim() === '2026') as HTMLButtonElement;
      expect(year2026Btn).toBeDefined();

      act(() => {
        year2026Btn.click();
      });

      monthYearButtons = container.querySelectorAll('.rmd-month-year-button');
      expect(monthYearButtons[0].textContent?.trim()).toBe('October');
      expect(monthYearButtons[1].textContent?.trim()).toBe('2026');

      document.body.removeChild(container);
    });

    test('navigates across months using keyboard navigation when offset is uncontrolled', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      act(() => {
        root.render(<Calendar date={baseDate} />);
      });

      let monthYearButtons = container.querySelectorAll('.rmd-month-year-button');
      expect(monthYearButtons[0].textContent?.trim()).toBe('May');
      expect(monthYearButtons[1].textContent?.trim()).toBe('2025');

      // Find day button for May 31
      const day31 = Array.from(container.querySelectorAll('.rmd-day')).find(
        (btn) => btn.textContent?.trim() === '31' && !btn.classList.contains('outside')
      ) as HTMLButtonElement;

      expect(day31).toBeDefined();

      // Press ArrowRight on May 31 to navigate to June 1
      act(() => {
        day31.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      });

      monthYearButtons = container.querySelectorAll('.rmd-month-year-button');
      expect(monthYearButtons[0].textContent?.trim()).toBe('June');
      expect(monthYearButtons[1].textContent?.trim()).toBe('2025');

      document.body.removeChild(container);
    });
  });

  describe('Controlled Offset Navigation', () => {
    test('does not update internal month display on click unless offset prop updates', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      const onOffsetChanged = vi.fn();

      function ControlledOffsetWrapper() {
        const [offset] = useState(0);

        return (
          <Calendar
            date={baseDate}
            offset={offset}
            onOffsetChanged={(newOffset) => {
              onOffsetChanged(newOffset);
              // Intentionally NOT updating offset state here to test controlled behavior
            }}
          />
        );
      }

      act(() => {
        root.render(<ControlledOffsetWrapper />);
      });

      let monthYearButtons = container.querySelectorAll('.rmd-month-year-button');
      expect(monthYearButtons[0].textContent?.trim()).toBe('May');
      expect(monthYearButtons[1].textContent?.trim()).toBe('2025');

      const buttons = Array.from(container.querySelectorAll('.rmd-nav-button'));
      const forwardBtn = buttons[1] as HTMLButtonElement;

      act(() => {
        forwardBtn.click();
      });

      expect(onOffsetChanged).toHaveBeenCalledWith(1);
      // Offset prop stayed 0, so display remains May 2025
      monthYearButtons = container.querySelectorAll('.rmd-month-year-button');
      expect(monthYearButtons[0].textContent?.trim()).toBe('May');
      expect(monthYearButtons[1].textContent?.trim()).toBe('2025');

      document.body.removeChild(container);
    });

    test('updates calendar month display when controlled offset state updates', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      function ControlledOffsetWrapper() {
        const [offset, setOffset] = useState(0);

        return (
          <div>
            <button data-testid="set-offset-2" onClick={() => setOffset(2)}>
              Jump 2 months
            </button>
            <Calendar
              date={baseDate}
              offset={offset}
              onOffsetChanged={(newOffset) => setOffset(newOffset)}
            />
          </div>
        );
      }

      act(() => {
        root.render(<ControlledOffsetWrapper />);
      });

      let monthYearButtons = container.querySelectorAll('.rmd-month-year-button');
      expect(monthYearButtons[0].textContent?.trim()).toBe('May');
      expect(monthYearButtons[1].textContent?.trim()).toBe('2025');

      const forwardBtn = container.querySelectorAll('.rmd-nav-button')[1] as HTMLButtonElement;

      // Click forward -> onOffsetChanged updates state to 1 -> displays June 2025
      act(() => {
        forwardBtn.click();
      });
      monthYearButtons = container.querySelectorAll('.rmd-month-year-button');
      expect(monthYearButtons[0].textContent?.trim()).toBe('June');
      expect(monthYearButtons[1].textContent?.trim()).toBe('2025');

      // Parent updates offset prop to 2 -> displays July 2025
      const jumpBtn = container.querySelector('[data-testid="set-offset-2"]') as HTMLButtonElement;
      act(() => {
        jumpBtn.click();
      });
      monthYearButtons = container.querySelectorAll('.rmd-month-year-button');
      expect(monthYearButtons[0].textContent?.trim()).toBe('July');
      expect(monthYearButtons[1].textContent?.trim()).toBe('2025');

      document.body.removeChild(container);
    });
  });

  describe('Controlled Selection State', () => {
    test('single selection mode works controlled', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      function ControlledSingle() {
        const [selected, setSelected] = useState<Date | undefined>(new Date(2025, 4, 10));

        return (
          <div>
            <span data-testid="selected-val">{selected ? selected.getDate() : 'none'}</span>
            <Calendar
              date={baseDate}
              selectionMode="single"
              selected={selected}
              onChange={(d) => setSelected(d as Date | undefined)}
            />
          </div>
        );
      }

      act(() => {
        root.render(<ControlledSingle />);
      });

      const selectedSpan = container.querySelector('[data-testid="selected-val"]');
      expect(selectedSpan?.textContent).toBe('10');

      // Check that May 10 button has aria-pressed="true"
      const day10Btn = Array.from(container.querySelectorAll('.rmd-day')).find(
        (btn) => btn.textContent?.trim() === '10' && !btn.classList.contains('outside')
      ) as HTMLButtonElement;
      expect(day10Btn.getAttribute('aria-pressed')).toBe('true');

      // Click May 20 -> selected state updates to May 20
      const day20Btn = Array.from(container.querySelectorAll('.rmd-day')).find(
        (btn) => btn.textContent?.trim() === '20' && !btn.classList.contains('outside')
      ) as HTMLButtonElement;

      act(() => {
        day20Btn.click();
      });

      expect(selectedSpan?.textContent).toBe('20');
      expect(day20Btn.getAttribute('aria-pressed')).toBe('true');
      expect(day10Btn.getAttribute('aria-pressed')).toBe('false');

      document.body.removeChild(container);
    });

    test('multiple selection mode works controlled', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      function ControlledMultiple() {
        const [selected, setSelected] = useState<Date[]>([new Date(2025, 4, 5)]);

        return (
          <div>
            <span data-testid="count">{selected.length}</span>
            <Calendar
              date={baseDate}
              selectionMode="multiple"
              selected={selected}
              onChange={(d) => setSelected((d as Date[]) || [])}
            />
          </div>
        );
      }

      act(() => {
        root.render(<ControlledMultiple />);
      });

      const countSpan = container.querySelector('[data-testid="count"]');
      expect(countSpan?.textContent).toBe('1');

      const day15Btn = Array.from(container.querySelectorAll('.rmd-day')).find(
        (btn) => btn.textContent?.trim() === '15' && !btn.classList.contains('outside')
      ) as HTMLButtonElement;

      act(() => {
        day15Btn.click();
      });

      expect(countSpan?.textContent).toBe('2');

      document.body.removeChild(container);
    });

    test('range selection mode works controlled', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      function ControlledRange() {
        const [selected, setSelected] = useState<{ start?: Date; end?: Date }>({});

        return (
          <div>
            <span data-testid="range-start">{selected.start ? selected.start.getDate() : ''}</span>
            <span data-testid="range-end">{selected.end ? selected.end.getDate() : ''}</span>
            <Calendar
              date={baseDate}
              selectionMode="range"
              selected={selected}
              onChange={(d) => setSelected((d as { start?: Date; end?: Date }) || {})}
            />
          </div>
        );
      }

      act(() => {
        root.render(<ControlledRange />);
      });

      const startSpan = container.querySelector('[data-testid="range-start"]');
      const endSpan = container.querySelector('[data-testid="range-end"]');

      const day10Btn = Array.from(container.querySelectorAll('.rmd-day')).find(
        (btn) => btn.textContent?.trim() === '10' && !btn.classList.contains('outside')
      ) as HTMLButtonElement;

      const day20Btn = Array.from(container.querySelectorAll('.rmd-day')).find(
        (btn) => btn.textContent?.trim() === '20' && !btn.classList.contains('outside')
      ) as HTMLButtonElement;

      // Select start date
      act(() => {
        day10Btn.click();
      });
      expect(startSpan?.textContent).toBe('10');
      expect(endSpan?.textContent).toBe('');

      // Select end date
      act(() => {
        day20Btn.click();
      });
      expect(startSpan?.textContent).toBe('10');
      expect(endSpan?.textContent).toBe('20');

      document.body.removeChild(container);
    });
  });

  describe('Uncontrolled / Standalone Selection', () => {
    test('calls onChange callback and updates DOM selection state when selected prop is undefined', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      const onChange = vi.fn();
      const onDateSelected = vi.fn();

      act(() => {
        root.render(
          <Calendar
            date={baseDate}
            selectionMode="single"
            onChange={onChange}
            onDateSelected={onDateSelected}
          />
        );
      });

      const day12Btn = Array.from(container.querySelectorAll('.rmd-day')).find(
        (btn) => btn.textContent?.trim() === '12' && !btn.classList.contains('outside')
      ) as HTMLButtonElement;

      const day15Btn = Array.from(container.querySelectorAll('.rmd-day')).find(
        (btn) => btn.textContent?.trim() === '15' && !btn.classList.contains('outside')
      ) as HTMLButtonElement;

      expect(day12Btn.getAttribute('aria-pressed')).toBe('false');

      // First click: day 12
      act(() => {
        day12Btn.click();
      });

      expect(onDateSelected).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalled();
      const selectedDate = onChange.mock.calls[0][0] as Date;
      expect(selectedDate.getDate()).toBe(12);
      expect(day12Btn.getAttribute('aria-pressed')).toBe('true');

      // Second click: day 15
      act(() => {
        day15Btn.click();
      });

      const selectedDate2 = onChange.mock.calls[1][0] as Date;
      expect(selectedDate2.getDate()).toBe(15);
      expect(day15Btn.getAttribute('aria-pressed')).toBe('true');
      expect(day12Btn.getAttribute('aria-pressed')).toBe('false');

      document.body.removeChild(container);
    });

    test('updates selection in multiple and range modes when uncontrolled', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      const onChangeMultiple = vi.fn();

      act(() => {
        root.render(
          <Calendar
            date={baseDate}
            selectionMode="multiple"
            onChange={onChangeMultiple}
          />
        );
      });

      const day10Btn = Array.from(container.querySelectorAll('.rmd-day')).find(
        (btn) => btn.textContent?.trim() === '10' && !btn.classList.contains('outside')
      ) as HTMLButtonElement;

      const day12Btn = Array.from(container.querySelectorAll('.rmd-day')).find(
        (btn) => btn.textContent?.trim() === '12' && !btn.classList.contains('outside')
      ) as HTMLButtonElement;

      act(() => {
        day10Btn.click();
      });
      expect(day10Btn.getAttribute('aria-pressed')).toBe('true');

      act(() => {
        day12Btn.click();
      });
      expect(day10Btn.getAttribute('aria-pressed')).toBe('true');
      expect(day12Btn.getAttribute('aria-pressed')).toBe('true');
      expect(onChangeMultiple).toHaveBeenLastCalledWith(
        expect.arrayContaining([expect.any(Date), expect.any(Date)])
      );

      document.body.removeChild(container);
    });

    test('functions in uncontrolled mode without requiring onChange prop', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      act(() => {
        root.render(<Calendar date={baseDate} selectionMode="single" />);
      });

      const day12Btn = Array.from(container.querySelectorAll('.rmd-day')).find(
        (btn) => btn.textContent?.trim() === '12' && !btn.classList.contains('outside')
      ) as HTMLButtonElement;

      expect(day12Btn.getAttribute('aria-pressed')).toBe('false');

      act(() => {
        day12Btn.click();
      });

      expect(day12Btn.getAttribute('aria-pressed')).toBe('true');

      document.body.removeChild(container);
    });

    test('initializes with defaultSelected in uncontrolled mode', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      const initialDate = new Date(2025, 4, 10);

      act(() => {
        root.render(
          <Calendar
            date={baseDate}
            selectionMode="single"
            defaultSelected={initialDate}
          />
        );
      });

      const day10Btn = Array.from(container.querySelectorAll('.rmd-day')).find(
        (btn) => btn.textContent?.trim() === '10' && !btn.classList.contains('outside')
      ) as HTMLButtonElement;

      const day20Btn = Array.from(container.querySelectorAll('.rmd-day')).find(
        (btn) => btn.textContent?.trim() === '20' && !btn.classList.contains('outside')
      ) as HTMLButtonElement;

      expect(day10Btn.getAttribute('aria-pressed')).toBe('true');
      expect(day20Btn.getAttribute('aria-pressed')).toBe('false');

      act(() => {
        day20Btn.click();
      });

      expect(day10Btn.getAttribute('aria-pressed')).toBe('false');
      expect(day20Btn.getAttribute('aria-pressed')).toBe('true');

      document.body.removeChild(container);
    });

    test('operates in controlled mode when selected is null', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      const onChange = vi.fn();

      act(() => {
        root.render(
          <Calendar
            date={baseDate}
            selectionMode="single"
            selected={null}
            onChange={onChange}
          />
        );
      });

      const day12Btn = Array.from(container.querySelectorAll('.rmd-day')).find(
        (btn) => btn.textContent?.trim() === '12' && !btn.classList.contains('outside')
      ) as HTMLButtonElement;

      // No date should be pressed initially
      expect(day12Btn.getAttribute('aria-pressed')).toBe('false');

      act(() => {
        day12Btn.click();
      });

      expect(onChange).toHaveBeenCalled();
      const calledDate = onChange.mock.calls[0][0] as Date;
      expect(calledDate.getDate()).toBe(12);

      // Controlled selected prop remains null, so day 12 stays unselected
      expect(day12Btn.getAttribute('aria-pressed')).toBe('false');

      document.body.removeChild(container);
    });
  });
});
