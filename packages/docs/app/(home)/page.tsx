'use client';

import {
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  Code2,
  Copy,
  Cpu,
  Globe,
  Layers,
  Palette,
  Sparkles,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Calendar } from 'react-modular-datepicker';

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [copied, setCopied] = useState(false);

  const installCommand = 'pnpm add react-modular-datepicker';

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Passive Ambient Glows & Grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/15 dark:bg-[#C5A059]/20 rounded-full blur-[120px] pointer-events-none animate-orb-1" />
      <div className="absolute top-1/3 right-5 w-[450px] h-[450px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none animate-orb-2" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <main className="relative z-10 flex flex-col items-center justify-center flex-1 py-16 px-4 max-w-6xl mx-auto">
        {/* Version & Brand Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-fd-secondary/80 border border-fd-border text-fd-secondary-foreground mb-8 shadow-xs backdrop-blur-md">
          {/* Brand SVG Icon */}
          <svg
            className="w-4 h-4 text-[#C5A059]"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="25" y="25" width="150" height="150" rx="30" stroke="currentColor" strokeWidth="12" />
            <line x1="25" y1="68" x2="175" y2="68" stroke="currentColor" strokeWidth="8" opacity="0.85" />
            <rect x="48" y="86" width="28" height="28" rx="8" fill="currentColor" opacity="0.3" />
            <rect x="86" y="86" width="28" height="28" rx="8" fill="currentColor" opacity="0.3" />
            <rect x="124" y="86" width="28" height="28" rx="8" fill="currentColor" opacity="0.3" />
            <rect x="48" y="124" width="28" height="28" rx="8" fill="currentColor" opacity="0.3" />
            <rect x="86" y="124" width="28" height="28" rx="8" fill="currentColor" />
            <rect x="124" y="124" width="28" height="28" rx="8" fill="currentColor" />
          </svg>
          <span className="text-fd-foreground font-mono">react-modular-datepicker v0.0.5</span>
          <span className="px-1.5 py-0.5 rounded-full bg-[#C5A059]/20 text-[#C5A059] text-[10px] font-bold">
            Tailwind v4
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-center text-fd-foreground max-w-4xl leading-[1.15]">
          Modular, Lightweight &amp; Type-Safe{' '}
          <span className="bg-gradient-to-r from-[#C5A059] via-[#D8B775] to-amber-500 bg-clip-text text-transparent">
            Datepicker
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg md:text-xl text-fd-muted-foreground mb-10 max-w-2xl text-center leading-relaxed">
          Build date range pickers, single selection calendars, or headless custom layouts for React. Powered by Tailwind CSS and pluggable date adapters.
        </p>

        {/* Actions & Install Box */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full justify-center">
          <Link
            href="/docs/"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold bg-fd-primary text-fd-primary-foreground hover:opacity-90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group text-sm"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/docs/recipes/basic"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent transition-all border border-fd-border text-sm flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>Explore Examples</span>
          </Link>

          {/* Quick Copy Command */}
          <div className="w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-fd-card border border-fd-border font-mono text-xs text-fd-foreground shadow-xs">
            <span className="text-fd-muted-foreground">$</span>
            <span>{installCommand}</span>
            <button
              type="button"
              onClick={handleCopy}
              title="Copy to clipboard"
              className="ml-2 p-1.5 rounded-md hover:bg-fd-accent text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Live Interactive Datepicker Hero Card */}
        <div className="w-full max-w-4xl mb-20">
          <div className="relative rounded-2xl border border-fd-border bg-fd-card p-6 md:p-8 shadow-2xl backdrop-blur-xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
              {/* Left Column: Interactive Component */}
              <div className="flex flex-col items-center justify-center w-full md:w-auto">
                <div className="p-2 rounded-xl bg-fd-background border border-fd-border shadow-sm">
                  <Calendar
                    selected={selectedDate || undefined}
                    onChange={(d) => setSelectedDate(d as Date)}
                  />
                </div>
                {selectedDate && (
                  <div className="mt-3 text-xs font-medium text-fd-muted-foreground bg-fd-secondary px-3 py-1 rounded-full border border-fd-border">
                    Selected: <span className="font-bold text-fd-foreground">{selectedDate.toDateString()}</span>
                  </div>
                )}
              </div>

              {/* Right Column: Key Value Highlights */}
              <div className="flex flex-col justify-center space-y-4 max-w-md w-full">
                <div className="flex items-start gap-3 p-3.5 rounded-xl border border-fd-border/60 bg-fd-background/50">
                  <div className="p-2 rounded-lg bg-[#C5A059]/10 text-[#C5A059] shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-fd-foreground">Headless or Ready-to-Use UI</h4>
                    <p className="text-xs text-fd-muted-foreground leading-normal mt-0.5">
                      Use <code className="bg-fd-muted px-1 py-0.5 rounded text-[11px]">Calendar</code> for an instant styled datepicker or <code className="bg-fd-muted px-1 py-0.5 rounded text-[11px]">useDates</code> for 100% layout control.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl border border-fd-border/60 bg-fd-background/50">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-fd-foreground">Tailwind CSS v4 Native</h4>
                    <p className="text-xs text-fd-muted-foreground leading-normal mt-0.5">
                      Centralized class names design with clean deep-merge support for seamless theme customization.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl border border-fd-border/60 bg-fd-background/50">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-fd-foreground">Pluggable Date Adapters</h4>
                    <p className="text-xs text-fd-muted-foreground leading-normal mt-0.5">
                      Optional Day.js peer dependency. Easily swap adapters for date-fns, Luxon, or native JS Date.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="w-full mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-fd-foreground mb-3">
              Designed for Speed, Flexibility &amp; Customization
            </h2>
            <p className="text-sm md:text-base text-fd-muted-foreground max-w-xl mx-auto">
              Everything you need to build date pickers, schedule grids, or availability calendars for modern React apps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="p-6 rounded-2xl border border-fd-border bg-fd-card shadow-xs hover:border-[#C5A059]/40 transition-colors">
              <div className="p-2.5 w-fit rounded-xl bg-fd-secondary text-[#C5A059] mb-4">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-fd-card-foreground">Headless Hook</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">
                The <code className="text-xs bg-fd-muted px-1.5 py-0.5 rounded">useDates</code> hook gives you accessible date math, cell generators, and navigation props without forcing any DOM structure.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-fd-border bg-fd-card shadow-xs hover:border-[#C5A059]/40 transition-colors">
              <div className="p-2.5 w-fit rounded-xl bg-fd-secondary text-indigo-500 mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-fd-card-foreground">Zero Dependency Bloat</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">
                Lightweight (~12kB bundle size) compiled for maximum tree-shaking efficiency and fast rendering.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-fd-border bg-fd-card shadow-xs hover:border-[#C5A059]/40 transition-colors">
              <div className="p-2.5 w-fit rounded-xl bg-fd-secondary text-emerald-500 mb-4">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-fd-card-foreground">Range &amp; Multi-Month</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">
                Supports single date, date range pickers, multiple dates, custom bounds, and multi-month grid displays effortlessly.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-fd-border bg-fd-card shadow-xs hover:border-[#C5A059]/40 transition-colors">
              <div className="p-2.5 w-fit rounded-xl bg-fd-secondary text-pink-500 mb-4">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-fd-card-foreground">Custom Modifiers</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">
                Attach custom functions to highlight holidays, weekends, or booked dates with tooltips and custom CSS states.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-fd-border bg-fd-card shadow-xs hover:border-[#C5A059]/40 transition-colors">
              <div className="p-2.5 w-fit rounded-xl bg-fd-secondary text-amber-500 mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-fd-card-foreground">RTL &amp; Localization</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">
                Built-in Right-to-Left (RTL) support and translations props for seamless internationalization across languages.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-fd-border bg-fd-card shadow-xs hover:border-[#C5A059]/40 transition-colors">
              <div className="p-2.5 w-fit rounded-xl bg-fd-secondary text-blue-500 mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-fd-card-foreground">TypeScript First</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">
                Written natively in TypeScript with comprehensive type definitions for options, adapter interfaces, and class names.
              </p>
            </div>
          </div>
        </div>

        {/* Code Showcase Section */}
        <div className="w-full max-w-3xl mb-12">
          <div className="rounded-2xl border border-fd-border bg-fd-card overflow-hidden shadow-lg">
            <div className="flex items-center justify-between px-5 py-3 border-b border-fd-border bg-fd-muted/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-fd-muted-foreground ml-2">QuickStart.tsx</span>
              </div>
            </div>
            <pre className="p-6 text-xs sm:text-sm font-mono text-fd-foreground overflow-x-auto leading-relaxed bg-fd-card">
              <code>{`import { useState } from 'react';
import { Calendar } from 'react-modular-datepicker';
import 'react-modular-datepicker/dist/index.css';

export function DatePickerExample() {
  const [selected, setSelected] = useState<Date | null>(new Date());

  return (
    <Calendar
      selected={selected || undefined}
      onChange={(date) => setSelected(date as Date)}
    />
  );
}`}</code>
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}
