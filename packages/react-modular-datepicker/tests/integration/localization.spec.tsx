import { Calendar } from 'react-modular-datepicker';
import { describe, expect, test } from 'vitest';
import { setupComponent } from '../test-utils';

const spanishTranslations = {
  months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  back: 'Mes anterior',
  forward: 'Mes siguiente',
};

describe('Localization Recipe', () => {
  const env = setupComponent(
    <div dir="rtl">
      <Calendar firstDayOfWeek={6} translations={spanishTranslations} />
    </div>
  );

  test('should render localization and RTL component', () => {
    expect(env.container.textContent).toContain('Sáb');

    const prevBtn = env.container.querySelector('button[aria-label="Mes anterior"]');
    expect(prevBtn).not.toBeNull();
  });
});
