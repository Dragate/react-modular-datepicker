import { act, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Calendar } from 'react-modular-datepicker';
import { describe, expect, test } from 'vitest';

function FormIntegrationTestWrapper() {
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
    <div ref={containerRef}>
      <h1 data-testid="heading">Form Integration</h1>
      <input
        type="text"
        readOnly
        value={date ? date.toLocaleDateString() : ''}
        placeholder="Pick a date..."
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div data-testid="popover">
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
  );
}

describe('Form Integration Recipe', () => {
  test('should render form integration component', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<FormIntegrationTestWrapper />);
    });

    const input = container.querySelector('input');
    expect(input).not.toBeNull();
    expect(input?.placeholder).toBe('Pick a date...');
  });

  test('should close popover when clicking outside the input/calendar', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<FormIntegrationTestWrapper />);
    });

    const input = container.querySelector('input')!;

    // Popover is initially closed
    expect(container.querySelector('[data-testid="popover"]')).toBeNull();

    // Click input to open popover
    act(() => {
      input.click();
    });
    expect(container.querySelector('[data-testid="popover"]')).not.toBeNull();

    // Click outside
    act(() => {
      const event = new MouseEvent('mousedown', { bubbles: true });
      document.body.dispatchEvent(event);
    });

    expect(container.querySelector('[data-testid="popover"]')).toBeNull();
  });

  test('should open calendar to selected date month when reopened', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<FormIntegrationTestWrapper />);
    });

    const input = container.querySelector('input')!;

    act(() => {
      input.click();
    });

    const nextBtn = Array.from(container.querySelectorAll('button')).find((b) => b.getAttribute('aria-label') === 'Next month');
    act(() => {
      nextBtn?.click();
    });

    const dayBtn = Array.from(container.querySelectorAll('.rmdp button')).find((b) => b.textContent?.trim() === '15');
    act(() => {
      dayBtn?.click();
    });

    // Popover closes on date selection
    expect(container.querySelector('[data-testid="popover"]')).toBeNull();
    expect(input.value).not.toBe('');

    // Reopen calendar
    act(() => {
      input.click();
    });
    expect(container.querySelector('[data-testid="popover"]')).not.toBeNull();

    const selectedDay = container.querySelector('.rmdp [aria-pressed="true"]');
    expect(selectedDay).not.toBeNull();
    expect(selectedDay?.textContent?.trim()).toBe('15');
  });
});
