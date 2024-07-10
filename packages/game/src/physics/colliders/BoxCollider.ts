import { BoxGeometry, MeshBasicMaterial, Vector3 } from 'three';

import { Collider } from '../collision';

const WireframeMaterial = new MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
  wireframeLinewidth: 2,
});

export class BoxCollider extends Collider {
  constructor(width: number, height: number, depth: number, offset = new Vector3()) {
    const geo = new BoxGeometry(width, height, depth);
    const mat = WireframeMaterial;
    super(geo, mat);

    this.offset.copy(offset);
    this.position.copy(offset);
    this.geometry.computeBoundingBox();
  }
}
