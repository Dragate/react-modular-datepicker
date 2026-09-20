import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

function BasicTestWrapper() {
  const [selected, setSelected] = useState<Date | null>(null);
  return (
    <div>
      <Calendar selected={selected || undefined} onChange={(d) => setSelected(d as Date)} />
      {selected && <div data-testid="selected-text">Selected: {selected.toDateString()}</div>}
    </div>
  );
}

describe('Basic Selection Recipe', () => {
  test('should render calendar and select a date', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<BasicTestWrapper />);
    });

    const today = new Date().getDate().toString();
    const dayBtn = Array.from(container.querySelectorAll('button')).find(
      (btn) => btn.textContent?.trim() === today
    );

    expect(dayBtn).toBeDefined();

    act(() => {
      dayBtn?.click();
    });

    const selectedText = container.querySelector('[data-testid="selected-text"]');
    expect(selectedText).not.toBeNull();
    expect(selectedText?.textContent).toContain('Selected:');
  });
});
