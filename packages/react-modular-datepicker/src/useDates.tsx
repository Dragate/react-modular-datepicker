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

/** Helper to check whether offset is controlled via props */
function isOffsetControlled(propOffset?: number) {
    return propOffset !== undefined;
}

/** Resolves effective month offset from controlled prop or internal state */
function getOffset(prop?: number, state: number = 0): number {
    return isOffsetControlled(prop) ? prop! : state;
}

/** Constructs props object for day buttons including click handler and accessibility attributes */
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

/** Constructs props object for backward month navigation button */
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

/** Constructs props object for forward month navigation button */
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

/**
 * Configuration options for the `useDates` hook.
 */
export interface UseDatesProps<E extends { defaultPrevented?: boolean } = React.SyntheticEvent> {
    /** Base focus date around which calendar view is centered (defaults to today) */
    date?: Date;
    /** Upper date bound; dates after maxDate are unselectable */
    maxDate?: Date;
    /** Lower date bound; dates before minDate are unselectable */
    minDate?: Date;
    /** Array of explicit dates that should be disabled/unselectable */
    disabledDates?: Date[];
    /** Number of consecutive month grids to compute (defaults to 1) */
    monthsToDisplay?: number;
    /** First day of week index: 0 = Sunday, 1 = Monday, etc. (defaults to 0) */
    firstDayOfWeek?: number;
    /** Controlled month offset relative to base date */
    offset?: number;
    /** Low-level event handler invoked when any day button is selected */
    onDateSelected?: (dateObj: DateObj, event: E) => void;
    /** Callback fired when month navigation offset changes */
    onOffsetChanged?: (newOffset: number) => void;
    /** Controlled selected date value (Date, Date[], Date range object, or null) */
    selected?: Date | Date[] | { start?: Date, end?: Date } | null;
    /** Initial selected date value for uncontrolled mode */
    defaultSelected?: Date | Date[] | { start?: Date, end?: Date } | null;
    /** Map of custom date modifier predicate functions */
    modifiers?: Record<string, (date: Date, month: number, year: number) => boolean>;
    /** Date selection mode: `'single'`, `'range'`, or `'multiple'` (defaults to `'single'`) */
    selectionMode?: SelectionMode;
    /** DateAdapter instance for date calculations (defaults to DayjsAdapter) */
    adapter?: DateAdapter;
    /** Callback invoked when date selection state changes */
    onChange?: (selected: Date | Date[] | { start?: Date, end?: Date } | null) => void;
    /** Callback fired when month view changes, passing array of first day of each visible month */
    onMonthChange?: (dates: Date[]) => void;
    /** Callback fired when visible year changes */
    onYearChange?: (date: Date) => void;
}

/**
 * Headless React hook that manages calendar view offset, date selection logic (single, range, multiple),
 * hover states, and prop getters for headless UI calendar implementations.
 *
 * @template E Synthetic event type
 * @param props UseDatesProps configuration
 * @returns Object containing computed `calendars`, `getDateProps`, `getBackProps`, `getForwardProps`, and `setOffset`
 */
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

    // Reset uncontrolled offset to 0 when base date prop changes to a different calendar day
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
