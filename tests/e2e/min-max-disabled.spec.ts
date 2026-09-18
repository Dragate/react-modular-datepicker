import { expect, test } from '@playwright/test';

test.describe('Min Max Disabled Recipe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/recipes/min-max-disabled');
  });

  test('should render bounds demo', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText('Min, Max & Disabled Dates');
  });
});
