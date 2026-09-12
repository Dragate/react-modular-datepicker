'use client';
import { Calendar } from 'react-modular-datepicker';

export default function StylingPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Modern Custom Theme</h1>

      <div className="flex flex-col gap-12">
        <section data-testid="emerald-theme">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Soft Emerald Theme</h2>
          <Calendar
            classNames={{
              root: 'bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100',
              header: 'flex items-center justify-between mb-8',
              monthYearLabel: 'flex gap-2 items-center font-bold text-slate-800 text-lg',
              monthYearButton: 'hover:bg-slate-50 px-3 py-1.5 rounded-xl transition-colors',
              weekday: 'text-slate-400 font-medium text-xs uppercase tracking-tighter',
              day: {
                day: 'rounded-2xl transition-all duration-200 font-medium text-slate-600',
                unselected: 'hover:bg-emerald-50 hover:text-emerald-700',
                selected: 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-110 z-10',
                today: 'text-emerald-600 font-bold underline decoration-2 underline-offset-4',
                outside: 'text-slate-300',
              },
              navButton: 'p-2.5 hover:bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 transition-all hover:text-slate-600 hover:scale-105 active:scale-95'
            }}
          />
        </section>

        <section data-testid="dark-theme">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Dark Mode Minimalist</h2>
          <Calendar
            classNames={{
              root: 'bg-slate-900 p-6 rounded-3xl shadow-2xl border border-slate-800',
              header: 'flex items-center justify-between mb-8',
              monthYearLabel: 'flex gap-2 items-center font-bold text-slate-100 text-lg',
              monthYearButton: 'hover:bg-slate-800 px-3 py-1.5 rounded-xl transition-colors',
              weekday: 'text-slate-500 font-medium text-xs uppercase tracking-widest',
              day: {
                day: 'rounded-xl transition-all font-medium text-slate-400',
                unselected: 'hover:bg-slate-800 hover:text-slate-100',
                selected: 'bg-blue-500 text-white shadow-lg shadow-blue-500/40',
                today: 'text-blue-400 ring-1 ring-blue-400',
                outside: 'text-slate-700',
              },
              navButton: 'p-2.5 hover:bg-slate-800 rounded-xl text-slate-500 transition-colors hover:text-slate-100'
            }}
          />
        </section>
      </div>
    </div>
  );
}
