import { expect, test } from '@playwright/test';

test.describe('Custom Header Footer Recipe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/recipes/custom-header-footer');
  });

  test('should render header and footer', async ({ page }) => {
    await expect(page.getByText('Custom Header Banner', { exact: false })).toBeVisible();
  });
});
