import { expect, test } from '@playwright/test';
import { defaultAdapter } from '../../packages/react-modular-datepicker/src/adapters/dayjs';
import { getDefaults, getTranslations } from '../../packages/react-modular-datepicker/src/i18n';

test.describe('i18n module', () => {
  test('getDefaults provides English month and weekday translations by default', () => {
    const defaults = getDefaults();
    expect(defaults.months).toHaveLength(12);
    expect(defaults.months[0]).toBe('January');
    expect(defaults.months[11]).toBe('December');
    expect(defaults.weekdays).toHaveLength(7);
    expect(defaults.weekdays).toContain('SUN');
    expect(defaults.back).toBe('Previous month');
    expect(defaults.forward).toBe('Next month');
  });

  test('getTranslations returns default translations when no overrides provided', () => {
    const translations = getTranslations();
    const defaults = getDefaults();
    expect(translations).toEqual(defaults);
  });

  test('getTranslations merges custom partial translations', () => {
    const custom = {
      back: 'Anterior',
      forward: 'Siguiente',
      months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    };

    const translations = getTranslations(defaultAdapter, undefined, custom);
    expect(translations.back).toBe('Anterior');
    expect(translations.forward).toBe('Siguiente');
    expect(translations.months[0]).toBe('Ene');
    // weekdays should still be the default
    expect(translations.weekdays).toEqual(getDefaults().weekdays);
  });
});
