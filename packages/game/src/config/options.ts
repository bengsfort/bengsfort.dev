import { EventEmitter } from '../utils/EventEmitter';

export interface GameOptions {
  /** Active Fixed Time Step duration in ms. Defaults to 60fps (16.6667) */
  fixedTimeStepMs: number;
  /** Render the FPS on top of the canvas. */
  showFps: boolean;
  /** Log all input to the console. */
  debugShowInputCodes: boolean;
  /** Show physics body colliders. */
  debugShowPhysicsBodies: boolean;
}

type EventMap = {
  [Option in keyof GameOptions as `updated:${Option}`]: [value: GameOptions[Option]];
};

class GameOptionsInstance implements GameOptions {
  public addListener: EventEmitter<EventMap>['addListener'];
  public removeListener: EventEmitter<EventMap>['removeListener'];

  #_options: GameOptions;
  #_emitter: EventEmitter<EventMap>;

  constructor(options: GameOptions) {
    this.#_options = options;
    this.#_emitter = new EventEmitter<EventMap>();
    this.addListener = (...args) => this.#_emitter.addListener(...args);
    this.removeListener = (...args) => this.#_emitter.removeListener(...args);
  }

  public get fixedTimeStepMs() {
    return this.#_options.fixedTimeStepMs;
  }

  public set fixedTimeStepMs(value: number) {
    this.#_options.fixedTimeStepMs = value;
    this.#_emitter.emit('updated:fixedTimeStepMs', value);
  }

  public get showFps() {
    return this.#_options.showFps;
  }

  public set showFps(value: boolean) {
    this.#_options.showFps = value;
    this.#_emitter.emit('updated:showFps', value);
  }

  public get debugShowInputCodes() {
    return this.#_options.debugShowInputCodes;
  }

  public set debugShowInputCodes(value: boolean) {
    this.#_options.debugShowInputCodes = value;
    this.#_emitter.emit('updated:debugShowInputCodes', value);
  }

  public get debugShowPhysicsBodies() {
    return this.#_options.debugShowPhysicsBodies;
  }

  public set debugShowPhysicsBodies(value: boolean) {
    this.#_options.debugShowPhysicsBodies = value;
    this.#_emitter.emit('updated:debugShowPhysicsBodies', value);
  }

  public toJSON() {
    return JSON.stringify(this.#_options);
  }
}

const defaultGameOptions: GameOptions = {
  fixedTimeStepMs: 1000 / 60,
  showFps: false,
  debugShowInputCodes: false,
  debugShowPhysicsBodies: false,
};

export const initGameOptions = (opts: Partial<GameOptions>): GameOptionsInstance => {
  const instance = new GameOptionsInstance({
    ...defaultGameOptions,
    ...opts,
  });
  window.GameOptions = instance;
  return instance;
};
