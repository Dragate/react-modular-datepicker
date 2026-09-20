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
  root: "rmd-root",
  header: "rmd-header",
  headerMultiMonth: "rmd-header-multi-month",
  calendarsContainer: "rmd-calendars-container",
  calendarContainer: "rmd-calendar-container",
  navButtonSlotStart: "rmd-nav-button-slot-start",
  navButtonSlotEnd: "rmd-nav-button-slot-end",
  headerTitleContainer: "rmd-header-title-container",
  weekdayGrid: "rmd-weekday-grid",
  weekday: "rmd-weekday",
  daysGrid: "rmd-days-grid",
  footer: "rmd-footer",

  navButton: "rmd-nav-button",
  navButtonHidden: "rmd-nav-button-hidden",
  monthYearContainer: "rmd-month-year-container",
  monthYearLabel: "rmd-month-year-label",
  monthYearButton: "rmd-month-year-button",

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

  monthsGrid: "rmd-months-grid",
  monthButton: "rmd-month-button",
  monthButtonSelected: "rmd-month-button-selected",
  monthButtonUnselected: "rmd-month-button-unselected",

  yearsGrid: "rmd-years-grid rmd-scrollbar",
  yearButton: "rmd-year-button",
  yearButtonSelected: "rmd-year-button-selected",
  yearButtonUnselected: "rmd-year-button-unselected",
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
