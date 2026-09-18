import { expect, test } from '@playwright/test';

test.describe('Form Integration Recipe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/recipes/form-integration');
  });

  test('should render form integration demo', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText('Form Integration');
  });

  test('should close popover when clicking outside the input/calendar', async ({ page }) => {
    const input = page.getByPlaceholder('Pick a date...');
    await expect(input).toBeVisible();

    // Popover is initially closed
    await expect(page.locator('.rmdp')).not.toBeVisible();

    // Click input to open popover
    await input.click();
    await expect(page.locator('.rmdp')).toBeVisible();

    // Click outside (on page heading)
    await page.locator('h1').first().click();

    // Popover should now be closed
    await expect(page.locator('.rmdp')).not.toBeVisible();
  });
});
