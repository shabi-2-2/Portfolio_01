import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";

export function ContactSection() {
  return (
    <Section id="contact" className="scroll-mt-20 pb-28 pt-8 md:pb-36 md:pt-12">
      <Container>
        <SectionLabel number="06">Contact</SectionLabel>

        <h2 className="mt-8 text-[1.75rem] font-semibold uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
          <span className="block">Let&apos;s</span>
          <span className="block">Build Something.</span>
        </h2>

        <div className="mt-16 border-t border-border md:mt-20">
          <div className="min-h-32 pt-10 md:min-h-40 md:pt-12" />
        </div>

        <div className="mt-6 border-t border-border md:mt-10">
          <p className="pt-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground md:pt-3">
            Reach me
          </p>
          <div className="min-h-28 border-b border-border pb-14 md:min-h-36" />
        </div>
      </Container>
    </Section>
  );
}