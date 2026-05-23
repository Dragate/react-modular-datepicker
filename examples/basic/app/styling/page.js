'use client';
import { Calendar } from 'react-modular-datepicker';

export default function StylingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Custom Styling via ClassNames</h1>
      <Calendar
        classNames={{
          root: 'bg-indigo-900 text-white shadow-indigo-500/50',
          monthName: 'text-indigo-200',
          weekday: 'text-indigo-400',
          day: {
            day: 'hover:bg-indigo-700 text-indigo-100',
            selected: 'bg-pink-500 text-white',
            today: 'border-pink-500 text-pink-500',
          },
          navButton: 'hover:bg-indigo-800 text-indigo-300'
        }}
      />
    </div>
  );
}
