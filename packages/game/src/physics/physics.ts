import { Intersection, Raycaster, Scene, Vector3 } from 'three';

import { ObjectLayers } from '../constants';

export const PhysicsBodyType = {
  static: 0,
  dynamic: 1,
  kinematic: 2,
} as const;

export type PhysicsBodyType = (typeof PhysicsBodyType)[keyof typeof PhysicsBodyType];

export interface PhysicsBody {
  velocity: Vector3;
  position: Vector3;
  type: PhysicsBodyType;
}

export class PhysicsWorld {
  #_bodies = new Set<PhysicsBody>();
  #_static = new Set<PhysicsBody>();

  #_raycaster = new Raycaster();
  // @todo: Let's do a perf check here to see if this is better than throwing all
  // of the physics bodies into their own independent physics scene.
  #_root = new Scene();

  constructor() {
    this.#_raycaster.layers.set(ObjectLayers.physics);
  }

  public setRoot(scene: Scene): void {
    this.#_root = scene;
  }

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
    origin: Vector3,
    direction: Vector3,
    distance = 100,
    result: Intersection[] = [],
  ): boolean {
    this.#_raycaster.set(origin, direction);
    const intersections = this.#_raycaster.intersectObjects(
      this.#_root.children,
      true,
      result,
    );

    return intersections.some((intersection) => intersection.distance < distance);
  }
}
