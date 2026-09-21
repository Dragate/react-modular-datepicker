import Link from 'next/link';
import {
  Calendar as CalendarIcon,
  Sparkles,
  Layers,
  Cpu,
  Palette,
  CheckCircle2,
  ArrowRight,
  Zap,
  Globe2,
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] mb-8 shadow-sm hover:bg-[#c5a059]/20 transition-all duration-300 cursor-default">
          <Sparkles className="w-4 h-4 text-[#c5a059]" />
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
          Engineered with Tailwind CSS and pluggable date adapters.
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
            <CalendarIcon className="w-4 h-4 text-[#c5a059]" />
            <span>Explore Recipes</span>
          </Link>

          <a
            href="https://github.com/Dragate/react-modular-datepicker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent/50 transition-colors"
          >
            <Globe2 className="w-5 h-5 text-[#c5a059]" />
            <span>GitHub Repository</span>
          </a>
        </div>

        {/* Interactive Calendar Showcase Card */}
        <div className="w-full max-w-4xl mb-20 p-6 md:p-8 rounded-2xl border border-fd-border/80 bg-fd-card/60 backdrop-blur-xl shadow-2xl relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-15 group-hover:opacity-30 transition-opacity">
            <Sparkles className="w-24 h-24 text-[#c5a059]" />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium bg-[#c5a059]/10 text-[#c5a059]">
                <Code2 className="w-3.5 h-3.5" />
                <span>Live Interactive Preview</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-fd-card-foreground">
                Ready out of the box, fully customizable inside.
              </h2>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">
                Experience full keyboard navigation, accessible WAI-ARIA grid semantics, and seamless theme overriding via CSS variables and Tailwind classes.
              </p>

              <ul className="grid grid-cols-2 gap-2 text-xs font-medium text-fd-muted-foreground pt-2">
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

            <div className="flex justify-center p-2 rounded-xl bg-fd-background/80 border border-fd-border/50 shadow-inner">
              <BasicDemo />
            </div>
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
            <h3 className="font-bold text-lg mb-2 text-fd-card-foreground">Tailwind Styled</h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed">
              Centralized CSS tokens (<code className="text-xs bg-fd-muted px-1.5 py-0.5 rounded text-[#c5a059] font-mono">--color-brand-*</code>) and semantic class names (<code className="text-xs bg-fd-muted px-1.5 py-0.5 rounded text-[#c5a059] font-mono">rmd-*</code>) for effortless custom styling.
            </p>
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="mt-12 w-full p-6 rounded-2xl border border-[#c5a059]/20 bg-gradient-to-r from-[#c5a059]/10 via-transparent to-[#c5a059]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#c5a059]/20 text-[#c5a059]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-fd-foreground text-sm">Need multi-month or year navigation?</h4>
              <p className="text-xs text-fd-muted-foreground">Display up to 12 months side by side with responsive multi-month wrapping and grid animations.</p>
            </div>
          </div>
          <Link
            href="/docs/recipes/yearly"
            className="whitespace-nowrap px-4 py-2 rounded-lg text-xs font-semibold bg-fd-secondary hover:bg-fd-accent text-fd-secondary-foreground transition-colors border border-fd-border flex items-center gap-1.5"
          >
            <span>View Yearly Recipe</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>
    </div>
  );
}
