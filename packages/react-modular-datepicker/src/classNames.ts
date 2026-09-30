/**
 * Class name customization overrides for individual day elements and day states.
 */
export interface DayClassNames {
  /** Applied to all day buttons */
  day?: string;
  /** Applied to selected day buttons */
  selected?: string;
  /** Applied to unselected day buttons */
  unselected?: string;
  /** Applied to disabled day buttons */
  disabled?: string;
  /** Applied to empty cell placeholders in calendar grid */
  empty?: string;
  /** Applied to start date in range selection mode */
  rangeStart?: string;
  /** Applied to end date in range selection mode */
  rangeEnd?: string;
  /** Applied to dates between start and end in range selection mode */
  rangeBetween?: string;
  /** Applied to dates currently highlighted on hover during range selection */
  rangeHovering?: string;
  /** Custom modifier key-to-classname mappings */
  [key: string]: string | undefined;
}

/**
 * Class name customization overrides for components, containers, headers, and selection views.
 */
export interface CalendarClassNames {
  /** Root container element */
  root?: string;
  /** Header section element */
  header?: string;
  /** Header element for multi-month layout views */
  headerMultiMonth?: string;
  /** Container wrapping all calendar month grids */
  calendarsContainer?: string;
  /** Container wrapping a single month grid */
  calendarContainer?: string;
  /** Navigation button slot at the start (left/previous) of the header */
  navButtonSlotStart?: string;
  /** Navigation button slot at the end (right/next) of the header */
  navButtonSlotEnd?: string;
  /** Container wrapping header title text */
  headerTitleContainer?: string;
  /** Grid container wrapping weekday headers */
  weekdayGrid?: string;
  /** Individual weekday header cell */
  weekday?: string;
  /** Grid container wrapping day cells */
  daysGrid?: string;
  /** Footer section element */
  footer?: string;

  /** Navigation back/forward arrow buttons */
  navButton?: string;
  /** Hidden navigation arrow button (e.g., when viewing month/year selection) */
  navButtonHidden?: string;
  /** Container wrapping month and year trigger buttons */
  monthYearContainer?: string;
  /** Label container wrapping current month and year text */
  monthYearLabel?: string;
  /** Button triggering month or year view overlay */
  monthYearButton?: string;

  /** Nested day button class customizations */
  day?: DayClassNames;

  /** Grid container wrapping month selection view buttons */
  monthsGrid?: string;
  /** Month selection option button */
  monthButton?: string;
  /** Currently selected month button */
  monthButtonSelected?: string;
  /** Unselected month button */
  monthButtonUnselected?: string;

  /** Grid container wrapping year selection view buttons */
  yearsGrid?: string;
  /** Year selection option button */
  yearButton?: string;
  /** Currently selected year button */
  yearButtonSelected?: string;
  /** Unselected year button */
  yearButtonUnselected?: string;
}
