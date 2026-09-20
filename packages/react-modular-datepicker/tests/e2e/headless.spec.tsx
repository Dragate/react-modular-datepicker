import React from 'react';
import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { HeadlessDemo } from '../../../docs/components/demos';

describe('Headless Usage Recipe', () => {
  test('should render headless custom layout demo', async () => {
    render(<HeadlessDemo />);
    await expect.element(page.getByText('Live Preview: Headless Custom Layout')).toBeVisible();
  });
});
