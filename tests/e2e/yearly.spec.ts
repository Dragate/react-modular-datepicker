import { expect, test } from '@playwright/test';

test.describe('Yearly View Page (/yearly)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/yearly');
  });

  test('should render 12 months side-by-side in grid view', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Yearly View' })).toBeVisible();

    // Verify multiple months are displayed (e.g. January, June, December)
    await expect(page.getByRole('button', { name: 'January', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'June', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'December', exact: true })).toBeVisible();
  });
});

