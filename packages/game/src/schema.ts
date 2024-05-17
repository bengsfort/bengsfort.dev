import type { InputActions } from './input/actions';
import type { InputManager } from './input/input';
import { PhysicsWorld } from './physics/physics';
import type { GameWindow } from './renderer/GameWindow';
import type { PerformanceMonitor } from './utils/PerformanceMonitor';

export type GameMode = 'idle' | 'game';

export interface GameInstance {
  readonly renderer: GameWindow;
  readonly input: InputManager<InputActions>;
  readonly perfMonitor: PerformanceMonitor;

  run(): void;
  isRunning(): boolean;
  setMode(mode: GameMode): void;
  pause(shouldPause: boolean): void;
  stop(): void;
}

export interface GameContext {
  readonly renderer: GameWindow;
  readonly input: InputManager<InputActions>;
  readonly physics: PhysicsWorld;
}

export interface GameTime {
  /** Last frame duration. Calculated at the beginning of each frame. */
  readonly deltaTime: number;
  /** The current fixed time step. */
  readonly fixedDeltaTime: number;
  /** Last fixed update time. */
  readonly lastFixedUpdateTime: number;
  /** Time since the start of the game. */
  readonly timeSinceStart: number;
  /** The timestamp of this frame.  */
  readonly timestamp: number;
}
