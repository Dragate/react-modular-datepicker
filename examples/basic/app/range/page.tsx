'use client';
import { useState } from 'react';
import { Calendar } from 'react-modular-datepicker';

export default function RangePage() {
  const [range, setRange] = useState({ start: new Date(), end: undefined });
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Range Selection</h1>
      <Calendar
        selectionMode="range"
        selected={range}
        onChange={setRange}
        monthsToDisplay={2}
      />
      <p className="mt-4">
        Range: {range.start?.toLocaleDateString()} - {range.end?.toLocaleDateString() || '...'}
      </p>
    </div>
  );
}
