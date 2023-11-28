import { makeLoggers } from '../utils/logging';

import { Runtime } from './runtime';

const { warnDev } = makeLoggers('game');

const ATTR_GAME_ROOT = '[data-game-root]';
const ATTR_CONTENT_ROOT = '[data-content-root]';
const RESIZE_DELAY_LIMIT = 1 / 30;

const createDebouncedResizer = (runtime: Runtime): (() => void) => {
  let lastResize = 0;

  return () => {
    const now = performance.now();
    if (now - lastResize <= RESIZE_DELAY_LIMIT) {
      return;
    }

    lastResize = now;
    const { innerWidth, innerHeight, devicePixelRatio } = window;
    runtime.resize(innerWidth, innerHeight, devicePixelRatio);
  };
};

export function setupGame() {
  const gameRootEl = document.querySelector(ATTR_GAME_ROOT) as HTMLDivElement;

  if (gameRootEl === null) {
    warnDev(`Game root not found, game will not run!`);
    return;
  }

  const runtime = new Runtime(gameRootEl);

  const updateSize = createDebouncedResizer(runtime);
  window.addEventListener('resize', updateSize);
  updateSize();
}

window.__toggle_game_only__ = (enabled: boolean) => {
  const contentRoot = document.querySelector(ATTR_CONTENT_ROOT) as HTMLElement;
  contentRoot.classList.toggle('visually-hidden', enabled);
};
