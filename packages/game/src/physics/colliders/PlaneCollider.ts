import { MeshBasicMaterial, PlaneGeometry, Vector3 } from 'three';

import { Collider } from '../collision';

const WireframeMaterial = new MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
  wireframeLinewidth: 2,
});

export class PlaneCollider extends Collider {
  constructor(
    width: number,
    height: number,
    widthSegments = 1,
    heightSegments = 1,
    offset = new Vector3(),
  ) {
    const geo = new PlaneGeometry(width, height, widthSegments, heightSegments);
    const mat = WireframeMaterial;
    super(geo, mat);

    this.offset.copy(offset);
    this.position.copy(offset);
  }
}
