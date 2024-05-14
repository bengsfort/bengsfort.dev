import { Camera, Scene } from 'three';

export interface SceneDef {
  readonly name: string;
  readonly scene: Scene;
  readonly camera: Camera;

  load(): Promise<void>;
  update(timestamp: number): void;
}
