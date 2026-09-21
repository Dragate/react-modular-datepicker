import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';
import { Calendar } from 'react-modular-datepicker';

describe('YearSelection scrolling test', () => {
  test('scrolls year container scrollTop without calling window/document scrollIntoView', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const scrollIntoViewSpy = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewSpy;

    const testDate = new Date(2026, 8, 15);

    act(() => {
      root.render(<Calendar date={testDate} />);
    });

    const yearHeaderBtn = Array.from(container.querySelectorAll('.rmd-month-year-button'))[1] as HTMLButtonElement;
    expect(yearHeaderBtn).not.toBeNull();

    act(() => {
      yearHeaderBtn.click();
    });

    const yearsGrid = container.querySelector('.rmd-years-grid') as HTMLDivElement;
    expect(yearsGrid).not.toBeNull();

    expect(scrollIntoViewSpy).not.toHaveBeenCalled();

    act(() => {
      root.unmount();
    });
    container.remove();
  });
});
