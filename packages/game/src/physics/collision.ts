import { Mesh, Vector3 } from 'three';

export abstract class Collider extends Mesh {
  public offset: Vector3 = new Vector3();
}
