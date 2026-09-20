import React from 'react';
import { describe, expect, test } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { FormIntegrationDemo } from '../../../docs/components/demos';

describe('Form Integration Recipe', () => {
  test('should render form integration demo', async () => {
    render(<FormIntegrationDemo />);
    await expect.element(page.getByPlaceholder('Pick a date...')).toBeVisible();
  });

  test('should close popover when clicking outside the input/calendar', async () => {
    render(<FormIntegrationDemo />);
    const input = page.getByPlaceholder('Pick a date...');

    // Popover is initially closed
    await expect.element(page.getByRole('button', { name: 'Previous month' })).not.toBeInTheDocument();

    // Click input to open popover
    await userEvent.click(input);
    await expect.element(page.getByRole('button', { name: 'Previous month' })).toBeVisible();

    // Click outside
    await userEvent.click(page.getByText('Live Preview: Popover / Form Integration'));

    // Popover should now be closed
    await expect.element(page.getByRole('button', { name: 'Previous month' })).not.toBeInTheDocument();
  });

  test('should open calendar to selected date month when reopened', async () => {
    render(<FormIntegrationDemo />);
    const input = page.getByPlaceholder('Pick a date...');

    await userEvent.click(input);
    await expect.element(page.getByRole('button', { name: 'Previous month' })).toBeVisible();

    // Click Next month button in calendar header
    const nextBtn = page.getByRole('button', { name: 'Next month' });
    await userEvent.click(nextBtn);

    // Select day 15 in next month
    const dayBtn = page.getByText('15').first();
    await userEvent.click(dayBtn);

    // Popover closes on date selection
    await expect.element(page.getByRole('button', { name: 'Previous month' })).not.toBeInTheDocument();

    // Reopen calendar
    await userEvent.click(input);
    await expect.element(page.getByRole('button', { name: 'Previous month' })).toBeVisible();

    // Verify day 15 is visible
    await expect.element(page.getByText('15').first()).toBeVisible();
  });
});
