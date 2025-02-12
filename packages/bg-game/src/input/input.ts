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
  minMax: {
    x: [min: number, max: number];
    y: [min: number, max: number];
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
type ActionMap = Record<string, InputActionDefinition>;
type InputAction<Map extends ActionMap> = keyof Map;

const isBoolAction = (act: InputActionDefinition): act is InputActionBoolean =>
  act.type === "boolean";
const isRangeAction = (act: InputActionDefinition): act is InputActionRange =>
  act.type === "range";
const isVecRangeAction = (
  act: InputActionDefinition,
): act is InputActionVectorRange => act.type === "vector_range";

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
          throw new Error("Invalid Input Action Definition provided");
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
    const code = this.#_codeMap.get(ev.code);
    if (!code) {
      return;
    }

    const code = this.#codeMap.get(
      ev.code as InputCode<Actions, InputAction<Actions>>,
    );
    if (!code) {
      return;
    }

    this.#_map.set(code, true);
  };

  #handleKeyUp = (ev: KeyboardEvent): void => {
    const code = this.#codeMap.get(
      ev.code as InputCode<Actions, InputAction<Actions>>,
    );
    if (!code) {
      return;
    }

    this.#_map.set(code, false);
  };
}
