import dayjs from "dayjs";
import { useState } from "react";

function generateDaysInMonth(year: number, month: number): Array<dayjs.Dayjs> {
    const firstDayOfMonth = dayjs(`${year}-${month}-1`);
    const daysInMonth = firstDayOfMonth.daysInMonth();
    const days = []
    for (let offset = 0; offset < daysInMonth; offset++) {
        days.push(firstDayOfMonth.add(offset, "day"))
    }
    return days;
}

function fillWeeks(days: Array<dayjs.Dayjs>): Array<dayjs.Dayjs> {
    const firstDayOfFirstWeek = days[0].startOf("week");
    while (!firstDayOfFirstWeek.isSame(days[0], "day")) {
        days.unshift(days[0].subtract(1, "day"))
    }

    const lastDayOfLastWeek = days[days.length - 1].endOf("week");
    while (!lastDayOfLastWeek.isSame(days[days.length - 1], "day")) {
        days.push(days[days.length - 1].add(1, "day"))
    }

    return days;
}

function isDayDisabled(day: dayjs.Dayjs, minDate?: X, maxDate?: X, disabledDates: X[] = []): boolean {
    const isBeforeMinDate = day.isBefore(minDate, "day");
    const isAfterMaxDate = day.isAfter(maxDate, "day");
    const isDisabled = disabledDates.some(disabledDate => day.isSame(disabledDate, "day"))
    return isBeforeMinDate || isAfterMaxDate || isDisabled;
}

function isDaySelected(selected: dayjs.Dayjs | dayjs.Dayjs[] | { start?: dayjs.Dayjs, end?: dayjs.Dayjs } | null | undefined, day: dayjs.Dayjs): boolean {
    if (!selected) return false

    if (Array.isArray(selected)) {
        return selected.some(selectedDay => selectedDay.isSame(day, "day"))
    }
    return false;
    // if (selected.start && selected.end) {
    //     return day.isBetween(selected.start, selected.end, "day", "[]")
    // }
}

export default function useDates({
    // value,
    // onOffsetChange,
    minDate,
    maxDate,
    disabledDates,
    // firstDayOfWeek = 0,
}: Props): {
    days: Array<{ date: dayjs.Dayjs, isFill: boolean, isDisabled: boolean, isSelected: boolean }>,
    year: number,
    month: number,
} {
    const [offset] = useState(0);
    // const isControlled = value !== undefined

    const current = dayjs().add(offset, "month")
    const days = generateDaysInMonth(current.year(), current.month() + 1)

    const daysWithFills = fillWeeks(days)

    const daysWithMeta = daysWithFills.map(day => ({
        date: day,
        isFill: !day.isSame(current, "month"),
        isDisabled: isDayDisabled(day, minDate, maxDate, disabledDates),
        isSelected: isDaySelected(current, day),
    }))

    return {
        days: daysWithMeta,
        year: current.year(),
        month: current.month(),
    }

}

type X = Parameters<typeof dayjs>[0]
type Props<T = X> = {
    value?: T | T[] | { start: T, end: T }
    // onChange: (value: T | T[] | { start: T, end: T }) => void,
    onOffsetChange: (days: Date[]) => void,
    minDate?: T,
    maxDate?: T,
    disabledDates?: T[],
    // shownMonths?: number,
    // firstDayOfWeek: number,
}