import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";

function makeCube(): Mesh {
  const geo = new BoxGeometry(1, 1, 1);
  const mat = new MeshBasicMaterial({ color: 0xffff00 });
  return new Mesh(geo, mat);
}

export function main(root: HTMLElement): void {
  const { width, height } = root.getBoundingClientRect();

  // Setup renderer
  const renderer = new WebGLRenderer();
  renderer.setSize(width, height);

  // Setup placeholder scene
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
  const cube = makeCube();
  scene.add(cube);

  camera.position.z = 5;
  camera.lookAt(new Vector3(0, 0, 0));

  function tick(): void {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(tick);

  // Add to DOM
  root.appendChild(renderer.domElement);
}
