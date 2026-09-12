import React, { useMemo } from 'react';
import * as THREE from 'three';

export function BarCounter({ position = [-4.8, 0, -2] }) {
  const materials = useMemo(() => {
    return {
      marble: new THREE.MeshStandardMaterial({
        color: '#181514',
        roughness: 0.18,
        metalness: 0.25,
      }),
      counterBase: new THREE.MeshStandardMaterial({
        color: '#110d0b',
        roughness: 0.7,
      }),
      brass: new THREE.MeshStandardMaterial({
        color: '#bfa37c',
        metalness: 0.85,
        roughness: 0.3,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        transmission: 0.88,
        opacity: 1,
        transparent: true,
        roughness: 0.1,
        ior: 1.5,
        thickness: 0.3,
      }),
      amberGlass: new THREE.MeshPhysicalMaterial({
        color: '#d48832',
        transmission: 0.75,
        transparent: true,
        roughness: 0.2,
      }),
      emeraldGlass: new THREE.MeshPhysicalMaterial({
        color: '#1b5e3f',
        transmission: 0.75,
        transparent: true,
        roughness: 0.2,
      }),
      chrome: new THREE.MeshStandardMaterial({
        color: '#e0e0e0',
        metalness: 0.95,
        roughness: 0.15,
      }),
      leather: new THREE.MeshStandardMaterial({
        color: '#1f1612',
        roughness: 0.65,
      }),
      glowStrip: new THREE.MeshBasicMaterial({
        color: '#ffc87a',
      }),
    };
  }, []);

  return (
    <group position={position} name="BarCounter">
      {/* Main Counter Base */}
      <mesh position={[0, 0.55, 0]} receiveShadow castShadow material={materials.counterBase}>
        <boxGeometry args={[4.8, 1.1, 1.2]} />
      </mesh>

      {/* Honed Marble Countertop */}
      <mesh position={[0, 1.13, 0]} receiveShadow castShadow material={materials.marble}>
        <boxGeometry args={[5.0, 0.08, 1.35]} />
      </mesh>

      {/* Brass Edge Trim around Countertop */}
      <mesh position={[0, 1.13, 0.68]} material={materials.brass}>
        <boxGeometry args={[5.04, 0.08, 0.03]} />
      </mesh>

      {/* Recessed Warm Under-Counter LED Light Strip */}
      <mesh position={[0, 1.07, 0.62]} material={materials.glowStrip}>
        <boxGeometry args={[4.8, 0.02, 0.03]} />
      </mesh>
      <pointLight position={[0, 0.9, 0.8]} color="#ffb86c" intensity={1.2} distance={2.5} />

      {/* Brass Footrail */}
      <mesh position={[0, 0.2, 0.72]} rotation={[0, 0, Math.PI / 2]} material={materials.brass}>
        <cylinderGeometry args={[0.025, 0.025, 4.6, 16]} />
      </mesh>
      {[-1.8, 0, 1.8].map((x, idx) => (
        <mesh key={idx} position={[x, 0.1, 0.65]} rotation={[Math.PI / 4, 0, 0]} material={materials.brass}>
          <cylinderGeometry args={[0.02, 0.02, 0.28, 16]} />
        </mesh>
      ))}

      {/* Back Bar Shelving System */}
      <group position={[0, 1.4, -1.8]}>
        {/* Wall panel backing */}
        <mesh position={[0, 1.2, -0.05]} receiveShadow material={materials.counterBase}>
          <boxGeometry args={[4.6, 2.6, 0.1]} />
        </mesh>

        {/* Vertical Brass Frames */}
        {[-2.1, -0.7, 0.7, 2.1].map((x, idx) => (
          <mesh key={idx} position={[x, 1.2, 0.2]} material={materials.brass}>
            <boxGeometry args={[0.04, 2.6, 0.04]} />
          </mesh>
        ))}

        {/* 3 Floating Glass Shelves */}
        {[0.4, 1.2, 2.0].map((y, idx) => (
          <group key={idx} position={[0, y, 0.2]}>
            <mesh receiveShadow material={materials.glass}>
              <boxGeometry args={[4.4, 0.03, 0.4]} />
            </mesh>
            {/* Brass front lip */}
            <mesh position={[0, 0.015, 0.2]} material={materials.brass}>
              <boxGeometry args={[4.4, 0.025, 0.02]} />
            </mesh>
            {/* Shelf Backlight strip */}
            <mesh position={[0, 0.03, -0.18]} material={materials.glowStrip}>
              <boxGeometry args={[4.2, 0.015, 0.02]} />
            </mesh>
          </group>
        ))}

        {/* Bottles on Shelves */}
        {/* Bottom shelf bottles */}
        {[-1.8, -1.5, -1.2, -0.4, -0.1, 0.2, 1.0, 1.3, 1.6].map((x, idx) => {
          const mat = idx % 2 === 0 ? materials.amberGlass : materials.emeraldGlass;
          return (
            <group key={idx} position={[x, 0.4 + 0.16, 0.2]}>
              {/* Bottle body */}
              <mesh castShadow material={mat}>
                <cylinderGeometry args={[0.05, 0.055, 0.28, 16]} />
              </mesh>
              {/* Bottle neck */}
              <mesh position={[0, 0.2, 0]} material={mat}>
                <cylinderGeometry args={[0.02, 0.02, 0.12, 16]} />
              </mesh>
              {/* Gold seal */}
              <mesh position={[0, 0.25, 0]} material={materials.brass}>
                <cylinderGeometry args={[0.022, 0.022, 0.03, 16]} />
              </mesh>
            </group>
          );
        })}

        {/* Middle shelf spirits */}
        {[-1.6, -1.0, 0.0, 0.5, 1.2, 1.7].map((x, idx) => (
          <group key={idx} position={[x, 1.2 + 0.18, 0.2]}>
            <mesh castShadow material={materials.glass}>
              <cylinderGeometry args={[0.06, 0.06, 0.32, 16]} />
            </mesh>
            <mesh position={[0, 0.22, 0]} material={materials.brass}>
              <cylinderGeometry args={[0.025, 0.025, 0.06, 16]} />
            </mesh>
          </group>
        ))}

        {/* Warm shelving glow */}
        <pointLight position={[0, 1.3, 0.6]} color="#ffaa55" intensity={1.2} distance={3.5} />
      </group>

      {/* Artisanal Espresso Machine on Counter Right */}
      <group position={[1.4, 1.17 + 0.22, 0.1]}>
        {/* Main chassis */}
        <mesh castShadow receiveShadow material={materials.chrome}>
          <boxGeometry args={[0.85, 0.42, 0.55]} />
        </mesh>
        {/* Brass side panel accents */}
        <mesh position={[-0.43, 0, 0]} material={materials.brass}>
          <boxGeometry args={[0.02, 0.4, 0.53]} />
        </mesh>
        <mesh position={[0.43, 0, 0]} material={materials.brass}>
          <boxGeometry args={[0.02, 0.4, 0.53]} />
        </mesh>
        {/* Dual group heads */}
        {[-0.18, 0.18].map((gx, idx) => (
          <group key={idx} position={[gx, -0.08, 0.3]}>
            <mesh material={materials.chrome}>
              <cylinderGeometry args={[0.04, 0.04, 0.08, 16]} />
            </mesh>
            {/* Portafilter handle */}
            <mesh position={[0, -0.04, 0.1]} rotation={[Math.PI / 2, 0, 0]} material={materials.leather}>
              <cylinderGeometry args={[0.018, 0.02, 0.18, 16]} />
            </mesh>
          </group>
        ))}
        {/* Pressure gauges */}
        {[-0.2, 0.2].map((gx, idx) => (
          <mesh key={idx} position={[gx, 0.12, 0.28]} rotation={[Math.PI / 2, 0, 0]} material={materials.brass}>
            <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
          </mesh>
        ))}
        {/* Top cup warming tray with tiny espresso cups */}
        {[-0.22, 0, 0.22].map((cx, idx) => (
          <mesh key={idx} position={[cx, 0.24, 0]} material={materials.marble}>
            <cylinderGeometry args={[0.035, 0.025, 0.05, 16]} />
          </mesh>
        ))}
      </group>

      {/* 3 High-End Barstools */}
      {[-1.4, 0, 1.4].map((bx, idx) => (
        <group key={idx} position={[bx, 0, 1.15]}>
          {/* Upholstered Round Cushion */}
          <mesh position={[0, 0.76, 0]} castShadow material={materials.leather}>
            <cylinderGeometry args={[0.22, 0.22, 0.08, 32]} />
          </mesh>
          {/* Brass Seat Rim */}
          <mesh position={[0, 0.72, 0]} material={materials.brass}>
            <cylinderGeometry args={[0.23, 0.23, 0.02, 32]} />
          </mesh>
          {/* Minimalist 4 Metal Legs */}
          {[
            [-0.14, -0.14],
            [0.14, -0.14],
            [-0.14, 0.14],
            [0.14, 0.14],
          ].map(([lx, lz], lIdx) => (
            <mesh key={lIdx} position={[lx, 0.36, lz]} material={materials.counterBase}>
              <cylinderGeometry args={[0.014, 0.016, 0.72, 12]} />
            </mesh>
          ))}
          {/* Circular Brass Footring */}
          <mesh position={[0, 0.28, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.brass}>
            <torusGeometry args={[0.16, 0.012, 12, 32]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
