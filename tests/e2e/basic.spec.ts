import { expect, test } from '@playwright/test';

test.describe('Basic Selection Page (/basic)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/basic');
  });

  test('should render calendar and select a date with visible selected styling', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Basic Selection' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next month' })).toBeVisible();

    const today = new Date().getDate().toString();
    const dayBtn = page.getByText(today, { exact: true }).first();
    await dayBtn.click();

    await expect(dayBtn).toHaveClass(/bg-brand-gold/);
    await expect(dayBtn).toHaveClass(/text-white/);
    await expect(dayBtn).not.toHaveClass(/\bbg-white\b/);

    const selectedText = page.locator('p', { hasText: 'Selected:' });
    await expect(selectedText).toBeVisible();
  });

  test('should navigate between months', async ({ page }) => {
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

