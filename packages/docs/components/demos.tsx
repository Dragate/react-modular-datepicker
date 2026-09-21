'use client';

import {
  addDays, addMonths, addYears,
  differenceInCalendarMonths, differenceInCalendarYears,
  endOfDay, endOfMonth, endOfYear,
  format,
  getDate,
  getDaysInMonth,
  getMonth, getYear,
  setDate, setMonth, setYear,
  startOfDay, startOfMonth, startOfYear,
  subDays, subMonths, subYears
} from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import {
  Calendar,
  CalendarClassNames,
  DateAdapter,
  useDates
} from 'react-modular-datepicker';

export function DemoContainer({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="my-6 rounded-xl border border-fd-border bg-fd-card p-6 shadow-sm">
      {title && <div className="text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground mb-4">{title}</div>}
      <div className="flex flex-col items-center justify-center min-h-90">{children}</div>
    </div>
  );
}

export function BasicDemo() {
  const [selected, setSelected] = useState<Date | null>(new Date());
  return (
    <DemoContainer title="Live Preview: Single Date Selection">
      <Calendar selected={selected || undefined} onChange={(d) => setSelected(d as Date)} />
      {selected && (
        <div className="mt-4 text-sm text-fd-muted-foreground">
          Selected: <span className="font-semibold text-fd-foreground">{selected.toDateString()}</span>
        </div>
      )}
    </DemoContainer>
  );
}

export function ModifiersDemo() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date(year, month, 15));

  const birthdays = [`${year}-${month + 1}-18`];
  const holidays = [`${year}-${month + 1}-1`, `${year}-${month + 1}-25`];

  const getKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  return (
    <DemoContainer title="Live Preview: Custom Modifiers (Weekends, Birthdays, Holidays)">
      <Calendar
        selected={selectedDate}
        onChange={(d) => setSelectedDate(d as Date)}
        modifiers={{
          weekend: (date) => date.getDay() === 0 || date.getDay() === 6,
          birthday: (date) => birthdays.includes(getKey(date)),
          holiday: (date) => holidays.includes(getKey(date)),
        }}
        getDayProps={(dateObj) => {
          const key = getKey(dateObj.date);
          if (birthdays.includes(key)) {
            return { 'data-tooltip': '🎂 Birthday Party!' };
          }
          if (holidays.includes(key)) {
            return { 'data-tooltip': '🎉 Holiday' };
          }
          if (dateObj.date.getDay() === 0 || dateObj.date.getDay() === 6) {
            return { 'data-tooltip': '🌴 Weekend' };
          }
          return {};
        }}
        classNames={{
          day: {
            weekend: 'text-red-700',
            holiday:
              'border-2 border-emerald-500 relative ' +
              'before:content-[attr(data-tooltip)] before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 before:mb-1 before:hidden hover:before:block ' +
              'before:px-2 before:py-0.5 before:bg-gray-800 before:text-white before:text-[10px] before:rounded before:whitespace-nowrap before:z-20',
            birthday:
              'text-pink-600 dark:text-pink-400 font-bold relative ' +
              'before:content-[attr(data-tooltip)] before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 before:mb-1 before:hidden hover:before:block ' +
              'before:px-2 before:py-0.5 before:bg-gray-800 before:text-white before:text-[10px] before:rounded before:whitespace-nowrap before:z-20',
          },
        }}
      />
      <div className="mt-4 flex flex-wrap gap-3 justify-center text-xs">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded text-red-700 dark:text-red-200 font-medium border border-red-200 dark:border-red-900/40">
          <span className="w-2.5 h-2.5 rounded-full bg-red-900 dark:bg-red-300 inline-block" /> Weekend (Red Text)
        </span>
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded border-2 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> 🎉 Holiday (Border Highlight)
        </span>
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded text-pink-600 dark:text-pink-400 font-bold border border-pink-200 dark:border-pink-900/40">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block" /> 🎂 Birthday Party (Pink Bold Text)
        </span>
      </div>
    </DemoContainer>
  );
}

