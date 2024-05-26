import { Mesh, Vector3 } from 'three';

import { ObjectLayers } from '../constants';

export abstract class Collider extends Mesh {
  public offset: Vector3 = new Vector3();

  constructor(...args: ConstructorParameters<typeof Mesh>) {
    super(...args);
    this.castShadow = false;
    this.layers.set(ObjectLayers.physics);
  }
}
