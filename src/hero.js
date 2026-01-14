import * as THREE from "three";

const canvas = document.querySelector("canvas.webgl");
const container = document.querySelector(".threejs-container");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#0f131a");

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
camera.position.z = 4;

if (sizes.width < 1024) {
  camera.position.z = 24;
}

// Mouse
const mouse = { x: 0.5, y: 0.5 };
// Params
const params = {
  radius: 1 + mouse.x * 2,
};

// Mesh
let geometry = new THREE.SphereGeometry(params.radius, 30, 50);

let material = new THREE.PointsMaterial({
  size: 0.02,
  color: "#cccccb",
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  transparent: true,
  sizeAttenuation: true,
});

let mesh = new THREE.Points(geometry, material);

mesh.rotation.z = Math.PI * (mouse.x * 0.5);
mesh.rotation.x = -(Math.PI * mouse.y);
scene.add(mesh);

// MouseMove
window.addEventListener("mousemove", (e) => {
  if (geometry !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(mesh);
  }
  mouse.x = e.clientX / sizes.width;
  mouse.y = e.clientY / sizes.height;

  if (params.radius > 1.5) {
    params.radius -= mouse.x;
  } else {
    params.radius += mouse.x;
  }
  params.radius = mouse.x * 1.5 + 1;
  // console.log(mouse);

  // Mesh
  geometry = new THREE.SphereGeometry(params.radius, 30, 50);

  material = new THREE.PointsMaterial({
    size: 0.02,
    color: "#cccccb",
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    transparent: true,
    sizeAttenuation: true,
  });

  mesh = new THREE.Points(geometry, material);
  mesh.position.x = 1;
  mesh.rotation.z = Math.PI * (mouse.x * 0.5);

  scene.add(mesh);
});

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
    if (sizes.width < 1024) {
      camera.position.z = 10;
      mesh.position.x = 0.4;
    } else {
      camera.position.z = 4;
      mesh.position.x = 1;
    }
    camera.updateProjectionMatrix();
  }
});

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Mesh animation
  mesh.rotation.y = elapsedTime * 0.05;
  mesh.rotation.z = Math.PI * (mouse.x * 0.5);
  mesh.rotation.x = -(Math.PI * mouse.y);

  renderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
