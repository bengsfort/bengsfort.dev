export const BengsfortEvents = {
  gameFocusChanged: 'game-focus-changed',
} as const;

export type GameFocusChangedPayload = {
  isFocused: boolean;
};

export type GameFocusChangedEvent = CustomEvent<GameFocusChangedPayload>;

export const makeGameFocusEvent = (
  payload: GameFocusChangedPayload,
): GameFocusChangedEvent =>
  new CustomEvent(BengsfortEvents.gameFocusChanged, {
    detail: payload,
  });
