'use client';
import { useState } from 'react';
import { Calendar } from 'react-modular-datepicker';

export default function YearlyPage() {
  const [selected, setSelected] = useState<Date | null>(new Date());
  const janFirst = new Date(new Date().getFullYear(), 0, 1);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Yearly View</h1>
      <p className="mb-4 text-gray-600">
        Displays an entire year at once. Configured to show 4 months per row from January to December.
      </p>

      {/* Container with a larger max-width to accommodate 4 calendars side-by-side */}
      <div className="max-w-[1200px]">
        <Calendar
          date={janFirst}
          selected={selected}
          onChange={(val) => setSelected(val as Date)}
          monthsToDisplay={12}
          classNames={{
            // Override the default flex layout with a grid layout that wraps at 4 columns
            calendarsContainer: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          }}
        />
      </div>
    </div>
  );
}
