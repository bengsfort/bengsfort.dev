// Main game entry point and API definitions.
// This module should be the main place where the game is controlled.

// @todo (Matti) - Expose events? Game state change, jank detected, etc?
export type GameMode = 'idle' | 'game';

export const initGame = (): Promise<HTMLCanvasElement> => {
  // Create window, globals, consts, etc.
  // Load assets
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
