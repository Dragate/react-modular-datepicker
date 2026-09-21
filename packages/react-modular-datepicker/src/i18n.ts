import { DateAdapter } from "./types";
import { defaultAdapter } from "./adapters/dayjs";

export interface Translations {
  months: string[];
  weekdays: string[];
  back: string;
  forward: string;
  selectMonth?: string;
  selectYear?: string;
}

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

export function getTranslations(
    adapter: DateAdapter = defaultAdapter,
    locale?: string,
    custom?: Partial<Translations>
): Translations {
  const base = getDefaults(adapter, locale);
  return { ...base, ...custom };
}
