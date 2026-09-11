'use client';
import { useState } from 'react';
import { Calendar } from 'react-modular-datepicker';

export default function CustomHeaderFooterPage() {
  const [selected, setSelected] = useState(new Date());
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Custom Header, Footer & Tooltips</h1>
      <Calendar
        selected={selected}
        onChange={setSelected}
        monthsToDisplay={2}
        header={<div className="p-2 bg-blue-100 text-blue-800 font-bold text-center rounded-t-lg">My Unified Header</div>}
        footer={<div className="p-2 bg-gray-100 text-gray-600 text-sm text-center rounded-b-lg border-t">My Custom Footer</div>}
        renderDayTooltip={(dateObj) => (
            dateObj.date.getDate() === 15 ? 'Middle of the month!' : null
        )}
      />
      <p className="mt-4">Selected: {selected?.toDateString()}</p>
    </div>
  );
}
