'use client';
import { useState } from 'react';
import { Calendar } from 'react-modular-datepicker';

export default function YearlyPage() {
  const [selected, setSelected] = useState<Date | null>(new Date());

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Yearly View</h1>
      <p className="mb-4 text-gray-600">
        Displays an entire year at once. Configured to show a maximum of 3 months per row.
      </p>

      {/* Container with a larger max-width to accommodate 3 calendars side-by-side */}
      <div className="max-w-[1000px]">
        <Calendar
          selected={selected}
          onChange={(val) => setSelected(val as Date)}
          monthsToDisplay={12}
          classNames={{
            // Override the default flex layout with a grid layout that wraps at 3 columns
            calendarsContainer: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          }}
        />
      </div>
    </div>
  );
}
