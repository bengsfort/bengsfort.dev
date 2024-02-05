import { Camera, Clock, Scene, Vector2, WebGLRenderer } from 'three';

import { makeLoggers } from '../utils/logging';

const { logDev } = makeLoggers('game', 'runtime');

const TARGET_BASE_FPS = 60.0;
const FRAME_TIME_ARRAY_LEN = 10;

export interface RuntimeScene extends Scene {
  readonly camera: Camera;
  readonly ready: boolean;

  setup(runtime: Runtime): Promise<void>;
  update(frametime: number): void;
}

export class Runtime {
  private _renderer: WebGLRenderer;
  private _container: HTMLElement;
  private _renderSize = new Vector2();

  private _clock: Clock;
  private _jankClock: Clock;

  private _targetFPS = TARGET_BASE_FPS;
  private _targetFrameTime = 1 / TARGET_BASE_FPS;
  private _frameTimes: number[] = [];

  private _scenes: RuntimeScene[] = [];

  public get renderSize(): Vector2 {
    this._renderer.getDrawingBufferSize(this._renderSize);
    return this._renderSize;
  }

  constructor(container?: HTMLElement) {
    this._renderer = new WebGLRenderer({
      precision: 'mediump',
      powerPreference: 'high-performance',
    });

    if (container) {
      container.appendChild(this._renderer.domElement);
    }

    this._container = container ?? this._renderer.domElement;
    this._clock = new Clock();
    this._jankClock = new Clock();
  }

  public readonly resize = (width: number, height: number, pixelRatio: number): void => {
    this._renderer.setSize(width, height);
    this._renderer.setPixelRatio(pixelRatio);
    logDev(`Resizing game runtime to (${width}, ${height})@${pixelRatio}`);
  };

  public start() {}

  public update() {
    const _delta = this._clock.getDelta();
    this._calculateTargetFps();
  }

  public stop() {}

  private _calculateTargetFps(): void {
    if (this._frameTimes.length < FRAME_TIME_ARRAY_LEN) {
      this._targetFrameTime = 1 / this._targetFPS;
      return;
    }

    let avg = 0;
    for (let i = 0; i < this._frameTimes.length; i++) {
      avg += this._frameTimes[i];
    }
    avg /= this._frameTimes.length;

    // Lower our target to 30FPS if we can't manage 60
    const adjustedTarget = avg > 0.017 ? 30.0 : 60.0;
    this._targetFrameTime = 1 / Math.min(adjustedTarget, this._targetFPS);
  }
}
