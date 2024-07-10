import { Mesh, Vector3 } from 'three';

import { ObjectLayers } from '../constants';

/**
 * Base class/interface for all colliders.
 *
 * The idea is to have a base inheritance for all colliders, that forces them to
 * implement the necessary methods for collision detection. This way, we can have
 * different types of colliders that handle their own collision detection logic,
 * without having to touch other collider types/shapes.
 */
export abstract class Collider extends Mesh {
  public offset: Vector3 = new Vector3();

  constructor(...args: ConstructorParameters<typeof Mesh>) {
    super(...args);
    this.castShadow = false;
    this.layers.set(ObjectLayers.physics);
  }

  public abstract update(): void;
  public abstract containsPoint(): boolean;
  public abstract intersectsSphere(): boolean;
  public abstract intersectsBox(): boolean;
}
