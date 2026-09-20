import React from 'react';
import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { MultipleDemo } from '../../../docs/components/demos';

describe('Multiple Selection Recipe', () => {
  test('should render multiple selection demo', async () => {
    render(<MultipleDemo />);
    await expect.element(page.getByText('Live Preview: Multiple Date Selection')).toBeVisible();
  });
});
