import { expect, test } from '@playwright/test';

test.describe('Styling Showcase Page (/styling)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/styling');
  });

  test('should render custom styled calendar themes', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Custom Styling Showcase' })).toBeVisible();

    const neonTheme = page.getByTestId('neon-theme');
    await expect(neonTheme).toBeVisible();
    await expect(neonTheme.getByRole('button', { name: 'Next month' })).toBeVisible();

    const violetTheme = page.getByTestId('violet-theme');
    await expect(violetTheme).toBeVisible();

    const emeraldTheme = page.getByTestId('emerald-theme');
    await expect(emeraldTheme).toBeVisible();
  });
});

