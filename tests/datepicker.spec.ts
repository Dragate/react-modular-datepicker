import { test, expect } from '@playwright/test';

test.describe('Datepicker E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/basic');
  });

  test('should select a date in basic mode', async ({ page }) => {
    const day15 = page.getByRole('button', { name: '15' }).first();
    await day15.click();
    await expect(day15).toHaveClass(/bg-brand-gold/);
    await expect(page.getByText(/Selected:/)).toBeVisible();
  });

  test('should navigate months', async ({ page }) => {
    const initialMonth = await page.locator('select').first().inputValue();
    await page.getByLabel('Next month').click();
    const newMonth = await page.locator('select').first().inputValue();
    expect(Number(newMonth)).toBe((Number(initialMonth) + 1) % 12);
  });
});

test.describe('Range Selection', () => {
  test('should select a range', async ({ page }) => {
    await page.goto('http://localhost:3000/range');
    await page.getByRole('button', { name: '10' }).first().click();
    await page.getByRole('button', { name: '20' }).first().click();

    // Check if 15 is highlighted as between
    await expect(page.getByRole('button', { name: '15' }).first()).toHaveClass(/bg-brand-gray-light/);
  });
});

test.describe('Disabled Dates', () => {
  test('should not select a disabled date', async ({ page }) => {
    await page.goto('http://localhost:3000/multiple');
    const day10 = page.getByRole('button', { name: '10' }).first();
    await expect(day10).toBeDisabled();
  });
});
