import { expect, test } from '@playwright/test';

test.describe('Event & Schedule Recipe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/recipes/event-schedule');
  });

  test('should render event schedule calendar demo with dynamic data-tooltip attributes', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText('Event & Schedule Calendar');

    // Day 5 has 2 events
    const day5Btn = page.locator('button', { hasText: '5' }).first();
    await expect(day5Btn).toHaveAttribute('data-tooltip', '2 events');

    // Day 12 has 1 event
    const day12Btn = page.locator('button', { hasText: '12' }).first();
    await expect(day12Btn).toHaveAttribute('data-tooltip', '1 event');
  });

  test('should render Google Calendar style demo with event badges', async ({ page }) => {
    await expect(page.getByText('Live Preview: Google Calendar Style View')).toBeVisible();

    await expect(page.getByText('Team Standup', { exact: true })).toBeVisible();
    await expect(page.getByText('Webinar Live', { exact: true })).toBeVisible();
  });
});
