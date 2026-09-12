'use client';
import { Calendar } from 'react-modular-datepicker';

export default function StylingPage() {
  return (
    <div className="p-8 bg-slate-950 min-h-screen text-slate-100">
      <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Custom Styling Showcase</h1>
      <p className="text-slate-400 mb-8 text-sm">Demonstrating how easily <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300">classNames</code> overrides allow building completely distinct, high-quality themes.</p>

      <div className="flex flex-wrap gap-8 items-start justify-center">
        {/* Theme 1: Cyber Neon Dark */}
        <section data-testid="neon-theme" className="flex flex-col items-center">
          <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Cyber Neon Dark
          </h2>
          <Calendar
            classNames={{
              root: 'bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] text-slate-200',
              header: 'flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-4',
              monthYearLabel: 'flex gap-2 items-center font-bold text-cyan-300 text-base tracking-wide',
              monthYearButton: 'hover:bg-cyan-950/60 px-2.5 py-1 rounded-lg transition-colors text-cyan-300',
              weekday: 'text-slate-500 font-semibold text-xs uppercase tracking-wider',
              day: {
                day: 'rounded-xl transition-all font-medium text-slate-300',
                unselected: 'hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]',
                selected: 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.8)] scale-105',
                today: 'text-cyan-400 font-bold ring-1 ring-cyan-400/60',
                outside: 'text-slate-700',
              },
              navButton: 'p-2 hover:bg-cyan-950/60 rounded-xl border border-cyan-500/30 text-cyan-400 transition-all hover:scale-110 active:scale-95'
            }}
          />
        </section>

        {/* Theme 2: Violet Sunset Glass */}
        <section data-testid="violet-theme" className="flex flex-col items-center">
          <h2 className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400"></span>
            Violet Sunset Glass
          </h2>
          <Calendar
            classNames={{
              root: 'bg-gradient-to-br from-purple-900/80 via-slate-900 to-indigo-950 p-6 rounded-3xl border border-purple-500/30 shadow-2xl shadow-purple-900/30 text-purple-100',
              header: 'flex items-center justify-between mb-6',
              monthYearLabel: 'flex gap-2 items-center font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-200 text-lg',
              monthYearButton: 'hover:bg-purple-800/40 px-3 py-1.5 rounded-xl transition-colors',
              weekday: 'text-purple-400/80 font-bold text-xs uppercase tracking-widest',
              day: {
                day: 'rounded-full transition-all duration-200 font-semibold text-purple-200',
                unselected: 'hover:bg-purple-500/20 hover:text-white',
                selected: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/40 scale-110',
                today: 'text-pink-400 ring-2 ring-pink-400 ring-offset-2 ring-offset-purple-950',
                outside: 'text-purple-900/60',
              },
              navButton: 'p-2.5 hover:bg-purple-800/40 rounded-2xl border border-purple-500/20 text-purple-300 transition-all hover:text-white hover:scale-105'
            }}
          />
        </section>

        {/* Theme 3: Emerald Minimal */}
        <section data-testid="emerald-theme" className="flex flex-col items-center">
          <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Soft Emerald Light
          </h2>
          <Calendar
            classNames={{
              root: 'bg-white p-6 rounded-3xl shadow-xl shadow-slate-900/20 text-slate-800 border border-slate-100',
              header: 'flex items-center justify-between mb-6',
              monthYearLabel: 'flex gap-2 items-center font-bold text-slate-900 text-lg',
              monthYearButton: 'hover:bg-slate-100 px-3 py-1.5 rounded-xl transition-colors',
              weekday: 'text-slate-400 font-medium text-xs uppercase tracking-tighter',
              day: {
                day: 'rounded-2xl transition-all duration-200 font-medium text-slate-700',
                unselected: 'hover:bg-emerald-50 hover:text-emerald-700',
                selected: 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105 z-10',
                today: 'text-emerald-600 font-bold underline decoration-2 underline-offset-4',
                outside: 'text-slate-300',
              },
              navButton: 'p-2.5 hover:bg-slate-100 rounded-2xl text-slate-500 transition-all hover:text-slate-900 hover:scale-105'
            }}
          />
        </section>
      </div>
    </div>
  );
}
