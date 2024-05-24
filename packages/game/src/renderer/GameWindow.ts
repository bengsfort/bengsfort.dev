import { Camera, Scene, WebGLRenderer } from 'three';

import { makeLoggers } from '../utils/logging';

const { info } = makeLoggers('GameWindow');

type WindowOpts = {
  parent?: HTMLElement;
};

type SizeChangedHandler = (width: number, height: number) => void;

const THROTTLE_DELAY = 1000 / 30;

/**
 * Handles/maintains the game renderer.
 *
 * @class GameWindow
 * @export
 *
 * @note Resize handling when provided a parent element still depends on the
 * window resize event. A more "full" solution would be to use ResizeObserver,
 * and while it has decently good browser support (96%), I do not plan on doing
 * any container resizing (without the browser dimensions changing) in this
 * project, so it is unnecessary.
 */
export class GameWindow {
  public readonly context: WebGLRenderer;
  public readonly canvas: HTMLCanvasElement;
  public readonly parent: HTMLElement | null = null;

  public outputWidth: number = 0;
  public outputHeight: number = 0;
  public onSizeChanged: SizeChangedHandler;

  #_resizeTimeout: number | null = null;

  public constructor(opts: WindowOpts) {
    const context = new WebGLRenderer();
    context.autoClear = false;

    window.addEventListener('resize', this.#onWindowSizeChanged);

    this.parent = opts.parent || null;
    this.context = context;
    this.canvas = context.domElement;
    this.canvas.addEventListener('contextmenu', this.#onContextMenu);
    this.onSizeChanged = () => {};
    this.updateWindowSize();

    const parent = this.parent ?? document.body;
    parent.appendChild(this.canvas);
  }

  public updateWindowSize = () => {
    const { innerWidth, innerHeight, devicePixelRatio } = window;
    const parentRect = this.parent?.getBoundingClientRect();

    const width = !parentRect ? innerWidth : parentRect.width;
    const height = !parentRect ? innerHeight : parentRect.height;

    if (width === this.outputWidth && height === this.outputHeight) {
      // do nothing if nothing changed
      return;
    }

    this.context.setSize(width, height);
    this.context.setPixelRatio(devicePixelRatio);
    this.outputWidth = width;
    this.outputHeight = height;
    info(`Updated render window size to {${width}, ${height}}@${devicePixelRatio}`);
    this.onSizeChanged?.(width, height);
  };

  public draw(scene: Scene, camera: Camera, autoClear = true) {
    autoClear && this.context.clear();
    this.context.render(scene, camera);
  }

  #onContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    info('Context menu prevented on renderer');
  };

  #onWindowSizeChanged = () => {
    if (this.#_resizeTimeout) {
      return;
    }

    this.#_resizeTimeout = window.setTimeout(() => {
      this.updateWindowSize();
      this.#_resizeTimeout = null;
    }, THROTTLE_DELAY);
  };
}