export function FullMonthScheduleDemo() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const eventsData: Record<string, { title: string; time: string; color: string }[]> = {
    [`${year}-${month + 1}-5`]: [
      { title: 'Team Standup', time: '9am', color: 'bg-blue-500 text-white' },
      { title: 'Project Review', time: '2pm', color: 'bg-emerald-500 text-white' },
    ],
    [`${year}-${month + 1}-12`]: [
      { title: 'Webinar Live', time: '11am', color: 'bg-purple-500 text-white' },
    ],
    [`${year}-${month + 1}-18`]: [
      { title: 'Release v2.0', time: '5pm', color: 'bg-rose-500 text-white' },
    ],
    [`${year}-${month + 1}-25`]: [
      { title: 'Design Review', time: '10am', color: 'bg-amber-500 text-white' },
      { title: 'Sprint Retro', time: '3pm', color: 'bg-blue-500 text-white' },
    ],
  };

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(year, month, 5));
  const { calendars, getBackProps, getForwardProps, getDateProps } = useDates({
    selected: selectedDate,
    onChange: (d) => setSelectedDate(d as Date),
  });

  const calendar = calendars[0];
  if (!calendar) return null;

  const getKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  return (
    <DemoContainer title="Live Preview: Full Month Schedule View">
      <div className="w-full max-w-2xl bg-fd-card rounded-xl border border-fd-border p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button {...getBackProps({ calendars })} className="p-1.5 rounded-lg border border-fd-border hover:bg-fd-accent text-xs font-semibold">
              ← Prev
            </button>
            <button {...getForwardProps({ calendars })} className="p-1.5 rounded-lg border border-fd-border hover:bg-fd-accent text-xs font-semibold">
              Next →
            </button>
          </div>
          <span className="font-bold text-base text-fd-foreground">
            {new Date(calendar.year, calendar.month).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <span className="text-xs font-medium text-fd-muted-foreground bg-fd-secondary px-2.5 py-1 rounded-full">
            Month View
          </span>
        </div>

        <div className="grid grid-cols-7 gap-px bg-fd-border rounded-lg overflow-hidden border border-fd-border">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="bg-fd-background p-2 text-center text-xs font-semibold text-fd-muted-foreground">
              {d}
            </div>
          ))}

          {calendar.weeks.flat().map((dateObj, idx) => {
            if (!dateObj) return <div key={idx} className="bg-fd-background min-h-[75px]" />;
            const key = getKey(dateObj.date);
            const events = eventsData[key] || [];

            return (
              <div
                key={idx}
                {...getDateProps({ dateObj })}
                className={`bg-fd-background min-h-[75px] p-1 flex flex-col justify-start transition-colors cursor-pointer hover:bg-fd-accent/40 ${!dateObj.selectable ? 'opacity-40' : ''
                  } ${dateObj.selected ? 'ring-2 ring-inset ring-brand-gold' : ''}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-medium px-1.5 py-0.5 rounded-full inline-block ${dateObj.today ? 'bg-brand-gold text-white font-bold' : 'text-fd-foreground'
                      }`}
                  >
                    {dateObj.date.getDate()}
                  </span>
                </div>

                <div className="space-y-1 overflow-hidden">
                  {events.map((ev, i) => (
                    <div
                      key={i}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-medium truncate shadow-xs flex items-center gap-1 ${ev.color}`}
                      title={`${ev.time} ${ev.title}`}
                    >
                      <span className="opacity-80 font-mono text-[9px]">{ev.time}</span>
                      <span className="truncate">{ev.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DemoContainer>
  );
}

export function EventScheduleDemo() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const eventsData: Record<string, { title: string; time: string; type: 'meeting' | 'webinar' | 'deadline' }[]> = {
    [`${year}-${month + 1}-5`]: [
      { title: 'Team Sync & Standup', time: '09:00 AM', type: 'meeting' },
      { title: 'Project Kickoff', time: '02:00 PM', type: 'meeting' },
    ],
    [`${year}-${month + 1}-12`]: [
      { title: 'React Modular Datepicker Webinar', time: '11:00 AM', type: 'webinar' },
    ],
    [`${year}-${month + 1}-18`]: [
      { title: 'Q3 Product Release Deadline', time: '05:00 PM', type: 'deadline' },
    ],
    [`${year}-${month + 1}-25`]: [
      { title: 'Design System Workshop', time: '10:00 AM', type: 'meeting' },
      { title: 'Sprint Review', time: '03:30 PM', type: 'meeting' },
    ],
  };

  const [selectedDate, setSelectedDate] = useState<Date>(new Date(year, month, 5));

  const getKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  return (
    <DemoContainer title="Live Preview: Event / Schedule Calendar">
      <Calendar
        selected={selectedDate}
        onChange={(d) => setSelectedDate(d as Date)}
        modifiers={{
          hasEvents: (date) => !!eventsData[getKey(date)],
        }}
        getDayProps={(dateObj) => {
          const events = eventsData[getKey(dateObj.date)];
          if (events && events.length > 0) {
            return {
              'data-tooltip': `${events.length} event${events.length > 1 ? 's' : ''}`,
            };
          }
          return {};
        }}
        classNames={{
          day: {
            hasEvents:
              'font-bold relative after:content-["•"] after:absolute after:bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:text-brand-gold after:text-xs ' +
              'before:content-[attr(data-tooltip)] before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 before:mb-1.5 before:hidden hover:before:block ' +
              'before:px-2 before:py-1 before:bg-gray-800 before:text-white before:text-[10px] before:rounded before:whitespace-nowrap before:z-20 before:shadow-md',
          },
        }}
      />
    </DemoContainer>
  );
}

const getRandomDatesInMonth = (year: number, month: number) => {
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  // Pick a random count between 5 and 10 (inclusive)
  const count = Math.floor(Math.random() * 6) + 5;

  // Generate unique random day numbers for that month
  const randomDayNumbers = new Set<number>();
  while (randomDayNumbers.size < Math.min(count, totalDaysInMonth)) {
    const randomDay = Math.floor(Math.random() * totalDaysInMonth) + 1;
    randomDayNumbers.add(randomDay);
  }

  // Convert day numbers to Date objects
  return Array.from(randomDayNumbers).map((day) => new Date(year, month, day));
}

export function AvailabilityDemo() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const [bookedDays, setBookedDays] = useState(getRandomDatesInMonth(year, month))

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(year, month, 8));
  const [isLoading, setIsLoading] = useState(false);

  const handleMonthChange = (dates: Date[]) => {
    setIsLoading(true);
    setTimeout(() => {
      const firstDate = dates[0] || new Date();
      const targetYear = firstDate.getFullYear();
      const targetMonth = firstDate.getMonth();

      setBookedDays(getRandomDatesInMonth(targetYear, targetMonth));
      setIsLoading(false);
    }, 700);
  };

  return (
    <DemoContainer title="Live Preview: Availability & Booking Calendar">
      <div className="flex flex-col md:flex-row gap-6 items-start w-full max-w-2xl justify-center">
        <div className="relative border border-fd-border rounded-lg bg-fd-card">
          <Calendar
            selected={selectedDate || undefined}
            onChange={(d) => {
              setSelectedDate(d as Date);
            }}
            onMonthChange={handleMonthChange}
            disabledDates={bookedDays}
            classNames={{
              daysGrid: 'grid grid-cols-7 gap-px bg-brand-gray-light/20 relative',
              day: {
                disabled: 'text-red-400 line-through cursor-not-allowed',
              },
            }}
          />

          {isLoading && (
            <div className="absolute inset-x-0 bottom-0 top-12 bg-transparent backdrop-blur-md flex flex-col items-center justify-center rounded-b-lg z-20">
              <div className="w-7 h-7 border-3 border-[#c5a059] border-t-transparent rounded-full animate-spin mb-2" />
              <span className="text-xs font-bold text-slate-900 px-2.5 py-1">Fetching availabilities...</span>
            </div>
          )}
        </div>
      </div>
    </DemoContainer>
  );
}

export function RangeDemo() {
  const [range, setRange] = useState<{ start?: Date; end?: Date }>({
    start: new Date(2026, 8, 10),
    end: new Date(2026, 9, 21),
  });
  return (
    <DemoContainer title="Live Preview: Date Range Selection">
      <Calendar
        selectionMode="range"
        date={new Date(2026, 8, 1)}
        monthsToDisplay={2}
        selected={range}
        onChange={(r) => setRange(r as { start?: Date; end?: Date })}
      />
      <div className="mt-4 text-sm text-fd-muted-foreground">
        Range: <span className="font-semibold text-fd-foreground">
          {range.start ? range.start.toLocaleDateString() : 'Start'} – {range.end ? range.end.toLocaleDateString() : 'End'}
        </span>
      </div>
    </DemoContainer>
  );
}

export function MultipleDemo() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const [dates, setDates] = useState<Date[]>([
    new Date(year, month, 8),
    new Date(year, month, 19),
    new Date(year, month, 23),
  ]);
  return (
    <DemoContainer title="Live Preview: Multiple Date Selection">
      <Calendar
        selectionMode="multiple"
        selected={dates}
        onChange={(d) => setDates(d as Date[])}
      />
      <div className="mt-4 text-sm text-fd-muted-foreground text-center">
        Selected ({dates.length} dates):
        <div className="flex flex-wrap gap-1 justify-center mt-2 max-w-md">
          {dates.map((d, i) => (
            <span key={i} className="px-2 py-0.5 rounded bg-fd-secondary text-xs font-mono">
              {d.toLocaleDateString()}
            </span>
          ))}
        </div>
      </div>
    </DemoContainer>
  );
}

export function HeadlessDemo() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { calendars, getBackProps, getForwardProps, getDateProps } = useDates({
    selected: selectedDate,
    onChange: (d) => setSelectedDate(d as Date),
  });

  const calendar = calendars[0];
  if (!calendar) return null;

  return (
    <DemoContainer title="Live Preview: Headless Custom Layout">
      <div className="w-full max-w-md bg-fd-background rounded-xl border border-fd-border p-4 shadow">
        <div className="flex items-center justify-between mb-4">
          <button {...getBackProps({ calendars })} className="p-2 rounded hover:bg-fd-accent text-sm font-bold">
            ← Prev
          </button>
          <span className="font-bold">
            {new Date(calendar.year, calendar.month).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button {...getForwardProps({ calendars })} className="p-2 rounded hover:bg-fd-accent text-sm font-bold">
            Next →
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-fd-muted-foreground mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendar.weeks.flat().map((dateObj, idx) => {
            if (!dateObj) return <div key={idx} />;
            return (
              <button
                key={idx}
                {...getDateProps({ dateObj })}
                className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${dateObj.selected
                  ? 'bg-blue-600 text-white font-bold'
                  : dateObj.today
                    ? 'border border-blue-500 text-blue-600'
                    : 'hover:bg-fd-accent'
                  }`}
              >
                {dateObj.date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    </DemoContainer>
  );
}

export function CustomStylingDemo() {
  const [theme, setTheme] = useState<'cyberpunk' | 'purple' | 'adaptive'>('adaptive');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 8, 13));

  const cyberpunkClassNames = {
    root: 'bg-[#050b14] p-4 sm:p-6 rounded-none border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] text-cyan-400 font-mono w-full max-w-sm',
    calendarContainer: 'w-full min-w-0',
    header: 'flex items-center justify-between border-b border-cyan-500/50 pb-3',
    navButton: 'p-1.5 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-200 rounded transition-colors',
    monthYearLabel: 'font-mono text-cyan-300 text-base font-bold tracking-wider',
    monthYearButton: 'hover:bg-cyan-950 px-2 py-1 rounded text-cyan-300',
    weekdayGrid: 'grid grid-cols-7 gap-1 mb-2 border-b border-cyan-900/60',
    weekday: 'text-center text-xs font-bold text-cyan-400 tracking-widest uppercase',
    daysGrid: 'grid grid-cols-7 gap-1 bg-transparent',
    day: {
      day: 'aspect-square flex items-center justify-center text-xs font-bold transition-all relative border border-cyan-900/80 bg-[#081220] text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950',
      selected: 'bg-[#081220] text-amber-400 border-2 border-amber-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] font-extrabold',
      unselected: 'bg-[#081220] text-cyan-300',
      disabled: 'bg-gray-900/80 text-gray-600 border-gray-900 cursor-not-allowed opacity-40',
      outside: "invisible"
    },
    monthsGrid: 'grid grid-cols-3 gap-2 bg-transparent p-1',
    monthButton: 'py-2 px-3 rounded border border-cyan-900/80 bg-[#081220] text-cyan-300 font-mono text-xs font-bold hover:border-cyan-400 hover:bg-cyan-950 transition-colors',
    monthButtonSelected: 'bg-[#081220] text-amber-400 border-2 border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)] font-extrabold',
    monthButtonUnselected: 'text-cyan-300',
    yearsGrid: 'grid grid-cols-3 gap-2 bg-transparent p-1 max-h-60 overflow-y-auto',
    yearButton: 'py-2 px-3 rounded border border-cyan-900/80 bg-[#081220] text-cyan-300 font-mono text-xs font-bold hover:border-cyan-400 hover:bg-cyan-950 transition-colors',
    yearButtonSelected: 'bg-[#081220] text-amber-400 border-2 border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)] font-extrabold',
    yearButtonUnselected: 'text-cyan-300',
  } satisfies CalendarClassNames

  const purpleClassNames = {
    root: 'bg-gradient-to-b from-[#2d0b5a] via-[#1e073e] to-[#120327] p-4 sm:p-6 rounded-3xl border border-purple-500/30 shadow-2xl text-purple-100 w-full max-w-sm',
    calendarContainer: 'w-full min-w-0',
    header: 'flex items-center justify-between pb-3',
    navButton: 'p-1.5 text-purple-300 hover:bg-purple-900/50 rounded-full transition-colors',
    monthYearLabel: 'font-sans text-purple-100 text-lg font-extrabold tracking-wide',
    monthYearButton: 'hover:bg-purple-900/40 px-2 py-1 rounded-lg text-purple-100',
    weekdayGrid: 'grid grid-cols-7 gap-1 mb-3',
    weekday: 'text-center text-xs font-bold text-purple-300 uppercase tracking-wider',
    daysGrid: 'grid grid-cols-7 gap-2 bg-transparent',
    day: {
      day: 'aspect-square flex items-center justify-center text-xs font-semibold rounded-full transition-all text-purple-100 hover:bg-purple-800/40 bg-purple-900/60',
      selected: '-purple-600 text-white font-extrabold ring-2 ring-pink-400 ring-offset-2 ring-offset-[#1e073e] rounded-full',
      unselected: 'text-purple-100',
      disabled: 'bg-purple-950/40 text-purple-400/30 cursor-not-allowed',
      outside: "invisible"
    },
    monthsGrid: 'grid grid-cols-3 gap-2 bg-transparent p-1',
    monthButton: 'py-2 px-3 rounded-xl text-purple-100 hover:bg-purple-800/40 bg-purple-900/60 font-semibold text-xs transition-colors',
    monthButtonSelected: 'bg-purple-900/80 text-white font-extrabold ring-2 ring-pink-400 ring-offset-2 ring-offset-[#1e073e] rounded-xl shadow-[0_0_12px_rgba(236,72,153,0.7)]',
    monthButtonUnselected: 'text-purple-100',
    yearsGrid: 'grid grid-cols-3 gap-2 bg-transparent p-1 max-h-60 overflow-y-auto',
    yearButton: 'py-2 px-3 rounded-xl text-purple-100 hover:bg-purple-800/40 bg-purple-900/60 font-semibold text-xs transition-colors',
    yearButtonSelected: 'bg-purple-900/80 text-white font-extrabold ring-2 ring-pink-400 ring-offset-2 ring-offset-[#1e073e] rounded-xl shadow-[0_0_12px_rgba(236,72,153,0.7)]',
    yearButtonUnselected: 'text-purple-100',
  } satisfies CalendarClassNames

  const adaptiveClassNames = {
    root: 'bg-slate-100/80 dark:bg-slate-900/90 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg text-slate-800 dark:text-slate-100 w-full max-w-sm backdrop-blur-md',
    calendarContainer: 'w-full min-w-0',
    header: 'flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3',
    navButton: 'p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors',
    monthYearLabel: 'font-sans text-slate-900 dark:text-slate-50 text-base font-bold tracking-tight',
    monthYearButton: 'hover:bg-slate-200 dark:hover:bg-slate-800 px-2 py-1 rounded-lg text-slate-900 dark:text-slate-100 font-bold',
    weekdayGrid: 'grid grid-cols-7 gap-1 mb-2 border-b border-slate-200/60 dark:border-slate-800/60',
    weekday: 'text-center text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider',
    daysGrid: 'grid grid-cols-7 gap-1 bg-transparent',
    day: {
      day: 'aspect-square flex items-center justify-center text-xs font-semibold rounded-lg bg-slate-200/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 hover:bg-emerald-500/20 dark:hover:bg-emerald-500/30 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all',
      selected: 'bg-emerald-600 dark:bg-emerald-500  text-slate-800 dark:text-slate-200 font-extrabold rounded-lg shadow-lg shadow-emerald-600/40 dark:shadow-emerald-500/60 ring-2 ring-emerald-500 ring-offset-2 ring-offset-slate-100 dark:ring-offset-slate-900',
      unselected: 'text-slate-800 dark:text-slate-200',
      disabled: 'opacity-30 bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 cursor-not-allowed',
      outside: "invisible"
    },
    monthsGrid: 'grid grid-cols-3 gap-2 bg-transparent p-1',
    monthButton: 'py-2 px-3 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 hover:bg-emerald-500/20 dark:hover:bg-emerald-500/30 hover:text-emerald-700 dark:hover:text-emerald-300 text-xs font-semibold transition-all',
    monthButtonSelected: 'bg-emerald-600 dark:bg-emerald-500 text-white font-bold rounded-lg shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500 ring-offset-2 ring-offset-slate-100 dark:ring-offset-slate-900',
    monthButtonUnselected: 'text-slate-800 dark:text-slate-200',
    yearsGrid: 'grid grid-cols-3 gap-2 bg-transparent p-1 max-h-60 overflow-y-auto',
    yearButton: 'py-2 px-3 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 hover:bg-emerald-500/20 dark:hover:bg-emerald-500/30 hover:text-emerald-700 dark:hover:text-emerald-300 text-xs font-semibold transition-all',
    yearButtonSelected: 'bg-emerald-600 dark:bg-emerald-500 text-white font-bold rounded-lg shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500 ring-offset-2 ring-offset-slate-100 dark:ring-offset-slate-900',
    yearButtonUnselected: 'text-slate-800 dark:text-slate-200',
  } satisfies CalendarClassNames

  const themeClassNames = {
    cyberpunk: cyberpunkClassNames,
    purple: purpleClassNames,
    adaptive: adaptiveClassNames,
  };

  return (
    <DemoContainer title="Live Preview: Custom Styling & Themes">
      <div className="flex flex-wrap gap-2 justify-center mb-6 w-full">
        <button
          type="button"
          onClick={() => setTheme('adaptive')}
          className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all ${theme === 'adaptive'
            ? 'bg-emerald-600 text-white shadow-md'
            : 'bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent'
            }`}
        >
          Adaptive Glass (Light & Dark)
        </button>
        <button
          type="button"
          onClick={() => setTheme('cyberpunk')}
          className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all ${theme === 'cyberpunk'
            ? 'bg-cyan-500 text-black shadow-md'
            : 'bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent'
            }`}
        >
          Cyberpunk Cyan
        </button>
        <button
          type="button"
          onClick={() => setTheme('purple')}
          className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all ${theme === 'purple'
            ? 'bg-purple-600 text-white shadow-md'
            : 'bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent'
            }`}
        >
          Royal Purple
        </button>
      </div>

      <Calendar
        date={selectedDate}
        selected={selectedDate}
        onChange={(d) => setSelectedDate(d as Date)}
        classNames={themeClassNames[theme]}
      />
    </DemoContainer>
  );
}

export function LocalizationDemo() {
  const [lang, setLang] = useState<'es' | 'fr' | 'de' | 'ar'>('es');
  const translationsMap = {
    es: {
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      back: 'Mes anterior',
      forward: 'Mes siguiente',
    },
    fr: {
      months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      back: 'Mois précédent',
      forward: 'Mois suivant',
    },
    de: {
      months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      weekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
      back: 'Vorheriger Monat',
      forward: 'Nächster Monat',
    },
    ar: {
      months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      weekdays: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
      back: 'الشهر السابق',
      forward: 'الشهر التالي',
    },
  };

  const isRtl = lang === 'ar';

  return (
    <DemoContainer title="Live Preview: Localization & RTL Support">
      <div className="flex gap-2 mb-4">
        {(['es', 'fr', 'de', 'ar'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 text-xs rounded font-medium transition-colors ${lang === l ? 'bg-fd-primary text-fd-primary-foreground' : 'bg-fd-secondary text-fd-secondary-foreground'
              }`}
          >
            {l === 'ar' ? 'العربية (RTL)' : l.toUpperCase()}
          </button>
        ))}
      </div>
      <div dir={isRtl ? 'rtl' : 'ltr'} className="w-full flex justify-center">
        <Calendar
          firstDayOfWeek={isRtl ? 6 : 1}
          translations={translationsMap[lang]}
        />
      </div>
    </DemoContainer>
  );
}

