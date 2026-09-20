import React from 'react';
import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { CustomStylingDemo } from '../../../docs/components/demos';

describe('Custom Styling Recipe', () => {
  test('should render custom styling demo', async () => {
    render(<CustomStylingDemo />);
    await expect.element(page.getByText('Live Preview: Custom Styling & Themes')).toBeVisible();
  });
});
