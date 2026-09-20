import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Calendar } from 'react-modular-datepicker';
import { describe, expect, test } from 'vitest';

describe('CSS Variables Overrides', () => {
  test('renders root element with rmd class and accepts custom CSS variables', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(
        <div style={{ '--rmd-gold': '#ff0000', '--rmd-text': '#0000ff' } as React.CSSProperties}>
          <Calendar date={new Date(2025, 4, 15)} />
        </div>
      );
    });

    const rootElement = container.querySelector('.rmd');
    expect(rootElement).not.toBeNull();
    expect(rootElement?.classList.contains('rmd')).toBe(true);

    const daySelected = container.querySelector('.rmd-day-selected') || container.querySelector('.rmd-day');
    expect(daySelected).not.toBeNull();
  });
});
