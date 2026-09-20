import React from 'react';
import { describe, expect, test } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { AvailabilityDemo } from '../../../docs/components/demos';

describe('Availability & Booking Recipe', () => {
  test('should render availability calendar demo and handle booking slot selection', async () => {
    render(<AvailabilityDemo />);

    await expect.element(page.getByText('Available Times:', { exact: false })).toBeVisible();
    await expect.element(page.getByRole('button', { name: '09:00 AM' })).toBeVisible();

    // Click on time slot
    await userEvent.click(page.getByRole('button', { name: '10:30 AM' }));

    // Click confirm appointment
    await userEvent.click(page.getByRole('button', { name: 'Confirm Appointment' }));

    await expect.element(page.getByText('Appointment Confirmed!')).toBeVisible();
  });

  test('should display loading spinner overlay on month change', async () => {
    render(<AvailabilityDemo />);

    // Click next month chevron button
    const nextBtn = page.getByRole('button', { name: 'Next month' });
    await userEvent.click(nextBtn);

    // Assert loading overlay text appears
    await expect.element(page.getByText('Fetching availabilities...')).toBeVisible();

    // Wait for loading overlay to finish
    await expect.element(page.getByText('Fetching availabilities...')).not.toBeInTheDocument();
  });
});
