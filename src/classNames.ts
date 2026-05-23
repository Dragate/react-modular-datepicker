export interface CalendarClassNames {
  // Main Calendar
  root?: string;
  header?: string;
  calendarsContainer?: string;
  calendarContainer?: string;
  weekdayGrid?: string;
  weekday?: string;
  daysGrid?: string;
  footer?: string;

  // Header
  navButton?: string;
  monthYearContainer?: string;
  monthYearLabel?: string;
  monthYearButton?: string;

  // Day
  day?: string;
  dayToday?: string;
  daySelected?: string;
  dayUnselected?: string;
  dayDisabled?: string;
  dayOutside?: string;
  dayRangeStart?: string;
  dayRangeEnd?: string;
  dayRangeBetween?: string;
  dayRangeHovering?: string;

  // Months View
  monthsRoot?: string;
  monthsHeader?: string;
  monthsBackButton?: string;
  monthsYearLabel?: string;
  monthsGrid?: string;
  monthButton?: string;
  monthButtonSelected?: string;
  monthButtonUnselected?: string;

  // Years View
  yearsRoot?: string;
  yearsHeader?: string;
  yearsBackButton?: string;
  yearsTitle?: string;
  yearsGrid?: string;
  yearButton?: string;
  yearButtonSelected?: string;
  yearButtonUnselected?: string;
}

export const defaultClassNames: Required<CalendarClassNames> = {
  root: "w-fit flex flex-col p-4 bg-white rounded-lg shadow-lg",
  header: "flex items-center justify-between mb-6",
  calendarsContainer: "flex flex-col md:flex-row gap-4",
  calendarContainer: "flex-1 min-w-[280px]",
  weekdayGrid: "grid grid-cols-7 gap-1 mb-2",
  weekday: "text-center text-xs font-bold text-gray-400 py-2",
  daysGrid: "grid grid-cols-7 gap-1",
  footer: "mt-4",

  navButton: "p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer",
  monthYearContainer: "flex gap-8",
  monthYearLabel: "flex gap-1 items-center font-semibold text-brand-text",
  monthYearButton: "hover:bg-gray-100 px-2 py-1 rounded cursor-pointer",

  day: "aspect-square flex items-center justify-center text-sm font-medium transition-all relative group cursor-pointer",
  dayToday: "text-brand-gold border border-brand-gold rounded-full",
  daySelected: "bg-brand-gold text-white rounded-full",
  dayUnselected: "hover:bg-brand-gray-light text-brand-text rounded-full",
  dayDisabled: "text-gray-300 cursor-not-allowed",
  dayOutside: "text-gray-400 rounded-full",
  dayRangeStart: "bg-brand-gold text-white",
  dayRangeEnd: "bg-brand-gold text-white",
  dayRangeBetween: "bg-brand-gray-light text-brand-text rounded-none",
  dayRangeHovering: "bg-brand-gray-light text-brand-text rounded-none",

  monthsRoot: "w-fit p-4 bg-white rounded-lg shadow-lg min-w-[280px]",
  monthsHeader: "flex items-center justify-between mb-4",
  monthsBackButton: "p-2 hover:bg-gray-100 rounded-full cursor-pointer",
  monthsYearLabel: "font-semibold",
  monthsGrid: "grid grid-cols-3 gap-2",
  monthButton: "py-4 rounded-lg hover:bg-brand-gray-light transition-colors cursor-pointer",
  monthButtonSelected: "bg-brand-gold text-white",
  monthButtonUnselected: "text-brand-text",

  yearsRoot: "w-fit p-4 bg-white rounded-lg shadow-lg min-w-[280px]",
  yearsHeader: "flex items-center justify-between mb-4",
  yearsBackButton: "p-2 hover:bg-gray-100 rounded-full cursor-pointer",
  yearsTitle: "font-semibold",
  yearsGrid: "grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2",
  yearButton: "py-3 rounded-lg hover:bg-brand-gray-light transition-colors cursor-pointer",
  yearButtonSelected: "bg-brand-gold text-white",
  yearButtonUnselected: "text-brand-text",
};

export const mergeClassNames = (custom?: CalendarClassNames): Required<CalendarClassNames> => {
  const result = { ...defaultClassNames };
  if (!custom) return result;
  for (const key in custom) {
    const k = key as keyof CalendarClassNames;
    if (custom[k]) {
      (result as any)[k] = custom[k];
    }
  }
  return result;
};
