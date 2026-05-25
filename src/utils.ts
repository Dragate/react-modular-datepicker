import type { DateAdapter, DateObj, SelectionMode, Calendar } from './types';

export function composeEventHandlers(...fns: any[]) {
    return (event: any, ...args: any[]) =>
        fns.some(fn => {
            if (fn) {
                fn(event, ...args);
            }
            return event && event.defaultPrevented;
        });
}

export function unwrapChildrenForPreact(children: any) {
    return typeof children === 'function' ? children : () => children;
}

export function subtractMonth({
    calendars,
    offset,
    minDate,
    adapter
}: {
    calendars: Calendar[],
    offset: number,
    minDate?: Date,
    adapter: DateAdapter
}): number {
    const firstDay = calendars[0].firstDayOfMonth;
    const newDate = adapter.subtract(adapter.date(firstDay), offset, 'month');

    if (minDate && adapter.isBefore(newDate, adapter.startOf(adapter.date(minDate), 'month'))) {
        return adapter.diff(adapter.startOf(adapter.date(firstDay), 'month'), adapter.startOf(adapter.date(minDate), 'month'), 'month');
    }
    return offset;
}

export function addMonth({
    calendars,
    offset,
    maxDate,
    adapter
}: {
    calendars: Calendar[],
    offset: number,
    maxDate?: Date,
    adapter: DateAdapter
}): number {
    const lastDay = calendars[calendars.length - 1].firstDayOfMonth;
    const newDate = adapter.add(adapter.date(lastDay), offset, 'month');

    if (maxDate && adapter.isAfter(newDate, adapter.startOf(adapter.date(maxDate), 'month'))) {
        return adapter.diff(adapter.startOf(adapter.date(maxDate), 'month'), adapter.startOf(adapter.date(lastDay), 'month'), 'month');
    }
    return offset;
}

export function getCalendars({
    date,
    selected,
    disabledDates,
    modifiers,
    monthsToDisplay,
    minDate,
    maxDate,
    offset,
    firstDayOfWeek,
    showOutsideDays,
    adapter,
    selectionMode,
    hoveredDate
}: {
    date: Date,
    selected?: Date | Date[] | { start?: Date, end?: Date },
    disabledDates?: Date[],
    modifiers?: Record<string, (date: Date, month: number, year: number) => boolean>,
    monthsToDisplay: number,
    minDate?: Date,
    maxDate?: Date,
    offset: number,
    firstDayOfWeek: number,
    showOutsideDays: boolean,
    adapter: DateAdapter,
    selectionMode: SelectionMode,
    hoveredDate?: Date
}): Calendar[] {
    const calendars: Calendar[] = [];
    const startDate = adapter.add(adapter.startOf(adapter.date(date), 'month'), offset, 'month');

    for (let i = 0; i < monthsToDisplay; i++) {
        const currentMonth = adapter.add(startDate, i, 'month');
        calendars.push(getMonthData({
            month: adapter.get(currentMonth, 'month'),
            year: adapter.get(currentMonth, 'year'),
            selectedDates: selected,
            disabledDates,
            modifiers,
            minDate,
            maxDate,
            firstDayOfWeek,
            showOutsideDays,
            adapter,
            selectionMode,
            hoveredDate
        }));
    }

    return calendars;
}

