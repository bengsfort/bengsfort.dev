// Main game entry point and API definitions.
// This module should be the main place where the game is controlled.

import { GameOptions, initGameOptions } from './config/options';
import { InputActions, InputActionsDef } from './input/actions';
import { InputManager } from './input/input';
import { GameWindow } from './renderer/GameWindow';
import { MainScene } from './scenes/MainScene';
import type { GameContext, GameInstance, GameMode, GameTime } from './schema';
import { PerformanceMonitor } from './utils/PerformanceMonitor';

// @todo (Matti) - Expose events? Game state change, jank detected, etc?
export const initGame = async (
  parent?: HTMLElement,
  opts: Partial<GameOptions> = {},
): Promise<GameInstance> => {
  if (window.GameInstance) {
    throw new Error(
      'Tried initializing a game instance when one exists! This should never happen, and is likely due to something calling `initGame` instead of retrieving the active game.',
    );
  }

  // Setup our main constants.
  const initialGameOpts = initGameOptions(opts);
  const perfMonitor = new PerformanceMonitor();
  const context: GameContext = {
    renderer: new GameWindow({ parent }),
    input: new InputManager<InputActions>(),
  } as const;
  context.input.registerActions(InputActionsDef);

  // Setup a basic timer.
  const getTime = ((startTime: number) => {
    let now = startTime;

    return (timestamp: number): GameTime => {
      const timeSinceStart = timestamp - startTime;
      const deltaTime = timestamp - now;
      now = timestamp;

      return {
        timestamp,
        timeSinceStart,
        deltaTime,
        fixedDeltaTime:
          window.GameOptions.fixedTimeStepMs ?? initialGameOpts.fixedTimeStepMs,
      } as const;
    };
  })(performance.now());

  const scene = new MainScene(context);
  await scene.load();

  let rafHandle: number | null = null;

  context.renderer.onSizeChanged = (width, height) => {
    if (!scene.camera) {
      return;
    }

    const camera = scene.camera;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const gameLoop = (timestamp: number) => {
    rafHandle = requestAnimationFrame(gameLoop);

    const time = getTime(timestamp);
    perfMonitor.frameStart();
    scene.update(time);
    perfMonitor.frameEnd();

    perfMonitor.renderStart();
    context.renderer.draw(scene.scene, scene.camera);
    perfMonitor.renderEnd();

    perfMonitor.captureMemory();
  };

  const instance: GameInstance = {
    renderer: context.renderer,
    input: context.input,
    perfMonitor,

    run() {
      rafHandle = requestAnimationFrame(gameLoop);
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
