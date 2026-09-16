'use client';

import React, { useState } from 'react';
import { useDates, DateObj } from 'react-modular-datepicker';

interface Event {
  id: number;
  title: string;
  date: Date;
  color: string;
}

// Generate some mock events for the current month
const getMockEvents = (): Event[] => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  return [
    { id: 1, title: 'Team Sync', date: new Date(year, month, today.getDate()), color: 'bg-blue-500' },
    { id: 2, title: 'Coffee with Alice', date: new Date(year, month, today.getDate()), color: 'bg-emerald-500' },
    { id: 3, title: 'Design Review', date: new Date(year, month, today.getDate() + 2), color: 'bg-purple-500' },
    { id: 4, title: 'Product Launch', date: new Date(year, month, today.getDate() + 5), color: 'bg-orange-500' },
    { id: 5, title: 'Dentist Appointment', date: new Date(year, month, today.getDate() - 3), color: 'bg-rose-500' },
    { id: 6, title: 'Quarterly Planning', date: new Date(year, month, today.getDate() + 5), color: 'bg-indigo-400' },
    { id: 7, title: 'Lunch with Bob', date: new Date(year, month, today.getDate() + 1), color: 'bg-amber-500' },
    { id: 8, title: 'Workshop', date: new Date(year, month, today.getDate() + 1), color: 'bg-cyan-500' },
  ];
};

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events] = useState<Event[]>(getMockEvents());

  const { calendars, getBackProps, getForwardProps, getDateProps } = useDates({
    showOutsideDays: true,
    selected: selectedDate,
    onChange: (d) => setSelectedDate(d as Date),
  });

  const currentCalendar = calendars[0];
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentCalendar.firstDayOfMonth);
  const year = currentCalendar.year;

  const getEventsForDate = (date: Date) => {
    return events.filter(event =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col">
      <header className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-semibold text-gray-800 min-w-[200px]">
            {monthName} {year}
          </h1>
          <div className="flex items-center bg-white border border-gray-200 rounded-md shadow-sm">
             <button
              {...getBackProps({ calendars })}
              className="p-2 hover:bg-gray-50 border-r border-gray-200 disabled:opacity-30 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Today
            </button>
            <button
              {...getForwardProps({ calendars })}
              className="p-2 hover:bg-gray-50 border-l border-gray-200 disabled:opacity-30 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden sm:block">
           <span className="text-sm text-gray-500 italic">Full-featured Monthly Calendar Example</span>
        </div>
      </header>

      <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg flex flex-col">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50/50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-2.5 text-center text-[11px] font-bold text-gray-500 uppercase tracking-widest border-r border-gray-200 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 flex-1">
          {currentCalendar.weeks.map((week, wi) => (
            <React.Fragment key={wi}>
              {week.map((dateObj, di) => {
                if (!dateObj) return <div key={di} className="border-b border-r border-gray-200 bg-gray-50/20" />;

                const dayEvents = getEventsForDate(dateObj.date);
                const isOutside = dateObj.prevMonth || dateObj.nextMonth;
                const isSelected = dateObj.selected;

                return (
                  <div
                    key={di}
                    className={`min-h-[120px] border-b border-r border-gray-200 relative flex flex-col group transition-colors last:border-r-0 ${
                      isOutside ? 'bg-gray-50/40 text-gray-400' : 'bg-white hover:bg-gray-50/50'
                    } ${isSelected ? 'bg-blue-50/30' : ''}`}
                  >
                    <div className="flex justify-between items-start p-2">
                       <button
                        {...getDateProps({ dateObj })}
                        className={`text-xs font-semibold w-7 h-7 flex items-center justify-center rounded-full transition-all ${
                          dateObj.today
                            ? 'bg-blue-600 text-white shadow-md'
                            : isSelected
                              ? 'bg-blue-100 text-blue-700'
                              : isOutside
                                ? 'text-gray-400 hover:bg-gray-200'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {dateObj.date.getDate()}
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-1.5 pb-2 space-y-1 custom-scrollbar">
                      {dayEvents.map(event => (
                        <div
                          key={event.id}
                          className={`${event.color} text-white text-[10px] px-2 py-1 rounded-md truncate shadow-sm cursor-pointer hover:brightness-95 transition-all font-medium`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
