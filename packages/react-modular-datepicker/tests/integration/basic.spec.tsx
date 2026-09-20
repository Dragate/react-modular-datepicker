import { act, useState } from 'react';
import { Calendar } from 'react-modular-datepicker';
import { describe, expect, test } from 'vitest';
import { setupComponent } from '../test-utils';

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
  const env = setupComponent(<BasicTestWrapper />);

  test('should render calendar and select a date', () => {
    const today = new Date().getDate().toString();
    const dayBtn = Array.from(env.container.querySelectorAll('button')).find(
      (btn) => btn.textContent?.trim() === today
    );

    expect(dayBtn).toBeDefined();

    act(() => {
      dayBtn?.click();
    });

    const selectedText = env.container.querySelector('[data-testid="selected-text"]');
    expect(selectedText).not.toBeNull();
    expect(selectedText?.textContent).toContain('Selected:');
  });
});
