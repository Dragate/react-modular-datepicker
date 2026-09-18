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

export function GoogleCalendarDemo() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const eventsData: Record<string, { title: string; time: string; color: string }[]> = {
    [`${year}-${month + 1}-5`]: [
      { title: 'Team Standup', time: '9am', color: 'bg-blue-500 text-white' },
      { title: 'Project Review', time: '2pm', color: 'bg-emerald-500 text-white' },
    ],
    [`${year}-${month + 1}-12`]: [
      { title: 'Webinar Live', time: '11am', color: 'bg-purple-500 text-white' },
    ],
    [`${year}-${month + 1}-18`]: [
      { title: 'Release v2.0', time: '5pm', color: 'bg-rose-500 text-white' },
    ],
    [`${year}-${month + 1}-25`]: [
      { title: 'Design Review', time: '10am', color: 'bg-amber-500 text-white' },
      { title: 'Sprint Retro', time: '3pm', color: 'bg-blue-500 text-white' },
    ],
  };

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(year, month, 5));
  const { calendars, getBackProps, getForwardProps, getDateProps } = useDates({
    selected: selectedDate,
    onChange: (d) => setSelectedDate(d as Date),
  });

  const calendar = calendars[0];
  if (!calendar) return null;

  const getKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  return (
    <DemoContainer title="Live Preview: Google Calendar Style View">
      <div className="w-full max-w-2xl bg-fd-card rounded-xl border border-fd-border p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button {...getBackProps({ calendars })} className="p-1.5 rounded-lg border border-fd-border hover:bg-fd-accent text-xs font-semibold">
              ← Prev
            </button>
            <button {...getForwardProps({ calendars })} className="p-1.5 rounded-lg border border-fd-border hover:bg-fd-accent text-xs font-semibold">
              Next →
            </button>
          </div>
          <span className="font-bold text-base text-fd-foreground">
            {new Date(calendar.year, calendar.month).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <span className="text-xs font-medium text-fd-muted-foreground bg-fd-secondary px-2.5 py-1 rounded-full">
            Month View
          </span>
        </div>

        <div className="grid grid-cols-7 gap-px bg-fd-border rounded-lg overflow-hidden border border-fd-border">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="bg-fd-background p-2 text-center text-xs font-semibold text-fd-muted-foreground">
              {d}
            </div>
          ))}

          {calendar.weeks.flat().map((dateObj, idx) => {
            if (!dateObj) return <div key={idx} className="bg-fd-background min-h-[75px]" />;
            const key = getKey(dateObj.date);
            const events = eventsData[key] || [];

            return (
              <div
                key={idx}
                {...getDateProps({ dateObj })}
                className={`bg-fd-background min-h-[75px] p-1 flex flex-col justify-start transition-colors cursor-pointer hover:bg-fd-accent/40 ${
                  !dateObj.selectable ? 'opacity-40' : ''
                } ${dateObj.selected ? 'ring-2 ring-inset ring-brand-gold' : ''}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-medium px-1.5 py-0.5 rounded-full inline-block ${
                      dateObj.today ? 'bg-brand-gold text-white font-bold' : 'text-fd-foreground'
                    }`}
                  >
                    {dateObj.date.getDate()}
                  </span>
                </div>

                <div className="space-y-1 overflow-hidden">
                  {events.map((ev, i) => (
                    <div
                      key={i}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-medium truncate shadow-xs flex items-center gap-1 ${ev.color}`}
                      title={`${ev.time} ${ev.title}`}
                    >
                      <span className="opacity-80 font-mono text-[9px]">{ev.time}</span>
                      <span className="truncate">{ev.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DemoContainer>
  );
}

export function EventScheduleDemo() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const eventsData: Record<string, { title: string; time: string; type: 'meeting' | 'webinar' | 'deadline' }[]> = {
    [`${year}-${month + 1}-5`]: [
      { title: 'Team Sync & Standup', time: '09:00 AM', type: 'meeting' },
      { title: 'Project Kickoff', time: '02:00 PM', type: 'meeting' },
    ],
    [`${year}-${month + 1}-12`]: [
      { title: 'React Modular Datepicker Webinar', time: '11:00 AM', type: 'webinar' },
    ],
    [`${year}-${month + 1}-18`]: [
      { title: 'Q3 Product Release Deadline', time: '05:00 PM', type: 'deadline' },
    ],
    [`${year}-${month + 1}-25`]: [
      { title: 'Design System Workshop', time: '10:00 AM', type: 'meeting' },
      { title: 'Sprint Review', time: '03:30 PM', type: 'meeting' },
    ],
  };

  const [selectedDate, setSelectedDate] = useState<Date>(new Date(year, month, 5));

  const getKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  const currentKey = getKey(selectedDate);
  const dayEvents = eventsData[currentKey] || [];

  return (
    <DemoContainer title="Live Preview: Event / Schedule Calendar">
      <div className="flex flex-col md:flex-row gap-6 items-start w-full max-w-2xl justify-center">
        <Calendar
          selected={selectedDate}
          onChange={(d) => setSelectedDate(d as Date)}
          modifiers={{
            hasEvents: (date) => !!eventsData[getKey(date)],
          }}
          classNames={{
            day: {
              hasEvents: 'font-bold relative after:content-["•"] after:absolute after:bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:text-brand-gold after:text-xs',
            },
          }}
          renderDayTooltip={(dateObj) => {
            const key = getKey(dateObj.date);
            const events = eventsData[key];
            if (events && events.length > 0) {
              return `${events.length} event${events.length > 1 ? 's' : ''}`;
            }
            return null;
          }}
        />

        <div className="flex-1 w-full bg-fd-background border border-fd-border rounded-xl p-4 shadow-sm min-w-[260px]">
          <div className="border-b border-fd-border pb-2 mb-3">
            <h4 className="font-semibold text-sm text-fd-foreground">
              Schedule for {selectedDate.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' })}
            </h4>
          </div>

          {dayEvents.length === 0 ? (
            <p className="text-xs text-fd-muted-foreground italic py-4 text-center">
              No events scheduled for this date.
            </p>
          ) : (
            <div className="space-y-2.5">
              {dayEvents.map((event, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg border border-fd-border bg-fd-card flex items-start gap-3 text-xs"
                >
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      event.type === 'meeting'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        : event.type === 'webinar'
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                    }`}
                  >
                    {event.type}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium text-fd-foreground">{event.title}</div>
                    <div className="text-fd-muted-foreground text-[11px]">{event.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DemoContainer>
  );
}

export function AvailabilityDemo() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Define date states: fully booked or available with remaining slots
  const bookedDays = [
    new Date(year, month, 3),
    new Date(year, month, 4),
    new Date(year, month, 10),
    new Date(year, month, 17),
  ];

  const availableSlotsMap: Record<string, string[]> = {
    [`${year}-${month + 1}-8`]: ['09:00 AM', '10:30 AM', '02:00 PM'],
    [`${year}-${month + 1}-9`]: ['01:00 PM', '03:30 PM'],
    [`${year}-${month + 1}-15`]: ['09:00 AM', '11:00 AM', '01:30 PM', '04:00 PM'],
    [`${year}-${month + 1}-16`]: ['10:00 AM'],
    [`${year}-${month + 1}-22`]: ['09:30 AM', '11:30 AM', '02:30 PM'],
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(year, month, 8));
  const [selectedSlot, setSelectedSlot] = useState<string | null>('09:00 AM');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const getKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  const slots = selectedDate ? availableSlotsMap[getKey(selectedDate)] || [] : [];

  const handleBooking = () => {
    if (selectedDate && selectedSlot) {
      setBookedSuccess(true);
    }
  };

  return (
    <DemoContainer title="Live Preview: Availability & Booking Calendar">
      <div className="flex flex-col md:flex-row gap-6 items-start w-full max-w-2xl justify-center">
        <Calendar
          selected={selectedDate || undefined}
          onChange={(d) => {
            setSelectedDate(d as Date);
            setSelectedSlot(null);
            setBookedSuccess(false);
          }}
          disabledDates={bookedDays}
          modifiers={{
            available: (d) => !!availableSlotsMap[getKey(d)],
          }}
          classNames={{
            day: {
              disabled: 'bg-red-500/10 text-red-400 line-through cursor-not-allowed',
              available: 'font-semibold text-emerald-600 dark:text-emerald-400',
            },
          }}
        />

        <div className="flex-1 w-full bg-fd-background border border-fd-border rounded-xl p-4 shadow-sm min-w-[260px]">
          <div className="border-b border-fd-border pb-2 mb-3">
            <h4 className="font-semibold text-sm text-fd-foreground">
              {selectedDate
                ? `Available Times: ${selectedDate.toLocaleDateString('default', { month: 'short', day: 'numeric' })}`
                : 'Select a Date'}
            </h4>
          </div>

          {bookedSuccess ? (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-600 dark:text-emerald-400 text-xs text-center space-y-1">
              <div className="font-bold">✓ Appointment Confirmed!</div>
              <div>
                {selectedDate?.toLocaleDateString()} at {selectedSlot}
              </div>
            </div>
          ) : slots.length === 0 ? (
            <p className="text-xs text-fd-muted-foreground italic py-4 text-center">
              No available booking slots for this date.
            </p>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-3 text-xs rounded-lg font-medium border transition-colors ${
                      selectedSlot === slot
                        ? 'bg-fd-primary text-fd-primary-foreground border-fd-primary'
                        : 'bg-fd-card text-fd-foreground border-fd-border hover:bg-fd-accent'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={!selectedSlot}
                onClick={handleBooking}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow disabled:opacity-40 transition-colors"
              >
                Confirm Appointment
              </button>
            </div>
          )}
        </div>
      </div>
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
        monthsToDisplay={4}
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