export function FormIntegrationDemo() {
  const [date, setDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DemoContainer title="Live Preview: Popover / Form Integration">
      <div ref={containerRef} className="relative inline-block text-left">
        <label className="block text-xs font-semibold mb-1 text-fd-muted-foreground">Select Travel Date</label>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={date ? date.toLocaleDateString() : ''}
            placeholder="Pick a date..."
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-2 rounded-lg border border-fd-border bg-fd-background text-sm cursor-pointer min-w-[200px]"
          />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-fd-primary text-fd-primary-foreground text-sm font-medium rounded-lg"
          >
            📅 Calendar
          </button>
        </div>
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 z-50 bg-fd-background border border-fd-border rounded-xl shadow-2xl p-2">
            <Calendar
              date={date || undefined}
              selected={date || undefined}
              onChange={(d) => {
                setDate(d as Date);
                setIsOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </DemoContainer>
  );
}

export function HeaderFooterDemo() {
  const [selected, setSelected] = useState<Date | null>(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handleSelectToday = () => {
    const today = new Date();
    setSelected(today);
    setCurrentDate(today);
  };

  const handleClear = () => {
    setSelected(null);
  };

  return (
    <DemoContainer title="Live Preview: Custom Header & Footer">
      <Calendar
        date={currentDate}
        selected={selected || undefined}
        onChange={(val) => setSelected(val as Date)}
        onMonthChange={(dates) => setCurrentDate(dates[0])}
        header={
          <div className="px-4 py-3 text-slate-950 flex items-center justify-between rounded-t-lg">
            <span className="text-xs font-bold tracking-wide flex items-center gap-2">
              <span className="text-sm">📅</span> Appointment Booking
            </span>
            <span className="text-[11px] font-medium text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full">
              Step 1 of 2
            </span>
          </div>
        }
        classNames={{
          root: "min-w-[320px]"
        }}
        footer={
          <div className="px-4 py-3 text-slate-950 flex items-center justify-between rounded-b-lg text-xs">
            <div className="flex-1 min-w-0 h-5 flex items-center pr-2">
              {selected ? (
                <span className="font-medium truncate">
                  Selected: <strong className="font-bold ml-2 text-slate-950">{selected.toLocaleDateString()}</strong>
                </span>
              ) : (
                <span className="italic truncate">No date selected</span>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleSelectToday}
                className="px-2.5 py-1 text-xs font-semibold rounded bg-brand-gold text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Today
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-2.5 py-1 text-xs font-semibold rounded border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        }
      />
    </DemoContainer>
  );
}

export function MinMaxDisabledDemo() {
  const [selected, setSelected] = useState<Date | null>(new Date());
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), 5);
  const maxDate = new Date(today.getFullYear(), today.getMonth(), 25);
  const disabledDates = [
    new Date(today.getFullYear(), today.getMonth(), 10),
    new Date(today.getFullYear(), today.getMonth(), 12),
    new Date(today.getFullYear(), today.getMonth(), 18),
  ];

  return (
    <DemoContainer title="Live Preview: Bounds & Disabled Dates">
      <Calendar
        selected={selected || undefined}
        onChange={(d) => setSelected(d as Date)}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
      />
      <div className="mt-4 text-xs text-fd-muted-foreground text-center">
        Allowed: {minDate.getDate()}th – {maxDate.getDate()}th (10th, 12th, 18th disabled)
      </div>
    </DemoContainer>
  );
}

export function YearlyDemo() {
  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  const [selected, setSelected] = useState<Date | null>(null);

  const eventDatesSet = React.useMemo(() => {
    const set = new Set<string>();
    const getKey = (y: number, m: number, d: number) => `${y}-${m + 1}-${d}`;
    for (let m = 0; m < 12; m++) {
      const daysInMonth = new Date(currentYear, m + 1, 0).getDate();
      const d1 = ((m * 7 + 3) % daysInMonth) + 1;
      const d2 = ((m * 11 + 14) % daysInMonth) + 1;
      set.add(getKey(currentYear, m, d1));
      set.add(getKey(currentYear, m, d2));
    }
    return set;
  }, [currentYear]);

  return (
    <DemoContainer title="Live Preview: Yearly View">
      <div className="flex flex-col justify-center w-full items-center">
        <Calendar
          date={startOfYear}
          monthsToDisplay={12}
          selected={selected || undefined}
          onChange={(d) => setSelected(d as Date)}
          modifiers={{
            weekend: (date) => date.getDay() === 0 || date.getDay() === 6,
            hasEvents: (date) => {
              const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
              return eventDatesSet.has(key);
            },
          }}
          classNames={{
            calendarsContainer: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 w-full',
            calendarContainer: 'min-w-0',
            day: {
              day: 'aspect-square flex items-center justify-center text-xs font-medium transition-all relative group cursor-pointer p-0',
              weekend: 'text-red-700',
              hasEvents:
                'font-bold relative after:content-["•"] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:text-brand-gold after:text-[10px]',
            },
            weekday: 'text-center text-xs text-gray-400 py-1',
          }}
        />
        {selected && (
          <div className="mt-4 text-sm text-center text-fd-muted-foreground">
            Selected: <span className="font-semibold text-fd-foreground">{selected.toDateString()}</span>
          </div>
        )}
      </div>
    </DemoContainer>
  );
}

class DateFnsAdapter implements DateAdapter<Date> {
  date(value?: any): Date { return value ? new Date(value) : new Date(); }
  add(date: Date, amount: number, unit: 'day' | 'month' | 'year'): Date {
    if (unit === 'day') return addDays(date, amount);
    if (unit === 'month') return addMonths(date, amount);
    return addYears(date, amount);
  }
  subtract(date: Date, amount: number, unit: 'day' | 'month' | 'year'): Date {
    if (unit === 'day') return subDays(date, amount);
    if (unit === 'month') return subMonths(date, amount);
    return subYears(date, amount);
  }
  startOf(date: Date, unit: 'day' | 'month' | 'year'): Date {
    if (unit === 'day') return startOfDay(date);
    if (unit === 'month') return startOfMonth(date);
    return startOfYear(date);
  }
  endOf(date: Date, unit: 'day' | 'month' | 'year'): Date {
    if (unit === 'day') return endOfDay(date);
    if (unit === 'month') return endOfMonth(date);
    return endOfYear(date);
  }
  isBefore(date: Date, comparison: Date, unit?: 'day' | 'month' | 'year'): boolean {
    if (unit === 'day') return startOfDay(date) < startOfDay(comparison);
    if (unit === 'month') return startOfMonth(date) < startOfMonth(comparison);
    if (unit === 'year') return startOfYear(date) < startOfYear(comparison);
    return date < comparison;
  }
  isAfter(date: Date, comparison: Date, unit?: 'day' | 'month' | 'year'): boolean {
    if (unit === 'day') return startOfDay(date) > startOfDay(comparison);
    if (unit === 'month') return startOfMonth(date) > startOfMonth(comparison);
    if (unit === 'year') return startOfYear(date) > startOfYear(comparison);
    return date > comparison;
  }
  isSame(date: Date, comparison: Date, unit?: 'day' | 'month' | 'year'): boolean {
    if (unit === 'day') return startOfDay(date).getTime() === startOfDay(comparison).getTime();
    if (unit === 'month') return startOfMonth(date).getTime() === startOfMonth(comparison).getTime();
    if (unit === 'year') return startOfYear(date).getTime() === startOfYear(comparison).getTime();
    return date.getTime() === comparison.getTime();
  }
  set(date: Date, unit: 'day' | 'month' | 'year', value: number): Date {
    if (unit === 'day') return setDate(date, value);
    if (unit === 'month') return setMonth(date, value);
    return setYear(date, value);
  }
  get(date: Date, unit: 'day' | 'month' | 'year'): number {
    if (unit === 'day') return getDate(date);
    if (unit === 'month') return getMonth(date);
    return getYear(date);
  }
  format(date: Date, formatStr: string): string {
    const f = formatStr.replace(/YYYY/g, 'yyyy').replace(/YY/g, 'yy').replace(/D/g, 'd');
    return format(date, f);
  }
  getDaysInMonth(date: Date): number { return getDaysInMonth(date); }
  toDate(date: Date): Date { return date; }
  diff(date: Date, comparison: Date, unit: 'month' | 'year'): number {
    if (unit === 'month') return differenceInCalendarMonths(date, comparison);
    return differenceInCalendarYears(date, comparison);
  }
  getMonths(): string[] {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }
  getWeekdays(): string[] {
    return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  }
}

const customDateFnsAdapter = new DateFnsAdapter();

export function CustomAdapterDemo() {
  const [selected, setSelected] = useState<Date | null>(new Date());
  return (
    <DemoContainer title="Live Preview: Custom date-fns Adapter">
      <Calendar adapter={customDateFnsAdapter} selected={selected || undefined} onChange={(d) => setSelected(d as Date)} />
      <div className="mt-4 text-xs text-fd-muted-foreground">
        Powered by date-fns adapter without dayjs peer dependency!
      </div>
    </DemoContainer>
  );
}
