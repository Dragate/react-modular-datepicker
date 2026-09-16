import { expect, test } from '@playwright/test';

test.describe('Localization Page (/localization)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/localization');
  });

  test('should render translated months and weekdays when switching language', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Localization & i18n' })).toBeVisible();

    // Default is Spanish (Lun, Mar, Mié)
    await expect(page.getByText('Lun', { exact: true })).toBeVisible();

    // Switch to French
    await page.getByRole('button', { name: 'Français (French)' }).click();
    await expect(page.getByText('Mer', { exact: true })).toBeVisible();

    // Switch to Japanese
    await page.getByRole('button', { name: '日本語 (Japanese)' }).click();
    await expect(page.getByText('月', { exact: true })).toBeVisible();
    await expect(page.getByText('火', { exact: true })).toBeVisible();
  });
});

