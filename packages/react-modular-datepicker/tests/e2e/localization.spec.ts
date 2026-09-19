import { expect, test } from '@playwright/test';

test.describe('Localization Recipe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/recipes/localization');
  });

  test('should render localization demo', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText('Localization & RTL Support');
  });
});
