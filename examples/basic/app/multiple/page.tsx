'use client';
import { useState } from 'react';
import { Calendar } from 'react-modular-datepicker';

export default function MultiplePage() {
  const [selected, setSelected] = useState([]);
  const disabledDates = [new Date(new Date().getFullYear(), new Date().getMonth(), 10)];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Multiple Selection & Disabled Dates</h1>
      <Calendar
        selectionMode="multiple"
        selected={selected}
        onChange={setSelected}
        disabledDates={disabledDates}
      />
      <p className="mt-4">Selected count: {selected.length}</p>
      <p className="text-sm text-gray-500">Note: 10th of current month is disabled.</p>
    </div>
  );
}
