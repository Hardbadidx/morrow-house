import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useScene } from '../../context/SceneContext';

export function DiningTables() {
  const { hoveredMenuItem } = useScene();
  const highlightLightRef = useRef(null);
  const candleLightRef = useRef(null);

  const materials = useMemo(() => {
    return {
      walnut: new THREE.MeshStandardMaterial({
        color: '#1e1612',
        roughness: 0.35,
        metalness: 0.1,
      }),
      tableLinen: new THREE.MeshStandardMaterial({
        color: '#f4efe6',
        roughness: 0.85,
        metalness: 0.0,
      }),
      brass: new THREE.MeshStandardMaterial({
        color: '#bfa37c',
        metalness: 0.85,
        roughness: 0.3,
      }),
      chairFabric: new THREE.MeshStandardMaterial({
        color: '#221b17',
        roughness: 0.75,
      }),
      porcelain: new THREE.MeshStandardMaterial({
        color: '#f5f0eb',
        roughness: 0.15,
        metalness: 0.05,
      }),
      goldRim: new THREE.MeshStandardMaterial({
        color: '#c4a57b',
        metalness: 0.85,
        roughness: 0.25,
      }),
      crystal: new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        transmission: 0.92,
        opacity: 1,
        transparent: true,
        roughness: 0.05,
        ior: 1.52,
      }),
      candleWax: new THREE.MeshStandardMaterial({
        color: '#fff5ea',
        roughness: 0.4,
      }),
      candleFlame: new THREE.MeshBasicMaterial({
        color: '#ffc15e',
      }),
      wineRed: new THREE.MeshPhysicalMaterial({
        color: '#4a0815',
        transmission: 0.65,
        transparent: true,
        roughness: 0.1,
      }),
    };
  }, []);

  // Subtle candle flicker & highlight reaction without per-frame allocations
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (candleLightRef.current) {
      // Natural subtle candle flutter
      candleLightRef.current.intensity = 0.85 + Math.sin(t * 7) * 0.12 + Math.cos(t * 13) * 0.06;
    }
    if (highlightLightRef.current) {
      const targetIntensity = hoveredMenuItem ? 2.2 : 0.6;
      highlightLightRef.current.intensity = THREE.MathUtils.lerp(
        highlightLightRef.current.intensity,
        targetIntensity,
        0.08
      );
    }
  });

  return (
    <group name="DiningTables">
      {/* ------------------------------------------------------------- */}
      {/* 1. CENTRAL SIGNATURE VIP TABLE                                  */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, 0, 0.6]}>
        {/* Brass Pedestal Base */}
        <mesh position={[0, 0.03, 0]} material={materials.brass}>
          <cylinderGeometry args={[0.42, 0.46, 0.06, 32]} />
        </mesh>
        <mesh position={[0, 0.38, 0]} material={materials.brass}>
          <cylinderGeometry args={[0.08, 0.14, 0.7, 32]} />
        </mesh>

        {/* Polished Walnut Round Tabletop */}
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow material={materials.walnut}>
          <cylinderGeometry args={[1.05, 1.05, 0.05, 48]} />
        </mesh>
        {/* Brass Trim Ring around Tabletop */}
        <mesh position={[0, 0.74, 0]} material={materials.brass}>
          <torusGeometry args={[1.052, 0.016, 12, 48]} />
        </mesh>

        {/* Fine Porcelain Place Settings */}
        {/* North Place Setting */}
        <group position={[0, 0.77, -0.45]}>
          {/* Charger Plate */}
          <mesh castShadow receiveShadow material={materials.porcelain}>
            <cylinderGeometry args={[0.18, 0.16, 0.015, 32]} />
          </mesh>
          <mesh position={[0, 0.01, 0]} material={materials.goldRim}>
            <torusGeometry args={[0.178, 0.005, 8, 32]} />
          </mesh>
          {/* Inner Accent Plate */}
          <mesh position={[0, 0.015, 0]} material={materials.porcelain}>
            <cylinderGeometry args={[0.12, 0.1, 0.01, 32]} />
          </mesh>
          {/* Wine Glass */}
          <group position={[0.22, 0.01, -0.1]}>
            <mesh material={materials.crystal}>
              <cylinderGeometry args={[0.04, 0.04, 0.005, 16]} />
            </mesh>
            <mesh position={[0, 0.06, 0]} material={materials.crystal}>
              <cylinderGeometry args={[0.006, 0.006, 0.12, 12]} />
            </mesh>
            <mesh position={[0, 0.15, 0]} material={materials.crystal}>
              <sphereGeometry args={[0.045, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.85]} />
            </mesh>
          </group>
          {/* Cutlery (Brass) */}
          <mesh position={[-0.24, 0.008, 0]} material={materials.brass}>
            <boxGeometry args={[0.015, 0.006, 0.18]} />
          </mesh>
          <mesh position={[0.24, 0.008, 0]} material={materials.brass}>
            <boxGeometry args={[0.015, 0.006, 0.18]} />
          </mesh>
        </group>

        {/* South Place Setting */}
        <group position={[0, 0.77, 0.45]} rotation={[0, Math.PI, 0]}>
          <mesh castShadow receiveShadow material={materials.porcelain}>
            <cylinderGeometry args={[0.18, 0.16, 0.015, 32]} />
          </mesh>
          <mesh position={[0, 0.01, 0]} material={materials.goldRim}>
            <torusGeometry args={[0.178, 0.005, 8, 32]} />
          </mesh>
          <mesh position={[0, 0.015, 0]} material={materials.porcelain}>
            <cylinderGeometry args={[0.12, 0.1, 0.01, 32]} />
          </mesh>
          <group position={[0.22, 0.01, -0.1]}>
            <mesh material={materials.crystal}>
              <cylinderGeometry args={[0.04, 0.04, 0.005, 16]} />
            </mesh>
            <mesh position={[0, 0.06, 0]} material={materials.crystal}>
              <cylinderGeometry args={[0.006, 0.006, 0.12, 12]} />
            </mesh>
            <mesh position={[0, 0.15, 0]} material={materials.crystal}>
              <sphereGeometry args={[0.045, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.85]} />
            </mesh>
          </group>
          <mesh position={[-0.24, 0.008, 0]} material={materials.brass}>
            <boxGeometry args={[0.015, 0.006, 0.18]} />
          </mesh>
          <mesh position={[0.24, 0.008, 0]} material={materials.brass}>
            <boxGeometry args={[0.015, 0.006, 0.18]} />
          </mesh>
        </group>

        {/* Center Candle Votive with Soft Flame */}
        <group position={[0, 0.77, 0]}>
          {/* Glass Cup */}
          <mesh material={materials.crystal}>
            <cylinderGeometry args={[0.045, 0.04, 0.08, 16]} />
          </mesh>
          {/* Candle inside */}
          <mesh position={[0, -0.01, 0]} material={materials.candleWax}>
            <cylinderGeometry args={[0.035, 0.035, 0.05, 16]} />
          </mesh>
          {/* Flame element */}
          <mesh position={[0, 0.03, 0]} material={materials.candleFlame}>
            <sphereGeometry args={[0.008, 8, 8]} />
          </mesh>
          {/* Flickering Candle Light */}
          <pointLight
            ref={candleLightRef}
            position={[0, 0.06, 0]}
            color="#ffad5a"
            intensity={0.9}
            distance={2.2}
          />
        </group>

        {/* Interactive Spotlight on Central Table for hover / focus */}
        <spotLight
          ref={highlightLightRef}
          position={[0, 4.2, 0.6]}
          target-position={[0, 0.74, 0.6]}
          color="#ffdfa0"
          intensity={0.6}
          angle={0.45}
          penumbra={0.7}
          distance={6}
          castShadow
        />

        {/* 2 Sculptural Curved Chairs */}
        {/* Left Chair */}
        <group position={[-1.25, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          {/* Curved Backrest */}
          <mesh position={[0, 0.72, -0.2]} material={materials.chairFabric}>
            <boxGeometry args={[0.55, 0.38, 0.08]} />
          </mesh>
          {/* Seat Cushion */}
          <mesh position={[0, 0.44, 0]} castShadow material={materials.chairFabric}>
            <cylinderGeometry args={[0.24, 0.24, 0.08, 24]} />
          </mesh>
          {/* Slender Brass Legs */}
          {[
            [-0.16, -0.16],
            [0.16, -0.16],
            [-0.16, 0.16],
            [0.16, 0.16],
          ].map(([lx, lz], lIdx) => (
            <mesh key={lIdx} position={[lx, 0.2, lz]} material={materials.brass}>
              <cylinderGeometry args={[0.012, 0.016, 0.4, 12]} />
            </mesh>
          ))}
        </group>

        {/* Right Chair */}
        <group position={[1.25, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh position={[0, 0.72, -0.2]} material={materials.chairFabric}>
            <boxGeometry args={[0.55, 0.38, 0.08]} />
          </mesh>
          <mesh position={[0, 0.44, 0]} castShadow material={materials.chairFabric}>
            <cylinderGeometry args={[0.24, 0.24, 0.08, 24]} />
          </mesh>
          {[
            [-0.16, -0.16],
            [0.16, -0.16],
            [-0.16, 0.16],
            [0.16, 0.16],
          ].map(([lx, lz], lIdx) => (
            <mesh key={lIdx} position={[lx, 0.2, lz]} material={materials.brass}>
              <cylinderGeometry args={[0.012, 0.016, 0.4, 12]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 2. RECTANGULAR CELLAR DINING TABLE (RIGHT)                     */}
      {/* ------------------------------------------------------------- */}
      <group position={[4.2, 0, -0.4]}>
        {/* Tabletop */}
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow material={materials.walnut}>
          <boxGeometry args={[1.8, 0.06, 0.9]} />
        </mesh>
        {/* Brass Legs */}
        {[
          [-0.8, -0.38],
          [0.8, -0.38],
          [-0.8, 0.38],
          [0.8, 0.38],
        ].map(([tx, tz], idx) => (
          <mesh key={idx} position={[tx, 0.36, tz]} material={materials.brass}>
            <cylinderGeometry args={[0.02, 0.025, 0.72, 12]} />
          </mesh>
        ))}
        {/* Wine Bottle on Table */}
        <group position={[-0.3, 0.77 + 0.15, 0]}>
          <mesh castShadow material={materials.wineRed}>
            <cylinderGeometry args={[0.045, 0.045, 0.26, 16]} />
          </mesh>
          <mesh position={[0, 0.18, 0]} material={materials.wineRed}>
            <cylinderGeometry args={[0.018, 0.018, 0.1, 16]} />
          </mesh>
          <mesh position={[0, 0.22, 0]} material={materials.brass}>
            <cylinderGeometry args={[0.02, 0.02, 0.03, 16]} />
          </mesh>
        </group>
        {/* 2 Fluted Chairs */}
        <mesh position={[0, 0.44, -0.6]} material={materials.chairFabric}>
          <boxGeometry args={[0.6, 0.06, 0.35]} />
        </mesh>
        <mesh position={[0, 0.44, 0.6]} material={materials.chairFabric}>
          <boxGeometry args={[0.6, 0.06, 0.35]} />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 3. INTIMATE BISTRO TABLE (LEFT FOREGROUND)                     */}
      {/* ------------------------------------------------------------- */}
      <group position={[-2.4, 0, 2.5]}>
        <mesh position={[0, 0.02, 0]} material={materials.brass}>
          <cylinderGeometry args={[0.3, 0.34, 0.04, 24]} />
        </mesh>
        <mesh position={[0, 0.36, 0]} material={materials.brass}>
          <cylinderGeometry args={[0.04, 0.04, 0.68, 16]} />
        </mesh>
        {/* Honed Tabletop */}
        <mesh position={[0, 0.72, 0]} castShadow receiveShadow material={materials.walnut}>
          <cylinderGeometry args={[0.55, 0.55, 0.04, 32]} />
        </mesh>
        {/* Chair */}
        <group position={[-0.65, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <mesh position={[0, 0.42, 0]} material={materials.chairFabric}>
            <cylinderGeometry args={[0.18, 0.18, 0.06, 20]} />
          </mesh>
          <mesh position={[0, 0.68, -0.15]} material={materials.chairFabric}>
            <boxGeometry args={[0.4, 0.32, 0.05]} />
          </mesh>
          {[
            [-0.12, -0.12],
            [0.12, -0.12],
            [-0.12, 0.12],
            [0.12, 0.12],
          ].map(([lx, lz], lIdx) => (
            <mesh key={lIdx} position={[lx, 0.2, lz]} material={materials.brass}>
              <cylinderGeometry args={[0.01, 0.014, 0.4, 12]} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}
