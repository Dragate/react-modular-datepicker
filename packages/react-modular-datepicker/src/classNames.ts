export interface DayClassNames {
  day?: string;
  selected?: string;
  unselected?: string;
  disabled?: string;
  empty?: string;
  rangeStart?: string;
  rangeEnd?: string;
  rangeBetween?: string;
  rangeHovering?: string;
  [key: string]: string | undefined;
}

export const defaultClassNames = {
  root: "w-fit flex flex-col p-4 bg-white rounded-lg shadow-lg",
  header: "flex items-center justify-between border-b-2 border-rmd-gray-light/40 pb-2",
  headerMultiMonth: "border-b-0 pb-0",
  calendarsContainer: "flex flex-wrap gap-4",
  calendarContainer: "flex-1 min-w-[280px] max-w-full",
  navButtonSlotStart: "w-9 flex justify-start",
  navButtonSlotEnd: "w-9 flex justify-end",
  headerTitleContainer: "font-semibold text-rmd-text text-center flex-1",
  weekdayGrid: "grid grid-cols-7 gap-1 mb-1 border-b border-rmd-gray-light/40",
  weekday: "text-center text-xs text-gray-400 py-2",
  daysGrid: "grid grid-cols-7 gap-px bg-rmd-gray-light/20",
  footer: "mt-4",

  navButton: "p-2 text-rmd-text hover:bg-gray-100 rounded-full transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none",
  navButtonHidden: "invisible pointer-events-none",
  monthYearContainer: "flex gap-8",
  monthYearLabel: "flex gap-1 items-center font-semibold text-rmd-text",
  monthYearButton: "hover:bg-gray-100 px-2 py-1 rounded cursor-pointer",

  day: {
    day: "rmd-day group",
    selected: "rmd-day-selected",
    unselected: "rmd-day-unselected",
    disabled: "rmd-day-disabled",
    empty: "rmd-day-empty",
    rangeStart: "rmd-day-range-start",
    rangeEnd: "rmd-day-range-end",
    rangeBetween: "rmd-day-range-between",
    rangeHovering: "rmd-day-range-hovering",
  },

  monthsGrid: "grid grid-cols-3 gap-2 animate-slide-in-top",
  monthButton: "py-3 rounded-lg hover:bg-rmd-gray-light transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none",
  monthButtonSelected: "bg-rmd-gold text-white",
  monthButtonUnselected: "text-rmd-text",

  yearsGrid: "grid grid-cols-3 gap-2 max-h-[210px] overflow-y-auto pr-2 animate-slide-in-top rmd-scrollbar",
  yearButton: "py-3 rounded-lg hover:bg-rmd-gray-light transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none",
  yearButtonSelected: "bg-rmd-gold text-white",
  yearButtonUnselected: "text-rmd-text",
}

export interface CalendarClassNames {
  root?: string;
  header?: string;
  headerMultiMonth?: string;
  calendarsContainer?: string;
  calendarContainer?: string;
  navButtonSlotStart?: string;
  navButtonSlotEnd?: string;
  headerTitleContainer?: string;
  weekdayGrid?: string;
  weekday?: string;
  daysGrid?: string;
  footer?: string;

  navButton?: string;
  navButtonHidden?: string;
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
