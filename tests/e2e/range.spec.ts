import { expect, test } from '@playwright/test';

test.describe('Range Selection Page (/range)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/range');
  });

  test('should render 2-month range calendar and allow selecting a range', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Range Selection' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next month' })).toBeVisible();

    const days = page.getByRole('button').filter({ hasText: /^[0-9]+$/ });
    await days.nth(10).click();
    await days.nth(15).click();

    await expect(page.locator('p', { hasText: 'Range:' })).toBeVisible();
  });
});

