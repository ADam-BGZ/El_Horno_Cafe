import * as THREE from 'three';

export interface OvenScene {
  dispose: () => void;
  pause: () => void;
  resume: () => void;
}

function createOvenGeometry(): THREE.Group {
  const oven = new THREE.Group();

  const brickColor = new THREE.Color('#B14B2C');
  const darkBrick = new THREE.Color('#8a3a20');
  const doorColor = new THREE.Color('#16140F');
  const glowColor = new THREE.Color('#e8613a');

  const bodyMat = new THREE.MeshStandardMaterial({
    color: brickColor,
    roughness: 0.85,
    metalness: 0.05,
  });

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2, 2.4),
    bodyMat
  );
  body.position.y = 1;
  oven.add(body);

  const doorMat = new THREE.MeshStandardMaterial({
    color: doorColor,
    roughness: 0.9,
    metalness: 0.1,
  });

  const door = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1, 0.05),
    doorMat
  );
  door.position.set(0, 0.7, 1.21);
  oven.add(door);

  const innerGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 0.8),
    new THREE.MeshBasicMaterial({
      color: glowColor,
      transparent: true,
      opacity: 0.6,
    })
  );
  innerGlow.position.set(0, 0.7, 1.22);
  oven.add(innerGlow);

  const ledgeMat = new THREE.MeshStandardMaterial({
    color: darkBrick,
    roughness: 0.9,
    metalness: 0,
  });

  const ledge = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 0.15, 0.4),
    ledgeMat
  );
  ledge.position.set(0, 0.08, 1.2);
  oven.add(ledge);

  const chimney = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 1.2, 0.6),
    bodyMat
  );
  chimney.position.set(0, 3.1, -0.4);
  oven.add(chimney);

  return oven;
}

export function initHeroScene(canvas: HTMLCanvasElement): OvenScene {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    40,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 2.5, 7);
  camera.lookAt(0, 1.5, 0);

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const fireLight = new THREE.PointLight(0xe8613a, 2.5, 12, 1.5);
  fireLight.position.set(0, 1.2, 2);
  scene.add(fireLight);

  const keyLight = new THREE.DirectionalLight(0xfff5e6, 0.6);
  keyLight.position.set(3, 5, 4);
  scene.add(keyLight);

  const oven = createOvenGeometry();
  scene.add(oven);

  let isPaused = false;
  let animationId = 0;
  const clock = new THREE.Clock();
  const innerGlow = oven.children.find(
    (c) => c instanceof THREE.Mesh && c.material instanceof THREE.MeshBasicMaterial
  ) as THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | undefined;

  function animate(): void {
    if (isPaused) return;
    animationId = requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    oven.rotation.y = Math.sin(elapsed * 0.2) * 0.05;

    if (innerGlow) {
      (innerGlow.material as THREE.MeshBasicMaterial).opacity =
        0.4 + Math.sin(elapsed * 1.5) * 0.2;
    }
    fireLight.intensity = 2.0 + Math.sin(elapsed * 1.2) * 0.8;

    renderer.render(scene, camera);
  }

  animate();

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        resume();
      } else {
        pause();
      }
    },
    { threshold: 0.1 }
  );
  observer.observe(canvas);

  function onResize(): void {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  function pause(): void {
    isPaused = true;
    cancelAnimationFrame(animationId);
  }

  function resume(): void {
    if (isPaused) {
      isPaused = false;
      animate();
    }
  }

  function dispose(): void {
    pause();
    observer.disconnect();
    window.removeEventListener('resize', onResize);
    oven.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
    renderer.dispose();
  }

  return { dispose, pause, resume };
}
