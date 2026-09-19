import { test, expect } from '@playwright/test';

test.describe('Modifiers Recipe', () => {
  test('should render modifiers demo with weekend and special highlights', async ({ page }) => {
    await page.goto('/docs/recipes/modifiers');
    const container = page.locator('.rmdp');
    await expect(container).toBeVisible();

    // Verify birthday highlight and tooltip
    const birthdayBtn = container.locator('button[data-tooltip="🎂 Birthday!"]').first();
    await expect(birthdayBtn).toBeVisible();
    const birthdayClass = await birthdayBtn.getAttribute('class');
    expect(birthdayClass).toContain('!text-pink-600');

    // Verify holiday highlight and tooltip
    const holidayBtn = container.locator('button[data-tooltip="🎉 Holiday"]').first();
    await expect(holidayBtn).toBeVisible();
    const holidayClass = await holidayBtn.getAttribute('class');
    expect(holidayClass).toContain('border-emerald-500');

    // Verify weekend highlight and tooltip
    const weekendBtn = container.locator('button[data-tooltip="🌴 Weekend"]').first();
    await expect(weekendBtn).toBeVisible();
    const weekendClass = await weekendBtn.getAttribute('class');
    expect(weekendClass).toContain('!bg-indigo-100/70');
  });
});
