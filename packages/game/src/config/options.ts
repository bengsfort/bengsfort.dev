export type GameOptions = {
  debugShowInputCodes: boolean;
  showFps: boolean;
};

const defaultGameOptions: GameOptions = {
  debugShowInputCodes: false,
  showFps: false,
};

export const initGameOptions = (opts: Partial<GameOptions>) => {
  window.GameOptions = {
    ...defaultGameOptions,
    ...opts,
  };
};
