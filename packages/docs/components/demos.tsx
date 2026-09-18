'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar,
  useDates,
  DateAdapter
} from 'react-modular-datepicker';
import {
  addDays, addMonths, addYears,
  subDays, subMonths, subYears,
  startOfDay, startOfMonth, startOfYear,
  endOfDay, endOfMonth, endOfYear,
  setDate, setMonth, setYear,
  getDate, getMonth, getYear,
  format, getDaysInMonth,
  differenceInCalendarMonths, differenceInCalendarYears
} from 'date-fns';

export function DemoContainer({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="my-6 rounded-xl border border-fd-border bg-fd-card p-6 shadow-sm">
      {title && <div className="text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground mb-4">{title}</div>}
      <div className="flex flex-col items-center justify-center min-h-90">{children}</div>
    </div>
  );
}

export function BasicDemo() {
  const [selected, setSelected] = useState<Date | null>(new Date());
  return (
    <DemoContainer title="Live Preview: Single Date Selection">
      <Calendar selected={selected || undefined} onChange={(d) => setSelected(d as Date)} />
      {selected && (
        <div className="mt-4 text-sm text-fd-muted-foreground">
          Selected: <span className="font-semibold text-fd-foreground">{selected.toDateString()}</span>
        </div>
      )}
    </DemoContainer>
  );
}

export function RangeDemo() {
  const [range, setRange] = useState<{ start?: Date; end?: Date }>({});
  return (
    <DemoContainer title="Live Preview: Date Range Selection">
      <Calendar
        selectionMode="range"
        monthsToDisplay={2}
        selected={range}
        onChange={(r) => setRange(r as { start?: Date; end?: Date })}
      />
      <div className="mt-4 text-sm text-fd-muted-foreground">
        Range: <span className="font-semibold text-fd-foreground">
          {range.start ? range.start.toLocaleDateString() : 'Start'} – {range.end ? range.end.toLocaleDateString() : 'End'}
        </span>
      </div>
    </DemoContainer>
  );
}

export function MultipleDemo() {
  const [dates, setDates] = useState<Date[]>([]);
  return (
    <DemoContainer title="Live Preview: Multiple Date Selection">
      <Calendar
        selectionMode="multiple"
        selected={dates}
        onChange={(d) => setDates(d as Date[])}
      />
      <div className="mt-4 text-sm text-fd-muted-foreground text-center">
        Selected ({dates.length} dates):
        <div className="flex flex-wrap gap-1 justify-center mt-2 max-w-md">
          {dates.map((d, i) => (
            <span key={i} className="px-2 py-0.5 rounded bg-fd-secondary text-xs font-mono">
              {d.toLocaleDateString()}
            </span>
          ))}
        </div>
      </div>
    </DemoContainer>
  );
}

