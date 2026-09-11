'use client';
import { Calendar } from 'react-modular-datepicker';

export default function ModifiersTestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Modifiers Test</h1>
      <Calendar
        modifiers={{
          highlighted: (date, month, year) => {
            // Highlight dates that are from the current viewed month
            return date.getMonth() === month && date.getFullYear() === year;
          },
          outsideHighlighted: (date, month, year) => {
             // Highlight dates that are NOT from the current viewed month
             return date.getMonth() !== month || date.getFullYear() !== year;
          }
        }}
        classNames={{
          day: {
            highlighted: 'bg-green-200',
            outsideHighlighted: 'bg-red-200'
          }
        }}
      />
    </div>
  );
}
