import { expect, test } from '@playwright/test';

test.describe('Availability Demo Page (/availability)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/availability');
  });

  test('should load availability data and render available/unavailable dates', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Availability Demo' })).toBeVisible();

    // Wait for the loading spinner to complete
    await expect(page.locator('.animate-spin')).toBeHidden({ timeout: 10000 });

    // Verify calendar is rendered
    await expect(page.getByRole('button', { name: 'Next month' })).toBeVisible();

    // Check that either green available days or red unavailable days exist
    const styledDays = page.locator('.bg-green-100, .bg-red-50');
    await expect(styledDays.first()).toBeVisible();
  });
});

