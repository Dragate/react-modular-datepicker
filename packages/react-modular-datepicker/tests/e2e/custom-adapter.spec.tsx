import React from 'react';
import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { CustomAdapterDemo } from '../../../docs/components/demos';

describe('Custom Adapter Recipe', () => {
  test('should render calendar using custom adapter', async () => {
    render(<CustomAdapterDemo />);
    await expect.element(page.getByText('Powered by date-fns adapter without dayjs peer dependency!')).toBeVisible();
  });
});
