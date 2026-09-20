"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy } from "lucide-react";

import { ArrowLink } from "@/components/ui/arrow-link";
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

type ContactMethod = {
  number: string;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  copyable?: boolean;
};

const EMAIL = "zhrizvi476@gmail.com";

const contactMethods: ContactMethod[] = [
  {
    number: "01",
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    copyable: true,
  },
  {
    number: "02",
    label: "LinkedIn",
    value: "LinkedIn",
    href: "https://www.linkedin.com/in/shabi-haidar-rizvi-bab637385/",
    external: true,
  },
  {
    number: "03",
    label: "GitHub",
    value: "github.com/shabi-2-2",
    href: "https://github.com/shabi-2-2",
    external: true,
  },
];

export function ContactSection() {
  const reveal = useRevealInView();

  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the mailto link remains the primary action.
    }
  };

  return (
    <Section id="contact" className="scroll-mt-20 pb-28 pt-8 md:pb-36 md:pt-12">
      <Container>
        <SectionLabel number="06">Contact</SectionLabel>

        <motion.h2
          {...reveal(0.4, 12, 0.05)}
          className="mt-8 text-[1.75rem] font-semibold uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-5xl"
        >
          <span className="block">Let&apos;s</span>
          <span className="block">Build Something.</span>
        </motion.h2>

        <motion.p
          {...reveal(0.4, 12, 0.15)}
          className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Have an idea, project, or something interesting to build? I&apos;d
          be happy to hear from you.
        </motion.p>

        <div className="mt-16 md:mt-20">
          <motion.p
            {...reveal(0.35, 10, 0.2)}
            className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
          >
            Reach me
          </motion.p>
          <ul className="mt-2 border-t border-border">
            {contactMethods.map((method, index) => (
              <motion.li
                key={method.number}
                {...reveal(0.35, 10, 0.24 + index * 0.07)}
                className="group flex flex-col gap-2 border-b border-border py-6 transition-colors duration-200 motion-reduce:transition-none last:border-b-0 hover:bg-muted/30 focus-within:bg-muted/30 md:flex-row md:items-baseline md:justify-between md:gap-6 md:py-8"
              >
                <div className="flex min-w-0 items-baseline gap-4">
                  <p className="shrink-0 font-mono text-sm font-medium text-muted-foreground transition-colors duration-200 motion-reduce:transition-none group-hover:text-foreground group-focus-within:text-foreground">
                    {method.number}
                  </p>
                  <h3 className="text-lg font-semibold uppercase leading-tight tracking-tight transition-transform duration-200 motion-safe:group-hover:translate-x-1 motion-safe:group-focus-within:translate-x-1 md:text-xl">
                    {method.label}
                  </h3>
                </div>
                <div className="flex min-w-0 flex-wrap items-center gap-3">
                  <ArrowLink
                    href={method.href}
                    {...(method.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="break-all font-mono text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground"
                  >
                    {method.value}
                  </ArrowLink>
                  {method.copyable && (
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-200 motion-reduce:transition-none hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {copied ? (
                        <Check aria-hidden="true" className="size-3.5" />
                      ) : (
                        <Copy aria-hidden="true" className="size-3.5" />
                      )}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  )}
                  {copied && (
                    <span role="status" className="sr-only">
                      Email copied
                    </span>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}