import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function CoffeeCupSteam({ position = [-2.4, 0.74, 2.5] }) {
  const steamRef = useRef(null);

  const materials = useMemo(() => {
    return {
      ceramic: new THREE.MeshStandardMaterial({
        color: '#181514',
        roughness: 0.35,
        metalness: 0.1,
      }),
      goldRim: new THREE.MeshStandardMaterial({
        color: '#c5a059',
        metalness: 0.9,
        roughness: 0.25,
      }),
      crema: new THREE.MeshStandardMaterial({
        color: '#9e6231',
        roughness: 0.7,
      }),
      coffee: new THREE.MeshStandardMaterial({
        color: '#1a0e07',
        roughness: 0.2,
      }),
    };
  }, []);

  // Steam particle cloud setup
  const particleCount = 36;
  const [particleGeo, initialPositions] = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const inits = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.04;
      const x = Math.cos(angle) * radius;
      const y = Math.random() * 0.45;
      const z = Math.sin(angle) * radius;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      inits.push({ x, y, z, speed: 0.003 + Math.random() * 0.004, seed: Math.random() * 10 });
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return [geo, inits];
  }, []);

  const steamMat = useMemo(() => {
    return new THREE.PointsMaterial({
      color: '#f0e3d0',
      size: 0.035,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // In-place buffer animation: zero garbage collection
  useFrame(({ clock }) => {
    if (!steamRef.current) return;
    const positions = steamRef.current.geometry.attributes.position.array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < particleCount; i++) {
      const init = initialPositions[i];
      let curY = positions[i * 3 + 1] + init.speed;

      // Reset when particle reaches top
      if (curY > 0.5) {
        curY = 0;
        positions[i * 3] = init.x;
        positions[i * 3 + 2] = init.z;
      }

      // Gentle curling drift
      const drift = Math.sin(t * 1.5 + init.seed + curY * 4) * 0.002;
      positions[i * 3] += drift;
      positions[i * 3 + 1] = curY;
      positions[i * 3 + 2] += drift * 0.8;
    }

    steamRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group position={position} name="CoffeeCupSteam">
      {/* Saucer */}
      <mesh position={[0, 0.005, 0]} receiveShadow material={materials.ceramic}>
        <cylinderGeometry args={[0.08, 0.065, 0.01, 24]} />
      </mesh>
      <mesh position={[0, 0.01, 0]} material={materials.goldRim}>
        <torusGeometry args={[0.079, 0.002, 6, 24]} />
      </mesh>

      {/* Ceramic Espresso Cup */}
      <group position={[0, 0.01, 0]}>
        <mesh position={[0, 0.03, 0]} castShadow receiveShadow material={materials.ceramic}>
          <cylinderGeometry args={[0.045, 0.032, 0.06, 24, 1, true]} />
        </mesh>
        {/* Cup base */}
        <mesh position={[0, 0.003, 0]} material={materials.ceramic}>
          <cylinderGeometry args={[0.032, 0.032, 0.006, 24]} />
        </mesh>
        {/* Cup Gold Rim */}
        <mesh position={[0, 0.06, 0]} material={materials.goldRim}>
          <torusGeometry args={[0.044, 0.002, 6, 24]} />
        </mesh>
        {/* Cup Curved Handle */}
        <mesh position={[0.05, 0.035, 0]} rotation={[0, 0, Math.PI / 4]} material={materials.ceramic}>
          <torusGeometry args={[0.016, 0.004, 8, 16, Math.PI * 1.3]} />
        </mesh>

        {/* Crema / Coffee Surface */}
        <mesh position={[0, 0.05, 0]} material={materials.crema}>
          <cylinderGeometry args={[0.042, 0.042, 0.002, 24]} />
        </mesh>
        <mesh position={[0, 0.0505, 0]} material={materials.coffee}>
          <cylinderGeometry args={[0.024, 0.024, 0.002, 16]} />
        </mesh>
      </group>

      {/* Rising Steam Wisps */}
      <points ref={steamRef} position={[0, 0.075, 0]} geometry={particleGeo} material={steamMat} />
    </group>
  );
}
