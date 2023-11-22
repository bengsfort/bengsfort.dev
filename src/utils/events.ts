
export const BengsfortEvents = {
  GameFocusChanged: 'game-focus-changed',
} as const;


export type GameFocusChangedPayload = {
  isFocused: boolean;
};

export type GameFocusChangedEvent = CustomEvent<GameFocusChangedPayload>;

export const makeGameFocusEvent = (
  payload: GameFocusChangedPayload
): GameFocusChangedEvent => 
  new CustomEvent(BengsfortEvents.GameFocusChanged, {
    detail: payload
  });

(window as any).__MAKE_EV__ = makeGameFocusEvent;
