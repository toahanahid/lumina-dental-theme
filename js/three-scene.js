// Three.js Scene Setup
const container = document.getElementById('canvas-container');

// Scene, Camera, Renderer
const scene = new THREE.Scene();
// Add some fog for depth
scene.fog = new THREE.FogExp2(0x000000, 0.02);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize for high DPI
container.appendChild(renderer.domElement);

// Particles - Abstract representation of clean/medical/tech
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    // Spread particles in a wide area
    posArray[i] = (Math.random() - 0.5) * 15;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Material
const material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00f2ff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

// Mesh
const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

// Add a central abstract shape (Icosahedron) representing a "core" or "tooth" abstractly
const geometry = new THREE.IcosahedronGeometry(1, 1);
const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x0066ff,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const sphere = new THREE.Mesh(geometry, wireframeMaterial);
scene.add(sphere);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

// Position Camera
camera.position.z = 4;

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Rotate entire particle system slowly
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    // Rotate central sphere
    sphere.rotation.y += 0.005;
    sphere.rotation.x += 0.005;

    // Interactive movement based on mouse
    // Smooth damping
    particlesMesh.rotation.y += 0.05 * (mouseX - particlesMesh.rotation.y);
    particlesMesh.rotation.x += 0.05 * (mouseY - particlesMesh.rotation.x);

    // Gentle wave effect on particles (optional, keeps it dynamic)
    // We could update positions here but for performance let's stick to rotation for now

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
