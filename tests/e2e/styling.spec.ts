import { expect, test } from '@playwright/test';

test.describe('Custom Styling Recipe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/recipes/custom-styling');
  });

  test('should render custom styling demo', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Custom Styling & Themes', exact: true })).toBeVisible();
  });
});
