import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * PageTransition
 * Light, restrained 350ms route transition.
 * Emil Kowalski principle: subtle opacity + small 6px translate.
 */
export function PageTransition({ children }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full flex-1"
    >
      {children}
    </motion.div>
  );
}
