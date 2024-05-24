export type GameOptions = {
  /** Active Fixed Time Step duration in ms. Defaults to 60fps (16.6667) */
  fixedTimeStepMs: number;
  /** Render the FPS on top of the canvas. */
  showFps: boolean;
  /** Log all input to the console. */
  debugShowInputCodes: boolean;
  /** Show physics body colliders. */
  debugShowPhysicsBodies: boolean;
};

const defaultGameOptions: GameOptions = {
  fixedTimeStepMs: 1000 / 60,
  showFps: false,
  debugShowInputCodes: false,
  debugShowPhysicsBodies: false,
};

export const initGameOptions = (opts: Partial<GameOptions>) => {
  window.GameOptions = {
    ...defaultGameOptions,
    ...opts,
  };
  return window.GameOptions;
};
