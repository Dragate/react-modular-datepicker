import React from 'react';
import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { EventScheduleDemo, GoogleCalendarDemo } from '../../../docs/components/demos';

describe('Event & Schedule Recipe', () => {
  test('should render event schedule calendar demo with dynamic data-tooltip attributes', async () => {
    render(<EventScheduleDemo />);

    const day5Btn = page.getByRole('button', { name: '5' }).first();
    await expect.element(day5Btn).toHaveAttribute('data-tooltip', '2 events');

    const day12Btn = page.getByRole('button', { name: '12' }).first();
    await expect.element(day12Btn).toHaveAttribute('data-tooltip', '1 event');
  });

  test('should render Google Calendar style demo with event badges', async () => {
    render(<GoogleCalendarDemo />);

    await expect.element(page.getByText('Live Preview: Google Calendar Style View')).toBeVisible();
    await expect.element(page.getByText('Team Standup')).toBeVisible();
    await expect.element(page.getByText('Webinar Live')).toBeVisible();
  });
});
