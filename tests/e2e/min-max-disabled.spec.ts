import { expect, test } from '@playwright/test';

test.describe('Min, Max & Disabled Dates Page (/min-max-disabled)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/min-max-disabled');
  });

  test('should disable dates outside min/max range and specifically disabled dates', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Min, Max & Disabled Dates' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next month' })).toBeVisible();

    // Verify there are disabled date buttons rendered
    const disabledButtons = page.locator('button[disabled]');
    expect(await disabledButtons.count()).toBeGreaterThan(0);

    // Verify disabled buttons cannot be clicked to select
    const firstDisabled = disabledButtons.first();
    await expect(firstDisabled).toBeDisabled();
  });
});

