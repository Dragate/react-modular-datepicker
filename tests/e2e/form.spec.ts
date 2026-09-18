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

  test('should open calendar to selected date month when reopened', async ({ page }) => {
    const input = page.getByPlaceholder('Pick a date...');
    await input.click();
    await expect(page.locator('.rmdp')).toBeVisible();

    // Click Next month button in calendar header
    const nextBtn = page.getByLabel('Next month');
    await nextBtn.click();

    // Select day 15 in next month
    const dayBtn = page.getByText('15', { exact: true }).first();
    await dayBtn.click();

    // Popover closes on date selection
    await expect(page.locator('.rmdp')).not.toBeVisible();

    // Verify input value is non-empty
    await expect(input).not.toHaveValue('');

    // Reopen calendar
    await input.click();
    await expect(page.locator('.rmdp')).toBeVisible();

    // Verify the selected day 15 is visible and selected in the reopened calendar
    const selectedDay = page.locator('.rmdp [aria-pressed="true"]');
    await expect(selectedDay).toBeVisible();
    await expect(selectedDay).toHaveText('15');
  });
});
