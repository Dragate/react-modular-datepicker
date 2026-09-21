import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

describe('Custom Function Header and Footer Integration', () => {
  test('renders custom function header and footer with full control', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(
        <Calendar
          date={new Date(2025, 4, 15)}
          header={({ calendars, setView, monthNames }) => (
            <div data-testid="custom-header">
              <span data-testid="header-month">{monthNames[calendars[0].month]}</span>
              <button data-testid="switch-months" onClick={() => setView('months')}>
                Months
              </button>
            </div>
          )}
          footer={<div data-testid="custom-footer">Footer Action Bar</div>}
        />
      );
    });

    expect(container.querySelector('[data-testid="custom-header"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="header-month"]')?.textContent).toBe('May');
    expect(container.querySelector('[data-testid="custom-footer"]')?.textContent).toBe('Footer Action Bar');

    // Click custom 'Months' button in function header
    const switchBtn = container.querySelector('[data-testid="switch-months"]') as HTMLButtonElement;
    act(() => {
      switchBtn.click();
    });

    expect(container.querySelector('.rmd-months-grid')).not.toBeNull();

    document.body.removeChild(container);
  });
});
