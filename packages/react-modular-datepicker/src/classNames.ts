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
  root: "rmd:w-fit rmd:flex rmd:flex-col rmd:p-4 rmd:bg-white rmd:rounded-lg rmd:shadow-lg",
  header: "rmd:flex rmd:items-center rmd:justify-between rmd:border-b-2 rmd:border-brand-gray-light/40 rmd:pb-2",
  headerMultiMonth: "rmd:border-b-0 rmd:pb-0",
  calendarsContainer: "rmd:flex rmd:flex-wrap rmd:gap-4",
  calendarContainer: "rmd:flex-1 rmd:min-w-[280px] rmd:max-w-full",
  navButtonSlotStart: "rmd:w-9 rmd:flex rmd:justify-start",
  navButtonSlotEnd: "rmd:w-9 rmd:flex rmd:justify-end",
  headerTitleContainer: "rmd:font-semibold rmd:text-brand-text rmd:text-center rmd:flex-1",
  weekdayGrid: "rmd:grid rmd:grid-cols-7 rmd:gap-1 rmd:mb-1 rmd:border-b rmd:border-brand-gray-light/40",
  weekday: "rmd:text-center rmd:text-xs rmd:text-gray-400 rmd:py-2",
  daysGrid: "rmd:grid rmd:grid-cols-7 rmd:gap-px rmd:bg-brand-gray-light/20",
  footer: "rmd:mt-4",

  navButton: "rmd:p-2 rmd:text-brand-text rmd:hover:bg-gray-100 rmd:rounded-full rmd:transition-colors rmd:cursor-pointer rmd:disabled:opacity-30 rmd:disabled:pointer-events-none",
  navButtonHidden: "rmd:invisible rmd:pointer-events-none",
  monthYearContainer: "rmd:flex rmd:gap-8",
  monthYearLabel: "rmd:flex rmd:gap-1 rmd:items-center rmd:font-semibold rmd:text-brand-text",
  monthYearButton: "rmd:hover:bg-gray-100 rmd:px-2 rmd:py-1 rmd:rounded rmd:cursor-pointer",

  day: {
    day: "rmd-day rmd:group rmd:aspect-square rmd:flex rmd:items-center rmd:justify-center rmd:p-[1px] rmd:relative rmd:text-sm rmd:font-medium rmd:transition-all rmd:enabled:cursor-pointer",
    selected: "rmd-day-selected rmd:bg-brand-gold rmd:text-white rmd:rounded-full",
    unselected: "rmd-day-unselected rmd:bg-white rmd:text-brand-text rmd:hover:bg-brand-gold/25",
    disabled: "rmd-day-disabled rmd:bg-white rmd:cursor-not-allowed",
    empty: "rmd-day-empty rmd:aspect-square rmd:bg-white",
    rangeStart: "rmd-day-range-start rmd:bg-brand-gold rmd:text-white",
    rangeEnd: "rmd-day-range-end rmd:bg-brand-gold rmd:text-white",
    rangeBetween: "rmd-day-range-between rmd:bg-brand-gold/25 rmd:text-brand-text",
    rangeHovering: "rmd-day-range-hovering rmd:bg-brand-gold/25 rmd:text-brand-text",
  },

  monthsGrid: "rmd:grid rmd:grid-cols-3 rmd:gap-2 rmd:animate-slide-in-top",
  monthButton: "rmd:py-3 rmd:rounded-lg rmd:hover:bg-brand-gray-light rmd:transition-colors rmd:cursor-pointer rmd:disabled:opacity-30 rmd:disabled:pointer-events-none",
  monthButtonSelected: "rmd:bg-brand-gold rmd:text-white",
  monthButtonUnselected: "rmd:text-brand-text",

  yearsGrid: "rmd:grid rmd:grid-cols-3 rmd:gap-2 rmd:max-h-[210px] rmd:overflow-y-auto rmd:pr-2 rmd:animate-slide-in-top",
  yearButton: "rmd:py-3 rmd:rounded-lg rmd:hover:bg-brand-gray-light rmd:transition-colors rmd:cursor-pointer rmd:disabled:opacity-30 rmd:disabled:pointer-events-none",
  yearButtonSelected: "rmd:bg-brand-gold rmd:text-white",
  yearButtonUnselected: "rmd:text-brand-text",
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
