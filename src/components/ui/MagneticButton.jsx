import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * MagneticButton
 * 
 * Emil Kowalski & Impeccable interaction pattern:
 * Provides a subtle, physically believable magnetic pull toward the cursor (4-7px)
 * on desktop fine-pointer devices.
 * 
 * Automatically falls back to standard button behavior on touch devices and
 * when prefers-reduced-motion is active.
 */
export function MagneticButton({
  children,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  magneticStrength = 0.22,
  maxOffset = 7,
  ...props
}) {
  const buttonRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(false);

  // Check for fine pointer desktop environment
  useEffect(() => {
    const checkPointer = () => {
      setCanHover(
        window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion
      );
    };
    checkPointer();
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (mq.addEventListener) {
      mq.addEventListener('change', checkPointer);
      return () => mq.removeEventListener('change', checkPointer);
    }
  }, [prefersReducedMotion]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.1 });
  const smoothY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.1 });

  const handleMouseMove = (e) => {
    if (!canHover || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;

    // Clamp to max offset to avoid excessive chasing
    x.set(Math.max(-maxOffset, Math.min(maxOffset, deltaX)));
    y.set(Math.max(-maxOffset, Math.min(maxOffset, deltaY)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!canHover) {
    return (
      <button
        ref={buttonRef}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: smoothX,
        y: smoothY,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
