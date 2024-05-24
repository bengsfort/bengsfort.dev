import { Camera, Raycaster, Scene, Vector3 } from 'three';

import { GameWindow } from '../renderer/GameWindow';

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
  type: PhysicsBodyType;
  collider?: Collider;
}

export class PhysicsWorld {
  #_bodies = new Set<PhysicsBody>();
  #_static = new Set<PhysicsBody>();

  #_physicsScene = new Scene();
  #_raycaster = new Raycaster();

  public addBody(body: PhysicsBody): void {
    if (body.type === PhysicsBodyType.static) {
      this.#_static.add(body);
    } else {
      this.#_bodies.add(body);
    }

    if (body.type !== PhysicsBodyType.kinematic && body.collider) {
      this.#_physicsScene.add(body.collider);
    }
  }

  public removeBody(body: PhysicsBody): void {
    if (body.type === PhysicsBodyType.static) {
      this.#_static.delete(body);
    } else {
      this.#_bodies.delete(body);
    }

    if (body.collider) {
      this.#_physicsScene.remove(body.collider);
    }
  }

  public update(deltaTime: number): void {
    for (const body of this.#_bodies) {
      body.position.add(body.velocity.clone().divideScalar(deltaTime));
      body.collider?.position.copy(body.position);
      body.collider?.position.add(body.collider.offset);
    }
  }

  public debugDraw(renderer: GameWindow, camera: Camera): void {
    renderer.draw(this.#_physicsScene, camera, false);
  }
}
