import React, { useState, useCallback } from 'react';
import type { DateAdapter, DateObj, SelectionMode, Calendar } from './types';
import { defaultAdapter } from './adapters/dayjs';
import {
    addMonth,
    composeEventHandlers,
    getCalendars,
    isBackDisabled,
    isForwardDisabled,
    subtractMonth
} from './utils';

function isOffsetControlled(propOffset?: number) {
    return propOffset !== undefined;
}

function getOffset(prop?: number, state: number = 0): number {
    return isOffsetControlled(prop) ? prop! : state;
}

function getDateProps<E extends { defaultPrevented?: boolean } = React.SyntheticEvent>(
    onDateSelected: (dateObj: DateObj, event: E) => void,
    { onClick, dateObj, ...rest }: { onClick?: (event: E) => void, dateObj: DateObj, [key: string]: unknown }
) {
    return {
        onClick: composeEventHandlers(onClick, (event: E) => {
            onDateSelected(dateObj, event);
        }),
        disabled: !dateObj.selectable,
        'aria-pressed': dateObj.selected,
        role: 'button',
        ...rest
    };
}

function getBackProps<E extends { defaultPrevented?: boolean } = React.SyntheticEvent>(
    { minDate, offsetMonth, handleOffsetChanged, adapter }: { minDate?: Date, offsetMonth: number, handleOffsetChanged: (newOffset: number) => void, adapter: DateAdapter },
    {
        onClick,
        offset = 1,
        calendars = [],
        ...rest
    }: { onClick?: (event: E) => void, offset?: number, calendars?: Calendar[], [key: string]: unknown } = {}
) {
    return {
        onClick: composeEventHandlers(onClick, () => {
            handleOffsetChanged(
                offsetMonth - subtractMonth({ calendars, offset, minDate, adapter })
            );
        }),
        disabled: isBackDisabled({ calendars, minDate, adapter }),
        ...rest
    };
}

function getForwardProps<E extends { defaultPrevented?: boolean } = React.SyntheticEvent>(
    { maxDate, offsetMonth, handleOffsetChanged, adapter }: { maxDate?: Date, offsetMonth: number, handleOffsetChanged: (newOffset: number) => void, adapter: DateAdapter },
    {
        onClick,
        offset = 1,
        calendars = [],
        ...rest
    }: { onClick?: (event: E) => void, offset?: number, calendars?: Calendar[], [key: string]: unknown } = {}
) {
    return {
        onClick: composeEventHandlers(onClick, () => {
            handleOffsetChanged(
                offsetMonth + addMonth({ calendars, offset, maxDate, adapter })
            );
        }),
        disabled: isForwardDisabled({ calendars, maxDate, adapter }),
        ...rest
    };
}

export interface UseDatesProps<E extends { defaultPrevented?: boolean } = React.SyntheticEvent> {
    date?: Date;
    maxDate?: Date;
    minDate?: Date;
    disabledDates?: Date[];
    monthsToDisplay?: number;
    firstDayOfWeek?: number;
    offset?: number;
    onDateSelected?: (dateObj: DateObj, event: E) => void;
    onOffsetChanged?: (newOffset: number) => void;
    selected?: Date | Date[] | { start?: Date, end?: Date } | null;
    defaultSelected?: Date | Date[] | { start?: Date, end?: Date } | null;
    modifiers?: Record<string, (date: Date, month: number, year: number) => boolean>;
    selectionMode?: SelectionMode;
    adapter?: DateAdapter;
    onChange?: (selected: Date | Date[] | { start?: Date, end?: Date } | null) => void;
    onMonthChange?: (dates: Date[]) => void;
    onYearChange?: (date: Date) => void;
}

