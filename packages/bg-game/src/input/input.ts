import { Vector2 } from "three";

interface InputActionBoolean {
  type: "boolean";
  bindings: readonly string[];
}

interface InputActionRange {
  type: "range";
  minMax: [min: number, max: number];
  bindingsNeg: readonly string[];
  bindingsPos: readonly string[];
}

interface InputActionVectorRange {
  type: "vector_range";
  range: {
    min: { x: number; y: number };
    max: { x: number; y: number };
  };
  bindingsNeg: {
    x: readonly string[];
    y: readonly string[];
  };
  bindingsPos: {
    x: readonly string[];
    y: readonly string[];
  };
}

export type InputActionDefinition =
  | InputActionBoolean
  | InputActionRange
  | InputActionVectorRange;
export type InputActionType = InputActionDefinition["type"];

// @todo: update to work with new definitions.
// @todo: should store each core type seperately.
// @todo: expose mouse position/button down too (maybe need renderer for clamp coords to viewport?)
export type ActionMap = Record<string, InputActionDefinition>;
type InputAction<Map extends ActionMap> = keyof Map;

class BadInputActionError extends Error {
  constructor(action: string) {
    super(`Invalid input action provided (${action})`);
    this.name = "BadInputActionError";
  }
}

class ActionTypeMismatchError extends Error {
  constructor(
    action: InputAction<ActionMap>,
    given: InputActionType,
    expected?: InputActionType,
  ) {
    super(
      `Tried retrieving wrong action type for action "${action}" (tried type ${given}, expected ${expected ?? "unknown"})`,
    );
    this.name = "ActionTypeMismatchError";
  }
}

export class InputManager<Actions extends ActionMap> {
  #_actions?: Actions;
  #_bindingsMap = new Map<string, InputAction<Actions>>();
  #_codeMap = new Map<string, boolean>();
  #_boolActions = new Map<InputAction<Actions>, boolean>();
  #_rangeActions = new Map<InputAction<Actions>, number>();
  #_vecRangeActions = new Map<InputAction<Actions>, Vector2>();

  public clearActions(): void {
    this.#_actions = undefined;
    this.#_codeMap.clear();
    this.#_bindingsMap.clear();
    this.#_boolActions.clear();
    this.#_rangeActions.clear();
    this.#_vecRangeActions.clear();
  }

  public registerActions(actions: Actions): void {
    this.clearActions();

    this.#_actions = actions;

    // Init code lookup maps
    for (const [action, definition] of Object.entries(actions)) {
      const bindings: string[] = [];

      // Determine bindings for this definition and create the initial value.
      switch (definition.type) {
        case "boolean":
          bindings.push(...definition.bindings);
          this.#_boolActions.set(action, false);
          break;

        case "range":
          bindings.push(...definition.bindingsNeg, ...definition.bindingsPos);
          this.#_rangeActions.set(action, 0);
          break;

        case "vector_range":
          bindings.push(
            ...definition.bindingsPos.x,
            ...definition.bindingsPos.y,
            ...definition.bindingsNeg.x,
            ...definition.bindingsNeg.y,
          );
          this.#_vecRangeActions.set(action, new Vector2());
          break;

        default:
          throw new BadInputActionError(action);
      }

      // Cache the bindings for this action.
      for (const bind of bindings) {
        this.#_bindingsMap.set(bind, action);
        this.#_codeMap.set(bind, false);
      }
    }

    document.addEventListener("keydown", this.#handleKeyDown);
    document.addEventListener("keyup", this.#handleKeyUp);
  }

  public getBoolAction(action: InputAction<Actions>): boolean {
    const state = this.#_boolActions.get(action);
    if (typeof state === "undefined") {
      throw new ActionTypeMismatchError(
        action as string,
        "boolean",
        this.#_actions?.[action]?.type,
      );
    }
    return state;
  }

  public getRangeAction(action: InputAction<Actions>): number {
    const state = this.#_rangeActions.get(action);
    if (typeof state === "undefined") {
      throw new ActionTypeMismatchError(
        action as string,
        "range",
        this.#_actions?.[action]?.type,
      );
    }
    return state;
  }

  public getVectorRangeAction(action: InputAction<Actions>): Vector2 {
    const state = this.#_vecRangeActions.get(action);
    if (typeof state === "undefined") {
      throw new ActionTypeMismatchError(
        action as string,
        "vector_range",
        this.#_actions?.[action]?.type,
      );
    }
    return state;
  }

  #handleKeyDown = (ev: KeyboardEvent): void => {
    const keyCode = ev.code;

    // Make sure we care about this particular key being pressed.
    // 1. Grab action name from bindings map
    // 2. Grab action from action map.
    // If either fail, ignore the key press.
    const actionName = this.#_bindingsMap.get(keyCode);
    if (!actionName) {
      return;
    }

    const action = this.#_actions?.[actionName];
    if (!action) {
      return;
    }

    // Before type-specific handling, cache that the key is down.
    this.#_codeMap.set(keyCode, true);

    switch (action.type) {
      case "boolean":
        this.#_boolActions.set(actionName, true);
        break;

      case "range":
        const current = this.#_rangeActions.get(actionName) ?? 0;
        const modifier = action.bindingsPos.includes(keyCode) ? 1 : -1;
        this.#_rangeActions.set(actionName, current + modifier);
        break;

      case "vector_range":
        const vector = this.#_vecRangeActions.get(actionName) ?? new Vector2();
        const xModifier = action.bindingsPos.x.includes(keyCode) ? 1 : -1;
        const yModifier = action.bindingsPos.y.includes(keyCode) ? 1 : -1;
        vector.x += xModifier;
        vector.y += yModifier;
        this.#_vecRangeActions.set(
          actionName,
          vector.clamp(action.range.min, action.range.max).normalize(),
        );
        break;

      default:
        return;
    }
  };

  #handleKeyUp = (ev: KeyboardEvent): void => {
    const keyCode = ev.code;

    const actionName = this.#_bindingsMap.get(keyCode);
    if (!actionName) {
      return;
    }

    const action = this.#_actions?.[actionName];
    if (!action) {
      return;
    }

    this.#_codeMap.set(keyCode, false);

    switch (action.type) {
      case "boolean":
        this.#_boolActions.set(actionName, false);
        break;

      case "range":
        const current = this.#_rangeActions.get(actionName) ?? 0;
        const modifier = action.bindingsPos.includes(keyCode) ? -1 : 1;
        this.#_rangeActions.set(actionName, current + modifier);
        break;

      case "vector_range":
        const vector = this.#_vecRangeActions.get(actionName) ?? new Vector2();
        const xModifier = action.bindingsPos.x.includes(keyCode) ? -1 : 1;
        const yModifier = action.bindingsPos.y.includes(keyCode) ? -1 : 1;
        vector.x += xModifier;
        vector.y += yModifier;
        this.#_vecRangeActions.set(
          actionName,
          vector.clamp(action.range.min, action.range.max).normalize(),
        );
        break;

      default:
        return;
    }
  };
}
