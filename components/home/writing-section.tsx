import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";

export function WritingSection() {
  return (
    <Section id="writing" className="scroll-mt-20 pb-28 pt-8 md:pb-36 md:pt-12">
      <Container>
        <SectionLabel number="05">Writing</SectionLabel>

        <h2 className="mt-8 text-[1.75rem] font-semibold uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
          <span className="block">Writing</span>
          <span className="block">Notes</span>
        </h2>

        <div className="mt-16 border-t border-border md:mt-20">
          <div className="min-h-36 pt-10 md:min-h-40 md:pt-12" />
        </div>

        <div className="mt-6 border-t border-border md:mt-10">
          <p className="pt-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground md:pt-3">
            Notes
          </p>
          <div className="min-h-52 border-b border-border pb-14 md:min-h-64" />
        </div>
      </Container>
    </Section>
  );
}