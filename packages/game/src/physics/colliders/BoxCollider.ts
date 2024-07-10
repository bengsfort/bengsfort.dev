import { Box3, BoxGeometry, MeshBasicMaterial, Sphere, Vector3 } from 'three';

import { Collider } from '../collision';

const WireframeMaterial = new MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
  wireframeLinewidth: 2,
});

export class BoxCollider extends Collider {
  public readonly boundingBox: Box3;

  constructor(width: number, height: number, depth: number, offset = new Vector3()) {
    const geo = new BoxGeometry(width, height, depth);
    const mat = WireframeMaterial;
    super(geo, mat);

    this.offset.copy(offset);
    this.position.copy(offset);
    this.geometry.computeBoundingBox();
    this.boundingBox = new Box3().setFromObject(this);
  }

  public updateBoundingBox(): void {
    this.geometry.computeBoundingBox();
    this.boundingBox.setFromObject(this);
  }

  public containsPoint(point: Vector3): boolean {
    return this.boundingBox.containsPoint(point);
  }

  public intersectsSphere(_sphere: Sphere): boolean {
    throw new Error('Method not implemented.');
  }

  public intersectsBox(box: Box3): boolean {
    return this.boundingBox.intersectsBox(box);
  }

  public containsSphere(_sphere: Sphere): boolean {
    throw new Error('Method not implemented.');
  }

  public containsBox(box: Box3): boolean {
    return this.boundingBox.containsBox(box);
  }
}
