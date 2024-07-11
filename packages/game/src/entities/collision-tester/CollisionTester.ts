import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  SphereGeometry,
  Vector3,
} from 'three';

import { BoxCollider } from '../../physics/colliders/BoxCollider';
import { SphereCollider } from '../../physics/colliders/SphereCollider';
import { PhysicsBody, PhysicsBodyType } from '../../physics/physics';
import { GameContext, GameTime } from '../../schema';

const COLOR_INTERSECTING = 0xcc1c1d;
const COLOR_CONTAINS = 0x1c1ccc;
const COLOR_NO_COLLISION = 0xa3a3a3;

// @todo this is just hardcoding everything for the sake of
// simplicity for testing.
export class CollisionTester extends Object3D {
  #_playerRef: BoxCollider;
  #_context: GameContext;
  #_collider: SphereCollider;
  #_body: PhysicsBody;
  #_material: MeshBasicMaterial;

  constructor(context: GameContext, playerRef: BoxCollider) {
    super();

    this.#_context = context;
    this.#_playerRef = playerRef;

    const [mesh, material] = this.#createMesh();
    this.#_material = material;
    this.add(mesh);

    const collider = new SphereCollider(2, 5, 5);
    this.#_collider = collider;
    this.add(collider);

    this.#_body = {
      position: this.position.clone(),
      velocity: new Vector3(0, 0, 0),
      type: PhysicsBodyType.static,
      collider,
    };
    context.physics.addBody(this.#_body);
    collider.updateBoundingBox();
  }

  public update(_time: GameTime): void {
    this.#_collider.updateBoundingBox();

    this.#_material.color.set(COLOR_INTERSECTING);

    if (this.#_collider.intersectsBox(this.#_playerRef.boundingBox)) {
      console.log('INTERSECTING');
      this.#_material.color.set(COLOR_INTERSECTING);
    } else if (this.#_collider.containsBox(this.#_playerRef.boundingBox)) {
      console.log('CONTAINS');
      this.#_material.color.set(COLOR_CONTAINS);
    } else {
      this.#_material.color.set(COLOR_NO_COLLISION);
    }

    this.#_material.needsUpdate = true;
  }

  #createMesh(): [Mesh, MeshBasicMaterial] {
    const geo = new SphereGeometry(2, 5, 5);
    const mat = new MeshBasicMaterial({
      color: COLOR_NO_COLLISION,
      side: DoubleSide,
    });

    const mesh = new Mesh(geo, mat);
    mesh.name = 'CollisionTestMesh';

    return [mesh, mesh.material];
  }
}
