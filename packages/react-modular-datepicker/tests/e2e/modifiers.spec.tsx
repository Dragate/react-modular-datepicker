import React from 'react';
import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { ModifiersDemo } from '../../../docs/components/demos';

describe('Modifiers Recipe', () => {
  test('should render modifiers demo with weekend and special highlights', async () => {
    render(<ModifiersDemo />);
    await expect.element(page.getByText('Live Preview: Custom Modifiers', { exact: false })).toBeVisible();
  });
});
