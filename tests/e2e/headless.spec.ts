import { expect, test } from '@playwright/test';

test.describe('Headless Usage Recipe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/recipes/headless');
  });

  test('should render headless custom layout demo', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText('Headless Usage');
  });
});
