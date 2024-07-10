import {
  BoxGeometry,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Vector2,
  Vector3,
} from 'three';

import { BoxCollider } from '../../physics/colliders/BoxCollider';
import { PhysicsBodyType, type PhysicsBody } from '../../physics/physics';
import type { GameContext, GameTime } from '../../schema';

// @note: See if this makes sense, or if having a system control the player is better.
export class Player extends Object3D {
  #_body: PhysicsBody;
  #_mesh: Mesh;
  #_context: GameContext;

  #_accel = 0.1;
  #_decel = 0.45;
  #_maxSpeed = 4;
  #_momentum = 0;

  constructor(context: GameContext) {
    super();

    this.#_context = context;
    this.#_mesh = this.#createMesh();

    const collider = new BoxCollider(0.5, 1, 0.5, new Vector3(0, 0.5, 0));
    this.#_body = {
      position: this.position.clone(),
      velocity: new Vector3(0, 0, 0),
      type: PhysicsBodyType.dynamic,
    };
    this.add(collider);
    context.physics.addBody(this.#_body);
  }

  public update(time: GameTime): void {
    const deltaSinceFixed = (time.timestamp - time.lastFixedUpdateTime) / 1000;
    this.position.x = this.#_body.position.x + this.#_body.velocity.x * deltaSinceFixed;
    this.position.z = this.#_body.position.z + this.#_body.velocity.z * deltaSinceFixed;
  }

  public fixedUpdate(_time: GameTime): void {
    const inputVec = this.#getInputVec();
    this.#_momentum =
      inputVec.length() === 0
        ? Math.max(this.#_momentum - this.#_decel, 0)
        : Math.min(this.#_momentum + this.#_accel, 1);

    const impulse = new Vector3(inputVec.x, 0, inputVec.y).multiplyScalar(
      this.#_momentum * this.#_maxSpeed,
    );

    // Apply deceleration when input is off and we are moving
    if (impulse.length() === 0 && this.#_momentum !== 0) {
      const dir = this.#_body.velocity.clone().normalize().negate();
      const decel = dir.multiplyScalar(this.#_decel);
      impulse.copy(this.#_body.velocity).add(decel);
    }

    this.#_body.velocity.set(impulse.x, 0, impulse.z);
  }

  #getInputVec(): Vector2 {
    const { input } = this.#_context;

    return new Vector2(
      input.getAxis('right', 'left'),
      input.getAxis('down', 'up'),
    ).normalize();
  }

  #createMesh(): Mesh {
    const geo = new BoxGeometry(0.25, 1, 0.25);
    const mat = new MeshBasicMaterial({
      color: 0x4d03f1,
      side: DoubleSide,
    });

    const player = new Mesh(geo, mat);
    player.position.set(0, 0.5, 0);
    this.add(player);

    return player;
  }
}
