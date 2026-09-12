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
        {/* Theme 1: Sharp Cyber Neon Tech */}
        <div data-testid="neon-theme">
          <Calendar
            classNames={{
              root: 'bg-black p-5 border-2 border-cyan-400 font-mono text-cyan-400 shadow-[6px_6px_0px_0px_rgba(6,182,212,1)] rounded-none w-[320px]',
              calendarContainer: 'min-h-0 flex flex-col',
              header: 'flex items-center justify-between pb-3 border-b-2 border-cyan-400 mb-3',
              monthYearLabel: 'flex gap-2 items-center font-extrabold text-sm tracking-widest uppercase text-cyan-300',
              monthYearButton: 'hover:bg-cyan-950 px-2 py-0.5 transition-colors text-cyan-300 text-xs rounded-none',
              weekdayGrid: 'grid grid-cols-7 gap-1 mb-1 border-b border-cyan-900',
              weekday: 'text-cyan-500 font-bold text-xs uppercase text-center',
              daysGrid: 'grid grid-cols-7 gap-1 bg-transparent',
              day: {
                day: 'rounded-none border border-cyan-950 font-bold text-xs transition-all aspect-square flex items-center justify-center',
                unselected: 'bg-slate-950 hover:border-cyan-400 hover:bg-cyan-950 text-cyan-300',
                selected: 'bg-cyan-400 text-black font-black border-2 border-cyan-300',
                today: 'text-yellow-400 font-extrabold border-yellow-400 bg-yellow-950/30',
                outside: 'text-cyan-900 opacity-30 bg-transparent border-transparent',
              },
              navButton: 'p-1 hover:bg-cyan-400 hover:text-black text-cyan-400 transition-colors rounded-none'
            }}
          />
        </div>

        {/* Theme 2: Soft Floating Glass Card */}
        <div data-testid="violet-theme">
          <Calendar
            classNames={{
              root: 'bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 p-6 rounded-3xl border border-purple-400/20 shadow-2xl shadow-purple-950/40 text-purple-100 w-[320px]',
              calendarContainer: 'min-h-0 flex flex-col',
              header: 'flex items-center justify-between mb-4',
              monthYearLabel: 'flex gap-2 items-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-200 text-base',
              monthYearButton: 'hover:bg-purple-800/40 px-3 py-1 rounded-full transition-colors text-purple-200',
              weekdayGrid: 'grid grid-cols-7 gap-1 mb-2',
              weekday: 'text-purple-400/80 font-semibold text-xs tracking-wider uppercase text-center',
              daysGrid: 'grid grid-cols-7 gap-1 bg-transparent',
              day: {
                day: 'rounded-full transition-all duration-200 font-semibold text-purple-200 aspect-square flex items-center justify-center',
                unselected: 'bg-purple-900/20 hover:bg-purple-500/30 hover:text-white',
                selected: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/40 scale-105',
                today: 'text-pink-300 ring-2 ring-pink-400 ring-offset-2 ring-offset-purple-950',
                outside: 'text-purple-900/40 bg-transparent',
              },
              navButton: 'p-2 hover:bg-purple-800/40 rounded-full text-purple-300 transition-transform hover:scale-110'
            }}
          />
        </div>

        {/* Theme 3: Warm Editorial Luxury */}
        <div data-testid="emerald-theme">
          <Calendar
            classNames={{
              root: 'bg-stone-50 p-6 rounded-2xl border border-stone-200 shadow-lg text-stone-800 w-[320px]',
              calendarContainer: 'min-h-0 flex flex-col',
              header: 'flex items-center justify-between mb-4 border-b border-stone-200 pb-3',
              monthYearLabel: 'flex gap-2 items-center font-serif text-stone-900 text-lg font-bold tracking-tight',
              monthYearButton: 'hover:bg-stone-200/60 px-2 py-0.5 rounded transition-colors text-stone-700',
              weekdayGrid: 'grid grid-cols-7 gap-1 mb-2 border-b border-stone-200 pb-1',
              weekday: 'text-amber-900/60 font-serif font-bold text-xs uppercase text-center',
              daysGrid: 'grid grid-cols-7 gap-1 bg-transparent',
              day: {
                day: 'rounded-lg transition-all font-sans text-xs font-medium aspect-square flex items-center justify-center',
                unselected: 'bg-white border border-stone-200/80 hover:bg-amber-100/50 hover:border-amber-400 text-stone-800 shadow-sm',
                selected: 'bg-amber-800 text-amber-50 font-bold border border-amber-900 shadow-md scale-105',
                today: 'text-amber-800 font-extrabold ring-1 ring-amber-700 bg-amber-50',
                outside: 'bg-stone-100/50 text-stone-300 border-transparent',
              },
              navButton: 'p-1.5 hover:bg-stone-200/80 rounded-lg text-stone-600 hover:text-stone-950 transition-colors'
            }}
          />
        </div>
      </div>
    </div>
  );
}
