import { ReactElement, act } from 'react';
import { Root, createRoot } from 'react-dom/client';
import { afterEach, beforeEach } from 'vitest';

export interface SetupComponentResult {
  readonly container: HTMLDivElement;
  readonly root: Root;
  render: (ui: ReactElement) => void;
}

/**
 * Sets up a DOM container and React root before each test,
 * automatically rendering the provided React element (if given),
 * and cleaning up (unmounting and removing the container) after each test.
 */
export function setupComponent(
  getUi?: ReactElement | (() => ReactElement)
): SetupComponentResult {
  let container!: HTMLDivElement;
  let root!: Root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);

    if (getUi) {
      const ui = typeof getUi === 'function' ? getUi() : getUi;
      act(() => {
        root.render(ui);
      });
    }
  });

  afterEach(() => {
    if (root) {
      act(() => {
        root.unmount();
      });
    }
    if (container && container.parentNode) {
      container.remove();
    }
  });

  return {
    get container() {
      return container;
    },
    get root() {
      return root;
    },
    render(ui: ReactElement) {
      act(() => {
        root.render(ui);
      });
    },
  };
}