export function HeadlessDemo() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { calendars, getBackProps, getForwardProps, getDateProps } = useDates({
    selected: selectedDate,
    onChange: (d) => setSelectedDate(d as Date),
  });

  const calendar = calendars[0];
  if (!calendar) return null;

  return (
    <DemoContainer title="Live Preview: Headless Custom Layout">
      <div className="w-full max-w-md bg-fd-background rounded-xl border border-fd-border p-4 shadow">
        <div className="flex items-center justify-between mb-4">
          <button {...getBackProps({ calendars })} className="p-2 rounded hover:bg-fd-accent text-sm font-bold">
            ← Prev
          </button>
          <span className="font-bold">
            {new Date(calendar.year, calendar.month).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button {...getForwardProps({ calendars })} className="p-2 rounded hover:bg-fd-accent text-sm font-bold">
            Next →
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-fd-muted-foreground mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendar.weeks.flat().map((dateObj, idx) => {
            if (!dateObj) return <div key={idx} />;
            return (
              <button
                key={idx}
                {...getDateProps({ dateObj })}
                className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${dateObj.selected
                    ? 'bg-blue-600 text-white font-bold'
                    : dateObj.today
                      ? 'border border-blue-500 text-blue-600'
                      : 'hover:bg-fd-accent'
                  }`}
              >
                {dateObj.date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    </DemoContainer>
  );
}

export function CustomStylingDemo() {
  return (
    <DemoContainer title="Live Preview: Custom Styling (Amber Theme)">
      <Calendar
        classNames={{
          root: 'bg-amber-500/10 p-6 rounded-2xl border border-amber-500/30 shadow-lg text-amber-900 dark:text-amber-100',
          monthYearLabel: 'font-serif text-amber-900 dark:text-amber-100 text-lg font-bold',
          day: {
            unselected: 'bg-white/80 dark:bg-amber-950/40 border border-amber-200 hover:bg-amber-200/50 text-amber-900 dark:text-amber-100',
            selected: 'bg-amber-800 text-amber-50 font-bold',
          }
        }}
      />
    </DemoContainer>
  );
}

export function LocalizationDemo() {
  const [lang, setLang] = useState<'es' | 'fr' | 'de'>('es');
  const translationsMap = {
    es: {
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    },
    fr: {
      months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    },
    de: {
      months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      weekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    },
  };

  return (
    <DemoContainer title="Live Preview: Localization & Translations">
      <div className="flex gap-2 mb-4">
        {(['es', 'fr', 'de'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 text-xs rounded font-medium transition-colors ${lang === l ? 'bg-fd-primary text-fd-primary-foreground' : 'bg-fd-secondary text-fd-secondary-foreground'
              }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      <Calendar
        firstDayOfWeek={1}
        translations={translationsMap[lang]}
      />
    </DemoContainer>
  );
}

export function FormIntegrationDemo() {
  const [date, setDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DemoContainer title="Live Preview: Popover / Form Integration">
      <div ref={containerRef} className="relative inline-block text-left">
        <label className="block text-xs font-semibold mb-1 text-fd-muted-foreground">Select Travel Date</label>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={date ? date.toLocaleDateString() : ''}
            placeholder="Pick a date..."
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-2 rounded-lg border border-fd-border bg-fd-background text-sm cursor-pointer min-w-[200px]"
          />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-fd-primary text-fd-primary-foreground text-sm font-medium rounded-lg"
          >
            📅 Calendar
          </button>
        </div>
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 z-50 bg-fd-background border border-fd-border rounded-xl shadow-2xl p-2">
            <Calendar
              date={date || undefined}
              selected={date || undefined}
              onChange={(d) => {
                setDate(d as Date);
                setIsOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </DemoContainer>
  );
}

export function HeaderFooterDemo() {
  const [selected, setSelected] = useState<Date | null>(new Date());
  return (
    <DemoContainer title="Live Preview: Custom Header & Footer">
      <Calendar
        selected={selected || undefined}
        onChange={(val) => setSelected(val as Date)}
        header={<div className="p-2 bg-blue-500/20 text-blue-700 dark:text-blue-300 font-bold text-center rounded-t-lg">🌟 Custom Header Banner</div>}
        footer={<div className="p-2 bg-fd-muted text-fd-muted-foreground text-xs text-center rounded-b-lg border-t border-fd-border">Custom Footer: Select any date</div>}
        renderDayTooltip={(dateObj) => (dateObj.date.getDate() === 15 ? 'Middle of the month!' : null)}
      />
    </DemoContainer>
  );
}

export function MinMaxDisabledDemo() {
  const [selected, setSelected] = useState<Date | null>(new Date());
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), 5);
  const maxDate = new Date(today.getFullYear(), today.getMonth(), 25);
  const disabledDates = [
    new Date(today.getFullYear(), today.getMonth(), 10),
    new Date(today.getFullYear(), today.getMonth(), 12),
    new Date(today.getFullYear(), today.getMonth(), 18),
  ];

  return (
    <DemoContainer title="Live Preview: Bounds & Disabled Dates">
      <Calendar
        selected={selected || undefined}
        onChange={(d) => setSelected(d as Date)}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
      />
      <div className="mt-4 text-xs text-fd-muted-foreground text-center">
        Allowed: {minDate.getDate()}th – {maxDate.getDate()}th (10th, 12th, 18th disabled)
      </div>
    </DemoContainer>
  );
}

export function YearlyDemo() {
  return (
    <DemoContainer title="Live Preview: Multi-Month Grid">
      <Calendar
        monthsToDisplay={3}
        classNames={{
          calendarsContainer: 'grid grid-cols-1 md:grid-cols-3 gap-4'
        }}
      />
    </DemoContainer>
  );
}

class DateFnsAdapter implements DateAdapter<Date> {
  date(value?: any): Date { return value ? new Date(value) : new Date(); }
  add(date: Date, amount: number, unit: 'day' | 'month' | 'year'): Date {
    if (unit === 'day') return addDays(date, amount);
    if (unit === 'month') return addMonths(date, amount);
    return addYears(date, amount);
  }
  subtract(date: Date, amount: number, unit: 'day' | 'month' | 'year'): Date {
    if (unit === 'day') return subDays(date, amount);
    if (unit === 'month') return subMonths(date, amount);
    return subYears(date, amount);
  }
  startOf(date: Date, unit: 'day' | 'month' | 'year'): Date {
    if (unit === 'day') return startOfDay(date);
    if (unit === 'month') return startOfMonth(date);
    return startOfYear(date);
  }
  endOf(date: Date, unit: 'day' | 'month' | 'year'): Date {
    if (unit === 'day') return endOfDay(date);
    if (unit === 'month') return endOfMonth(date);
    return endOfYear(date);
  }
  isBefore(date: Date, comparison: Date, unit?: 'day' | 'month' | 'year'): boolean {
    if (unit === 'day') return startOfDay(date) < startOfDay(comparison);
    if (unit === 'month') return startOfMonth(date) < startOfMonth(comparison);
    if (unit === 'year') return startOfYear(date) < startOfYear(comparison);
    return date < comparison;
  }
  isAfter(date: Date, comparison: Date, unit?: 'day' | 'month' | 'year'): boolean {
    if (unit === 'day') return startOfDay(date) > startOfDay(comparison);
    if (unit === 'month') return startOfMonth(date) > startOfMonth(comparison);
    if (unit === 'year') return startOfYear(date) > startOfYear(comparison);
    return date > comparison;
  }
  isSame(date: Date, comparison: Date, unit?: 'day' | 'month' | 'year'): boolean {
    if (unit === 'day') return startOfDay(date).getTime() === startOfDay(comparison).getTime();
    if (unit === 'month') return startOfMonth(date).getTime() === startOfMonth(comparison).getTime();
    if (unit === 'year') return startOfYear(date).getTime() === startOfYear(comparison).getTime();
    return date.getTime() === comparison.getTime();
  }
  set(date: Date, unit: 'day' | 'month' | 'year', value: number): Date {
    if (unit === 'day') return setDate(date, value);
    if (unit === 'month') return setMonth(date, value);
    return setYear(date, value);
  }
  get(date: Date, unit: 'day' | 'month' | 'year'): number {
    if (unit === 'day') return getDate(date);
    if (unit === 'month') return getMonth(date);
    return getYear(date);
  }
  format(date: Date, formatStr: string): string {
    const f = formatStr.replace(/YYYY/g, 'yyyy').replace(/YY/g, 'yy').replace(/D/g, 'd');
    return format(date, f);
  }
  getDaysInMonth(date: Date): number { return getDaysInMonth(date); }
  toDate(date: Date): Date { return date; }
  diff(date: Date, comparison: Date, unit: 'month' | 'year'): number {
    if (unit === 'month') return differenceInCalendarMonths(date, comparison);
    return differenceInCalendarYears(date, comparison);
  }
  getMonths(): string[] {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }
  getWeekdays(): string[] {
    return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  }
}

const customDateFnsAdapter = new DateFnsAdapter();

export function CustomAdapterDemo() {
  const [selected, setSelected] = useState<Date | null>(new Date());
  return (
    <DemoContainer title="Live Preview: Custom date-fns Adapter">
      <Calendar adapter={customDateFnsAdapter} selected={selected || undefined} onChange={(d) => setSelected(d as Date)} />
      <div className="mt-4 text-xs text-fd-muted-foreground">
        Powered by date-fns adapter without dayjs peer dependency!
      </div>
    </DemoContainer>
  );
}
