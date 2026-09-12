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
        onChange={(val) => setSelected(val as Date)}
        monthsToDisplay={2}
        classNames={{
          calendarsContainer: "flex flex-row gap-6"
        }}
        header={<div className="p-3 mb-4 bg-blue-600 text-white font-bold text-center rounded-t-xl shadow-md">My Custom Unified Header</div>}
        footer={<div className="p-3 mt-4 bg-gray-100 text-gray-700 text-sm font-medium text-center rounded-b-xl border-t border-gray-200">My Custom Footer — Showing 2 Months Side-by-Side</div>}
        renderDayTooltip={(dateObj) => (
            dateObj.date.getDate() === 15 ? 'Middle of the month!' : null
        )}
      />
      <p className="mt-4 text-gray-600">Selected: <span className="font-semibold text-gray-900">{selected?.toDateString()}</span></p>
    </div>
  );
}
