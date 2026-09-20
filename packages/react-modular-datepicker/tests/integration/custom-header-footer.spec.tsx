import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

function HeaderFooterTestWrapper() {
  const [selected, setSelected] = useState<Date | null>(new Date());
  return (
    <Calendar
      selected={selected || undefined}
      onChange={(val) => setSelected(val as Date)}
      header={<div data-testid="custom-header">🌟 Custom Header Banner</div>}
      footer={<div data-testid="custom-footer">Custom Footer: Select any date</div>}
    />
  );
}

describe('Custom Header Footer Recipe', () => {
  test('should render header and footer', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<HeaderFooterTestWrapper />);
    });

    const header = container.querySelector('[data-testid="custom-header"]');
    const footer = container.querySelector('[data-testid="custom-footer"]');

    expect(header).not.toBeNull();
    expect(header?.textContent).toContain('Custom Header Banner');
    expect(footer).not.toBeNull();
    expect(footer?.textContent).toContain('Custom Footer: Select any date');
  });
});
