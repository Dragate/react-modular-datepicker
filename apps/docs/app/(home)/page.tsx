import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 py-16 px-4 text-center max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-fd-secondary text-fd-secondary-foreground mb-6">
        <span>📅</span> react-modular-datepicker v0.0.5
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-fd-foreground">
        Modular, Lightweight & Type-Safe Datepicker
      </h1>

      <p className="text-lg md:text-xl text-fd-muted-foreground mb-8 max-w-2xl leading-relaxed">
        Build date range pickers, single selection calendars, or headless custom layouts for React. Powered by Tailwind CSS and pluggable date adapters.
      </p>

      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <Link
          href="/docs"
          className="px-6 py-3 rounded-lg font-medium bg-fd-primary text-fd-primary-foreground hover:opacity-90 transition-opacity"
        >
          Get Started
        </Link>
        <Link
          href="/docs/recipes/basic"
          className="px-6 py-3 rounded-lg font-medium bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent transition-colors"
        >
          Explore Interactive Examples
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full mt-8">
        <div className="p-6 rounded-xl border border-fd-border bg-fd-card">
          <div className="text-2xl mb-2">🏗️</div>
          <h3 className="font-bold text-lg mb-2 text-fd-card-foreground">Headless & Modular</h3>
          <p className="text-sm text-fd-muted-foreground">
            Use the <code className="text-xs bg-fd-muted px-1.5 py-0.5 rounded">useDates</code> hook for full layout control, or <code className="text-xs bg-fd-muted px-1.5 py-0.5 rounded">Calendar</code> for ready-to-use UI.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-fd-border bg-fd-card">
          <div className="text-2xl mb-2">🪶</div>
          <h3 className="font-bold text-lg mb-2 text-fd-card-foreground">Pluggable Adapters</h3>
          <p className="text-sm text-fd-muted-foreground">
            Optional peer dependency on Day.js. Easily drop in custom adapters for date-fns, Luxon, or native JS Date.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-fd-border bg-fd-card">
          <div className="text-2xl mb-2">🎨</div>
          <h3 className="font-bold text-lg mb-2 text-fd-card-foreground">Fully Customizable</h3>
          <p className="text-sm text-fd-muted-foreground">
            Styled with Tailwind CSS. Deeply customize states, headers, footers, tooltips, and range highlights.
          </p>
        </div>
      </div>
    </main>
  );
}
