'use client';
import { useState } from 'react';
import { Calendar } from 'react-modular-datepicker';

export default function LocalizationPage() {
  const [selected, setSelected] = useState<Date | null>(new Date());
  const [locale, setLocale] = useState<'es' | 'fr' | 'de' | 'ja'>('es');

  const localeConfigs = {
    es: {
      label: 'Español (Spanish)',
      firstDayOfWeek: 1, // Monday
      translations: {
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      }
    },
    fr: {
      label: 'Français (French)',
      firstDayOfWeek: 1, // Monday
      translations: {
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      }
    },
    de: {
      label: 'Deutsch (German)',
      firstDayOfWeek: 1, // Monday
      translations: {
        months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        weekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
      }
    },
    ja: {
      label: '日本語 (Japanese)',
      firstDayOfWeek: 0, // Sunday
      translations: {
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        weekdays: ['日', '月', '火', '水', '木', '金', '土'],
      }
    }
  };

  const currentConfig = localeConfigs[locale];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Localization & i18n</h1>
      <p className="mb-4 text-gray-600 text-sm">
        Easily localize month names, weekday labels, and first day of week using custom <code className="bg-gray-100 px-1 py-0.5 rounded text-amber-800 font-mono">translations</code> or date adapter locales.
      </p>

      {/* Language Toggle Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(localeConfigs) as Array<keyof typeof localeConfigs>).map((key) => (
          <button
            key={key}
            onClick={() => setLocale(key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
              locale === key
                ? 'bg-amber-800 text-white border-amber-900 shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {localeConfigs[key].label}
          </button>
        ))}
      </div>

      <div className="inline-block border border-gray-200 rounded-xl p-2 bg-white shadow-sm">
        <Calendar
          selected={selected}
          onChange={(val) => setSelected(val as Date)}
          firstDayOfWeek={currentConfig.firstDayOfWeek}
          translations={currentConfig.translations}
        />
      </div>
    </div>
  );
}
