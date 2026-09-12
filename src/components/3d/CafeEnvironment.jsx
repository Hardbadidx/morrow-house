import React, { useMemo } from 'react';
import * as THREE from 'three';

export function CafeEnvironment() {
  // Memoize materials to reuse across meshes
  const materials = useMemo(() => {
    return {
      floor: new THREE.MeshStandardMaterial({
        color: '#241d18',
        roughness: 0.3,
        metalness: 0.08,
      }),
      wall: new THREE.MeshStandardMaterial({
        color: '#1a1513',
        roughness: 0.85,
        metalness: 0.04,
      }),
      slat: new THREE.MeshStandardMaterial({
        color: '#2e231d',
        roughness: 0.6,
        metalness: 0.08,
      }),
      brassTrim: new THREE.MeshStandardMaterial({
        color: '#bfa37c',
        metalness: 0.82,
        roughness: 0.32,
      }),
      ceilingBeam: new THREE.MeshStandardMaterial({
        color: '#15110e',
        roughness: 0.7,
      }),
      windowBackdrop: new THREE.MeshBasicMaterial({
        color: '#1c161a',
      }),
      exteriorLight: new THREE.MeshBasicMaterial({
        color: '#e29d52',
      })
    };
  }, []);

  // Generate architectural wooden fluted wall slats
  const wallSlats = useMemo(() => {
    const slats = [];
    const count = 38;
    const width = 0.08;
    const spacing = 0.22;
    const startX = - count * spacing / 2;
    for (let i = 0; i < count; i++) {
      slats.push(startX + i * spacing);
    }
    return slats;
  }, []);

  return (
    <group name="CafeEnvironment">
      {/* Polished Herringbone / Parquet Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow material={materials.floor}>
        <planeGeometry args={[26, 26]} />
      </mesh>

      {/* Floor Brass Inlay Perimeter Lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]} material={materials.brassTrim}>
        <ringGeometry args={[5.2, 5.24, 64]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]} material={materials.brassTrim}>
        <ringGeometry args={[8.4, 8.44, 64]} />
      </mesh>

      {/* Main Back Architectural Wall */}
      <mesh position={[0, 4, -7]} receiveShadow material={materials.wall}>
        <boxGeometry args={[26, 8, 0.4]} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-9.5, 4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow material={materials.wall}>
        <boxGeometry args={[22, 8, 0.4]} />
      </mesh>

      {/* Right Wall with Arched Openings */}
      <mesh position={[9.5, 4, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow material={materials.wall}>
        <boxGeometry args={[22, 8, 0.4]} />
      </mesh>

      {/* Architectural Fluted Wood Slats on Feature Back Wall */}
      <group position={[0, 3.8, -6.75]}>
        {wallSlats.map((x, idx) => (
          <mesh key={idx} position={[x, 0, 0]} receiveShadow castShadow material={materials.slat}>
            <boxGeometry args={[0.07, 6.2, 0.08]} />
          </mesh>
        ))}
        {/* Horizontal Brass Accent Dividers across slats */}
        <mesh position={[0, 1.8, 0.05]} material={materials.brassTrim}>
          <boxGeometry args={[8.8, 0.03, 0.03]} />
        </mesh>
        <mesh position={[0, -1.8, 0.05]} material={materials.brassTrim}>
          <boxGeometry args={[8.8, 0.03, 0.03]} />
        </mesh>
      </group>

      {/* Ceiling Architectural Beams */}
      {[-4, -1, 2, 5].map((z, idx) => (
        <group key={idx} position={[0, 7.2, z]}>
          <mesh receiveShadow material={materials.ceilingBeam}>
            <boxGeometry args={[19, 0.5, 0.35]} />
          </mesh>
          {/* Subtle warm under-beam cove glow strip */}
          <mesh position={[0, -0.26, 0]}>
            <boxGeometry args={[17, 0.02, 0.06]} />
            <meshBasicMaterial color="#ffe3b0" />
          </mesh>
        </group>
      ))}

      {/* Large Soft City Lights Glow beyond window openings on right */}
      <group position={[9.6, 3.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Backdrop plane */}
        <mesh position={[0, 0, -1.2]} material={materials.windowBackdrop}>
          <planeGeometry args={[16, 8]} />
        </mesh>
        {/* Distant soft amber city towers (abstract light silhouettes) */}
        {[-4, -2, 0, 2.5, 5].map((x, idx) => (
          <mesh key={idx} position={[x, (idx % 3) * 0.4 - 0.5, -0.8]}>
            <boxGeometry args={[0.9, 3.2 + (idx % 2), 0.1]} />
            <meshStandardMaterial color="#1a141c" roughness={0.9} />
          </mesh>
        ))}
        <pointLight position={[0, 2, 1]} color="#ffb766" intensity={1.8} distance={7} />
      </group>

      {/* Warm ambient floor-level kick lighting */}
      <pointLight position={[-4, 0.3, -5]} color="#d49b4b" intensity={0.8} distance={4} />
      <pointLight position={[4, 0.3, -5]} color="#d49b4b" intensity={0.8} distance={4} />
    </group>
  );
}
