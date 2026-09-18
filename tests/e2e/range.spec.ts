import { expect, test } from '@playwright/test';

test.describe('Range Selection Recipe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/recipes/range');
  });

  test('should render range selection demo', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Range Selection', exact: true })).toBeVisible();
  });
});
