// Main game entry point and API definitions.
// This module should be the main place where the game is controlled.

import { GameOptions, initGameOptions } from './config/options';
import { InputActions, InputActionsDef } from './input/actions';
import { InputManager } from './input/input';
import { GameWindow } from './renderer/GameWindow';

// @todo (Matti) - Expose events? Game state change, jank detected, etc?
export type GameMode = 'idle' | 'game';

let renderer: GameWindow | null = null;
let input: InputManager<InputActions> | null = null;

export const initGame = (
  parent?: HTMLElement,
  opts: Partial<GameOptions> = {},
): Promise<void> => {
  initGameOptions(opts);

  renderer = new GameWindow({ parent });
  input = new InputManager();
  input.registerActions(InputActionsDef);

  return Promise.resolve();
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
