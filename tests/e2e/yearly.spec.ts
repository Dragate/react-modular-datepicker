import { expect, test } from '@playwright/test';

test.describe('Yearly View Recipe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/recipes/yearly');
  });

  test('should render multi-month demo without calendar month overlaps', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Multi-Month Grid', exact: true })).toBeVisible();

    const calendarContainers = page.locator('.rmdp > div > div');
    const count = await calendarContainers.count();
    expect(count).toBeGreaterThanOrEqual(3);

    const boxes = [];
    for (let i = 0; i < count; i++) {
      const box = await calendarContainers.nth(i).boundingBox();
      expect(box).not.toBeNull();
      if (box) boxes.push(box);
    }

    for (let i = 0; i < boxes.length - 1; i++) {
      const b1 = boxes[i];
      const b2 = boxes[i + 1];
      if (Math.abs(b1.y - b2.y) < 10) {
        expect(b2.x).toBeGreaterThanOrEqual(b1.x + b1.width - 1);
      } else {
        expect(b2.y).toBeGreaterThanOrEqual(b1.y + b1.height - 1);
      }
    }
  });
});
