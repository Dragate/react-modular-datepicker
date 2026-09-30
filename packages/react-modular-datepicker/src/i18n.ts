import { DateAdapter } from "./types";
import { defaultAdapter } from "./adapters/dayjs";

/**
 * Internationalization translations for calendar headers, screen reader announcements, and navigation.
 */
export interface Translations {
  /** Localized month names (12 items starting from January) */
  months: string[];
  /** Localized weekday names (7 items) */
  weekdays: string[];
  /** Accessible label for previous month/year navigation button */
  back: string;
  /** Accessible label for next month/year navigation button */
  forward: string;
  /** Accessible label or text for month selector button */
  selectMonth?: string;
  /** Accessible label or text for year selector button */
  selectYear?: string;
}

/**
 * Retrieves default translation strings using the provided date adapter and optional locale string.
 *
 * @param adapter DateAdapter instance used to fetch localized month and weekday strings (defaults to DayjsAdapter)
 * @param locale Optional locale code (e.g. `'es'`, `'fr'`, `'de'`)
 * @returns Default Translations object
 */
export function getDefaults(adapter: DateAdapter = defaultAdapter, locale?: string): Translations {
  return {
    months: adapter.getMonths(locale),
    weekdays: adapter.getWeekdays(locale),
    back: 'Previous month',
    forward: 'Next month',
    selectMonth: 'Select month',
    selectYear: 'Select year'
  };
}

/**
 * Combines default translations derived from adapter/locale with optional custom translation overrides.
 *
 * @param adapter DateAdapter instance used for localized defaults
 * @param locale Optional locale code
 * @param custom Partial translation overrides provided by consumer
 * @returns Merged Translations object
 */
export function getTranslations(
    adapter: DateAdapter = defaultAdapter,
    locale?: string,
    custom?: Partial<Translations>
): Translations {
  const base = getDefaults(adapter, locale);
  return { ...base, ...custom };
}
