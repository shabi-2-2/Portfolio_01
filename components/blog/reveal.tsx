"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/**
 * Small client boundary for the blog's entrance animations. Content passed as
 * children is still rendered on the server; only the motion wrapper ships to
 * the client.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 12,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className={cn(className)}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.45, ease: EASE_OUT, delay }
      }
    >
      {children}
    </motion.div>
  );
}
