# react-modular-datepicker

A modular, lightweight, and type-safe React datepicker library. Whether you need a fully-featured calendar component or a headless hook to build your own UI, `react-modular-datepicker` has you covered.

<p align="center">
  <img src="./packages/docs/docs/images/hero-calendar.png" alt="react-modular-datepicker preview" width="320" />
</p>

## Features

- 🏗️ **Headless & Modular**: Use the `useDates` hook for complete control over your UI, or the `Calendar` component for a ready-to-use setup.
- 🪶 **Lightweight**: Small footprint with a pluggable adapter system (defaults to Day.js).
- 🛡️ **Type-safe**: Written in TypeScript for a great developer experience.
- 🎨 **Fully Customizable**: Style everything via Tailwind CSS or custom class names.
- 🌍 **Localized**: Easy internationalization support with `dayjs` or custom adapters.
- ⚡ **Feature-rich**: Single, multiple, and range selection modes, min/max dates, disabled dates, and more.

---

## Installation

```bash
npm install react-modular-datepicker dayjs
# or
pnpm add react-modular-datepicker dayjs
# or
yarn add react-modular-datepicker dayjs
```

> **Note**: `dayjs` is an optional peer dependency used as the default date adapter. You can also implement a custom `DateAdapter` (e.g., using `date-fns` or Luxon).

---

## Quick Start

### `Calendar` Component

```tsx
import { Calendar } from 'react-modular-datepicker';
import 'react-modular-datepicker/dist/index.css';

export function App() {
  return <Calendar onChange={(date) => console.log(date)} />;
}
```

### `useDates` Hook (Headless)

```tsx
import { useDates } from 'react-modular-datepicker';

export function CustomCalendar() {
  const { calendars, getDateProps, getBackProps, getForwardProps } = useDates({
    selectionMode: 'single',
  });

  const calendar = calendars[0];
  if (!calendar) return null;

  return (
    <div>
      <div className="flex justify-between">
        <button {...getBackProps({ calendars })}>Prev</button>
        <span>{calendar.year} - {calendar.month + 1}</span>
        <button {...getForwardProps({ calendars })}>Next</button>
      </div>
      <div className="grid grid-cols-7">
        {calendar.weeks.flat().map((dateObj, i) => (
          dateObj ? (
            <button key={i} {...getDateProps({ dateObj })}>
              {dateObj.date.getDate()}
            </button>
          ) : <div key={i} />
        ))}
      </div>
    </div>
  );
}
```

---

## Documentation & Recipes

For full API reference, recipes, and interactive demos, check out the documentation package in `packages/docs`.

To run the documentation site locally:
```bash
pnpm run dev
```

---

## Development

### Installation

```bash
pnpm install
```

### Development Server

Start watching for library changes and run the documentation app:
```bash
pnpm run dev
```

### Testing

Run unit and end-to-end tests:
```bash
pnpm run test
```

### Building

Build the package and documentation:
```bash
pnpm run build
```

---

## License

MIT
