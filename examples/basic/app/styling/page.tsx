'use client';
import { Calendar } from 'react-modular-datepicker';

export default function StylingPage() {
  return (
    <div className="p-4 bg-white text-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">Custom Styling Showcase</h1>
      <p className="text-gray-600 mb-6 text-sm">
        Demonstrating custom themes built using the <code className="bg-gray-100 px-1 py-0.5 rounded text-amber-700 font-mono">classNames</code> prop to customize layout, typography, borders, and shape.
      </p>

      <div className="flex flex-wrap gap-8 items-start justify-center">
        {/* Theme 1: Sharp Monospace Tech */}
        <div data-testid="neon-theme">
          <Calendar
            classNames={{
              root: 'bg-black p-5 border-2 border-cyan-400 font-mono text-cyan-400 shadow-[4px_4px_0px_0px_rgba(6,182,212,1)] rounded-none',
              calendarContainer: 'min-h-0 flex flex-col',
              header: 'flex items-center justify-between pb-3 border-b-2 border-cyan-400 mb-3',
              monthYearLabel: 'flex gap-2 items-center font-bold text-sm tracking-widest uppercase',
              monthYearButton: 'hover:bg-cyan-950 px-2 py-0.5 border border-cyan-400/50 rounded-none transition-colors text-cyan-300 text-xs',
              weekday: 'text-cyan-600 font-bold text-xs uppercase',
              day: {
                day: 'rounded-none border border-transparent font-bold text-xs transition-colors',
                unselected: 'hover:border-cyan-400 hover:bg-cyan-950/80 text-cyan-300',
                selected: 'bg-cyan-400 text-black font-black border-2 border-cyan-300 scale-100',
                today: 'text-yellow-400 font-extrabold border-b-2 border-yellow-400',
                outside: 'text-cyan-900 opacity-40',
              },
              navButton: 'p-1 hover:bg-cyan-400 hover:text-black border border-cyan-400 text-cyan-400 transition-colors rounded-none'
            }}
          />
        </div>

        {/* Theme 2: Soft Floating Glass Card */}
        <div data-testid="violet-theme">
          <Calendar
            classNames={{
              root: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-6 rounded-3xl border border-purple-400/20 shadow-xl shadow-purple-950/20 text-purple-100',
              calendarContainer: 'min-h-0 flex flex-col',
              header: 'flex items-center justify-between mb-4',
              monthYearLabel: 'flex gap-2 items-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-200 text-base',
              monthYearButton: 'hover:bg-purple-800/40 px-3 py-1 rounded-full transition-colors text-purple-200',
              weekday: 'text-purple-400/80 font-semibold text-xs tracking-wider uppercase',
              day: {
                day: 'rounded-full transition-all duration-200 font-semibold text-purple-200',
                unselected: 'hover:bg-purple-500/20 hover:text-white',
                selected: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/30 scale-105',
                today: 'text-pink-300 ring-2 ring-pink-400 ring-offset-2 ring-offset-purple-950',
                outside: 'text-purple-950 opacity-40',
              },
              navButton: 'p-2 hover:bg-purple-800/40 rounded-full text-purple-300 transition-transform hover:scale-110'
            }}
          />
        </div>

        {/* Theme 3: Minimalist Modern */}
        <div data-testid="emerald-theme">
          <Calendar
            classNames={{
              root: 'bg-transparent p-4 text-slate-800',
              calendarContainer: 'min-h-0 flex flex-col',
              header: 'flex items-center justify-between mb-3 border-b border-slate-200 pb-2',
              monthYearLabel: 'flex gap-2 items-center font-light text-slate-900 text-base tracking-tight',
              monthYearButton: 'hover:bg-slate-100 px-2 py-0.5 rounded transition-colors text-slate-700',
              weekday: 'text-slate-400 font-normal text-xs uppercase',
              day: {
                day: 'rounded transition-colors font-normal text-slate-700 text-sm',
                unselected: 'hover:bg-emerald-50 hover:text-emerald-700',
                selected: 'bg-emerald-700 text-white font-medium rounded-full',
                today: 'text-emerald-700 font-bold underline underline-offset-4 decoration-2',
                outside: 'text-slate-300',
              },
              navButton: 'p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-800 transition-colors'
            }}
          />
        </div>
      </div>
    </div>
  );
}
