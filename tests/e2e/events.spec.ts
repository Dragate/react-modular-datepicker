import { expect, test } from '@playwright/test';

test.describe('Events Page (/events)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/events');
  });

  test('should render calendar grid with event badges and allow selecting dates', async ({ page }) => {
    await expect(page.getByText('Full-featured Monthly Calendar Example')).toBeVisible();

    // Check that event badges are rendered
    const eventBadge = page.getByText('Team Sync');
    await expect(eventBadge).toBeVisible();

    // Check today button
    const todayButton = page.getByRole('button', { name: 'Today' });
    await expect(todayButton).toBeVisible();
    await todayButton.click();
  });
});

