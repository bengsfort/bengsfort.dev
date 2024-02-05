import { PerspectiveCamera, Scene } from 'three';

import { Runtime, RuntimeScene } from './runtime';

export class GameScene extends Scene implements RuntimeScene {
  public readonly camera: PerspectiveCamera;

  private _ready = false;

  public get ready(): boolean {
    return this._ready;
  }

  constructor() {
    super();
    this.camera = new PerspectiveCamera();
  }

  public setup(runtime: Runtime): Promise<void> {
    const size = runtime.renderSize;

    // Setup camera
    this.camera.fov = 25.0;
    this.camera.aspect = size.x / size.y;
    this.camera.near = 0.1;
    this.camera.near = 1000;

    return Promise.resolve();
  }

  public update(_frametime: number): void {
    // @todo
  }
}
