import { defaultAdapter } from "./adapters/dayjs";
import type { DateAdapter, DateObj, Calendar } from "./types";

export function composeEventHandlers(...fns: Array<((event: any, ...args: unknown[]) => void) | undefined>): (event: any, ...args: unknown[]) => boolean {
    return (event, ...args) =>
        fns.some(fn => {
            fn && fn(event, ...args);
            return event.defaultPrevented;
        });
}

export function unwrapChildrenForPreact<T>(arg: T | T[]): T | typeof noop {
    arg = Array.isArray(arg) ? /* istanbul ignore next (preact) */ arg[0] : arg;
    return arg || noop;
}
function noop() { }

export function subtractMonth({ calendars, offset, minDate, adapter = defaultAdapter }: { calendars: Calendar[], offset: number, minDate?: Date, adapter?: DateAdapter }): number {
    if (offset > 1 && minDate) {
        const { firstDayOfMonth } = calendars[0];
        const diffInMonths = adapter.diff(adapter.date(firstDayOfMonth), adapter.date(minDate), "month");
        if (diffInMonths < offset) {
            offset = diffInMonths;
        }
    }
    return offset;
}

export function addMonth({ calendars, offset, maxDate, adapter = defaultAdapter }: { calendars: Calendar[], offset: number, maxDate?: Date, adapter?: DateAdapter }): number {
    if (offset > 1 && maxDate) {
        const { lastDayOfMonth } = calendars[calendars.length - 1];
        const diffInMonths = adapter.diff(adapter.date(maxDate), adapter.date(lastDayOfMonth), "month");
        if (diffInMonths < offset) {
            offset = diffInMonths;
        }
    }
    return offset;
}

export function isBackDisabled({ calendars, minDate, adapter = defaultAdapter }: { calendars: Calendar[], minDate?: Date, adapter?: DateAdapter }): boolean {
    if (!minDate) {
        return false;
    }
    const { firstDayOfMonth } = calendars[0];
    const firstDayOfMonthMinusOne = adapter.subtract(adapter.date(firstDayOfMonth), 1, "day");
    return adapter.isBefore(firstDayOfMonthMinusOne, adapter.date(minDate));
}

export function isForwardDisabled({ calendars, maxDate, adapter = defaultAdapter }: { calendars: Calendar[], maxDate?: Date, adapter?: DateAdapter }): boolean {
    if (!maxDate) {
        return false;
    }
    const { lastDayOfMonth } = calendars[calendars.length - 1];
    const lastDayOfMonthPlusOne = adapter.add(adapter.date(lastDayOfMonth), 1, "day");
    return adapter.isBefore(adapter.date(maxDate), lastDayOfMonthPlusOne);
}

export function getCalendars({
    date,
    selected,
    disabledDates,
    monthsToDisplay,
    offset,
    minDate,
    maxDate,
    firstDayOfWeek,
    showOutsideDays,
    adapter = defaultAdapter,
    selectionMode = 'single'
}: {
    date: Date,
    selected?: Date | Date[] | { start?: Date, end?: Date },
    disabledDates?: Date[],
    monthsToDisplay: number,
    offset: number,
    minDate?: Date,
    maxDate?: Date,
    firstDayOfWeek: number,
    showOutsideDays: boolean,
    adapter?: DateAdapter,
    selectionMode?: 'single' | 'range' | 'multiple'
}): Calendar[] {
    const months: Calendar[] = [];
    const startDate = getStartDate(date, minDate, maxDate, adapter);
    for (let i = 0; i < monthsToDisplay; i++) {
        const calendarDates = getMonthData({
            month: adapter.get(startDate, 'month') + i + offset,
            year: adapter.get(startDate, 'year'),
            selectedDates: selected,
            disabledDates,
            minDate,
            maxDate,
            firstDayOfWeek,
            showOutsideDays,
            adapter,
            selectionMode
        });
        months.push(calendarDates);
    }
    return months;
}

function getStartDate(date: Date, minDate?: Date, maxDate?: Date, adapter: DateAdapter = defaultAdapter): any {
    let startDate = adapter.startOf(adapter.date(date), "day");
    if (minDate) {
        const minDateNormalized = adapter.startOf(adapter.date(minDate), "day");
        if (adapter.isBefore(startDate, minDateNormalized)) {
            startDate = minDateNormalized;
        }
    }
    if (maxDate) {
        const maxDateNormalized = adapter.startOf(adapter.date(maxDate), "day");
        if (adapter.isBefore(maxDateNormalized, startDate)) {
            startDate = maxDateNormalized;
        }
    }
    return startDate;
}

