import React from 'react';
import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { HeaderFooterDemo } from '../../../docs/components/demos';

describe('Custom Header Footer Recipe', () => {
  test('should render header and footer', async () => {
    render(<HeaderFooterDemo />);
    await expect.element(page.getByText('Custom Header Banner', { exact: false })).toBeVisible();
  });
});
