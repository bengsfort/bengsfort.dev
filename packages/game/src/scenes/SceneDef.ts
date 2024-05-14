import type { Camera, Scene } from 'three';

import type { GameTime } from '../schema';

export interface SceneDef {
  readonly name: string;
  readonly scene: Scene;
  readonly camera: Camera;

  load(): Promise<void>;
  update(time: GameTime): void;
}
