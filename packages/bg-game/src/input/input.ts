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

// @todo: update to work with new definitions.
// @todo: should store each core type seperately.
// @todo: expose mouse position/button down too (maybe need renderer for clamp coords to viewport?)
type ActionMap = Record<string, InputActionDefinition>;
type InputAction<Map extends ActionMap> = keyof Map;
type InputCode<
  Map extends ActionMap,
  Action extends InputAction<Map>,
> = Map[Action][number];

export class InputManager<Actions extends ActionMap> {
  #map = new Map<InputAction<Actions>, boolean>();
  #codeMap = new Map<
    InputCode<Actions, InputAction<Actions>>,
    InputAction<Actions>
  >();

  public registerActions(actions: Actions): void {
    // Init code lookup maps
    for (const [action, codes] of Object.entries(actions)) {
      this.#map.set(action as InputAction<Actions>, false);
      codes.forEach((code) =>
        this.#codeMap.set(code, action as InputAction<Actions>),
      );
    }

    document.addEventListener("keydown", this.#handleKeyDown);
    document.addEventListener("keyup", this.#handleKeyUp);

    const actionKeys = Object.keys(actions);
    actionKeys.forEach((act) =>
      this.#map.set(act as InputAction<Actions>, false),
    );
  }

  public getActionActive(action: InputAction<Actions>): boolean {
    return this.#map.get(action) ?? false;
  }

  #handleKeyDown = (ev: KeyboardEvent): void => {
    const code = this.#codeMap.get(
      ev.code as InputCode<Actions, InputAction<Actions>>,
    );
    if (!code) {
      return;
    }

    this.#map.set(code, true);
  };

  #handleKeyUp = (ev: KeyboardEvent): void => {
    const code = this.#codeMap.get(
      ev.code as InputCode<Actions, InputAction<Actions>>,
    );
    if (!code) {
      return;
    }

    this.#map.set(code, false);
  };
}
