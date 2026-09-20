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
  today?: string;
  outside?: string;
  [key: string]: string | undefined;
}

export const defaultClassNames = {
  root: "rmdp-calendar",
  header: "rmdp-header",
  headerMultiMonth: "rmdp-header-multi-month",
  calendarsContainer: "rmdp-calendars-container",
  calendarContainer: "rmdp-calendar-container",
  navButtonSlotStart: "rmdp-nav-button-slot-start",
  navButtonSlotEnd: "rmdp-nav-button-slot-end",
  headerTitleContainer: "rmdp-header-title-container",
  weekdayGrid: "rmdp-weekday-grid",
  weekday: "rmdp-weekday",
  daysGrid: "rmdp-days-grid",
  footer: "rmdp-footer",

  navButton: "rmdp-nav-button",
  navButtonHidden: "rmdp-nav-button-hidden",
  monthYearContainer: "rmdp-month-year-container",
  monthYearLabel: "rmdp-month-year-label",
  monthYearButton: "rmdp-month-year-button",

  day: {
    day: "rmdp-day group",
    selected: "rmdp-day-selected",
    unselected: "rmdp-day-unselected",
    disabled: "rmdp-day-disabled",
    empty: "rmdp-day-empty",
    rangeStart: "rmdp-day-range-start",
    rangeEnd: "rmdp-day-range-end",
    rangeBetween: "rmdp-day-range-between",
    rangeHovering: "rmdp-day-range-hovering",
    today: "rmdp-day-today",
    outside: "rmdp-day-outside",
  },

  monthsGrid: "rmdp-months-grid animate-slide-in-top",
  monthButton: "rmdp-month-button",
  monthButtonSelected: "rmdp-month-button-selected",
  monthButtonUnselected: "rmdp-month-button-unselected",

  yearsGrid: "rmdp-years-grid animate-slide-in-top rmdp-scrollbar",
  yearButton: "rmdp-year-button",
  yearButtonSelected: "rmdp-year-button-selected",
  yearButtonUnselected: "rmdp-year-button-unselected",
};

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
