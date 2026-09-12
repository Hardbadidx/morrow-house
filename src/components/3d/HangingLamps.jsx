import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function HangingLamps() {
  const lampGroupRef = useRef(null);

  const materials = useMemo(() => {
    return {
      wire: new THREE.MeshStandardMaterial({
        color: '#1a1a1a',
        metalness: 0.8,
        roughness: 0.3,
      }),
      brassShade: new THREE.MeshStandardMaterial({
        color: '#c5a059',
        metalness: 0.9,
        roughness: 0.25,
      }),
      innerGold: new THREE.MeshStandardMaterial({
        color: '#dfb76c',
        metalness: 0.95,
        roughness: 0.15,
      }),
      bulb: new THREE.MeshBasicMaterial({
        color: '#fff3db',
      }),
    };
  }, []);

  const lampPositions = [
    { pos: [0, 6.9, 0.6], lightPos: [0, 3.2, 0.6], wireLen: 3.4, intensity: 1.8 },
    { pos: [-4.8, 6.9, -1.8], lightPos: [-4.8, 3.2, -1.8], wireLen: 3.4, intensity: 1.5 },
    { pos: [-3.2, 6.9, -1.8], lightPos: [-3.2, 3.2, -1.8], wireLen: 3.4, intensity: 1.4 },
    { pos: [4.2, 6.9, -0.4], lightPos: [4.2, 3.2, -0.4], wireLen: 3.4, intensity: 1.5 },
    { pos: [-2.4, 6.9, 2.5], lightPos: [-2.4, 3.2, 2.5], wireLen: 3.4, intensity: 1.2 },
  ];

  // Subtle micro-oscillation without per-frame object creations
  useFrame(({ clock }) => {
    if (!lampGroupRef.current) return;
    const t = clock.getElapsedTime();
    lampGroupRef.current.children.forEach((child, i) => {
      if (child.name === 'swayLamp') {
        child.rotation.z = Math.sin(t * 0.8 + i * 1.5) * 0.008;
        child.rotation.x = Math.cos(t * 0.6 + i * 1.2) * 0.006;
      }
    });
  });

  return (
    <group ref={lampGroupRef} name="HangingLamps">
      {lampPositions.map((lamp, idx) => {
        const dropY = lamp.pos[1] - lamp.wireLen;
        return (
          <group key={idx} name="swayLamp" position={[lamp.pos[0], lamp.pos[1], lamp.pos[2]]}>
            {/* Suspension Wire */}
            <mesh position={[0, -lamp.wireLen / 2, 0]} material={materials.wire}>
              <cylinderGeometry args={[0.006, 0.006, lamp.wireLen, 8]} />
            </mesh>

            {/* Brass Canopy Collar */}
            <mesh position={[0, 0, 0]} material={materials.brassShade}>
              <cylinderGeometry args={[0.05, 0.05, 0.03, 16]} />
            </mesh>

            {/* Pendant Shade */}
            <group position={[0, -lamp.wireLen, 0]}>
              {/* Conical Shade Outer */}
              <mesh castShadow material={materials.brassShade}>
                <coneGeometry args={[0.26, 0.28, 24, 1, true]} />
              </mesh>
              {/* Conical Shade Inner */}
              <mesh material={materials.innerGold}>
                <coneGeometry args={[0.25, 0.27, 24, 1, true]} />
              </mesh>
              {/* Top Socket Cap */}
              <mesh position={[0, 0.16, 0]} material={materials.brassShade}>
                <cylinderGeometry args={[0.035, 0.045, 0.08, 16]} />
              </mesh>
              {/* Exposed Warm Glowing Bulb */}
              <mesh position={[0, -0.05, 0]} material={materials.bulb}>
                <sphereGeometry args={[0.045, 16, 16]} />
              </mesh>

              {/* Real Warm Light (optimized: zero shadow pass overhead) */}
              <pointLight
                position={[0, -0.1, 0]}
                color="#ffcf87"
                intensity={lamp.intensity * 1.1}
                distance={6.0}
              />
            </group>
          </group>
        );
      })}
    </group>
  );
}
