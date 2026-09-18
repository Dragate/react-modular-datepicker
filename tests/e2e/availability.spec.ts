import { expect, test } from '@playwright/test';

test.describe('Availability & Booking Recipe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/recipes/availability');
  });

  test('should render availability calendar demo and handle booking slot selection', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText('Availability & Booking Calendar');

    await expect(page.getByText('Available Times:', { exact: false })).toBeVisible();
    await expect(page.getByRole('button', { name: '09:00 AM' })).toBeVisible();

    // Click on time slot
    await page.getByRole('button', { name: '10:30 AM' }).click();

    // Click confirm appointment
    await page.getByRole('button', { name: 'Confirm Appointment' }).click();

    await expect(page.getByText('Appointment Confirmed!')).toBeVisible();
  });
});
