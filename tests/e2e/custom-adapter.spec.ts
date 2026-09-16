import { expect, test } from '@playwright/test';

test.describe('Custom Adapter Page (/custom-adapter)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/custom-adapter');
  });

  test('should render calendar and select date with custom date-fns adapter', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Custom Adapter (date-fns)' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next month' })).toBeVisible();

    const today = new Date().getDate().toString();
    const dayBtn = page.getByText(today, { exact: true }).first();
    await dayBtn.click();

    await expect(dayBtn).toHaveClass(/bg-brand-gold/);
    await expect(page.locator('p', { hasText: 'Selected:' })).toBeVisible();
  });
});

