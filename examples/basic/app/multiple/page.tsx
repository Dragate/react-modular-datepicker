'use client';
import { useState } from 'react';
import { Calendar } from 'react-modular-datepicker';

export default function MultiplePage() {
  const now = new Date();
  const [selected, setSelected] = useState<Date[]>([
    new Date(now.getFullYear(), now.getMonth(), 5),
    new Date(now.getFullYear(), now.getMonth(), 12),
    new Date(now.getFullYear(), now.getMonth(), 18),
    new Date(now.getFullYear(), now.getMonth(), 25),
  ]);
  const disabledDates = [new Date(now.getFullYear(), now.getMonth(), 10)];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Multiple Selection & Disabled Dates</h1>
      <Calendar
        selectionMode="multiple"
        selected={selected}
        onChange={(val) => setSelected((val as Date[]) || [])}
        disabledDates={disabledDates}
      />
      <p className="mt-4">Selected count: {selected.length}</p>
      <p className="text-sm text-gray-500">Note: 10th of current month is disabled.</p>
    </div>
  );
}
