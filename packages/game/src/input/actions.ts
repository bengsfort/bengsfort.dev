export const InputActionsDef = {
  left: ['KeyA', 'ArrowLeft'],
  up: ['KeyW', 'ArrowUp'],
  right: ['KeyD', 'ArrowRight'],
  down: ['KeyS', 'ArrowDown'],
} as const;

export type InputActions = typeof InputActionsDef;
export type InputActionName = keyof InputActions;
export type InputActionKeyCode = InputActions[InputActionName][number];
