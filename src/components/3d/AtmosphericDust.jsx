import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function AtmosphericDust({ count = 80 }) {
  const pointsRef = useRef(null);

  const [geo, inits] = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const initialData = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = 0.5 + Math.random() * 5.5;
      const z = (Math.random() - 0.5) * 14;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialData.push({
        origX: x,
        origZ: z,
        speedY: 0.001 + Math.random() * 0.0015,
        freq: 0.5 + Math.random() * 0.8,
        seed: Math.random() * 10,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return [geometry, initialData];
  }, [count]);

  const mat = useMemo(() => {
    return new THREE.PointsMaterial({
      color: '#ffdfa0',
      size: 0.045,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const data = inits[i];
      let y = pos[i * 3 + 1] + data.speedY;
      if (y > 6.2) y = 0.6;

      pos[i * 3] = data.origX + Math.sin(t * data.freq + data.seed) * 0.25;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = data.origZ + Math.cos(t * data.freq * 0.8 + data.seed) * 0.25;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geo} material={mat} />;
}
