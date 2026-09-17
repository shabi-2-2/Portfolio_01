"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ProcessCycle } from "@/components/home/process-cycle";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ArrowLink } from "@/components/ui/arrow-link";
import { SectionLabel } from "@/components/ui/section-label";

const focusAreas = ["Full-stack", "AI", "DevOps", "Open Source"] as const;

const metadataLinkClasses = "text-sm font-medium uppercase tracking-[0.15em]";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function useReveal() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (duration: number, y: number, delay: number) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { duration, ease: EASE_OUT, delay },
  });
}

export function Hero() {
  const reveal = useReveal();

  return (
    <Section
      id="hero"
      className="flex min-h-dvh flex-col pb-10 pt-16 md:pb-16 md:pt-28 lg:pt-32"
    >
      <Container className="flex flex-1 flex-col justify-between">
        <div className="lg:flex lg:items-start lg:justify-between lg:gap-20">
          <div className="lg:max-w-3xl">
            <motion.div {...reveal(0.5, 8, 0.15)}>
              <SectionLabel number="01">Intro</SectionLabel>
            </motion.div>
            <h1 className="mt-8 max-w-4xl text-[2rem] font-semibold uppercase leading-[1.08] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
              <motion.span className="block" {...reveal(0.7, 20, 0.25)}>
                I build things
              </motion.span>
              <motion.span className="block" {...reveal(0.7, 20, 0.35)}>
                I&apos;m curious about.
              </motion.span>
            </h1>
            <motion.p
              {...reveal(0.5, 12, 0.65)}
              className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              I build software across AI, full-stack web applications, developer
              tools, and infrastructure.
            </motion.p>
            <motion.div
              {...reveal(0.5, 8, 0.8)}
              className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10"
            >
              <ArrowLink href="#work" className={metadataLinkClasses}>
                Explore work
              </ArrowLink>
              <ArrowLink
                href="https://github.com/shabi-2-2"
                target="_blank"
                rel="noopener noreferrer"
                className={`${metadataLinkClasses} text-muted-foreground hover:text-foreground`}
              >
                GitHub
              </ArrowLink>
            </motion.div>
          </div>

          <motion.div
            {...reveal(0.5, 12, 0.95)}
            className="mt-16 lg:mt-2 lg:shrink-0"
          >
            <ProcessCycle />
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-border pt-8 md:mt-20 md:flex-row md:items-end md:justify-between md:pt-10">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {focusAreas.map((area) => (
              <li
                key={area}
                className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
              >
                {area}
              </li>
            ))}
          </ul>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Pune, India
          </p>
        </div>
      </Container>
    </Section>
  );
}