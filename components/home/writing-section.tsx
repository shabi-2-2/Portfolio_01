"use client";

import { motion, useReducedMotion } from "framer-motion";

import { WritingEntry } from "@/components/home/writing-entry";
import { writingEntries } from "@/components/home/writing";
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

export function WritingSection() {
  const reveal = useRevealInView();

  return (
    <Section id="writing" className="scroll-mt-20 pb-28 pt-8 md:pb-36 md:pt-12">
      <Container>
        <SectionLabel number="05">Writing</SectionLabel>

        <h2 className="mt-8 text-[1.75rem] font-semibold uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
          <span className="block">Writing</span>
          <span className="block">Notes</span>
        </h2>

        <motion.p
          {...reveal(0.4, 12, 0.1)}
          className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Notes and lessons on things I have built, learned, investigated, or
          am currently exploring.
        </motion.p>

        <div className="mt-16 md:mt-20">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Notes
          </p>
          <div className="mt-2 border-t border-border">
            {writingEntries.map((entry, index) => (
              <motion.div
                key={entry.number}
                {...reveal(0.4, 12, 0.2 + index * 0.1)}
              >
                <WritingEntry entry={entry} />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}