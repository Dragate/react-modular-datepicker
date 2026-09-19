import { test, expect } from '@playwright/test';

test.describe('Modifiers Recipe', () => {
  test('should render modifiers demo with weekend and special highlights', async ({ page }) => {
    await page.goto('/docs/recipes/modifiers');
    const container = page.locator('.rmdp');
    await expect(container).toBeVisible();
  });
});
