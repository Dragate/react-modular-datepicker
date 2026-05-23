'use client';
import { useState } from 'react';
import { useDates } from 'react-modular-datepicker';

export default function HeadlessPage() {
  const [selected, setSelected] = useState(new Date());
  const { calendars, getBackProps, getForwardProps, getDateProps } = useDates({
    selected,
    onChange: setSelected,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Headless Usage</h1>
      <div className="flex gap-4 mb-4">
        <button {...getBackProps({ calendars })} className="px-3 py-1 border rounded bg-white">Prev</button>
        <button {...getForwardProps({ calendars })} className="px-3 py-1 border rounded bg-white">Next</button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow inline-block">
        {calendars.map(calendar => (
          <div key={`${calendar.month}-${calendar.year}`}>
            <div className="font-bold mb-4 text-center">{calendar.month + 1} / {calendar.year}</div>
            <div className="grid grid-cols-7 gap-2">
              {calendar.weeks.map(week => week.map((dateObj, i) => {
                if (!dateObj) return <div key={i} />;
                return (
                  <button
                    key={i}
                    {...getDateProps({ dateObj })}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                      dateObj.selected
                        ? 'bg-black text-white'
                        : 'hover:bg-gray-100'
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
