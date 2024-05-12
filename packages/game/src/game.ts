// Main game entry point and API definitions.
// This module should be the main place where the game is controlled.

import { GameWindow } from './renderer/GameWindow';

// @todo (Matti) - Expose events? Game state change, jank detected, etc?
export type GameMode = 'idle' | 'game';

let renderer: GameWindow | null = null;

export const initGame = (parent?: HTMLElement): Promise<void> => {
  renderer = new GameWindow({ parent });
  return Promise.reject();
};

export const runGame = () => {
  // Start game loop
};

export const setGameMode = (_: GameMode) => {
  // Set game mode
  // Update game scenes
};

export const pauseGame = () => {
  // Pause game loop
};

export const stopGame = () => {
  // Stop game loop
  // Clean up
};
