import React from 'react';
import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { LocalizationDemo } from '../../../docs/components/demos';

describe('Localization Recipe', () => {
  test('should render localization demo', async () => {
    render(<LocalizationDemo />);
    await expect.element(page.getByText('Live Preview: Localization & RTL Support')).toBeVisible();
  });
});