export function useDates<E extends { defaultPrevented?: boolean } = React.SyntheticEvent>({
    date = new Date(),
    maxDate,
    minDate,
    disabledDates,
    monthsToDisplay = 1,
    firstDayOfWeek = 0,
    offset,
    onDateSelected,
    onOffsetChanged = () => { },
    selected,
    defaultSelected,
    modifiers,
    selectionMode = 'single',
    adapter = defaultAdapter,
    onChange,
    onMonthChange,
    onYearChange
}: UseDatesProps<E> = {}) {
    const [stateOffset, setStateOffset] = useState(0);
    const [prevDate, setPrevDate] = useState(date);
    const [hoveredDate, setHoveredDate] = useState<Date | undefined>(undefined);
    const [uncontrolledSelected, setUncontrolledSelected] = useState<
        Date | Date[] | { start?: Date; end?: Date } | null | undefined
    >(defaultSelected ?? null);

    if (!adapter.isSame(adapter.date(prevDate), adapter.date(date), 'day')) {
        setPrevDate(date);
        if (!isOffsetControlled(offset)) {
            setStateOffset(0);
        }
    }

    const isControlled = selected !== undefined;
    const effectiveSelected = isControlled ? selected : uncontrolledSelected;

    const offsetMonth = getOffset(offset, stateOffset);

    const handleOffsetChanged = useCallback((newOffset: number) => {
        if (!isOffsetControlled(offset)) {
            setStateOffset(newOffset);
        }
        onOffsetChanged(newOffset);

        const startDate = adapter.add(adapter.startOf(adapter.date(date), 'month'), newOffset, 'month');
        const firstDays = Array.from({ length: monthsToDisplay }, (_, i) =>
            adapter.toDate(adapter.startOf(adapter.add(startDate, i, 'month'), 'month'))
        );
        onMonthChange?.(firstDays);

        const newDate = adapter.toDate(startDate);
        onYearChange?.(newDate);
    }, [offset, onOffsetChanged, date, adapter, monthsToDisplay, onMonthChange, onYearChange]);

    const handleDateSelected = useCallback((dateObj: DateObj, event: E) => {
        onDateSelected?.(dateObj, event);

        let nextSelected: Date | Date[] | { start?: Date; end?: Date } | null = null;

        if (selectionMode === 'single') {
            nextSelected = dateObj.date;
        } else if (selectionMode === 'multiple') {
            const currentSelected = Array.isArray(effectiveSelected)
                ? effectiveSelected
                : (effectiveSelected instanceof Date ? [effectiveSelected] : []);
            const isAlreadySelected = currentSelected.some(d =>
                adapter.isSame(adapter.date(d), adapter.date(dateObj.date), 'day')
            );
            if (isAlreadySelected) {
                nextSelected = currentSelected.filter(d =>
                    !adapter.isSame(adapter.date(d), adapter.date(dateObj.date), 'day')
                );
            } else {
                nextSelected = [...currentSelected, dateObj.date];
            }
        } else if (selectionMode === 'range') {
            const range = (effectiveSelected && typeof effectiveSelected === 'object' && !(effectiveSelected instanceof Date) && !Array.isArray(effectiveSelected))
                ? (effectiveSelected as { start?: Date; end?: Date })
                : { start: undefined, end: undefined };
            if (!range.start || (range.start && range.end)) {
                nextSelected = { start: dateObj.date, end: undefined };
            } else {
                if (adapter.isBefore(adapter.date(dateObj.date), adapter.date(range.start), 'day')) {
                    nextSelected = { start: dateObj.date, end: range.start };
                } else {
                    nextSelected = { start: range.start, end: dateObj.date };
                }
            }
        }

        if (!isControlled) {
            setUncontrolledSelected(nextSelected);
        }

        onChange?.(nextSelected);
    }, [onDateSelected, onChange, selectionMode, effectiveSelected, isControlled, adapter]);

    const calendars = getCalendars({
        date,
        selected: effectiveSelected,
        disabledDates,
        modifiers,
        monthsToDisplay,
        minDate,
        maxDate,
        offset: offsetMonth,
        firstDayOfWeek,
        adapter,
        selectionMode,
        hoveredDate
    });

    return {
        calendars,
        getDateProps: <EventE extends { defaultPrevented?: boolean } = E>(
            args: { onClick?: (event: EventE) => void, onMouseEnter?: (event: EventE) => void, onMouseLeave?: (event: EventE) => void, dateObj: DateObj, [key: string]: unknown }
        ) => {
            const props = getDateProps<EventE>(handleDateSelected as unknown as (dateObj: DateObj, event: EventE) => void, args);
            return {
                ...props,
                onMouseEnter: composeEventHandlers(args.onMouseEnter, () => {
                    setHoveredDate(args.dateObj.date);
                }),
                onMouseLeave: composeEventHandlers(args.onMouseLeave, () => {
                    setHoveredDate(undefined);
                })
            };
        },
        getBackProps: getBackProps.bind(null, {
            minDate,
            offsetMonth,
            handleOffsetChanged,
            adapter
        }),
        getForwardProps: getForwardProps.bind(null, {
            maxDate,
            offsetMonth,
            handleOffsetChanged,
            adapter
        }),
        setOffset: handleOffsetChanged
    };
}
