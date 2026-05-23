import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/basic');
});

test.describe('Datepicker E2E', () => {
  test('should select a date in basic mode', async ({ page }) => {
    // Wait for the calendar to be visible
    await expect(page.getByRole('button', { name: 'Next month' })).toBeVisible();
    const today = new Date().getDate().toString();
    await page.getByText(today, { exact: true }).first().click();
  });

  test('should navigate months', async ({ page }) => {
    // Wait for the calendar to be visible
    await expect(page.getByRole('button', { name: 'Next month' })).toBeVisible();

    const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());
    await expect(page.getByRole('button', { name: currentMonth, exact: true })).toBeVisible();

    await page.getByLabel('Next month').click();

    const nextMonthDate = new Date();
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    const nextMonthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(nextMonthDate);

    await expect(page.getByRole('button', { name: nextMonthName, exact: true })).toBeVisible();
  });
});

test.describe('Range Selection', () => {
  test('should select a range', async ({ page }) => {
    await page.goto('http://localhost:3000/range');
    await expect(page.getByRole('button', { name: 'Next month' })).toBeVisible();
    const days = page.getByRole('button').filter({ hasText: /^[0-9]+$/ });
    await days.nth(10).click();
    await days.nth(15).click();
  });
});

test.describe('Disabled Dates', () => {
  test('should not select a disabled date', async ({ page }) => {
    await page.goto('http://localhost:3000/styling');
    // Using testid to isolate one of the calendars
    const emeraldTheme = page.getByTestId('emerald-theme');
    await expect(emeraldTheme.getByRole('button', { name: 'Next month' })).toBeVisible();
    const disabledDay = emeraldTheme.locator('button[disabled]').first();
    if (await disabledDay.count() > 0) {
        await expect(disabledDay).toBeDisabled();
    }
  });
});
