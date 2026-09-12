import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useScene } from '../../context/SceneContext';
import { AMBIANCE_ZONES } from '../../data/ambianceData';

// Waypoint presets determined with NVIDIA Nemotron 3 Ultra
const SECTION_WAYPOINTS = {
  hero: {
    pos: [0, 4.0, 10.5],
    target: [0, 1.2, 0],
  },
  story: {
    pos: [-3.2, 2.6, 5.0],
    target: [-0.9, 1.4, 0.2],
  },
  menu: {
    pos: [0, 2.7, 2.8],
    target: [0, 1.05, -0.2],
  },
  experience: {
    pos: [2.5, 1.8, 3.2],
    target: [0.8, 1.1, 0.4],
  },
  reservation: {
    pos: [-4.5, 2.1, 5.5],
    target: [-2.2, 1.3, 1.5],
  },
};

// Pre-allocate working vectors outside useFrame to ensure zero GC overhead
const _vTargetPos = new THREE.Vector3();
const _vTargetLook = new THREE.Vector3();
const _vCurrentLook = new THREE.Vector3(0, 1.2, 0);
const _vMouseOffset = new THREE.Vector3();

export function CinematicCamera() {
  const { activeSection, activeZone, activeCameraOverride, hoveredMenuItem } = useScene();
  const { camera, size } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleMouseMove = (e) => {
      if (prefersReducedMotion.current) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.x = nx;
      mouseRef.current.y = ny;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    // Determine active waypoint
    let destination = SECTION_WAYPOINTS[activeSection] || SECTION_WAYPOINTS.hero;

    // If section is experience and a specific zone is active or overridden
    if (activeCameraOverride) {
      destination = {
        pos: activeCameraOverride.pos,
        target: activeCameraOverride.target,
      };
    } else if (activeSection === 'experience' && activeZone) {
      const zone = AMBIANCE_ZONES.find(z => z.id === activeZone);
      if (zone) {
        destination = {
          pos: zone.cameraPosition,
          target: zone.cameraTarget,
        };
      }
    } else if (activeSection === 'menu' && hoveredMenuItem) {
      // 3D ↔ 2D Menu Connection: subtly shift camera toward the table and angle down
      destination = {
        pos: [0, 2.2, 2.2],
        target: [0, 0.85, 0.6],
      };
    }

    // Responsive aspect ratio adjustment: widen shot slightly on mobile/portrait
    const isMobile = size.width < 768;
    const zMultiplier = isMobile ? 1.35 : 1.0;
    const yMultiplier = isMobile ? 1.15 : 1.0;

    // Parallax dampening: subtle luxury camera breathing
    const parallaxIntensity = isMobile ? 0.04 : (prefersReducedMotion.current ? 0 : 0.22);
    _vMouseOffset.set(
      mouseRef.current.x * parallaxIntensity,
      mouseRef.current.y * (parallaxIntensity * 0.5),
      0
    );

    _vTargetPos.set(
      destination.pos[0] + _vMouseOffset.x,
      destination.pos[1] * yMultiplier + _vMouseOffset.y,
      destination.pos[2] * zMultiplier
    );

    _vTargetLook.set(
      destination.target[0] + _vMouseOffset.x * 0.3,
      destination.target[1],
      destination.target[2]
    );

    // Smooth cinematic lerp (delta-independent damping)
    const lerpFactor = prefersReducedMotion.current ? 0.2 : Math.min(delta * 2.2, 0.08);
    camera.position.lerp(_vTargetPos, lerpFactor);
    _vCurrentLook.lerp(_vTargetLook, lerpFactor);
    camera.lookAt(_vCurrentLook);
  });

  return null;
}