function getMonthData({
    month,
    year,
    selectedDates,
    disabledDates,
    modifiers,
    minDate,
    maxDate,
    firstDayOfWeek,
    showOutsideDays,
    adapter,
    selectionMode,
    hoveredDate
}: {
    month: number,
    year: number,
    selectedDates?: Date | Date[] | { start?: Date, end?: Date },
    disabledDates?: Date[],
    minDate?: Date,
    maxDate?: Date,
    firstDayOfWeek: number,
    showOutsideDays: boolean,
    adapter: DateAdapter,
    selectionMode: 'single' | 'range' | 'multiple',
    hoveredDate?: Date
}): Calendar {
    let currentMonth = adapter.set(adapter.set(adapter.date(), 'year', year), 'month', month);
    month = adapter.get(currentMonth, 'month');
    year = adapter.get(currentMonth, 'year');

    const daysInMonth = adapter.getDaysInMonth(currentMonth);
    const dates: (DateObj | null)[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
        const date = adapter.toDate(adapter.set(currentMonth, 'day', day));
        const dateObj = createDateObj(date, selectedDates, disabledDates, modifiers, minDate, maxDate, adapter, selectionMode, false, hoveredDate, month, year);
        dates.push(dateObj);
    }

    const firstDayOfMonth = adapter.toDate(adapter.startOf(currentMonth, 'month'));
    const lastDayOfMonth = adapter.toDate(adapter.endOf(currentMonth, 'month'));

    const frontWeekBuffer = fillFrontWeek({
        firstDayOfMonth,
        minDate,
        maxDate,
        selectedDates,
        disabledDates,
        modifiers,
        firstDayOfWeek,
        showOutsideDays,
        adapter,
        selectionMode,
        hoveredDate,
        month,
        year
    });

    const backWeekBuffer = fillBackWeek({
        lastDayOfMonth,
        minDate,
        maxDate,
        selectedDates,
        disabledDates,
        modifiers,
        firstDayOfWeek,
        showOutsideDays,
        adapter,
        selectionMode,
        hoveredDate,
        month,
        year
    });

    dates.unshift(...frontWeekBuffer);
    dates.push(...backWeekBuffer);

    const weeks = getWeeks(dates);

    return {
        firstDayOfMonth,
        lastDayOfMonth,
        month,
        year,
        weeks
    };
}

function createDateObj(
    date: Date,
    selectedDates: Date | Date[] | { start?: Date, end?: Date } | undefined,
    disabledDates: Date[] | undefined,
    modifiers: Record<string, (date: Date, month: number, year: number) => boolean> | undefined,
    minDate: Date | undefined,
    maxDate: Date | undefined,
    adapter: DateAdapter,
    selectionMode: 'single' | 'range' | 'multiple',
    isOutside = false,
    hoveredDate?: Date,
    month?: number,
    year?: number
): DateObj {
    const { selected, isRangeStart, isRangeEnd, isRangeBetween, isRangeHovering, isRangeActive } = isSelected(selectedDates, date, adapter, selectionMode, hoveredDate);
    const isToday = adapter.isSame(adapter.date(date), adapter.date(), "day");
    const isPrevMonth = isOutside && adapter.isBefore(adapter.date(date), adapter.startOf(adapter.date(date), 'month'));
    const isNextMonth = isOutside && adapter.isAfter(adapter.date(date), adapter.endOf(adapter.date(date), 'month'));

    const activeModifiers = modifiers
        ? Object.keys(modifiers).filter(key => modifiers[key](date, month ?? adapter.get(adapter.date(date), 'month'), year ?? adapter.get(adapter.date(date), 'year')))
        : [];

    if (isToday) activeModifiers.push('today');
    if (isOutside) activeModifiers.push('outside');
    if (isPrevMonth) activeModifiers.push('prev-month');
    if (isNextMonth) activeModifiers.push('next-month');

    return {
        date,
        selected,
        modifiers: activeModifiers,
        selectable: isSelectable(minDate, maxDate, disabledDates, date, adapter),
        today: isToday,
        prevMonth: isPrevMonth,
        nextMonth: isNextMonth,
        isRangeStart,
        isRangeEnd,
        isRangeBetween,
        isRangeHovering,
        isRangeActive
    };
}

