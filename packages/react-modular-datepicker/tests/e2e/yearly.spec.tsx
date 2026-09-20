import React from 'react';
import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { YearlyDemo } from '../../../docs/components/demos';

describe('Yearly View Recipe', () => {
  test('should render multi-month demo', async () => {
    render(<YearlyDemo />);
    await expect.element(page.getByText('Live Preview: Yearly View')).toBeVisible();
    await expect.element(page.getByText('January')).toBeVisible();
  });
});
