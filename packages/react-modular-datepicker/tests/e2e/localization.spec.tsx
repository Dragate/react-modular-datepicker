import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const spanishTranslations = {
  months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  back: 'Mes anterior',
  forward: 'Mes siguiente',
};

describe('Localization Recipe', () => {
  test('should render localization and RTL component', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(
        <div dir="rtl">
          <Calendar firstDayOfWeek={6} translations={spanishTranslations} />
        </div>
      );
    });

    expect(container.textContent).toContain('Sáb');

    const prevBtn = container.querySelector('button[aria-label="Mes anterior"]');
    expect(prevBtn).not.toBeNull();
  });
});
