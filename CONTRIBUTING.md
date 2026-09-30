# Contributing to react-modular-datepicker

Thank you for your interest in contributing to `react-modular-datepicker`! We welcome contributions from developers of all skill levels. Whether you are fixing a bug, adding a feature, improving documentation, or refining accessibility, this guide will help you get started.

---

## 🏛️ Project Architecture

`react-modular-datepicker` is structured as a **pnpm workspace** monorepo containing two main packages:

```
packages/
├── react-modular-datepicker/  # The core library package
│   ├── src/
│   │   ├── adapters/          # Pluggable date adapter interface & implementations (e.g. DayjsAdapter)
│   │   ├── components/        # UI components (Calendar, CalendarHeader, Day, MonthSelection, YearSelection)
│   │   ├── classNames.ts      # Class name customization interfaces
│   │   ├── i18n.ts            # Localized translations & helpers
│   │   ├── types.ts           # Core TypeScript types (DateAdapter, DateObj, SelectionMode, Calendar)
│   │   ├── useDates.tsx       # Headless calendar logic React hook
│   │   └── utils.ts           # Core calendar grid, bounds, and date helper functions
│   └── tests/                 # Unit & integration test suite (Vitest + jsdom)
└── docs/                      # Documentation site (Next.js + Fumadocs + MDX)
```

### Core Design Principles

1. **Headless & UI Component Dual Support**:
   - `useDates`: A headless React hook that computes calendar grids, handles date selection (single, range, multiple), hover states, and navigation prop-getters (`getDateProps`, `getBackProps`, `getForwardProps`).
   - `<Calendar />`: A complete, styled component built on top of `useDates` with view switching (days, months, years), keyboard navigation, and animations.

2. **Pluggable Date Adapters**:
   - All date manipulations are abstracted through the `DateAdapter<T>` interface (`src/types.ts`).
   - Default adapter uses `dayjs` (`DayjsAdapter`), but consumers can supply adapters for other date libraries (`date-fns`, Luxon, or custom adapters) without changing core logic.

3. **Tailwind CSS & Semantic Styling**:
   - All components use semantic class names prefixed with `rmd-` (e.g., `.rmd-root`, `.rmd-day`, `.rmd-header`).
   - Styles are customizable via CSS variable overrides (`--color-brand-*`), custom CSS, or the `classNames` prop override system (`CalendarClassNames`).

4. **Accessibility (WAI-ARIA APG)**:
   - Calendar grid elements follow WAI-ARIA APG pattern guidelines (`role="grid"`, `role="row"`, `role="columnheader"`, `role="gridcell"`).
   - Roving `tabindex` and arrow key keyboard navigation allow full keyboard usage.
   - Screen reader announcements use `aria-live="polite"` regions.

---

## 🛠️ Local Development Setup

### Prerequisites

- **Node.js**: `v18+`
- **Package Manager**: `pnpm` (`v9+` or `v10+`)

### Installation

Clone the repository and install workspace dependencies:

```bash
git clone https://github.com/your-username/react-modular-datepicker.git
cd react-modular-datepicker
pnpm install
```

### Build Commands

Build the core library package:

```bash
pnpm build:rmd
```

### Running Tests

Run unit and integration test suites:

```bash
pnpm test
```

*Note: Tests run against the built library artifact (`dist/`), so be sure to run `pnpm build:rmd` before running tests when making code changes.*

### Development Server

Start the interactive local development workspace or documentation server:

```bash
pnpm dev
```

---

## 📐 Code Style & Conventions

1. **TypeScript Strictness**:
   - Do **not** use the `any` type anywhere in the codebase.
   - All functions, interfaces, and component props must have explicit TypeScript types.

2. **Documentation & Comments**:
   - Exported types, hooks, utility functions, and components should include TSDoc/JSDoc comments.
   - Complex calendar calculations (such as date range highlights, keyboard navigation, or layout math) should include concise inline comments explaining the intent.

3. **Class Names & CSS**:
   - Maintain the `rmd-` class name prefix for library styles.
   - Ensure custom style customization via `classNames` prop functions predictably without CSS specificity collisions.

4. **Testing Standards**:
   - Add unit or integration tests in `packages/react-modular-datepicker/tests/` for new features or bug fixes.
   - Ensure snapshot tests and interactive integration tests pass cleanly.

---

## 🚀 Submitting a Pull Request

1. **Create a Topic Branch**:
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. **Make & Verify Your Changes**:
   - Modify or add code in `packages/react-modular-datepicker/src/`.
   - Run build and test suite:
     ```bash
     pnpm build:rmd
     pnpm test
     ```

3. **Commit & Push**:
   - Write clear, concise commit messages.
   - Push your branch to GitHub and open a Pull Request describing your changes.

Thank you for helping make `react-modular-datepicker` better!
