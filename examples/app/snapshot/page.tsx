'use client';
import { Calendar } from 'react-modular-datepicker';

/**
 * Snapshot test page — renders all calendar variants at a fixed date
 * so that visual snapshots remain deterministic across runs.
 */
export default function SnapshotPage() {
  // Fixed date: January 15, 2025
  const fixedDate = new Date(2025, 0, 15);
  const rangeStart = new Date(2025, 0, 10);
  const rangeEnd = new Date(2025, 0, 22);
  const multipleDates = [
    new Date(2025, 0, 5),
    new Date(2025, 0, 12),
    new Date(2025, 0, 18),
    new Date(2025, 0, 25),
  ];
  const disabledDates = [new Date(2025, 0, 10)];

  return (
    <div className="flex flex-col gap-12 p-4">
      {/* Basic single selection */}
      <section data-testid="snapshot-basic">
        <h2 className="text-lg font-bold mb-2">Basic</h2>
        <Calendar
          date={fixedDate}
          selected={fixedDate}
          onChange={() => { }}
        />
      </section>

      {/* Range selection with pre-selected range */}
      <section data-testid="snapshot-range">
        <h2 className="text-lg font-bold mb-2">Range</h2>
        <Calendar
          date={fixedDate}
          selectionMode="range"
          selected={{ start: rangeStart, end: rangeEnd }}
          onChange={() => { }}
          monthsToDisplay={2}
        />
      </section>

      {/* Multiple selection with disabled dates */}
      <section data-testid="snapshot-multiple">
        <h2 className="text-lg font-bold mb-2">Multiple + Disabled</h2>
        <Calendar
          date={fixedDate}
          selectionMode="multiple"
          selected={multipleDates}
          onChange={() => { }}
          disabledDates={disabledDates}
        />
      </section>

      {/* Custom header & footer with two months */}
      <section data-testid="snapshot-header-footer">
        <h2 className="text-lg font-bold mb-2">Custom Header &amp; Footer</h2>
        <Calendar
          date={fixedDate}
          selected={fixedDate}
          onChange={() => { }}
          monthsToDisplay={2}
          classNames={{
            calendarsContainer: "flex flex-row gap-6"
          }}
          header={<div className="p-3 mb-4 bg-blue-600 text-white font-bold text-center rounded-t-xl shadow-md">Custom Header</div>}
          footer={<div className="p-3 mt-4 bg-gray-100 text-gray-700 text-sm font-medium text-center rounded-b-xl border-t border-gray-200">Custom Footer</div>}
        />
      </section>

      {/* Neon theme */}
      <section data-testid="snapshot-neon-theme">
        <h2 className="text-lg font-bold mb-2">Neon Theme</h2>
        <Calendar
          date={fixedDate}
          selected={fixedDate}
          onChange={() => { }}
          classNames={{
            root: 'bg-black p-5 border-2 border-cyan-400 font-mono text-cyan-400 shadow-[6px_6px_0px_0px_rgba(6,182,212,1)] rounded-none w-[320px]',
            calendarsContainer: 'w-full',
            calendarContainer: 'w-full min-h-0 flex flex-col',
            header: 'flex items-center justify-between pb-3 border-b-2 border-cyan-400 mb-3',
            monthYearLabel: 'flex gap-2 items-center font-extrabold text-sm tracking-widest uppercase text-cyan-300',
            monthYearButton: 'hover:bg-cyan-950 px-2 py-0.5 transition-colors text-cyan-300 text-xs rounded-none',
            weekdayGrid: 'grid grid-cols-7 gap-1 mb-1 border-b border-cyan-900 w-full',
            weekday: 'text-cyan-500 font-bold text-xs uppercase text-center',
            daysGrid: 'grid grid-cols-7 gap-1 bg-transparent w-full',
            day: {
              day: 'rounded-none border border-cyan-950 font-bold text-xs transition-all aspect-square flex items-center justify-center',
              unselected: 'bg-slate-950 hover:border-cyan-400 hover:bg-cyan-950 text-cyan-300',
              selected: 'bg-cyan-400 text-black font-black border-2 border-cyan-300',
            },
            navButton: 'p-1 hover:bg-cyan-400 hover:text-black text-cyan-400 transition-colors rounded-none'
          }}
        />
      </section>

      {/* Violet glass theme */}
      <section data-testid="snapshot-violet-theme">
        <h2 className="text-lg font-bold mb-2">Violet Theme</h2>
        <Calendar
          date={fixedDate}
          selected={fixedDate}
          onChange={() => { }}
          classNames={{
            root: 'bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 p-6 rounded-3xl border border-purple-400/20 shadow-2xl shadow-purple-950/40 text-purple-100 w-[320px]',
            calendarsContainer: 'w-full',
            calendarContainer: 'w-full min-h-0 flex flex-col',
            header: 'flex items-center justify-between mb-4',
            monthYearLabel: 'flex gap-2 items-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-200 text-base',
            monthYearButton: 'hover:bg-purple-800/40 px-3 py-1 rounded-full transition-colors text-purple-200',
            weekdayGrid: 'grid grid-cols-7 gap-1 mb-2 w-full',
            weekday: 'text-purple-400/80 font-semibold text-xs tracking-wider uppercase text-center',
            daysGrid: 'grid grid-cols-7 gap-1 bg-transparent w-full',
            day: {
              day: 'rounded-full transition-all duration-200 font-semibold text-purple-200 aspect-square flex items-center justify-center',
              unselected: 'bg-purple-900/20 hover:bg-purple-500/30 hover:text-white',
              selected: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/40 scale-105',
            },
            navButton: 'p-2 hover:bg-purple-800/40 rounded-full text-purple-300 transition-transform hover:scale-110'
          }}
        />
      </section>

      {/* Emerald editorial theme */}
      <section data-testid="snapshot-emerald-theme">
        <h2 className="text-lg font-bold mb-2">Emerald Theme</h2>
        <Calendar
          date={fixedDate}
          selected={fixedDate}
          onChange={() => { }}
          classNames={{
            root: 'bg-stone-50 p-6 rounded-2xl border border-stone-200 shadow-lg text-stone-800 w-[320px]',
            calendarsContainer: 'w-full',
            calendarContainer: 'w-full min-h-0 flex flex-col',
            header: 'flex items-center justify-between mb-4 border-b border-stone-200 pb-3',
            monthYearLabel: 'flex gap-2 items-center font-serif text-stone-900 text-lg font-bold tracking-tight',
            monthYearButton: 'hover:bg-stone-200/60 px-2 py-0.5 rounded transition-colors text-stone-700',
            weekdayGrid: 'grid grid-cols-7 gap-1 mb-2 border-b border-stone-200 pb-1 w-full',
            weekday: 'text-amber-900/60 font-serif font-bold text-xs uppercase text-center',
            daysGrid: 'grid grid-cols-7 gap-1 bg-transparent w-full',
            day: {
              day: 'rounded-lg transition-all font-sans text-xs font-medium aspect-square flex items-center justify-center',
              unselected: 'bg-white border border-stone-200/80 hover:bg-amber-100/50 hover:border-amber-400 text-stone-800 shadow-sm',
              selected: 'bg-amber-800 text-amber-50 font-bold border border-amber-900 shadow-md scale-105',
            },
            navButton: 'p-1.5 hover:bg-stone-200/80 rounded-lg text-stone-600 hover:text-stone-950 transition-colors'
          }}
        />
      </section>

      {/* Localization: Spanish with Monday start */}
      <section data-testid="snapshot-localization">
        <h2 className="text-lg font-bold mb-2">Localization (Spanish)</h2>
        <Calendar
          date={fixedDate}
          selected={fixedDate}
          onChange={() => { }}
          firstDayOfWeek={1}
          translations={{
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
          }}
        />
      </section>
    </div>
  );
}

