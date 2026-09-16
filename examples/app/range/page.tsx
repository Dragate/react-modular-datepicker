'use client';
import { useState } from 'react';
import { Calendar } from 'react-modular-datepicker';

export default function RangePage() {
  const now = new Date();
  const [range, setRange] = useState<{ start?: Date; end?: Date }>({
    start: new Date(now.getFullYear(), now.getMonth(), 10),
    end: new Date(now.getFullYear(), now.getMonth(), 22),
  });
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Range Selection</h1>
      <Calendar
        selectionMode="range"
        selected={range}
        onChange={(val) => setRange((val as { start?: Date; end?: Date }) || {})}
        monthsToDisplay={2}
      />
      <p className="mt-4">
        Range: {range.start?.toLocaleDateString()} - {range.end?.toLocaleDateString() || '...'}
      </p>
    </div>
  );
}
