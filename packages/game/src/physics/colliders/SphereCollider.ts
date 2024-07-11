import { Box3, MeshBasicMaterial, Sphere, SphereGeometry, Vector3 } from 'three';

import { Collider } from '../collision';

const WireframeMaterial = new MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
  wireframeLinewidth: 2,
});

export class SphereCollider extends Collider {
  public readonly boundingSphere: Sphere;

  constructor(
    radius: number,
    widthSegments = 2,
    heightSegments = 2,
    offset = new Vector3(),
  ) {
    const geo = new SphereGeometry(radius, widthSegments, heightSegments);
    const mat = WireframeMaterial;
    super(geo, mat);

    this.offset.copy(offset);
    this.position.copy(offset);
    this.geometry.computeBoundingSphere();

    this.boundingSphere =
      this.geometry.boundingSphere?.clone() ?? new Sphere(this.position, radius);
  }

  public updateBoundingBox(): void {
    this.geometry.computeBoundingSphere();
    if (this.geometry.boundingSphere) {
      this.boundingSphere.copy(this.geometry.boundingSphere);
    }
  }

  public containsPoint(point: Vector3): boolean {
    return this.boundingSphere.containsPoint(point);
  }

  public intersectsSphere(sphere: Sphere): boolean {
    return this.boundingSphere.intersectsSphere(sphere);
  }

  public intersectsBox(box: Box3): boolean {
    return this.boundingSphere.intersectsBox(box);
  }

  public containsSphere(sphere: Sphere): boolean {
    const distance = this.boundingSphere.center.distanceToSquared(sphere.center);

    return this.boundingSphere.radius > distance + sphere.radius;
  }

  // @todo I just know there is a better mathematical/performant way
  // to do this, but I just cannot think of it at the moment.
  public containsBox(box: Box3): boolean {
    return (
      this.boundingSphere.containsPoint(box.min) &&
      this.boundingSphere.containsPoint(box.max)
    );
  }
}
