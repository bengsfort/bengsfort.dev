type ActionMap = Record<string, readonly string[]>;
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
