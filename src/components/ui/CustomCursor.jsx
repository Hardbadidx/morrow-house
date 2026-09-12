import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * CustomCursor
 * 
 * Elegant, whisper-quiet micro cursor for fine-pointer desktop devices.
 * - Tiny 8px dot default
 * - Expands to compact pill with contextual label (VIEW, EXPLORE, RESERVE)
 *   only on targeted interactive elements
 * - Completely disabled on touch devices and when prefers-reduced-motion is active
 * - Zero pointer-events interference
 */
export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'hover' | 'view' | 'explore' | 'reserve'
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast, responsive spring for immediate tactile tracking
  const springX = useSpring(mouseX, { stiffness: 450, damping: 28, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 28, mass: 0.1 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    setIsEnabled(true);

    const updateCursorTarget = (target) => {
      const interactive = target ? target.closest('[data-cursor], button, a, [role="button"]') : null;
      if (interactive) {
        const customType = interactive.getAttribute('data-cursor');
        setCursorType(customType || 'hover');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      updateCursorTarget(e.target);
    };

    const handleScroll = () => {
      const x = mouseX.get();
      const y = mouseY.get();
      if (x >= 0 && y >= 0) {
        const elem = document.elementFromPoint(x, y);
        updateCursorTarget(elem);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setCursorType('default');
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [prefersReducedMotion, mouseX, mouseY, isVisible]);

  if (!isEnabled || prefersReducedMotion) return null;

  const isLabelType = ['view', 'explore', 'reserve'].includes(cursorType);
  const isInteractive = isLabelType || cursorType === 'hover';

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        opacity: isVisible && isInteractive ? 1 : 0,
        scale: isVisible && isInteractive ? 1 : 0.4,
      }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
      aria-hidden="true"
    >
      <motion.div
        animate={
          isLabelType
            ? {
                width: 68,
                height: 28,
                borderRadius: 9999,
                backgroundColor: '#1A3636',
                boxShadow: '0 4px 16px rgba(26, 54, 54, 0.28)',
              }
            : cursorType === 'hover'
            ? {
                width: 22,
                height: 22,
                borderRadius: 9999,
                backgroundColor: 'rgba(26, 54, 54, 0.15)',
                border: '1px solid rgba(26, 54, 54, 0.4)',
                boxShadow: '0 0 0 0 rgba(0,0,0,0)',
              }
            : {
                width: 0,
                height: 0,
                borderRadius: 9999,
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
              }
        }
        transition={{ type: 'spring', stiffness: 350, damping: 22, mass: 0.15 }}
        className="flex items-center justify-center overflow-hidden"
      >
        {isLabelType && (
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#D6BD98] font-ui select-none">
            {cursorType}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
