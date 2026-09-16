import { expect, test } from '@playwright/test';
import { defaultClassNames, mergeClassNames } from '../../src/classNames';

test.describe('mergeClassNames', () => {
  test('returns defaultClassNames when no custom classNames are provided', () => {
    const merged = mergeClassNames();
    expect(merged).toEqual(defaultClassNames);
  });

  test('overrides top-level class names', () => {
    const merged = mergeClassNames({
      root: 'custom-root-class',
      header: 'custom-header-class',
    });

    expect(merged.root).toBe('custom-root-class');
    expect(merged.header).toBe('custom-header-class');
    // Unmodified classes should remain default
    expect(merged.weekdayGrid).toBe(defaultClassNames.weekdayGrid);
    expect(merged.navButton).toBe(defaultClassNames.navButton);
  });

  test('merges day classNames deeply without losing unspecified day properties', () => {
    const merged = mergeClassNames({
      day: {
        selected: 'custom-selected-day',
        rangeStart: 'custom-range-start',
      },
    });

    expect(merged.day.selected).toBe('custom-selected-day');
    expect(merged.day.rangeStart).toBe('custom-range-start');
    // Other day styles should still come from defaults
    expect(merged.day.day).toBe(defaultClassNames.day.day);
    expect(merged.day.unselected).toBe(defaultClassNames.day.unselected);
    expect(merged.day.disabled).toBe(defaultClassNames.day.disabled);
    expect(merged.day.rangeBetween).toBe(defaultClassNames.day.rangeBetween);
  });

  test('ignores empty or undefined custom properties', () => {
    const merged = mergeClassNames({
      root: undefined,
      footer: '',
    });

    expect(merged.root).toBe(defaultClassNames.root);
    expect(merged.footer).toBe(defaultClassNames.footer);
  });
});

