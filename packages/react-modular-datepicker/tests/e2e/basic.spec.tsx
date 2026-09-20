import React from 'react';
import { describe, expect, test } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { BasicDemo } from '../../../docs/components/demos';

describe('Basic Selection Recipe', () => {
  test('should render calendar and select a date', async () => {
    render(<BasicDemo />);

    const today = new Date().getDate().toString();
    const dayBtn = page.getByText(today).first();
    await userEvent.click(dayBtn);

    await expect.element(page.getByText('Selected:', { exact: false })).toBeVisible();
  });
});
