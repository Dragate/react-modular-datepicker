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
