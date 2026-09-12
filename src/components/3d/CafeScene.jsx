import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { CafeEnvironment } from './CafeEnvironment';
import { BarCounter } from './BarCounter';
import { DiningTables } from './DiningTables';
import { HangingLamps } from './HangingLamps';
import { CoffeeCupSteam } from './CoffeeCupSteam';
import { Foliage } from './Foliage';
import { CinematicCamera } from './CinematicCamera';

function WebGLFallback() {
  return (
    <div className="absolute inset-0 bg-[#120f0d] flex items-center justify-center p-6 text-center">
      <div className="max-w-md border border-[#f5f0eb]/10 p-8 rounded-2xl bg-[#161311]">
        <h3 className="font-display text-2xl text-[#f5f0eb] mb-2 tracking-wide">MORROW HOUSE</h3>
        <p className="text-sm text-[#a3978c] leading-relaxed font-ui">
          Culinary artistry and architectural elegance.
        </p>
      </div>
    </div>
  );
}

export function CafeScene() {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (_) {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return <WebGLFallback />;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        shadows
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)]}
        camera={{
          fov: 42,
          near: 0.1,
          far: 45,
          position: [0, 4.0, 10.5],
        }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
      >
        {/* Warm Architectural Atmospheric Fog */}
        <color attach="background" args={['#120f0d']} />
        <fog attach="fog" args={['#14100e', 12, 42]} />

        {/* Ambient & Architectural Lighting Balance */}
        <ambientLight intensity={1.05} color="#554133" />
        <hemisphereLight args={['#ffeedb', '#1e1814', 0.45]} />

        {/* Key Lighting - Single Cast Shadow for 60fps performance */}
        <directionalLight
          position={[6, 9, 6]}
          intensity={1.35}
          color="#fff4e0"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0005}
          shadow-camera-near={1}
          shadow-camera-far={25}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
        />
        {/* Soft cool fill from opposite side */}
        <directionalLight position={[-6, 5, 2]} intensity={0.45} color="#4c5866" />

        <Suspense fallback={null}>
          <CinematicCamera />
          <CafeEnvironment />
          <BarCounter />
          <DiningTables />
          <HangingLamps />
          <CoffeeCupSteam />
          <Foliage />
          {/* Note: AtmosphericDust sparkle effect completely removed per visual direction */}
        </Suspense>
      </Canvas>

      {/* Restrained Soft Vignette Overlay to frame content without hiding 3D room */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, transparent 50%, rgba(18, 15, 13, 0.35) 85%, rgba(18, 15, 13, 0.75) 100%)',
        }}
      />
    </div>
  );
}
