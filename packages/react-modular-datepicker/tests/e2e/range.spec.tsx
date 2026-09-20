import React from 'react';
import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { RangeDemo } from '../../../docs/components/demos';

describe('Range Selection Recipe', () => {
  test('should render range selection demo', async () => {
    render(<RangeDemo />);
    await expect.element(page.getByText('Live Preview: Date Range Selection')).toBeVisible();
  });
});
