import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import {
  BasicDemo,
  RangeDemo,
  MultipleDemo,
  HeadlessDemo,
  CustomStylingDemo,
  LocalizationDemo,
  FormIntegrationDemo,
  HeaderFooterDemo,
  MinMaxDisabledDemo,
  YearlyDemo,
  CustomAdapterDemo,
  EventScheduleDemo,
  GoogleCalendarDemo,
  AvailabilityDemo,
  ModifiersDemo,
} from './demos';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    BasicDemo,
    RangeDemo,
    MultipleDemo,
    HeadlessDemo,
    CustomStylingDemo,
    LocalizationDemo,
    FormIntegrationDemo,
    HeaderFooterDemo,
    MinMaxDisabledDemo,
    YearlyDemo,
    CustomAdapterDemo,
    EventScheduleDemo,
    GoogleCalendarDemo,
    AvailabilityDemo,
    ModifiersDemo,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
