import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

function AvailabilityWrapper() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2025, 5, 10));
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const timeSlots = ['09:00 AM', '10:30 AM', '01:00 PM'];

  return (
    <div>
      <Calendar
        selected={selectedDate || undefined}
        onChange={(d) => {
          setSelectedDate(d as Date);
          setSelectedSlot(null);
          setConfirmed(false);
        }}
      />
      <div data-testid="available-times">Available Times:</div>
      {timeSlots.map((slot) => (
        <button key={slot} type="button" onClick={() => setSelectedSlot(slot)}>
          {slot}
        </button>
      ))}
      {selectedSlot && (
        <button type="button" onClick={() => setConfirmed(true)}>
          Confirm Appointment
        </button>
      )}
      {confirmed && <div data-testid="confirmed">Appointment Confirmed!</div>}
    </div>
  );
}

describe('Availability & Booking Recipe', () => {
  test('should render availability calendar demo and handle booking slot selection', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<AvailabilityWrapper />);
    });

    expect(container.querySelector('[data-testid="available-times"]')?.textContent).toContain('Available Times:');

    const slotBtn = Array.from(container.querySelectorAll('button')).find((b) => b.textContent === '10:30 AM');
    expect(slotBtn).toBeDefined();

    act(() => {
      slotBtn?.click();
    });

    const confirmBtn = Array.from(container.querySelectorAll('button')).find((b) => b.textContent === 'Confirm Appointment');
    expect(confirmBtn).toBeDefined();

    act(() => {
      confirmBtn?.click();
    });

    expect(container.querySelector('[data-testid="confirmed"]')?.textContent).toContain('Appointment Confirmed!');
  });
});
