import { useState, useCallback } from 'react';
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

function getDateProps(
    onDateSelected: (dateObj: DateObj, event: any) => void,
    { onClick, dateObj, ...rest }: { onClick?: (event: any) => void, dateObj: DateObj, [key: string]: any }
) {
    return {
        onClick: composeEventHandlers(onClick, (event: any) => {
            onDateSelected(dateObj, event);
        }),
        disabled: !dateObj.selectable,
        'aria-label': dateObj.date.toDateString(),
        'aria-pressed': dateObj.selected,
        role: 'button',
        ...rest
    };
}

function getBackProps(
    { minDate, offsetMonth, handleOffsetChanged, adapter }: { minDate?: Date, offsetMonth: number, handleOffsetChanged: (newOffset: number) => void, adapter: DateAdapter },
    {
        onClick,
        offset = 1,
        calendars,
        ...rest
    }: { onClick?: (event: any) => void, offset?: number, calendars: Calendar[], [key: string]: any }
) {
    return {
        onClick: composeEventHandlers(onClick, () => {
            handleOffsetChanged(
                offsetMonth - subtractMonth({ calendars, offset, minDate, adapter })
            );
        }),
        disabled: isBackDisabled({ calendars, minDate, adapter }),
        'aria-label': `Go back ${offset} month${offset === 1 ? '' : 's'}`,
        ...rest
    };
}

function getForwardProps(
    { maxDate, offsetMonth, handleOffsetChanged, adapter }: { maxDate?: Date, offsetMonth: number, handleOffsetChanged: (newOffset: number) => void, adapter: DateAdapter },
    {
        onClick,
        offset = 1,
        calendars,
        ...rest
    }: { onClick?: (event: any) => void, offset?: number, calendars: Calendar[], [key: string]: any }
) {
    return {
        onClick: composeEventHandlers(onClick, () => {
            handleOffsetChanged(
                offsetMonth + addMonth({ calendars, offset, maxDate, adapter })
            );
        }),
        disabled: isForwardDisabled({ calendars, maxDate, adapter }),
        'aria-label': `Go forward ${offset} month${offset === 1 ? '' : 's'}`,
        ...rest
    };
}

export interface UseDatesProps {
    date?: Date;
    maxDate?: Date;
    minDate?: Date;
    disabledDates?: Date[];
    monthsToDisplay?: number;
    firstDayOfWeek?: number;
    showOutsideDays?: boolean;
    offset?: number;
    onDateSelected?: (dateObj: DateObj, event: any) => void;
    onOffsetChanged?: (newOffset: number) => void;
    selected?: Date | Date[] | { start?: Date, end?: Date };
    modifiers?: Record<string, (date: Date, month: number, year: number) => boolean>;
    selectionMode?: SelectionMode;
    adapter?: DateAdapter;
    onChange?: (selected: Date | Date[] | { start?: Date, end?: Date } | null) => void;
    onMonthChange?: (date: Date) => void;
    onYearChange?: (date: Date) => void;
}

export function useDates({
    date = new Date(),
    maxDate,
    minDate,
    disabledDates,
    monthsToDisplay = 1,
    firstDayOfWeek = 0,
    showOutsideDays = false,
    offset,
    onDateSelected,
    onOffsetChanged = () => { },
    selected,
    modifiers,
    selectionMode = 'single',
    adapter = defaultAdapter,
    onChange,
    onMonthChange,
    onYearChange
}: UseDatesProps) {
    const [stateOffset, setStateOffset] = useState(0);
    const [hoveredDate, setHoveredDate] = useState<Date | undefined>(undefined);
    const offsetMonth = getOffset(offset, stateOffset);

    const handleOffsetChanged = useCallback((newOffset: number) => {
        if (!isOffsetControlled(offset)) {
            setStateOffset(newOffset);
        }
        onOffsetChanged(newOffset);

        const newDate = adapter.toDate(adapter.add(adapter.startOf(adapter.date(date), 'month'), newOffset, 'month'));
        onMonthChange?.(newDate);
        onYearChange?.(newDate);
    }, [offset, onOffsetChanged, date, adapter, onMonthChange, onYearChange]);

    const handleDateSelected = useCallback((dateObj: DateObj, event: any) => {
        onDateSelected?.(dateObj, event);

        if (!onChange) return;

        if (selectionMode === 'single') {
            onChange(dateObj.date);
        } else if (selectionMode === 'multiple') {
            const currentSelected = Array.isArray(selected) ? selected : (selected ? [selected as Date] : []);
            const isAlreadySelected = currentSelected.some(d => adapter.isSame(adapter.date(d), adapter.date(dateObj.date), 'day'));
            if (isAlreadySelected) {
                onChange(currentSelected.filter(d => !adapter.isSame(adapter.date(d), adapter.date(dateObj.date), 'day')));
            } else {
                onChange([...currentSelected, dateObj.date]);
            }
        } else if (selectionMode === 'range') {
            const range = (selected && typeof selected === 'object' && !(selected instanceof Date) && !Array.isArray(selected)) ? (selected as { start?: Date, end?: Date }) : { start: undefined, end: undefined };
            if (!range.start || (range.start && range.end)) {
                onChange({ start: dateObj.date, end: undefined });
            } else {
                if (adapter.isBefore(adapter.date(dateObj.date), adapter.date(range.start), 'day')) {
                    onChange({ start: dateObj.date, end: range.start });
                } else {
                    onChange({ start: range.start, end: dateObj.date });
                }
            }
        }
    }, [onDateSelected, onChange, selectionMode, selected, adapter]);

    const calendars = getCalendars({
        date,
        selected,
        disabledDates,
        modifiers,
        monthsToDisplay,
        minDate,
        maxDate,
        offset: offsetMonth,
        firstDayOfWeek,
        showOutsideDays,
        adapter,
        selectionMode,
        hoveredDate
    });

    return {
        calendars,
        getDateProps: (args: { onClick?: (event: any) => void, dateObj: DateObj, [key: string]: any }) => {
            const props = getDateProps(handleDateSelected, args);
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
