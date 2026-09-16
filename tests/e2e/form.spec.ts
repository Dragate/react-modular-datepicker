import { expect, test } from '@playwright/test';

test.describe('Form Integration Page (/form)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/form');
  });

  test('should open calendar dropdown on focus and select date into input', async ({ page }) => {
    const input = page.locator('#datepicker');
    await expect(input).toBeVisible();

    // Focus input to display the popup calendar
    await input.focus();

    const today = new Date().getDate().toString();
    const dayBtn = page.getByText(today, { exact: true }).first();
    await dayBtn.click();

    // Input should now have a date string value
    await expect(input).not.toHaveValue('');
    await expect(page.getByText('Selected Date:')).toBeVisible();
  });
});

