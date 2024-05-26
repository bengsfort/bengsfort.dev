import * as THREE from 'three';

import FRAGMENT_SHADER from './grid.fragment.glsl?raw';
import VERTEX_SHADER from './grid.vertex.glsl?raw';

interface Descriptor {
  color: THREE.ColorRepresentation;
  spacing: number;
}

export class Grid extends THREE.Mesh {
  public constructor(descriptors?: Descriptor[], visibility = 100) {
    descriptors = descriptors ?? [];

    if (descriptors.length === 0) {
      descriptors = [{ color: 'white', spacing: 1 }];
    }

    visibility = Math.max(visibility, 25);

    const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,

      /* eslint-disable-next-line @typescript-eslint/naming-convention */
      defines: { NUMBER_OF_DESCRIPTORS: descriptors.length },

      uniforms: {
        descriptors: {
          value: descriptors.map((descriptor) => {
            const color = new THREE.Color(descriptor.color);
            const spacing = descriptor.spacing;

            return new THREE.Vector4(color.r, color.g, color.b, spacing);
          }),
        },

        visibility: { value: visibility },
      },

      transparent: true,
      side: THREE.DoubleSide,
    });

    super(geometry, material);

    this.frustumCulled = false;
  }
}
