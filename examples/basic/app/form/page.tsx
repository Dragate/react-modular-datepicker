'use client';
import { useState } from 'react';
import { Calendar } from 'react-modular-datepicker';
import 'react-modular-datepicker/dist/index.css';

export default function FormExample() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Form Integration</h1>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"
            placeholder="John Doe"
          />
        </div>

        <div className="relative group">
          <label htmlFor="datepicker" className="block text-sm font-medium text-gray-700 mb-1">
            Select Date
          </label>
          <div className="relative">
            <input
              type="text"
              id="datepicker"
              readOnly
              value={date ? date.toLocaleDateString() : ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all cursor-pointer"
              placeholder="Pick a date"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <CalendarIcon />
            </div>

            {/* CSS-only popup approach using group-focus-within */}
            <div className="absolute top-full left-0 mt-2 z-50 invisible group-focus-within:visible opacity-0 group-focus-within:opacity-100 transition-all duration-200 transform scale-95 group-focus-within:scale-100 origin-top-left">
              <Calendar
                selected={date as Date}
                onChange={(d) => setDate(d as Date)}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-gold text-white font-semibold py-3 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Submit Form
        </button>
      </form>

      {date && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Selected Date: <span className="font-semibold text-gray-900">{date.toDateString()}</span></p>
        </div>
      )}
    </div>
  );
}

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);
