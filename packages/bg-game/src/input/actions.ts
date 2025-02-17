import { ActionMap } from "./input";

// These get registered with the input manager during setup.
export const InputActions: ActionMap = {
  move: {
    type: "vector_range",
    range: {
      min: { x: -1, y: -1 },
      max: { x: 1, y: 1 },
    },
    bindingsNeg: {
      x: ["KeyA", "ArrowLeft"],
      y: ["KeyS", "ArrowDown"],
    },
    bindingsPos: {
      x: ["KeyD", "ArrowRight"],
      y: ["KeyW", "ArrowUp"],
    },
  },
  actionKey1: {
    type: "boolean",
    bindings: ["Digit1"],
  },
  actionKey2: {
    type: "boolean",
    bindings: ["Digit2"],
  },
  actionKey3: {
    type: "boolean",
    bindings: ["Digit3"],
  },
  actionKey4: {
    type: "boolean",
    bindings: ["Digit4"],
  },
} as const;
