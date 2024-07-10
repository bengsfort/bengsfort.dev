import { Box3, BoxGeometry, MeshBasicMaterial, Vector3 } from 'three';

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

  public update(): void {
    throw new Error('Method not implemented.');
  }

  public containsPoint(): boolean {
    throw new Error('Method not implemented.');
  }

  public intersectsSphere(): boolean {
    throw new Error('Method not implemented.');
  }

  public intersectsBox(): boolean {
    throw new Error('Method not implemented.');
  }
}
