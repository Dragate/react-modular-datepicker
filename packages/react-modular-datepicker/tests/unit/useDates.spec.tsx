import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';
import { useDates, UseDatesProps, DateObj } from 'react-modular-datepicker';

function HookTestComponent({
  useDatesProps,
  onRender,
}: {
  useDatesProps: UseDatesProps;
  onRender: (result: ReturnType<typeof useDates>) => void;
}) {
  const result = useDates(useDatesProps);
  onRender(result);

  const cal = result.calendars[0];
  const firstDay = cal.weeks[0].find(Boolean)!;

  return (
    <div>
      <div data-testid="month-display">{cal.month}</div>
      <button {...result.getBackProps({ calendars: result.calendars })} data-testid="back-btn">
        Back
      </button>
      <button {...result.getForwardProps({ calendars: result.calendars })} data-testid="forward-btn">
        Forward
      </button>
      <button
        {...result.getDateProps({ dateObj: firstDay })}
        data-testid="day-btn"
      >
        Day
      </button>
    </div>
  );
}

describe('useDates Hook', () => {
  const baseDate = new Date(2025, 4, 15); // May 15, 2025

  test('initializes with default calendars and functions', () => {
    let hookResult!: ReturnType<typeof useDates>;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(
        <HookTestComponent
          useDatesProps={{ date: baseDate }}
          onRender={(res) => {
            hookResult = res;
          }}
        />
      );
    });

    expect(hookResult.calendars).toHaveLength(1);
    expect(hookResult.calendars[0].month).toBe(4);
    expect(hookResult.calendars[0].year).toBe(2025);
    expect(typeof hookResult.getDateProps).toBe('function');
    expect(typeof hookResult.getBackProps).toBe('function');
    expect(typeof hookResult.getForwardProps).toBe('function');
    expect(typeof hookResult.setOffset).toBe('function');

    document.body.removeChild(container);
  });

  test('handles uncontrolled and controlled offset updates', () => {
    const onOffsetChanged = vi.fn();
    const onMonthChange = vi.fn();
    const onYearChange = vi.fn();

    let hookResult!: ReturnType<typeof useDates>;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(
        <HookTestComponent
          useDatesProps={{
            date: baseDate,
            onOffsetChanged,
            onMonthChange,
            onYearChange,
          }}
          onRender={(res) => {
            hookResult = res;
          }}
        />
      );
    });

    act(() => {
      hookResult.setOffset(1);
    });

    expect(onOffsetChanged).toHaveBeenCalledWith(1);
    expect(onMonthChange).toHaveBeenCalled();
    expect(onYearChange).toHaveBeenCalled();
    expect(container.querySelector('[data-testid="month-display"]')?.textContent).toBe('5'); // June

    document.body.removeChild(container);
  });

  test('controlled offset prop overrides state offset', () => {
    const onOffsetChanged = vi.fn();

    let hookResult!: ReturnType<typeof useDates>;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    function ControlledWrapper({ offset }: { offset: number }) {
      return (
        <HookTestComponent
          useDatesProps={{
            date: baseDate,
            offset,
            onOffsetChanged,
          }}
          onRender={(res) => {
            hookResult = res;
          }}
        />
      );
    }

    act(() => {
      root.render(<ControlledWrapper offset={2} />);
    });

    expect(container.querySelector('[data-testid="month-display"]')?.textContent).toBe('6'); // July (May + 2)

    act(() => {
      hookResult.setOffset(5);
    });

    expect(onOffsetChanged).toHaveBeenCalledWith(5);
    // Controlled offset remains 2 in DOM
    expect(container.querySelector('[data-testid="month-display"]')?.textContent).toBe('6');

    act(() => {
      root.render(<ControlledWrapper offset={5} />);
    });

    expect(container.querySelector('[data-testid="month-display"]')?.textContent).toBe('9'); // October (May + 5)

    document.body.removeChild(container);
  });

  test('getDateProps formats button props and handles mouse enter/leave', () => {
    let hookResult!: ReturnType<typeof useDates>;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const userMouseEnter = vi.fn();
    const userMouseLeave = vi.fn();

    function Wrapper() {
      const res = useDates({ date: baseDate });
      hookResult = res;
      return null;
    }

    act(() => {
      root.render(<Wrapper />);
    });

    const firstDayObj = hookResult.calendars[0].weeks[0].find(Boolean)!;
    const dateProps = hookResult.getDateProps({
      dateObj: firstDayObj,
      onMouseEnter: userMouseEnter,
      onMouseLeave: userMouseLeave,
    });

    expect(dateProps.role).toBe('button');
    expect(dateProps['aria-pressed']).toBe(false);
    expect(dateProps.disabled).toBe(false);

    act(() => {
      dateProps.onMouseEnter({});
    });
    expect(userMouseEnter).toHaveBeenCalled();

    act(() => {
      dateProps.onMouseLeave({});
    });
    expect(userMouseLeave).toHaveBeenCalled();

    document.body.removeChild(container);
  });

  test('getBackProps and getForwardProps trigger navigation and user onClick handlers', () => {
    let hookResult!: ReturnType<typeof useDates>;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const userBackClick = vi.fn();
    const userForwardClick = vi.fn();

    function NavWrapper() {
      const res = useDates({ date: baseDate });
      hookResult = res;
      return (
        <div>
          <div data-testid="month">{res.calendars[0].month}</div>
          <button
            {...res.getBackProps({
              calendars: res.calendars,
              onClick: userBackClick,
            })}
            data-testid="back"
          >
            Back
          </button>
          <button
            {...res.getForwardProps({
              calendars: res.calendars,
              onClick: userForwardClick,
            })}
            data-testid="forward"
          >
            Forward
          </button>
        </div>
      );
    }

    act(() => {
      root.render(<NavWrapper />);
    });

    const backBtn = container.querySelector('[data-testid="back"]') as HTMLButtonElement;
    const forwardBtn = container.querySelector('[data-testid="forward"]') as HTMLButtonElement;

    act(() => {
      backBtn.click();
    });

    expect(userBackClick).toHaveBeenCalled();
    expect(container.querySelector('[data-testid="month"]')?.textContent).toBe('3'); // April

    act(() => {
      forwardBtn.click();
    });

    expect(userForwardClick).toHaveBeenCalled();
    expect(container.querySelector('[data-testid="month"]')?.textContent).toBe('4'); // May

    document.body.removeChild(container);
  });

  test('selectionMode = "single" calls onChange with date', () => {
    const onChange = vi.fn();
    const onDateSelected = vi.fn();

    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    function SingleWrapper() {
      const res = useDates({
        date: baseDate,
        selectionMode: 'single',
        onChange,
        onDateSelected,
      });
      const dayObj = res.calendars[0].weeks[2][3]!;
      return (
        <button {...res.getDateProps({ dateObj: dayObj })} data-testid="single-day">
          Day
        </button>
      );
    }

    act(() => {
      root.render(<SingleWrapper />);
    });

    const dayBtn = container.querySelector('[data-testid="single-day"]') as HTMLButtonElement;

    act(() => {
      dayBtn.click();
    });

    expect(onDateSelected).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();

    document.body.removeChild(container);
  });

  test('selectionMode = "multiple" toggles date selection', () => {
    const onChange = vi.fn();

    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    function MultipleWrapper({ selected }: { selected?: Date[] }) {
      const res = useDates({
        date: baseDate,
        selectionMode: 'multiple',
        selected,
        onChange,
      });

      const flatDays = res.calendars[0].weeks.flat().filter(Boolean) as DateObj[];
      const day10Obj = flatDays.find((d) => d.date.getDate() === 10)!;
      const day12Obj = flatDays.find((d) => d.date.getDate() === 12)!;

      return (
        <div>
          <button {...res.getDateProps({ dateObj: day10Obj })} data-testid="day-10">
            10
          </button>
          <button {...res.getDateProps({ dateObj: day12Obj })} data-testid="day-12">
            12
          </button>
        </div>
      );
    }

    act(() => {
      root.render(<MultipleWrapper selected={undefined} />);
    });

    const day10Btn = container.querySelector('[data-testid="day-10"]') as HTMLButtonElement;
    const day12Btn = container.querySelector('[data-testid="day-12"]') as HTMLButtonElement;

    // Select day 10
    act(() => {
      day10Btn.click();
    });
    const selectedDay10 = onChange.mock.calls[0][0][0];
    expect(selectedDay10.getDate()).toBe(10);

    // Rerender with day 10 selected
    act(() => {
      root.render(<MultipleWrapper selected={[selectedDay10]} />);
    });

    // Select day 12 -> appends day 12
    act(() => {
      day12Btn.click();
    });
    const call2 = onChange.mock.calls[1][0];
    expect(call2).toHaveLength(2);
    expect(call2[0].getDate()).toBe(10);
    expect(call2[1].getDate()).toBe(12);

    const selectedDay12 = call2[1];

    // Rerender with day 10 and day 12 selected
    act(() => {
      root.render(<MultipleWrapper selected={[selectedDay10, selectedDay12]} />);
    });

    // Select day 10 again -> removes day 10
    act(() => {
      day10Btn.click();
    });

    const call3 = onChange.mock.calls[2][0];
    expect(call3).toHaveLength(1);
    expect(call3[0].getDate()).toBe(12);

    document.body.removeChild(container);
  });

  test('selectionMode = "range" handles start selection, end selection (after and before start), and reset', () => {
    const onChange = vi.fn();

    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    function RangeWrapper({ selected }: { selected?: { start?: Date; end?: Date } }) {
      const res = useDates({
        date: baseDate,
        selectionMode: 'range',
        selected,
        onChange,
      });

      const flatDays = res.calendars[0].weeks.flat().filter(Boolean) as DateObj[];
      const day5Obj = flatDays.find((d) => d.date.getDate() === 5)!;
      const day10Obj = flatDays.find((d) => d.date.getDate() === 10)!;
      const day15Obj = flatDays.find((d) => d.date.getDate() === 15)!;

      return (
        <div>
          <button {...res.getDateProps({ dateObj: day5Obj })} data-testid="day-5">
            5
          </button>
          <button {...res.getDateProps({ dateObj: day10Obj })} data-testid="day-10">
            10
          </button>
          <button {...res.getDateProps({ dateObj: day15Obj })} data-testid="day-15">
            15
          </button>
        </div>
      );
    }

    act(() => {
      root.render(<RangeWrapper selected={undefined} />);
    });

    const day5Btn = container.querySelector('[data-testid="day-5"]') as HTMLButtonElement;
    const day10Btn = container.querySelector('[data-testid="day-10"]') as HTMLButtonElement;
    const day15Btn = container.querySelector('[data-testid="day-15"]') as HTMLButtonElement;

    // 1. Click day 10 -> sets start
    act(() => {
      day10Btn.click();
    });
    const range1 = onChange.mock.calls[0][0];
    expect(range1.start.getDate()).toBe(10);
    expect(range1.end).toBeUndefined();

    // 2. Rerender with start = day 10, click day 15 -> sets end
    act(() => {
      root.render(<RangeWrapper selected={{ start: range1.start, end: undefined }} />);
    });

    act(() => {
      day15Btn.click();
    });
    const range2 = onChange.mock.calls[1][0];
    expect(range2.start.getDate()).toBe(10);
    expect(range2.end.getDate()).toBe(15);

    // 3. Rerender with start = day 10, click day 5 (before start) -> sets start = day 5, end = day 10
    act(() => {
      root.render(<RangeWrapper selected={{ start: range1.start, end: undefined }} />);
    });

    act(() => {
      day5Btn.click();
    });
    const range3 = onChange.mock.calls[2][0];
    expect(range3.start.getDate()).toBe(5);
    expect(range3.end.getDate()).toBe(10);

    // 4. Rerender with complete range, click day 5 -> resets range with start = day 5
    act(() => {
      root.render(<RangeWrapper selected={{ start: range2.start, end: range2.end }} />);
    });

    act(() => {
      day5Btn.click();
    });
    const range4 = onChange.mock.calls[3][0];
    expect(range4.start.getDate()).toBe(5);
    expect(range4.end).toBeUndefined();

    document.body.removeChild(container);
  });

  test('uncontrolled selection maintains state internally across clicks', () => {
    const onChange = vi.fn();

    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    function UncontrolledHookWrapper() {
      const res = useDates({
        date: baseDate,
        selectionMode: 'single',
        onChange,
      });

      const flatDays = res.calendars[0].weeks.flat().filter(Boolean) as DateObj[];
      const day10Obj = flatDays.find((d) => d.date.getDate() === 10)!;

      return (
        <button
          {...res.getDateProps({ dateObj: day10Obj })}
          data-testid="day-10"
        >
          {String(day10Obj.selected)}
        </button>
      );
    }

    act(() => {
      root.render(<UncontrolledHookWrapper />);
    });

    const day10Btn = container.querySelector('[data-testid="day-10"]') as HTMLButtonElement;
    expect(day10Btn.textContent).toBe('false');

    act(() => {
      day10Btn.click();
    });

    expect(day10Btn.textContent).toBe('true');
    expect(onChange).toHaveBeenCalled();

    document.body.removeChild(container);
  });

  test('controlled selection with selected=null does not update internal state', () => {
    const onChange = vi.fn();

    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    function ControlledNullHookWrapper() {
      const res = useDates({
        date: baseDate,
        selectionMode: 'single',
        selected: null,
        onChange,
      });

      const flatDays = res.calendars[0].weeks.flat().filter(Boolean) as DateObj[];
      const day10Obj = flatDays.find((d) => d.date.getDate() === 10)!;

      return (
        <button
          {...res.getDateProps({ dateObj: day10Obj })}
          data-testid="day-10"
        >
          {String(day10Obj.selected)}
        </button>
      );
    }

    act(() => {
      root.render(<ControlledNullHookWrapper />);
    });

    const day10Btn = container.querySelector('[data-testid="day-10"]') as HTMLButtonElement;
    expect(day10Btn.textContent).toBe('false');

    act(() => {
      day10Btn.click();
    });

    expect(onChange).toHaveBeenCalled();
    expect(day10Btn.textContent).toBe('false');

    document.body.removeChild(container);
  });

  test('range mode calculates hovered date highlighting correctly', () => {
    const day10 = new Date(2025, 4, 10);

    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    let hookResult!: ReturnType<typeof useDates>;

    function HoverWrapper() {
      const res = useDates({
        date: baseDate,
        selectionMode: 'range',
        selected: { start: day10, end: undefined },
      });
      hookResult = res;

      const flatDays = res.calendars[0].weeks.flat().filter(Boolean) as DateObj[];
      const day12Obj = flatDays.find((d) => d.date.getDate() === 12)!;

      return (
        <div data-testid="day-12-hover">{String(day12Obj.isRangeHovering)}</div>
      );
    }

    act(() => {
      root.render(<HoverWrapper />);
    });

    expect(container.querySelector('[data-testid="day-12-hover"]')?.textContent).toBe('false');

    const flatDays = hookResult.calendars[0].weeks.flat().filter(Boolean) as DateObj[];
    const day15Obj = flatDays.find((d) => d.date.getDate() === 15)!;
    const day15Props = hookResult.getDateProps({ dateObj: day15Obj });

    act(() => {
      day15Props.onMouseEnter({});
    });
    expect(container.querySelector('[data-testid="day-12-hover"]')?.textContent).toBe('true');

    act(() => {
      day15Props.onMouseLeave({});
    });
    expect(container.querySelector('[data-testid="day-12-hover"]')?.textContent).toBe('false');

    document.body.removeChild(container);
  });
});
