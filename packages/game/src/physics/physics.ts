import { Intersection, Vector3 } from 'three';

import { Collider } from './collision';

export const PhysicsBodyType = {
  static: 0,
  dynamic: 1,
  kinematic: 2,
} as const;

export type PhysicsBodyType = (typeof PhysicsBodyType)[keyof typeof PhysicsBodyType];

export interface PhysicsBody {
  velocity: Vector3;
  position: Vector3;
  collider?: Collider;
  type: PhysicsBodyType;
}

export class PhysicsWorld {
  #_bodies = new Set<PhysicsBody>();
  #_static = new Set<PhysicsBody>();

  constructor() {}

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
    for (const body of this.#_bodies) {
      body.position.add(body.velocity.clone().divideScalar(deltaTime));
    }
  }

  public raycast(
    _origin: Vector3,
    _direction: Vector3,
    _distance = 100,
    _result: Intersection[] = [],
  ): boolean {
    // implement
    return false;
  }
}
