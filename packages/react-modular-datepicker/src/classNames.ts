export interface DayClassNames {
  day?: string;
  selected?: string;
  unselected?: string;
  disabled?: string;
  rangeStart?: string;
  rangeEnd?: string;
  rangeBetween?: string;
  rangeHovering?: string;
  [key: string]: string | undefined;
}

export const defaultClassNames = {
  root: "w-fit flex flex-col p-4 bg-white rounded-lg shadow-lg",
  header: "flex items-center justify-between border-b-2 border-brand-gray-light/40 pb-2",
  calendarsContainer: "flex flex-wrap gap-4 mt-3",
  calendarContainer: "flex-1 min-w-[280px] max-w-full",
  weekdayGrid: "grid grid-cols-7 gap-1 mb-1 border-b border-brand-gray-light/40",
  weekday: "text-center text-xs text-gray-400 py-2",
  daysGrid: "grid grid-cols-7 gap-px bg-brand-gray-light/20",
  footer: "mt-4",

  navButton: "p-2 text-brand-text hover:bg-gray-100 rounded-full transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none",
  monthYearContainer: "flex gap-8",
  monthYearLabel: "flex gap-1 items-center font-semibold text-brand-text",
  monthYearButton: "hover:bg-gray-100 px-2 py-1 rounded cursor-pointer",

  day: {
    day: "aspect-square flex items-center justify-center text-sm font-medium transition-all relative group cursor-pointer p-px",
    selected: "bg-brand-gold text-white rounded-full",
    unselected: "bg-white hover:bg-brand-gray-light text-brand-text",
    disabled: "bg-white text-gray-300 cursor-not-allowed",
    rangeStart: "bg-brand-gold text-white",
    rangeEnd: "bg-brand-gold text-white",
    rangeBetween: "bg-brand-gold/25 text-brand-text",
    rangeHovering: "bg-brand-gold/25 text-brand-text",
  },

  monthsGrid: "grid grid-cols-3 gap-2 animate-slide-in-top",
  monthButton: "py-3 rounded-lg hover:bg-brand-gray-light transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none",
  monthButtonSelected: "bg-brand-gold text-white",
  monthButtonUnselected: "text-brand-text",

  yearsGrid: "grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2 animate-slide-in-top",
  yearButton: "py-3 rounded-lg hover:bg-brand-gray-light transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none",
  yearButtonSelected: "bg-brand-gold text-white",
  yearButtonUnselected: "text-brand-text",
}

export interface CalendarClassNames {
  root?: string;
  header?: string;
  calendarsContainer?: string;
  calendarContainer?: string;
  weekdayGrid?: string;
  weekday?: string;
  daysGrid?: string;
  footer?: string;

  navButton?: string;
  monthYearContainer?: string;
  monthYearLabel?: string;
  monthYearButton?: string;

  day?: DayClassNames;

  monthsGrid?: string;
  monthButton?: string;
  monthButtonSelected?: string;
  monthButtonUnselected?: string;

  yearsGrid?: string;
  yearButton?: string;
  yearButtonSelected?: string;
  yearButtonUnselected?: string;
}

export const mergeClassNames = (custom?: CalendarClassNames): Required<CalendarClassNames> => {
  const result = { ...defaultClassNames };
  if (!custom) return result;

  for (const key in custom) {
    const k = key as keyof CalendarClassNames;
    if (k === 'day' && custom.day) {
      result.day = { ...defaultClassNames.day, ...custom.day };
    } else if (custom[k]) {
      (result as any)[k] = custom[k];
    }
  }
  return result;
};
