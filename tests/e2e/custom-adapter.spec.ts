import { expect, test } from '@playwright/test';

test.describe('Custom Adapter Recipe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/recipes/custom-adapter');
  });

  test('should render calendar using custom adapter', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText('Custom Date Adapter');
  });
});
