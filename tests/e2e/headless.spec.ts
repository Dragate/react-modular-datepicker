import { expect, test } from '@playwright/test';

test.describe('Headless Usage Page (/headless)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/headless');
  });

  test('should render custom UI with useDates hook and select dates', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Headless Usage' })).toBeVisible();

    const demo = page.getByTestId('demo-container');
    const prevBtn = demo.getByRole('button', { name: 'Prev' });
    const nextBtn = demo.getByRole('button', { name: 'Next' });
    await expect(prevBtn).toBeVisible();
    await expect(nextBtn).toBeVisible();

    // Click next month
    await nextBtn.click();

    // Select a date
    const dayBtn = page.getByRole('button', { name: '15', exact: true }).first();
    await dayBtn.click();
    await expect(dayBtn).toHaveClass(/bg-amber-500/);
  });
});
