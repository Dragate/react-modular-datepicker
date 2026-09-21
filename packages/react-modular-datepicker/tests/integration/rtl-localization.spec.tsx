import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

describe('RTL and Custom Localization Integration', () => {
  test('renders with RTL direction and custom translation strings', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const customTranslations = {
      back: 'Anterior',
      forward: 'Siguiente',
    };

    act(() => {
      root.render(
        <div dir="rtl">
          <Calendar
            date={new Date(2025, 4, 15)}
            translations={customTranslations}
          />
        </div>
      );
    });

    const rtlWrapper = container.querySelector('[dir="rtl"]');
    expect(rtlWrapper).not.toBeNull();

    const backBtn = container.querySelector('button[aria-label="Anterior"]');
    const forwardBtn = container.querySelector('button[aria-label="Siguiente"]');

    expect(backBtn).not.toBeNull();
    expect(forwardBtn).not.toBeNull();

    document.body.removeChild(container);
  });
});
