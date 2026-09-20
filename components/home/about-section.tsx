"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function useRevealInView() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (duration: number, y: number, delay: number) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { duration, ease: EASE_OUT, delay },
  });
}

export function AboutSection() {
  const reveal = useRevealInView();

  return (
    <Section id="about" className="scroll-mt-20 pb-28 pt-8 md:pb-36 md:pt-12">
      <Container>
        <SectionLabel number="04">About</SectionLabel>

        <h2 className="mt-8 text-[1.75rem] font-semibold uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
          <span className="block">About</span>
          <span className="block">Shabi</span>
        </h2>

        <div className="mt-16 md:mt-20">
          <motion.div {...reveal(0.5, 12, 0.15)}>
            <div className="border border-border p-8 md:p-10">
              <p className="max-w-2xl text-lg leading-relaxed text-foreground md:text-xl">
                I&apos;m Shabi — a BTech student who likes understanding how
                things work by building them. I work across AI, full-stack
                applications, developer tools, and infrastructure, and I learn
                best by turning ideas into working systems.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid border-t border-border md:mt-10 lg:grid-cols-3 lg:gap-16">
          <motion.div
            {...reveal(0.45, 12, 0.4)}
            className="pb-14 pt-10 md:pt-12 lg:border-r lg:border-border"
          >
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Currently
            </h3>
            <div className="mt-6 border-t border-border pt-6">
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                BTech student, currently building across AI, full-stack
                development, developer tooling, and infrastructure.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...reveal(0.45, 12, 0.46)}
            className="border-t border-border pb-14 pt-10 md:pt-12 lg:border-t-0 lg:border-r lg:border-border"
          >
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Focus
            </h3>
            <ul className="mt-6 list-none space-y-2.5 border-t border-border pt-6 text-sm leading-relaxed text-foreground md:text-base">
              <li>AI</li>
              <li>Full-stack engineering</li>
              <li>Systems &amp; infrastructure</li>
              <li>Developer tooling</li>
            </ul>
          </motion.div>

          <motion.div
            {...reveal(0.45, 12, 0.52)}
            className="border-t border-border pb-14 pt-10 md:pt-12 lg:border-t-0"
          >
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Exploring
            </h3>
            <ul className="mt-6 list-none space-y-2.5 border-t border-border pt-6 text-sm leading-relaxed text-foreground md:text-base">
              <li>Deep learning from scratch</li>
              <li>Agentic AI</li>
              <li>New systems through hands-on projects</li>
            </ul>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}