import React from 'react';
import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { MinMaxDisabledDemo } from '../../../docs/components/demos';

describe('Min Max Disabled Recipe', () => {
  test('should render bounds demo', async () => {
    render(<MinMaxDisabledDemo />);
    await expect.element(page.getByText('Live Preview: Bounds & Disabled Dates')).toBeVisible();
  });
});
