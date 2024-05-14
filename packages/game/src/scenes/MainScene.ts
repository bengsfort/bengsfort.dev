import {
  BoxGeometry,
  MeshBasicMaterial,
  DoubleSide,
  Mesh,
  PerspectiveCamera,
  Scene,
  Vector3,
  Vector2,
} from 'three';

import { Grid } from '../entities/grid/grid';
import type { GameWindow } from '../renderer/GameWindow';
import type { GameContext, GameTime } from '../schema';

import type { SceneDef } from './SceneDef';

const Vec3Zero = new Vector3(0, 0, 0);

export class MainScene implements SceneDef {
  public readonly name = 'MainScene';
  public readonly scene = new Scene();

  #_context: GameContext;
  #_player: Mesh;
  #_camera: PerspectiveCamera;

  public get camera(): PerspectiveCamera {
    return this.#_camera;
  }

  constructor(context: GameContext) {
    this.#_context = context;
    this.#_camera = this.#createCamera(context.renderer);
    this.#_player = this.#createPlayer();
    this.#createEnvironment();
  }

  public async load(): Promise<void> {
    return Promise.resolve();
  }

  public update(time: GameTime): void {
    this.#_camera.position.y = 25 + Math.sin(time.timestamp / 1000) * 0.25;
    this.#_camera.position.x = -15 + Math.cos(time.timestamp / 500) * 0.05;

    // Temp test
    const { input } = this.#_context;
    const inputVec = new Vector2(
      input.getAxis('right', 'left'),
      input.getAxis('down', 'up'),
    );

    this.#_player.position.x += (inputVec.x * 2) / time.deltaTime;
    this.#_player.position.z += (inputVec.y * 2) / time.deltaTime;
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

  #createPlayer() {
    const geo = new BoxGeometry(0.25, 1, 0.25);
    const mat = new MeshBasicMaterial({
      color: 0x4d03f1,
      side: DoubleSide,
    });

    const player = new Mesh(geo, mat);
    player.position.set(0, 0.5, 0);
    this.scene.add(player);

    return player;
  }

  #createEnvironment() {
    const floor = new Grid();
    floor.position.set(0, 0, 0);
    this.scene.add(floor);
  }
}
