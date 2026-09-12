import { useEffect } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * useCursorParallax
 * 
 * Provides smooth, spring-damped normalized cursor coordinates [-1, 1]
 * strictly for fine-pointer desktop devices. Automatically disabled
 * on touch devices and when prefers-reduced-motion is active.
 */
export function useCursorParallax() {
  const prefersReducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Calibrated spring physics for physical, fluid cursor damping
  const smoothX = useSpring(rawX, {
    stiffness: 45,
    damping: 18,
    mass: 0.6,
  });

  const smoothY = useSpring(rawY, {
    stiffness: 45,
    damping: 18,
    mass: 0.6,
  });

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Strictly enable on fine-pointer desktop devices (no touch emulation)
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      if (innerWidth === 0 || innerHeight === 0) return;

      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = (e.clientY / innerHeight) * 2 - 1;

      rawX.set(Math.max(-1, Math.min(1, nx)));
      rawY.set(Math.max(-1, Math.min(1, ny)));
    };

    const handleMouseLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion, rawX, rawY]);

  return { smoothX, smoothY, prefersReducedMotion };
}
