import { expect, test } from '@playwright/test';

test.describe('Event & Schedule Recipe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/recipes/event-schedule');
  });

  test('should render event schedule calendar demo and display events', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText('Event & Schedule Calendar');

    await expect(page.getByText('Schedule for', { exact: false })).toBeVisible();
    await expect(page.getByText('Team Sync & Standup', { exact: true })).toBeVisible();

    // Click on 12th day which has a webinar event
    const day12Btn = page.getByText('12', { exact: true }).first();
    await day12Btn.click();

    await expect(page.getByText('React Modular Datepicker Webinar', { exact: true })).toBeVisible();
  });

  test('should render Google Calendar style demo with event badges', async ({ page }) => {
    await expect(page.getByText('Live Preview: Google Calendar Style View')).toBeVisible();

    await expect(page.getByText('Team Standup', { exact: true })).toBeVisible();
    await expect(page.getByText('Webinar Live', { exact: true })).toBeVisible();
  });
});
