import { expect, test } from '@playwright/test';

test.describe('Visual Snapshot Tests (/snapshot)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/snapshot');
    // Wait for all calendars to render
    await expect(page.getByTestId('snapshot-basic')).toBeVisible();
    await expect(page.getByTestId('snapshot-emerald-theme')).toBeVisible();
  });

  test('basic calendar', async ({ page }) => {
    const section = page.getByTestId('snapshot-basic');
    await expect(section).toHaveScreenshot('basic-calendar.png');
  });

  test('range selection calendar', async ({ page }) => {
    const section = page.getByTestId('snapshot-range');
    await expect(section).toHaveScreenshot('range-calendar.png');
  });

  test('multiple selection with disabled dates', async ({ page }) => {
    const section = page.getByTestId('snapshot-multiple');
    await expect(section).toHaveScreenshot('multiple-calendar.png');
  });

  test('custom header and footer', async ({ page }) => {
    const section = page.getByTestId('snapshot-header-footer');
    await expect(section).toHaveScreenshot('header-footer-calendar.png');
  });

  test('neon theme', async ({ page }) => {
    const section = page.getByTestId('snapshot-neon-theme');
    await expect(section).toHaveScreenshot('neon-theme-calendar.png');
  });

  test('violet theme', async ({ page }) => {
    const section = page.getByTestId('snapshot-violet-theme');
    await expect(section).toHaveScreenshot('violet-theme-calendar.png');
  });

  test('emerald theme', async ({ page }) => {
    const section = page.getByTestId('snapshot-emerald-theme');
    await expect(section).toHaveScreenshot('emerald-theme-calendar.png');
  });

  test('localization (Spanish)', async ({ page }) => {
    const section = page.getByTestId('snapshot-localization');
    await expect(section).toHaveScreenshot('localization-spanish-calendar.png');
  });

});
