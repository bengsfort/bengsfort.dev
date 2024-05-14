// Main game entry point and API definitions.
// This module should be the main place where the game is controlled.

import { GameOptions, initGameOptions } from './config/options';
import { InputActions, InputActionsDef } from './input/actions';
import { InputManager } from './input/input';
import { GameWindow } from './renderer/GameWindow';
import { MainScene } from './scenes/MainScene';
import { PerformanceMonitor } from './utils/PerformanceMonitor';

// @todo (Matti) - Expose events? Game state change, jank detected, etc?
export type GameMode = 'idle' | 'game';

export interface GameInstance {
  readonly renderer: GameWindow;
  readonly input: InputManager<Record<string, readonly string[]>>;
  readonly perfMonitor: PerformanceMonitor;

  run(): void;
  isRunning(): boolean;
  setMode(mode: GameMode): void;
  pause(shouldPause: boolean): void;
  stop(): void;
}

export const initGame = async (
  parent?: HTMLElement,
  opts: Partial<GameOptions> = {},
): Promise<GameInstance> => {
  initGameOptions(opts);

  const perfMonitor = new PerformanceMonitor();
  const renderer = new GameWindow({ parent });
  const input = new InputManager<InputActions>();
  input.registerActions(InputActionsDef);

  const scene = new MainScene(renderer);
  await scene.load();

  let rafHandle: number | null = null;

  renderer.onSizeChanged = (width, height) => {
    if (!scene?.camera) {
      return;
    }

    const camera = scene.camera;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const gameLoop = (timestamp: number) => {
    rafHandle = requestAnimationFrame(gameLoop);

    if (!scene || !renderer || !perfMonitor) {
      return;
    }

    perfMonitor.frameStart();
    scene.update(timestamp);
    perfMonitor.frameEnd();

    perfMonitor.renderStart();
    renderer.draw(scene.scene, scene.camera);
    perfMonitor.renderEnd();

    perfMonitor?.captureMemory();
  };

  const instance: GameInstance = {
    renderer,
    input,
    perfMonitor,

    run() {
      gameLoop(performance.now());
      window.GameInstance = instance;
    },

    isRunning() {
      return rafHandle !== null;
    },

    setMode(_mode: GameMode) {
      // Set game mode
      // Update game scenes
    },

    pause(shouldPause: boolean) {
      if (shouldPause && rafHandle !== null) {
        cancelAnimationFrame(rafHandle!);
        rafHandle = null;
      } else {
        instance.run();
      }
    },

    stop() {
      cancelAnimationFrame(rafHandle!);
      rafHandle = null;
      window.GameInstance = undefined;
    },
  };

  return instance;
};
