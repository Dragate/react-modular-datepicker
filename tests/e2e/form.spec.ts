import { expect, test } from '@playwright/test';

test.describe('Form Integration Recipe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/recipes/form-integration');
  });

  test('should render form integration demo', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText('Form Integration');
  });
});
