import { expect, test } from '@playwright/test';

test.describe('Multiple Selection Page (/multiple)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/multiple');
  });

  test('should display initial count and toggle multiple selected dates', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Multiple Selection & Disabled Dates' })).toBeVisible();
    await expect(page.getByText('Selected count: 4')).toBeVisible();

    // Find the 10th (which is configured as disabled)
    const disabledTenth = page.getByRole('button', { name: '10', exact: true }).first();
    if (await disabledTenth.count() > 0) {
      await expect(disabledTenth).toBeDisabled();
    }

    // Click an unselected day (e.g. 2nd or 3rd)
    const secondDay = page.getByRole('button', { name: '2', exact: true }).first();
    await secondDay.click();
    await expect(page.getByText('Selected count: 5')).toBeVisible();
  });
});

