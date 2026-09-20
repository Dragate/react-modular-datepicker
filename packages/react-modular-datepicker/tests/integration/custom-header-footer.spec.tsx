import { useState } from 'react';
import { Calendar } from 'react-modular-datepicker';
import { describe, expect, test } from 'vitest';
import { setupComponent } from '../test-utils';

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
  const env = setupComponent(<HeaderFooterTestWrapper />);

  test('should render header and footer', () => {
    const header = env.container.querySelector('[data-testid="custom-header"]');
    const footer = env.container.querySelector('[data-testid="custom-footer"]');

    expect(header).not.toBeNull();
    expect(header?.textContent).toContain('Custom Header Banner');
    expect(footer).not.toBeNull();
    expect(footer?.textContent).toContain('Custom Footer: Select any date');
  });
});
