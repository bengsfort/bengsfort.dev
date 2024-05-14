import { makeLoggers } from '../utils/logging';

const { info, warn } = makeLoggers('InputManager');

export type ActionStateListener = (state: boolean) => void;

export class InputManager<
  ActionMap extends Record<string, readonly string[]>,
  ActionName extends keyof ActionMap = keyof ActionMap,
  ActionKeyCode extends ActionMap[ActionName][number] = ActionMap[ActionName][number],
> {
  #_actionState: Map<ActionName, boolean> = new Map();
  #_actionLookupMap: Map<ActionKeyCode, ActionName> = new Map();
  #_actionListeners: Map<ActionName, Set<ActionStateListener>> = new Map();

  public registerActions(actionMap: ActionMap) {
    // Init code lookup maps
    for (const [action, codes] of Object.entries(actionMap)) {
      this.#_actionState.set(action as ActionName, false);
      this.#_actionListeners.set(action as ActionName, new Set());
      codes.forEach((code) =>
        this.#_actionLookupMap.set(code as ActionKeyCode, action as ActionName),
      );
    }

    document.addEventListener('keydown', this.#handleKeyDown);
    document.addEventListener('keyup', this.#handleKeyUp);
  }

  public getAxis(actionNeg: ActionName, actionPos: ActionName): number {
    let result = 0;

    if (this.isActionActive(actionPos)) {
      result += 1;
    }

    if (this.isActionActive(actionNeg)) {
      result -= 1;
    }

    return result;
  }

  public isActionActive(action: ActionName) {
    return this.#_actionState.get(action) ?? false;
  }

  public addActionListener(action: ActionName, listener: ActionStateListener) {
    const listeners = this.#_actionListeners.get(action);
    if (!listeners) {
      warn(`Trying to listen for action ${action as string} which is not registered!`);
      return;
    }

    listeners.add(listener);
  }

  public removeActionListener(action: ActionName, listener: ActionStateListener) {
    const listeners = this.#_actionListeners.get(action);
    if (!listeners) {
      warn(
        `Trying to remove listener for action ${
          action as string
        } which is not registered!`,
      );
      return;
    }

    listeners.delete(listener);
  }

  #dispatchStateChange(action: ActionName) {
    const state = this.#_actionState.get(action) ?? false;
    const listeners = this.#_actionListeners.get(action);
    if (!listeners) {
      return;
    }

    for (const listener of listeners) {
      listener(state);
    }
  }

  #handleKeyDown = (ev: KeyboardEvent) => {
    window.GameOptions.debugShowInputCodes && info(`Key down: ${ev.code}`);

    const code = this.#_actionLookupMap.get(ev.code as ActionKeyCode);
    if (!code) {
      return;
    }

    this.#_actionState.set(code, true);
    this.#dispatchStateChange(code);
  };

  #handleKeyUp = (ev: KeyboardEvent) => {
    window.GameOptions.debugShowInputCodes && info(`Key up: ${ev.code}`);

    const code = this.#_actionLookupMap.get(ev.code as ActionKeyCode);
    if (!code) {
      return;
    }

    this.#_actionState.set(code, false);
    this.#dispatchStateChange(code);
  };
}