function getMonthData({
    month,
    year,
    selectedDates,
    disabledDates,
    minDate,
    maxDate,
    firstDayOfWeek,
    showOutsideDays,
    adapter,
    selectionMode
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
    selectionMode: 'single' | 'range' | 'multiple'
}): Calendar {
    let currentMonth = adapter.set(adapter.set(adapter.date(), 'year', year), 'month', month);
    month = adapter.get(currentMonth, 'month');
    year = adapter.get(currentMonth, 'year');

    const daysInMonth = adapter.getDaysInMonth(currentMonth);
    const dates: (DateObj | null)[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
        const date = adapter.toDate(adapter.set(currentMonth, 'day', day));
        const dateObj = createDateObj(date, selectedDates, disabledDates, minDate, maxDate, adapter, selectionMode);
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
        firstDayOfWeek,
        showOutsideDays,
        adapter,
        selectionMode
    });

    const backWeekBuffer = fillBackWeek({
        lastDayOfMonth,
        minDate,
        maxDate,
        selectedDates,
        disabledDates,
        firstDayOfWeek,
        showOutsideDays,
        adapter,
        selectionMode
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
    minDate: Date | undefined,
    maxDate: Date | undefined,
    adapter: DateAdapter,
    selectionMode: 'single' | 'range' | 'multiple',
    isOutside = false
): DateObj {
    const { selected, isRangeStart, isRangeEnd, isRangeBetween } = isSelected(selectedDates, date, adapter, selectionMode);
    return {
        date,
        selected,
        selectable: isSelectable(minDate, maxDate, disabledDates, date, adapter),
        today: adapter.isSame(adapter.date(date), adapter.date(), "day"),
        prevMonth: isOutside && adapter.isBefore(adapter.date(date), adapter.startOf(adapter.date(date), 'month')),
        nextMonth: isOutside && adapter.isAfter(adapter.date(date), adapter.endOf(adapter.date(date), 'month')),
        isRangeStart,
        isRangeEnd,
        isRangeBetween
    };
}

function fillFrontWeek({
    firstDayOfMonth,
    minDate,
    maxDate,
    selectedDates,
    disabledDates,
    firstDayOfWeek,
    showOutsideDays,
    adapter,
    selectionMode
}: {
    firstDayOfMonth: Date,
    minDate?: Date,
    maxDate?: Date,
    selectedDates?: any,
    disabledDates?: Date[],
    firstDayOfWeek: number,
    showOutsideDays: boolean,
    adapter: DateAdapter,
    selectionMode: any
}): (DateObj | null)[] {
    const dates: (DateObj | null)[] = [];
    let firstDay = (adapter.toDate(adapter.date(firstDayOfMonth)).getDay() + 7 - firstDayOfWeek) % 7;

    if (showOutsideDays) {
        let current = adapter.subtract(adapter.date(firstDayOfMonth), 1, "day");
        for (let i = 0; i < firstDay; i++) {
            const date = adapter.toDate(current);
            const dateObj = createDateObj(date, selectedDates, disabledDates, minDate, maxDate, adapter, selectionMode, true);
            dateObj.prevMonth = true;
            dates.unshift(dateObj);
            current = adapter.subtract(current, 1, "day");
        }
    } else {
        while (firstDay > 0) {
            dates.unshift(null);
            firstDay--;
        }
    }

    return dates;
}

function fillBackWeek({
    lastDayOfMonth,
    minDate,
    maxDate,
    selectedDates,
    disabledDates,
    firstDayOfWeek,
    showOutsideDays,
    adapter,
    selectionMode
}: {
    lastDayOfMonth: Date,
    minDate?: Date,
    maxDate?: Date,
    selectedDates?: any,
    disabledDates?: Date[],
    firstDayOfWeek: number,
    showOutsideDays: boolean,
    adapter: DateAdapter,
    selectionMode: any
}): (DateObj | null)[] {
    const dates: (DateObj | null)[] = [];
    let lastDay = (adapter.toDate(adapter.date(lastDayOfMonth)).getDay() + 7 - firstDayOfWeek) % 7;

    if (showOutsideDays) {
        let current = adapter.add(adapter.date(lastDayOfMonth), 1, "day");
        for (let i = 0; i < 6 - lastDay; i++) {
            const date = adapter.toDate(current);
            const dateObj = createDateObj(date, selectedDates, disabledDates, minDate, maxDate, adapter, selectionMode, true);
            dateObj.nextMonth = true;
            dates.push(dateObj);
            current = adapter.add(current, 1, "day");
        }
    } else {
        while (lastDay < 6) {
            dates.push(null);
            lastDay++;
        }
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
    selectionMode: 'single' | 'range' | 'multiple'
): { selected: boolean, isRangeStart?: boolean, isRangeEnd?: boolean, isRangeBetween?: boolean } {
    if (!selectedDates) return { selected: false };

    const d = adapter.date(date);

    if (selectionMode === 'single' && selectedDates instanceof Date) {
        return { selected: adapter.isSame(d, adapter.date(selectedDates), 'day') };
    }

    if (selectionMode === 'multiple' && Array.isArray(selectedDates)) {
        return { selected: selectedDates.some(sd => adapter.isSame(d, adapter.date(sd), 'day')) };
    }

    if (selectionMode === 'range' && typeof selectedDates === 'object' && !Array.isArray(selectedDates)) {
        const { start, end } = selectedDates;
        const isStart = start ? adapter.isSame(d, adapter.date(start), 'day') : false;
        const isEnd = end ? adapter.isSame(d, adapter.date(end), 'day') : false;
        const isBetween = (start && end) ? (adapter.isAfter(d, adapter.date(start), 'day') && adapter.isBefore(d, adapter.date(end), 'day')) : false;
        return {
            selected: isStart || isEnd || isBetween,
            isRangeStart: isStart,
            isRangeEnd: isEnd,
            isRangeBetween: isBetween
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
