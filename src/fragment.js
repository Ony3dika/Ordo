import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const canvas = document.querySelector("canvas.align");
const container = document.querySelector(".align-container");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#cccccb");

const textureLoader = new THREE.TextureLoader();
const circ = textureLoader.load("/textures/circle.png");

// Sizes
const sizes = {
  width: container.clientWidth,
  height: container.clientHeight,
};

// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 25;

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;

// Mesh
let geometry = new THREE.BufferGeometry();
let points = new THREE.PointsMaterial({
  size: 0.4,
  alphaMap: circ,
  vertexColors: true,
  depthWrite: false,
  transparent: true,
  sizeAttenuation: true,
});

const count = 7000;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

let targetColor = new THREE.Color("#0f131a");

for (let i = 0; i < count * 3; i++) {
  const i3 = i * 3;
  positions[i] = (Math.random() - 0.5) * 10;

  // Assign specific color values (R, G, B)
  colors[i3] = targetColor.r;
  colors[i3 + 1] = targetColor.g;
  colors[i3 + 2] = targetColor.b;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
let mesh = new THREE.Points(geometry, points);
scene.add(mesh);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

renderer.setSize(sizes.width, sizes.height, false);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Resize
window.addEventListener("resize", () => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  if (
    renderer.domElement.width !== width ||
    renderer.domElement.height !== height
  ) {
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    sizes.width = width;
    sizes.height = height;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
});

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Mesh Rotation
  mesh.rotation.y = elapsedTime * 0.075;
  mesh.rotation.z = elapsedTime * 0.025;

  // Mesh Animation
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    positions[i3 + 1] += 0.015;
    if (positions[i3 + 1] > 5) positions[i3 + 1] = -5;
  }
  geometry.attributes.position.needsUpdate = true;

  controls.update();
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
