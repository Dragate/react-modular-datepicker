import { expect, test } from '@playwright/test';

test.describe('Multiple Selection Recipe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/recipes/multiple');
  });

  test('should render multiple selection demo', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText('Multiple Selection');
  });
});
