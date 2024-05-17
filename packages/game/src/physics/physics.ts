import { Vector3 } from 'three';

export const PhysicsBodyType = {
  static: 0,
  dynamic: 1,
} as const;

export type PhysicsBodyType = (typeof PhysicsBodyType)[keyof typeof PhysicsBodyType];

export interface PhysicsBody {
  velocity: Vector3;
  position: Vector3;
  type: PhysicsBodyType;
}

export class PhysicsWorld {
  #_bodies: Set<PhysicsBody> = new Set();
  #_static: Set<PhysicsBody> = new Set();

  public addBody(body: PhysicsBody): void {
    if (body.type === PhysicsBodyType.static) {
      this.#_static.add(body);
    } else {
      this.#_bodies.add(body);
    }
  }

  public removeBody(body: PhysicsBody): void {
    if (body.type === PhysicsBodyType.static) {
      this.#_static.delete(body);
    } else {
      this.#_bodies.delete(body);
    }
  }

  public update(deltaTime: number): void {
    // @todo: Implement collision detection
    for (const body of this.#_bodies) {
      body.position.add(body.velocity.clone().divideScalar(deltaTime));
    }
  }
}
