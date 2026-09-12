import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useReducedMotion } from 'framer-motion';
import heroIcedCoffeeImg from '../../assets/food/hero-iced-coffee.png';

/**
 * HeroIcedCoffee — Interactive 3D Product Showcase
 * 
 * Implements:
 * - Emil Kowalski & Impeccable motion principles: spring-damped inertial transforms
 * - Multi-axis 3D perspective rotation (rotateX, rotateY, rotateZ, scale)
 * - Non-linear scroll choreography transitioning gracefully toward Section 02
 * - Multi-depth cursor parallax (background bean 2-3px, coffee 7-9px, foreground bean 12-15px)
 * - Restrained scroll velocity momentum response (liquid tilt and squash/stretch)
 * - Grounded volumetric contact shadow that responds to floating elevation
 * - Full prefers-reduced-motion and responsive mobile support
 */
export function HeroIcedCoffee({ heroRef, cursorX, cursorY }) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  // Raw Scroll Progress across the Hero container
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Scroll velocity for physical fluid momentum response
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 90,
    damping: 22,
    mass: 0.5,
  });

  // Spring physics configuration for inertial damping
  const springConfig = {
    stiffness: prefersReducedMotion ? 300 : 85,
    damping: prefersReducedMotion ? 40 : 20,
    mass: 0.75,
  };

  // 1. Scroll-Driven 3D Transformations
  // As user scrolls: moves up, curves inward toward center, tilts with liquid inertia, scales smoothly
  const rawY = useTransform(
    scrollYProgress,
    [0, 0.45, 0.85, 1],
    [0, -45, -110, -145]
  );
  const rawX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, -18, -45]
  );
  const rawRotateZ = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-4, 1.5, 6]
  );
  const rawRotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-6, 3, 10]
  );
  const rawRotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [3.5, 7, 12]
  );
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.96, 0.88]
  );
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [1, 1, 0.65]
  );

  // Multi-plane parallax for background & foreground beans
  const rawBackBeanY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const rawBackBeanRot = useTransform(scrollYProgress, [0, 1], [0, 85]);
  const rawFrontBeanY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const rawFrontBeanRot = useTransform(scrollYProgress, [0, 1], [0, -45]);

  // Smoothed spring values
  const smoothY = useSpring(prefersReducedMotion ? 0 : rawY, springConfig);
  const smoothX = useSpring(prefersReducedMotion ? 0 : rawX, springConfig);
  const smoothRotateZ = useSpring(prefersReducedMotion ? -4 : rawRotateZ, springConfig);
  const smoothRotateY = useSpring(prefersReducedMotion ? 0 : rawRotateY, springConfig);
  const smoothRotateX = useSpring(prefersReducedMotion ? 0 : rawRotateX, springConfig);
  const smoothScale = useSpring(prefersReducedMotion ? 1 : rawScale, springConfig);
  const smoothOpacity = useSpring(rawOpacity, { stiffness: 120, damping: 25 });

  const smoothBackBeanY = useSpring(rawBackBeanY, springConfig);
  const smoothBackBeanRot = useSpring(rawBackBeanRot, springConfig);
  const smoothFrontBeanY = useSpring(rawFrontBeanY, springConfig);
  const smoothFrontBeanRot = useSpring(rawFrontBeanRot, springConfig);

  // Scroll Velocity Momentum Response: subtle liquid tilt and squash
  const velocityTiltZ = useTransform(smoothVelocity, [-1.8, 1.8], [-1.8, 1.8]);
  const velocitySquash = useTransform(smoothVelocity, [-1.8, 1.8], [1.012, 0.988]);

  // Combined rotation & scale with velocity momentum
  const dynamicRotateZ = useTransform(
    [smoothRotateZ, velocityTiltZ],
    ([baseRot, velTilt]) => (prefersReducedMotion ? baseRot : baseRot + velTilt)
  );
  const dynamicScale = useTransform(
    [smoothScale, velocitySquash],
    ([baseScale, velScale]) => (prefersReducedMotion ? baseScale : baseScale * velScale)
  );

  // 2. Multi-Depth Desktop Mouse-Follow Parallax
  const internalMouseX = useMotionValue(0);
  const internalMouseY = useMotionValue(0);

  const activeMouseX = cursorX || internalMouseX;
  const activeMouseY = cursorY || internalMouseY;

  // Calibrated depth channels
  // Layer A: Deep background bean (2–3px)
  const mouseBackBeanX = useTransform(activeMouseX, [-1, 1], [-3, 3]);
  const mouseBackBeanY = useTransform(activeMouseY, [-1, 1], [-2.5, 2.5]);

  // Layer B: Iced coffee main group (7–9px + subtle tilt)
  const mouseTiltY = useTransform(activeMouseX, [-1, 1], [-4, 4]);
  const mouseTiltX = useTransform(activeMouseY, [-1, 1], [3, -3]);
  const mouseCoffeeX = useTransform(activeMouseX, [-1, 1], [-8, 8]);
  const mouseCoffeeY = useTransform(activeMouseY, [-1, 1], [-6, 6]);

  // Layer C: Near foreground bean (12–15px)
  const mouseFrontBeanX = useTransform(activeMouseX, [-1, 1], [-14, 14]);
  const mouseFrontBeanY = useTransform(activeMouseY, [-1, 1], [-11, 11]);

  useEffect(() => {
    if (prefersReducedMotion || cursorX) return;

    // Only enable local mouse follow for fine-pointer desktop devices if cursorX not passed
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = (e.clientY / innerHeight) * 2 - 1;
      internalMouseX.set(Math.max(-1, Math.min(1, nx)));
      internalMouseY.set(Math.max(-1, Math.min(1, ny)));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion, cursorX, internalMouseX, internalMouseY]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* Background Parallax Depth Bean 01 (Deep Field Layer: 2-3px movement) */}
      {!prefersReducedMotion && (
        <motion.div
          style={{
            y: smoothBackBeanY,
            x: prefersReducedMotion ? 0 : mouseBackBeanX,
            translateY: prefersReducedMotion ? 0 : mouseBackBeanY,
            rotate: smoothBackBeanRot,
          }}
          className="absolute -top-6 left-6 w-12 h-14 opacity-40 pointer-events-none filter blur-[0.6px] hidden sm:block z-0"
        >
          <svg viewBox="0 0 50 60" fill="none" className="w-full h-full drop-shadow-md">
            <ellipse cx="25" cy="30" rx="18" ry="24" transform="rotate(22 25 30)" fill="#3A1F13" />
            <path d="M18 14 C24 24, 26 36, 22 46" stroke="#1F0F08" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      )}

      {/* Main Interactive Product Group */}
      <motion.div
        style={{
          y: smoothY,
          x: smoothX,
          rotateZ: dynamicRotateZ,
          rotateY: prefersReducedMotion ? 0 : mouseTiltY,
          rotateX: prefersReducedMotion ? 0 : mouseTiltX,
          scale: dynamicScale,
          opacity: smoothOpacity,
          transformStyle: 'preserve-3d',
        }}
        className="relative flex items-center justify-center z-10"
      >
        {/* Secondary Offset Group for Mouse Pan (7-9px) & Idle Breathing */}
        <motion.div
          style={{
            x: prefersReducedMotion ? 0 : mouseCoffeeX,
            y: prefersReducedMotion ? 0 : mouseCoffeeY,
          }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, -10, 0],
                  rotateZ: [-0.5, 0.8, -0.5],
                }
          }
          transition={{
            duration: 5.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative flex items-center justify-center"
        >
          {/* Volumetric Radial Contact Ambient Shadow */}
          <div
            className="absolute -bottom-10 sm:-bottom-14 w-[75%] h-14 sm:h-20 rounded-[50%] bg-[#1A3636]/25 filter blur-2xl pointer-events-none transform -rotate-6 transition-transform"
            style={{ transform: 'translateZ(-40px)' }}
          />
          <div
            className="absolute -bottom-6 sm:-bottom-8 w-[50%] h-8 sm:h-12 rounded-[50%] bg-[#1A3636]/35 filter blur-lg pointer-events-none transform -rotate-4"
            style={{ transform: 'translateZ(-20px)' }}
          />

          {/* Pristine Iced Coffee Cup Hero Image */}
          <img
            src={heroIcedCoffeeImg}
            alt="Morrow House Artisanal Iced Coffee with Golden Espresso Swirl, Ice Crystals and Roasted Beans"
            className="w-full max-w-[290px] xs:max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[530px] xl:max-w-[570px] h-auto object-contain pointer-events-none select-none drop-shadow-[0_20px_34px_rgba(26,54,54,0.26)]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{
              transform: 'translateZ(10px)',
              willChange: 'transform',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Foreground Parallax Depth Bean 02 (Near Field Layer: 12-15px movement) */}
      {!prefersReducedMotion && (
        <motion.div
          style={{
            y: smoothFrontBeanY,
            x: prefersReducedMotion ? 0 : mouseFrontBeanX,
            translateY: prefersReducedMotion ? 0 : mouseFrontBeanY,
            rotate: smoothFrontBeanRot,
          }}
          className="absolute -bottom-2 -right-2 sm:right-4 w-10 h-12 opacity-85 pointer-events-none hidden sm:block z-20"
        >
          <svg viewBox="0 0 50 60" fill="none" className="w-full h-full drop-shadow-xl">
            <ellipse cx="25" cy="30" rx="16" ry="22" transform="rotate(-18 25 30)" fill="#2C160E" />
            <ellipse cx="23" cy="28" rx="13" ry="18" transform="rotate(-18 25 30)" fill="#442416" />
            <path d="M26 12 C21 22, 23 38, 28 48" stroke="#170A04" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
        </motion.div>
      )}
    </div>
  );
}
