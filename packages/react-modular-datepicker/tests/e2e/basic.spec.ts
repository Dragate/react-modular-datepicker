import { expect, test } from '@playwright/test';

test.describe('Basic Selection Recipe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/recipes/basic');
  });

  test('should render calendar and select a date', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText('Basic Selection');

    const today = new Date().getDate().toString();
    const dayBtn = page.getByText(today, { exact: true }).first();
    await dayBtn.click();

    await expect(page.getByText('Selected:', { exact: false })).toBeVisible();
  });
});
