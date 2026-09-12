import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural 3D Coffee Bean with realistic crease & specular sheen
function CoffeeBean({ position, initialRotation, scale = 1, speed = 1 }) {
  const beanRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.16 * scale, 24, 24);
    geo.scale(1, 1.45, 0.65);
    return geo;
  }, [scale]);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#26160e',
      roughness: 0.28,
      metalness: 0.15,
    });
  }, []);

  useFrame((state) => {
    if (!beanRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    beanRef.current.rotation.x = initialRotation[0] + Math.sin(t * 0.7) * 0.25;
    beanRef.current.rotation.y = initialRotation[1] + Math.cos(t * 0.8) * 0.35;
    beanRef.current.position.y = position[1] + Math.sin(t + position[0]) * 0.09;
  });

  return (
    <mesh ref={beanRef} position={position} geometry={geometry} material={material} castShadow />
  );
}

// Procedural Luxury 3D Ceramic Coffee Cup with Latte Art & Responsive Scroll Choreography
function InteractiveCupGroup() {
  const groupRef = useRef();
  const scrollRef = useRef(0);

  // High-Resolution Procedural Latte Art Canvas Texture
  const latteArtTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Rich espresso crema gradient
    const grad = ctx.createRadialGradient(512, 512, 80, 512, 512, 500);
    grad.addColorStop(0, '#543019');
    grad.addColorStop(0.45, '#734423');
    grad.addColorStop(0.85, '#995f32');
    grad.addColorStop(1, '#3b1f0d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Cream foam rosettes with soft feathering
    ctx.fillStyle = '#f8ecdc';
    ctx.strokeStyle = '#ebdcce';
    ctx.lineWidth = 26;
    ctx.lineCap = 'round';

    // Top heart
    ctx.beginPath();
    ctx.arc(512, 420, 95, 0, Math.PI * 2);
    ctx.fill();

    // Symmetrical leaf flourishes
    for (let i = 0; i < 5; i++) {
      const y = 390 + i * 85;
      const spread = 150 - i * 20;
      ctx.beginPath();
      ctx.ellipse(512 - spread, y, 82 - i * 8, 38 - i * 3, -0.38, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(512 + spread, y, 82 - i * 8, 38 - i * 3, 0.38, 0, Math.PI * 2);
      ctx.fill();
    }

    // Stem line
    ctx.beginPath();
    ctx.moveTo(512, 280);
    ctx.lineTo(512, 820);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, []);

  // Glazed white porcelain material
  const cupMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#fdfbf7',
      roughness: 0.1,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });
  }, []);

  const liquidMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: latteArtTexture,
      roughness: 0.22,
      metalness: 0.04,
    });
  }, [latteArtTexture]);

  // Floating coffee beans positions around the cup
  const beansData = useMemo(() => [
    { pos: [1.7, 0.9, 0.5], rot: [0.4, 0.2, 0.8], scale: 1.05, speed: 0.9 },
    { pos: [-1.7, 0.5, -0.3], rot: [0.8, 1.1, 0.2], scale: 0.9, speed: 1.1 },
    { pos: [1.5, -0.8, 0.7], rot: [1.2, 0.4, 0.5], scale: 1.15, speed: 0.8 },
    { pos: [-1.3, -0.7, 0.8], rot: [0.3, 0.9, 1.4], scale: 0.95, speed: 1.0 },
    { pos: [0.4, 1.7, -0.4], rot: [0.9, 0.3, 0.7], scale: 0.85, speed: 1.2 },
    { pos: [-0.5, 1.5, 0.6], rot: [0.5, 1.4, 0.1], scale: 0.9, speed: 0.85 },
    { pos: [1.9, -0.2, -0.6], rot: [1.1, 0.6, 0.9], scale: 1.0, speed: 1.15 },
  ], []);

  // Scroll Choreography - Emil Kowalski & Impeccable Principles
  useFrame((state) => {
    if (!groupRef.current) return;

    if (typeof window !== 'undefined') {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight || 800;
      scrollRef.current = Math.min(Math.max(scrollY / heroHeight, 0), 1.6);
    }

    const p = scrollRef.current;
    const t = state.clock.getElapsedTime();

    // Gentle idle breathing
    const idleY = Math.sin(t * 1.3) * 0.04;
    const idleRot = Math.cos(t * 1.1) * 0.02;

    // Responsive Targets:
    // Base position is lowered to [-0.1] to never touch header
    const targetX = THREE.MathUtils.lerp(0.85, -0.3, Math.min(p, 1));
    const targetY = THREE.MathUtils.lerp(-0.15, -0.9, p) + idleY;
    const targetZ = THREE.MathUtils.lerp(0.3, -0.6, p);

    const targetRotX = THREE.MathUtils.lerp(0.32, 0.52, p) + idleRot;
    const targetRotY = THREE.MathUtils.lerp(-0.35, 0.6, p) + Math.sin(t * 0.7) * 0.03;
    const targetRotZ = THREE.MathUtils.lerp(-0.15, 0.22, p);

    const targetScale = THREE.MathUtils.lerp(1.02, 0.85, Math.min(p, 1));

    // Smooth lerp damping
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 5, 0.016);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 5, 0.016);
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 5, 0.016);

    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 4, 0.016);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 4, 0.016);
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetRotZ, 4, 0.016);

    const curScale = groupRef.current.scale.x;
    const nextScale = THREE.MathUtils.damp(curScale, targetScale, 4, 0.016);
    groupRef.current.scale.set(nextScale, nextScale, nextScale);
  });

  return (
    <group ref={groupRef} position={[0.85, -0.15, 0.3]}>
      {/* Outer Ceramic Cup Body */}
      <mesh material={cupMaterial} castShadow receiveShadow>
        <cylinderGeometry args={[1.25, 0.8, 1.45, 48, 1, true]} />
      </mesh>

      {/* Cup Bottom */}
      <mesh position={[0, -0.72, 0]} material={cupMaterial} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.76, 0.08, 48]} />
      </mesh>

      {/* Cup Rim Lip Torus */}
      <mesh position={[0, 0.72, 0]} rotation={[Math.PI / 2, 0, 0]} material={cupMaterial}>
        <torusGeometry args={[1.24, 0.055, 16, 48]} />
      </mesh>

      {/* Ergonomic Curved Handle */}
      <mesh position={[1.4, -0.05, 0]} rotation={[0, 0, -Math.PI / 10]} material={cupMaterial} castShadow>
        <torusGeometry args={[0.58, 0.125, 16, 36, Math.PI * 1.15]} />
      </mesh>

      {/* Coffee Liquid Surface with Latte Art */}
      <mesh
        position={[0, 0.58, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={liquidMaterial}
        receiveShadow
      >
        <circleGeometry args={[1.19, 48]} />
      </mesh>

      {/* Soft Contact Shadow */}
      <mesh position={[0, -1.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <shadowMaterial opacity={0.25} />
      </mesh>

      {/* Floating Coffee Beans */}
      {beansData.map((bean, idx) => (
        <CoffeeBean
          key={idx}
          position={bean.pos}
          initialRotation={bean.rot}
          scale={bean.scale}
          speed={bean.speed}
        />
      ))}
    </group>
  );
}

export function HeroCoffeeCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <Canvas
        shadows
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)]}
        camera={{
          fov: 36,
          position: [0, 0.2, 5.8],
          near: 0.1,
          far: 25,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.95} color="#fcf2e3" />

        {/* Warm Studio Key Light */}
        <directionalLight
          position={[3.5, 5.5, 4.5]}
          intensity={1.75}
          color="#fff8ed"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0004}
        />

        {/* Cool Rim Light */}
        <directionalLight position={[-3.5, 2.5, -2]} intensity={0.7} color="#cddde8" />

        {/* Warm Fill */}
        <directionalLight position={[0, -2.5, 2]} intensity={0.3} color="#d6bd98" />

        <InteractiveCupGroup />
      </Canvas>
    </div>
  );
}
