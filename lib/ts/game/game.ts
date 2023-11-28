import {} from 'three';
import { makeLoggers } from '../utils/logging';

const { warnDev } = makeLoggers('game');

export function setupGame() {
  const gameRootEl = document.querySelector('[data-game-root]') as HTMLDivElement;

  if (gameRootEl === null) {
    warnDev(`Game root not found, game will not run!`);
    return;
  }

  // @todo
}

function initGame(root: HTMLDivElement) {}