function fillFrontWeek({
    firstDayOfMonth,
    minDate,
    maxDate,
    selectedDates,
    disabledDates,
    modifiers,
    firstDayOfWeek,
    showOutsideDays,
    adapter,
    selectionMode,
    hoveredDate,
    month,
    year
}: {
    firstDayOfMonth: Date,
    minDate?: Date,
    maxDate?: Date,
    selectedDates?: any,
    disabledDates?: Date[],
    modifiers?: Record<string, (date: Date, month: number, year: number) => boolean>,
    firstDayOfWeek: number,
    showOutsideDays: boolean,
    adapter: DateAdapter,
    selectionMode: any,
    hoveredDate?: Date,
    month: number,
    year: number
}): (DateObj | null)[] {
    const dates: (DateObj | null)[] = [];
    let firstDay = (adapter.toDate(adapter.date(firstDayOfMonth)).getDay() + 7 - firstDayOfWeek) % 7;

    let current = adapter.subtract(adapter.date(firstDayOfMonth), 1, "day");
    for (let i = 0; i < firstDay; i++) {
        const date = adapter.toDate(current);
        const dateObj = createDateObj(date, selectedDates, disabledDates, modifiers, minDate, maxDate, adapter, selectionMode, true, hoveredDate, month, year);
        dateObj.prevMonth = true;
        if (!showOutsideDays) {
            dateObj.selectable = false;
        }
        dates.unshift(dateObj);
        current = adapter.subtract(current, 1, "day");
    }

    return dates;
}

function fillBackWeek({
    lastDayOfMonth,
    minDate,
    maxDate,
    selectedDates,
    disabledDates,
    modifiers,
    firstDayOfWeek,
    showOutsideDays,
    adapter,
    selectionMode,
    hoveredDate,
    month,
    year
}: {
    lastDayOfMonth: Date,
    minDate?: Date,
    maxDate?: Date,
    selectedDates?: any,
    disabledDates?: Date[],
    modifiers?: Record<string, (date: Date, month: number, year: number) => boolean>,
    firstDayOfWeek: number,
    showOutsideDays: boolean,
    adapter: DateAdapter,
    selectionMode: any,
    hoveredDate?: Date,
    month: number,
    year: number
}): (DateObj | null)[] {
    const dates: (DateObj | null)[] = [];
    let lastDay = (adapter.toDate(adapter.date(lastDayOfMonth)).getDay() + 7 - firstDayOfWeek) % 7;

    let current = adapter.add(adapter.date(lastDayOfMonth), 1, "day");
    for (let i = 0; i < 6 - lastDay; i++) {
        const date = adapter.toDate(current);
        const dateObj = createDateObj(date, selectedDates, disabledDates, modifiers, minDate, maxDate, adapter, selectionMode, true, hoveredDate, month, year);
        dateObj.nextMonth = true;
        if (!showOutsideDays) {
            dateObj.selectable = false;
        }
        dates.push(dateObj);
        current = adapter.add(current, 1, "day");
    }

    return dates;
}

function getWeeks(dates: (DateObj | null)[]): (DateObj | null)[][] {
    const weeksLength = Math.ceil(dates.length / 7);
    const weeks: (DateObj | null)[][] = [];
    for (let i = 0; i < weeksLength; i++) {
        weeks[i] = [];
        for (let x = 0; x < 7; x++) {
            weeks[i].push(dates[i * 7 + x]);
        }
    }
    return weeks;
}

