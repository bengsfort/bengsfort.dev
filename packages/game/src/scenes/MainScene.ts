import { PerspectiveCamera, Scene, Vector3 } from 'three';

import { Grid } from '../entities/grid/grid';
import type { GameWindow } from '../renderer/GameWindow';

import { SceneDef } from './SceneDef';

const Vec3Zero = new Vector3(0, 0, 0);

export class MainScene implements SceneDef {
  public readonly name = 'MainScene';
  public readonly scene = new Scene();

  #_camera: PerspectiveCamera;

  public get camera(): PerspectiveCamera {
    return this.#_camera;
  }

  constructor(renderer: GameWindow) {
    this.#_camera = this.#createCamera(renderer);
    this.#createFloor();
  }

  public async load(): Promise<void> {
    return Promise.resolve();
  }

  public update(timestamp: number): void {
    this.#_camera.position.y = 25 + Math.sin(timestamp / 1000) * 0.25;
    this.#_camera.position.x = -15 + Math.cos(timestamp / 500) * 0.05;
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

  #createFloor() {
    const floor = new Grid();
    this.scene.add(floor);
  }
}
