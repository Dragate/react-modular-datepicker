import PropTypes from 'prop-types';
import { useState } from 'react';

import type { DateObj } from './utils';
import {
    addMonth,
    composeEventHandlers,
    getCalendars,
    isBackDisabled,
    isForwardDisabled,
    requiredProp,
    subtractMonth,
    unwrapChildrenForPreact
} from './utils';

//@ts-ignore
function isOffsetControlled(propOffset) {
    return propOffset !== undefined;
}

//@ts-ignore
function getOffset(prop, state): number {
    return isOffsetControlled(prop) ? prop : state;
}

function getDateProps(
    onDateSelected: Function,
    { onClick, dateObj = requiredProp('getDateProps', 'dateObj'), ...rest }: { onClick?: Function, dateObj: DateObj, rest?: Record<string, unknown> }
) {
    return {
        //@ts-ignore
        onClick: composeEventHandlers(onClick, event => {
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
    { minDate, offsetMonth, handleOffsetChanged }: { minDate: Date, offsetMonth: number, handleOffsetChanged: Function },
    {
        onClick,
        offset = 1,
        calendars = requiredProp('getBackProps', 'calendars'),
        ...rest
    }: { onClick: Function, offset: number, calendars: ReturnType<typeof getCalendars>, rest?: Record<string, unknown> }
) {
    return {
        //@ts-ignore
        onClick: composeEventHandlers(onClick, () => {
            handleOffsetChanged(
                offsetMonth - subtractMonth({ calendars, offset, minDate })
            );
        }),
        disabled: isBackDisabled({ calendars, minDate }),
        'aria-label': `Go back ${offset} month${offset === 1 ? '' : 's'}`,
        ...rest
    };
}

function getForwardProps(
    { maxDate, offsetMonth, handleOffsetChanged }: { maxDate: Date, offsetMonth: number, handleOffsetChanged: Function },
    {
        onClick,
        offset = 1,
        calendars = requiredProp('getForwardProps', 'calendars'),
        ...rest
    }: { onClick: Function, offset: number, calendars: ReturnType<typeof getCalendars>, rest?: Record<string, unknown> }
) {
    return {
        //@ts-ignore
        onClick: composeEventHandlers(onClick, () => {
            handleOffsetChanged(
                offsetMonth + addMonth({ calendars, offset, maxDate })
            );
        }),
        disabled: isForwardDisabled({ calendars, maxDate }),
        'aria-label': `Go forward ${offset} month${offset === 1 ? '' : 's'}`,
        ...rest
    };
}

export function useDates({
    date = new Date(),
    maxDate,
    minDate,
    monthsToDisplay = 1,
    firstDayOfWeek = 0,
    showOutsideDays = false,
    offset,
    onDateSelected,
    onOffsetChanged = () => { },
    selected
}: { date: Date, maxDate: Date, minDate: Date, monthsToDisplay?: number, firstDayOfWeek?: number, showOutsideDays?: boolean, offset: number, onDateSelected: Function, onOffsetChanged?: Function, selected: Date | Date[] }) {
    const [stateOffset, setStateOffset] = useState(0);
    const offsetMonth = getOffset(offset, stateOffset);

    //@ts-ignore
    function handleOffsetChanged(newOffset) {
        if (!isOffsetControlled(offset)) {
            setStateOffset(newOffset);
        }
        onOffsetChanged(newOffset);
    }

    const calendars = getCalendars({
        date,
        selected,
        monthsToDisplay,
        minDate,
        maxDate,
        offset: offsetMonth,
        firstDayOfWeek,
        showOutsideDays
    });
    return {
        calendars,
        getDateProps: getDateProps.bind(null, onDateSelected),
        getBackProps: getBackProps.bind(null, {
            minDate,
            offsetMonth,
            handleOffsetChanged
        }),
        getForwardProps: getForwardProps.bind(null, {
            maxDate,
            offsetMonth,
            handleOffsetChanged
        })
    };
}

function Component(props: { date: Date, maxDate?: Date, minDate?: Date, monthsToDisplay?: number, firstDayOfWeek?: number, showOutsideDays?: boolean, offset: number, onDateSelected: Function, onOffsetChanged?: Function, selected: Date | Date[], render: Function, children: Function }) {
    //@ts-ignore
    const ComponentCalendar = useDates(props);
    const children = unwrapChildrenForPreact(props.render || props.children);
    //@ts-ignore
    return children(ComponentCalendar);
}

Component.defaultProps = {
    date: new Date(),
    monthsToDisplay: 1,
    onOffsetChanged: () => { },
    firstDayOfWeek: 0,
    showOutsideDays: false
};

Component.propTypes = {
    render: PropTypes.func,
    children: PropTypes.func,
    date: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    monthsToDisplay: PropTypes.number,
    firstDayOfWeek: PropTypes.number,
    showOutsideDays: PropTypes.bool,
    offset: PropTypes.number,
    onDateSelected: PropTypes.func.isRequired,
    onOffsetChanged: PropTypes.func,
    selected: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.instanceOf(Date)),
        PropTypes.instanceOf(Date)
    ])
};

export default Component;