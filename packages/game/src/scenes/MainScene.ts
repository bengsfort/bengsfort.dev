import { PerspectiveCamera, Scene, Vector3 } from 'three';

import { Grid } from '../entities/grid/grid';
import { Player } from '../entities/player/Player';
import type { GameWindow } from '../renderer/GameWindow';
import type { GameContext, GameTime } from '../schema';

import type { SceneDef } from './SceneDef';

const Vec3Zero = new Vector3(0, 0, 0);

export class MainScene implements SceneDef {
  public readonly name = 'MainScene';
  public readonly scene = new Scene();

  #_context: GameContext;
  #_player: Player;
  #_camera: PerspectiveCamera;

  public get camera(): PerspectiveCamera {
    return this.#_camera;
  }

  constructor(context: GameContext) {
    this.#_context = context;
    this.#_camera = this.#createCamera(context.renderer);
    this.#_player = new Player(context);
    this.scene.add(this.#_player);
    this.#createEnvironment();
  }

  public async load(): Promise<void> {
    return Promise.resolve();
  }

  public update(time: GameTime): void {
    this.#_camera.position.y = 25 + Math.sin(time.timestamp / 1000) * 0.25;
    this.#_camera.position.x = -15 + Math.cos(time.timestamp / 500) * 0.05;

    // Temp test
    this.#_player.update(time);
  }

  public fixedUpdate(time: GameTime): void {
    this.#_player.fixedUpdate(time);
  }

  #createCamera(renderer: GameWindow): PerspectiveCamera {
    const camera = new PerspectiveCamera(
      50,
      renderer.outputWidth / renderer.outputHeight,
      0.1,
      1000,
    );
    camera.position.set(-15, 25, -15);
    camera.lookAt(Vec3Zero);

    return camera;
  }

  #createEnvironment() {
    const floor = new Grid();
    floor.position.set(0, 0, 0);
    this.scene.add(floor);
  }
}
