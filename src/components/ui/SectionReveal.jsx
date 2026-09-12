import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * SectionReveal
 * 
 * Orchestrates viewport entrances with Emil Kowalski & Impeccable restraint:
 * - Subtle vertical displacement (18-24px, never large jumps)
 * - Custom physical curve [0.16, 1, 0.3, 1]
 * - Staggered choreography for headings, copy, and cards
 * - Respects prefers-reduced-motion
 */
export function SectionReveal({
  children,
  className = '',
  delay = 0,
  yOffset = 22,
  duration = 0.6,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className} {...props}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -50px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
