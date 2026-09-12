import React, { useMemo } from 'react';
import * as THREE from 'three';

export function Foliage() {
  const materials = useMemo(() => {
    return {
      planter: new THREE.MeshStandardMaterial({
        color: '#161311',
        roughness: 0.75,
        metalness: 0.1,
      }),
      soil: new THREE.MeshStandardMaterial({
        color: '#1a110c',
        roughness: 0.9,
      }),
      stem: new THREE.MeshStandardMaterial({
        color: '#342618',
        roughness: 0.8,
      }),
      leaf: new THREE.MeshStandardMaterial({
        color: '#283827',
        roughness: 0.45,
        metalness: 0.1,
        side: THREE.DoubleSide,
      }),
      leafWarm: new THREE.MeshStandardMaterial({
        color: '#3d4d38',
        roughness: 0.45,
        side: THREE.DoubleSide,
      }),
      brassBand: new THREE.MeshStandardMaterial({
        color: '#c5a059',
        metalness: 0.9,
        roughness: 0.25,
      }),
    };
  }, []);

  const plantLocations = [
    { pos: [-1.8, 0, -4.5], scale: 1.1 },
    { pos: [2.2, 0, -4.5], scale: 1.1 },
    { pos: [6.8, 0, 1.8], scale: 1.25 },
    { pos: [-7.2, 0, 1.2], scale: 1.0 },
  ];

  return (
    <group name="Foliage">
      {plantLocations.map((plant, idx) => (
        <group key={idx} position={plant.pos} scale={plant.scale}>
          {/* Ceramic Ribbed Planter */}
          <mesh position={[0, 0.45, 0]} castShadow receiveShadow material={materials.planter}>
            <cylinderGeometry args={[0.34, 0.26, 0.9, 24]} />
          </mesh>
          {/* Brass Decorative Collar */}
          <mesh position={[0, 0.86, 0]} material={materials.brassBand}>
            <torusGeometry args={[0.342, 0.016, 8, 24]} />
          </mesh>
          {/* Soil */}
          <mesh position={[0, 0.84, 0]} material={materials.soil}>
            <cylinderGeometry args={[0.32, 0.32, 0.04, 20]} />
          </mesh>

          {/* Trunk / Stems */}
          <group position={[0, 0.85, 0]}>
            <mesh position={[0, 0.5, 0]} castShadow material={materials.stem}>
              <cylinderGeometry args={[0.025, 0.045, 1.0, 10]} />
            </mesh>
            <mesh position={[-0.1, 0.8, 0]} rotation={[0, 0, -0.35]} material={materials.stem}>
              <cylinderGeometry args={[0.018, 0.025, 0.7, 8]} />
            </mesh>
            <mesh position={[0.1, 0.9, 0.05]} rotation={[0.2, 0, 0.3]} material={materials.stem}>
              <cylinderGeometry args={[0.016, 0.022, 0.65, 8]} />
            </mesh>

            {/* Stylized Architectural Foliage Leaf Discs */}
            {[
              { pos: [-0.28, 1.1, 0.1], rot: [0.3, 0.5, -0.4], r: 0.16 },
              { pos: [0.26, 1.15, -0.1], rot: [-0.2, -0.6, 0.4], r: 0.17 },
              { pos: [0, 1.35, 0.15], rot: [0.4, 0.2, 0.1], r: 0.18 },
              { pos: [-0.15, 1.45, -0.1], rot: [-0.3, 0.4, -0.2], r: 0.15 },
              { pos: [0.18, 1.48, 0.1], rot: [0.2, -0.3, 0.3], r: 0.16 },
              { pos: [0.0, 1.62, 0], rot: [0, 0, 0], r: 0.19 },
            ].map((leaf, lIdx) => (
              <mesh
                key={lIdx}
                position={leaf.pos}
                rotation={leaf.rot}
                castShadow
                material={lIdx % 2 === 0 ? materials.leaf : materials.leafWarm}
              >
                <sphereGeometry args={[leaf.r, 12, 10]} />
              </mesh>
            ))}
          </group>
        </group>
      ))}
    </group>
  );
}
