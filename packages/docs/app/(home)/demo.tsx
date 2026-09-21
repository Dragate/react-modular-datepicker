"use client"

import dayjs from "dayjs";
import { useState } from "react";
import { Calendar } from "react-modular-datepicker";

export default function Component() {
    const [range, setRange] = useState<{ start?: Date; end?: Date }>({
        start: dayjs().set("date", 10).toDate(),
        end: dayjs().set("date", 20).toDate(),
    });

    return (
        <Calendar
            selectionMode="range"
            selected={range}
            onChange={(r) => setRange(r as { start?: Date; end?: Date })}
        />
    )
}