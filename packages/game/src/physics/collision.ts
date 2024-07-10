import { Box3, Mesh, Sphere, Vector3 } from 'three';

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

  public abstract updateBoundingBox(): void;
  public abstract containsPoint(point: Vector3): boolean;
  public abstract intersectsSphere(sphere: Sphere): boolean;
  public abstract intersectsBox(box: Box3): boolean;
  public abstract containsSphere(sphere: Sphere): boolean;
  public abstract containsBox(box: Box3): boolean;
}