function isSelected(
    selectedDates: Date | Date[] | { start?: Date, end?: Date } | undefined,
    date: Date,
    adapter: DateAdapter,
    selectionMode: 'single' | 'range' | 'multiple',
    hoveredDate?: Date
): { selected: boolean, isRangeStart?: boolean, isRangeEnd?: boolean, isRangeBetween?: boolean, isRangeHovering?: boolean, isRangeActive?: boolean } {
    if (!selectedDates && !hoveredDate) return { selected: false };

    const d = adapter.date(date);

    if (selectionMode === 'single' && selectedDates instanceof Date) {
        return { selected: adapter.isSame(d, adapter.date(selectedDates), 'day') };
    }

    if (selectionMode === 'multiple' && Array.isArray(selectedDates)) {
        return { selected: selectedDates.some(sd => adapter.isSame(d, adapter.date(sd), 'day')) };
    }

    if (selectionMode === 'range') {
        const range = (selectedDates && typeof selectedDates === 'object' && !Array.isArray(selectedDates)) ? selectedDates : { start: undefined, end: undefined };
        const { start, end } = range;

        let isStart = start ? adapter.isSame(d, adapter.date(start), 'day') : false;
        let isEnd = end ? adapter.isSame(d, adapter.date(end), 'day') : false;
        const isBetween = (start && end) ? (adapter.isAfter(d, adapter.date(start), 'day') && adapter.isBefore(d, adapter.date(end), 'day')) : false;

        let isHovering = false;
        if (start && !end && hoveredDate) {
            const h = adapter.date(hoveredDate);
            const s = adapter.date(start);
            if (adapter.isAfter(h, s, 'day')) {
                isHovering = (adapter.isAfter(d, s, 'day') && adapter.isBefore(d, h, 'day')) || adapter.isSame(d, h, 'day');
                if (adapter.isSame(d, h, 'day')) isEnd = true;
            } else if (adapter.isBefore(h, s, 'day')) {
                isHovering = (adapter.isAfter(d, h, 'day') && adapter.isBefore(d, s, 'day')) || adapter.isSame(d, h, 'day');
                if (adapter.isSame(d, h, 'day')) {
                    isStart = true;
                }
                if (adapter.isSame(d, s, 'day')) {
                    isStart = false;
                    isEnd = true;
                }
            }
        }

                const isRangeActive = !!(
            (start && end && !adapter.isSame(adapter.date(start), adapter.date(end), 'day')) ||
            (start && !end && hoveredDate && !adapter.isSame(adapter.date(start), adapter.date(hoveredDate), 'day'))
        );

        return {
            selected: isStart || isEnd || isBetween,
            isRangeStart: isStart,
            isRangeEnd: isEnd,
            isRangeBetween: isBetween,
            isRangeHovering: isHovering,
            isRangeActive
        };
    }

    if (Array.isArray(selectedDates) && selectedDates.length === 1 && selectionMode === 'single') {
         return { selected: adapter.isSame(d, adapter.date(selectedDates[0]), 'day') };
    }

    return { selected: false };
}

function isSelectable(minDate: Date | undefined, maxDate: Date | undefined, disabledDates: Date[] | undefined, date: Date, adapter: DateAdapter): boolean {
    const d = adapter.date(date);
    const isMinDateInvalid = minDate && adapter.isBefore(d, adapter.date(minDate), 'day');
    const isMaxDateInvalid = maxDate && adapter.isAfter(d, adapter.date(maxDate), 'day');
    const isDisabled = disabledDates?.some(disabledDate => adapter.isSame(d, adapter.date(disabledDate), 'day'));
    return !isMinDateInvalid && !isMaxDateInvalid && !isDisabled;
}

export function isBackDisabled({
    calendars,
    minDate,
    adapter
}: {
    calendars: Calendar[],
    minDate?: Date,
    adapter: DateAdapter
}): boolean {
    if (!minDate) {
        return false;
    }
    const firstDay = calendars[0].firstDayOfMonth;
    return adapter.isSame(adapter.startOf(adapter.date(firstDay), 'month'), adapter.startOf(adapter.date(minDate), 'month'), 'month') || adapter.isBefore(adapter.date(firstDay), adapter.date(minDate), 'month');
}

export function isForwardDisabled({
    calendars,
    maxDate,
    adapter
}: {
    calendars: Calendar[],
    maxDate?: Date,
    adapter: DateAdapter
}): boolean {
    if (!maxDate) {
        return false;
    }
    const lastDay = calendars[calendars.length - 1].firstDayOfMonth;
    return adapter.isSame(adapter.startOf(adapter.date(lastDay), 'month'), adapter.startOf(adapter.date(maxDate), 'month'), 'month') || adapter.isAfter(adapter.date(lastDay), adapter.date(maxDate), 'month');
}
