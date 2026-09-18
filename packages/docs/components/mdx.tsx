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
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
