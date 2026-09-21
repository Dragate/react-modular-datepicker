import Link from 'next/link';
import Image from 'next/image';
import {
  Layers,
  Cpu,
  Palette,
  CheckCircle2,
  ArrowRight,
  Code2,
} from 'lucide-react';
import { BasicDemo } from '@/components/demos';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col items-center justify-between">
      {/* Passive animated background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="bg-orb-1 absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#c5a059]/15 blur-3xl opacity-70" />
        <div className="bg-orb-2 absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-[#c5a059]/10 blur-3xl opacity-60" />
        <div className="bg-orb-3 absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl opacity-50" />
      </div>

      <main className="w-full max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center text-center">
        {/* Version Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] mb-8 shadow-sm cursor-default">
          <Image src="/icon0.svg" alt="logo" width={18} height={18} className="w-4 h-4" />
          <span>react-modular-datepicker v0.0.8</span>
          <span className="bg-[#c5a059]/20 text-[#c5a059] px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
            Latest
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-fd-foreground max-w-4xl leading-[1.1]">
          Modular, Lightweight & <span className="text-[#c5a059]">Type-Safe</span> Datepicker
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-fd-muted-foreground mb-10 max-w-2xl leading-relaxed">
          Build date range pickers, single selection calendars, or headless custom layouts for React.
          Customizable styling, single/range modes, and pluggable date adapters.
        </p>

        {/* Call-to-action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <Link
            href="/docs/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold bg-[#c5a059] text-black hover:bg-[#c5a059]/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#c5a059]/25"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/docs/recipes/basic"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-fd-border"
          >
            <Code2 className="w-4 h-4 text-[#c5a059]" />
            <span>Explore Demos</span>
          </Link>
        </div>

        {/* Interactive Calendar Showcase Section (Two Columns, direct demo rendering) */}
        <div className="w-full max-w-5xl mb-20 flex flex-col md:flex-row items-center justify-between gap-12 text-left">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-[#c5a059]/10 text-[#c5a059]">
              <Code2 className="w-4 h-4" />
              <span>Interactive Live Demo</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-fd-foreground leading-tight">
              Ready out of the box, fully customizable inside.
            </h2>
            <p className="text-sm md:text-base text-fd-muted-foreground leading-relaxed">
              Full keyboard navigation, accessible WAI-ARIA grid semantics, and seamless theme overriding.
            </p>

            <ul className="grid grid-cols-2 gap-3 text-xs md:text-sm font-medium text-fd-muted-foreground pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
                <span>Single & Range mode</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
                <span>WAI-ARIA accessible</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
                <span>RTL Support</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
                <span>Day.js / Native adapters</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-center items-center">
            <BasicDemo />
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full">
          <div className="p-6 rounded-2xl border border-fd-border/70 bg-fd-card/50 backdrop-blur-sm hover:border-[#c5a059]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#c5a059]/5">
            <div className="p-3 rounded-xl bg-[#c5a059]/10 text-[#c5a059] w-fit mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-fd-card-foreground">Headless & Modular</h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed">
              Use the <code className="text-xs bg-fd-muted px-1.5 py-0.5 rounded text-[#c5a059] font-mono">useDates</code> hook for complete architectural control, or <code className="text-xs bg-fd-muted px-1.5 py-0.5 rounded text-[#c5a059] font-mono">Calendar</code> for ready-to-use UI.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-fd-border/70 bg-fd-card/50 backdrop-blur-sm hover:border-[#c5a059]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#c5a059]/5">
            <div className="p-3 rounded-xl bg-[#c5a059]/10 text-[#c5a059] w-fit mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-fd-card-foreground">Pluggable Adapters</h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed">
              Lightweight core footprint. Peer dependency on Day.js with simple interfaces to plug date-fns, Luxon, or native JS Date.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-fd-border/70 bg-fd-card/50 backdrop-blur-sm hover:border-[#c5a059]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#c5a059]/5">
            <div className="p-3 rounded-xl bg-[#c5a059]/10 text-[#c5a059] w-fit mb-4">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-fd-card-foreground">Customizable Styling</h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed">
              Style easily with custom CSS, Tailwind CSS, or CSS variables using semantic <code className="text-xs bg-fd-muted px-1.5 py-0.5 rounded text-[#c5a059] font-mono">rmd-*</code> class names.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
