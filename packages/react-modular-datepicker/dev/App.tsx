import { useState } from 'react';
import { Calendar } from '../src/components/Calendar';
import { useDates } from '../src/useDates';
import type { DateRange } from '../src/types';

export default function App() {
  const [mode, setMode] = useState<'single' | 'range' | 'multiple'>('single');
  const [selectedSingle, setSelectedSingle] = useState<Date | null>(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    start: new Date(),
    end: new Date(Date.now() + 5 * 86400000),
  });
  const [selectedMultiple, setSelectedMultiple] = useState<Date[]>([new Date()]);

  // Headless hook demonstration
  const { calendars, getBackProps, getForwardProps, getDayProps } = useDates({
    mode: 'single',
    selected: selectedSingle,
    onChange: (date) => setSelectedSingle(date as Date | null),
  });

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
          React Modular Datepicker Dev App
        </h1>
        <p style={{ color: '#4b5563', margin: 0 }}>
          Interactive playground for library development and testing.
        </p>
      </header>

      {/* Mode Switcher */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem' }}>
        {(['single', 'range', 'multiple'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: '1px solid #d1d5db',
              backgroundColor: mode === m ? '#111827' : '#ffffff',
              color: mode === m ? '#ffffff' : '#374151',
              cursor: 'pointer',
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          >
            {m} Mode
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Main Component View */}
        <section style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: 0, marginBottom: '1rem' }}>
            Calendar Component ({mode})
          </h2>

          {mode === 'single' && (
            <Calendar
              mode="single"
              selected={selectedSingle}
              onChange={(date) => setSelectedSingle(date)}
            />
          )}

          {mode === 'range' && (
            <Calendar
              mode="range"
              selected={selectedRange}
              onChange={(range) => setSelectedRange(range)}
            />
          )}

          {mode === 'multiple' && (
            <Calendar
              mode="multiple"
              selected={selectedMultiple}
              onChange={(dates) => setSelectedMultiple(dates)}
            />
          )}

          <div style={{ marginTop: '1.5rem', padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.375rem', fontSize: '0.875rem' }}>
            <strong>Selected Value:</strong>
            <pre style={{ margin: '0.5rem 0 0 0', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {mode === 'single' && (selectedSingle ? selectedSingle.toDateString() : 'null')}
              {mode === 'range' &&
                `Start: ${selectedRange.start?.toDateString() ?? 'none'} | End: ${selectedRange.end?.toDateString() ?? 'none'}`}
              {mode === 'multiple' &&
                (selectedMultiple.length > 0
                  ? selectedMultiple.map((d) => d.toDateString()).join(', ')
                  : 'None')}
            </pre>
          </div>
        </section>

        {/* Multi-Month Display */}
        <section style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: 0, marginBottom: '1rem' }}>
            Multi-Month Display (2 Months)
          </h2>
          <Calendar
            mode="range"
            monthsToDisplay={2}
            selected={selectedRange}
            onChange={(range) => setSelectedRange(range)}
          />
        </section>

        {/* Headless Hook Demonstration */}
        <section style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem', gridColumn: '1 / -1' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: 0, marginBottom: '1rem' }}>
            Headless Hook (useDates) Demonstration
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <button type="button" {...getBackProps()} style={{ padding: '0.25rem 0.75rem', cursor: 'pointer' }}>
              &larr; Prev
            </button>
            <span style={{ fontWeight: 'bold' }}>
              {calendars[0]?.month} / {calendars[0]?.year}
            </span>
            <button type="button" {...getForwardProps()} style={{ padding: '0.25rem 0.75rem', cursor: 'pointer' }}>
              Next &rarr;
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                {day}
              </div>
            ))}
            {calendars[0]?.days.map((dayObj) => {
              const dayProps = getDayProps(dayObj);
              return (
                <button
                  key={dayObj.key}
                  type="button"
                  {...dayProps}
                  style={{
                    padding: '0.5rem',
                    border: 'none',
                    borderRadius: '0.25rem',
                    backgroundColor: dayObj.isSelected ? '#3b82f6' : dayObj.isOutside ? '#f3f4f6' : 'transparent',
                    color: dayObj.isSelected ? '#ffffff' : dayObj.isOutside ? '#9ca3af' : '#000000',
                    cursor: 'pointer',
                  }}
                >
                  {dayObj.day}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
