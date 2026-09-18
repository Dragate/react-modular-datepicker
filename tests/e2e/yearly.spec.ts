import { expect, test } from '@playwright/test';

test.describe('Yearly View Recipe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/recipes/yearly');
  });

  test('should render multi-month demo', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Yearly View' })).toBeVisible();
  });
});
