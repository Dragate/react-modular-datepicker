'use client';
import { useState } from 'react';
import { useDates } from 'react-modular-datepicker';

export default function HeadlessPage() {
  const [selected, setSelected] = useState<Date | Date[] | { start?: Date, end?: Date } | null>(new Date());
  const { calendars, getBackProps, getForwardProps, getDateProps } = useDates({
    selected: selected as Date,
    onChange: setSelected,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Headless Usage</h1>
      <div data-testid="demo-container" className="inline-block p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex gap-4 mb-4">
          <button {...getBackProps({ calendars })} className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 shadow-sm">Prev</button>
          <button {...getForwardProps({ calendars })} className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 shadow-sm">Next</button>
        </div>
        {calendars.map(calendar => (
          <div key={`${calendar.month}-${calendar.year}`}>
            <div className="font-bold mb-4 text-center text-gray-800">{calendar.month + 1} / {calendar.year}</div>
            <div className="grid grid-cols-7 gap-2">
              {calendar.weeks.map((week, wi) => week.map((dateObj, i) => {
                if (!dateObj) return <div key={`${wi}-${i}`} />;
                return (
                  <button
                    key={`${wi}-${i}`}
                    {...getDateProps({ dateObj })}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                      dateObj.selected
                        ? 'bg-amber-500 text-white font-semibold shadow-sm'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {dateObj.date.getDate()}
                  </button>
                );
              }))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
