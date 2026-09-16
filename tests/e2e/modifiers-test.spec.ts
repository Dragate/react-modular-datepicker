import { expect, test } from '@playwright/test';

test.describe('Modifiers Test Page (/modifiers-test)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/modifiers-test');
  });

  test('should provide month and year to custom modifiers and apply styling', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Modifiers Test' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next month' })).toBeVisible();

    const greenDays = page.locator('.bg-green-200');
    const redDays = page.locator('.bg-red-200');

    await expect(greenDays.first()).toBeVisible();
    await expect(redDays.first()).toBeVisible();
  });
});

