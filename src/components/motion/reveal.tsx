"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-reveal primitives.
 *
 * Framer Motion respects `prefers-reduced-motion` when `reducedMotion` is set
 * on MotionConfig, but these also use small, short transforms by default —
 * long slides and big scales are what actually make people queasy.
 *
 * `once: true` on every viewport trigger: re-animating content each time it
 * scrolls back into view is distracting, not delightful.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Fires slightly before the element is fully on screen. */
  margin?: string;
}

export function Reveal({
  children,
  className,
  delay = 0,
  margin = "-80px",
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Wraps a list whose children should cascade in. Pair with `RevealItem`. */
export function RevealGroup({
  children,
  className,
  margin = "-60px",
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}
