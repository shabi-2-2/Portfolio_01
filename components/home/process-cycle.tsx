"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const stages = ["BUILD", "BREAK", "LEARN", "SHIP"] as const;
const cycleDurationMs = 3200;

interface ProcessCycleProps {
  className?: string;
}

export function ProcessCycle({ className }: ProcessCycleProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const timer = window.setInterval(() => {
      if (!pausedRef.current) {
        setActiveIndex((index) => (index + 1) % stages.length);
      }
    }, cycleDurationMs);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion, activeIndex]);

  const bulletTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: "easeInOut" as const };

  return (
    <div
      className={cn("flex flex-col", className)}
      onPointerEnter={() => {
        pausedRef.current = true;
      }}
      onPointerLeave={() => {
        pausedRef.current = false;
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onBlurCapture={() => {
        pausedRef.current = false;
      }}
    >
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Process
      </p>

      <div className="mt-4 flex flex-col">
        {stages.map((stage, index) => {
          const emphasized = index === activeIndex || index === hoveredIndex;

          return (
            <Fragment key={stage}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                className="flex min-h-5 items-center gap-3 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span
                  aria-hidden="true"
                  className="flex size-3 items-center justify-center"
                >
                  {index === activeIndex ? (
                    <motion.span
                      layoutId="process-bullet"
                      transition={bulletTransition}
                      className="size-2 rounded-full bg-foreground"
                    />
                  ) : (
                    <span className="size-1.5 rounded-full border border-border" />
                  )}
                </span>
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground/70">
                  0{index + 1}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium uppercase tracking-[0.1em] transition-colors motion-reduce:transition-none",
                    emphasized ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {stage}
                </span>
              </button>

              {index < stages.length - 1 && (
                <div aria-hidden="true" className="flex h-6 items-start">
                  <span className="flex w-3 flex-col items-center">
                    <span className="h-3 w-px bg-border" />
                    <span className="font-mono text-[10px] leading-none text-muted-foreground/80">
                      ↓
                    </span>
                  </span>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}