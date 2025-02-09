import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { DEG2RAD } from "three/src/math/MathUtils.js";
import { InputManager } from "./input/input";
import { InputActions } from "./input/actions";

export function main(root: HTMLElement): void {
  const { width, height } = root.getBoundingClientRect();

  // Setup renderer
  const renderer = new WebGLRenderer();
  renderer.setSize(width, height);
  root.appendChild(renderer.domElement);

  // Input
  const input = new InputManager<typeof InputActions>();
  input.registerActions(InputActions);

  // Scene
  const scene = new Scene();

  // Camera
  const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 10;
  camera.position.x = 10;
  camera.position.y = 15;
  camera.lookAt(new Vector3(0, 0, 0));

  // Placeholder geometry
  const geo = new BoxGeometry(1, 2, 1);

  // Player placeholder
  const mat = new MeshBasicMaterial({ color: 0x00ff00 });
  const playerCube = new Mesh(geo, mat);
  playerCube.position.y = 1;
  scene.add(playerCube);

  // Enemy Placeholder
  const enemyMat = new MeshBasicMaterial({ color: 0xff0000 });
  const enemyCube = new Mesh(geo, enemyMat);
  enemyCube.position.y = 1;
  enemyCube.position.z = -5;
  scene.add(enemyCube);

  // Ground placeholder
  const groundGeo = new PlaneGeometry(50, 50, 50, 50);
  const groundMat = new MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  const ground = new Mesh(groundGeo, groundMat);
  ground.rotateX(DEG2RAD * 90);
  scene.add(ground);

  function tick(): void {
    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(tick);
}
