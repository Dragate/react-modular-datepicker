import { expect, test } from '@playwright/test';

test.describe('Custom Header & Footer Page (/custom-header-footer)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/custom-header-footer');
  });

  test('should render custom header, custom footer, and tooltips', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Custom Header, Footer & Tooltips' })).toBeVisible();

    // Verify custom header and footer
    await expect(page.getByText('My Custom Unified Header')).toBeVisible();
    await expect(page.getByText('My Custom Footer — Showing 2 Months Side-by-Side')).toBeVisible();

    // Hover over 15th to check tooltip
    const fifteenthDay = page.getByRole('button', { name: '15', exact: true }).first();
    await fifteenthDay.hover();
    await expect(page.getByText('Middle of the month!')).toBeAttached();
  });
});

