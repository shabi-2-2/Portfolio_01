import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";

export function AboutSection() {
  return (
    <Section id="about" className="scroll-mt-20 pb-28 pt-8 md:pb-36 md:pt-12">
      <Container>
        <SectionLabel number="04">About</SectionLabel>

        <h2 className="mt-8 text-[1.75rem] font-semibold uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
          <span className="block">About</span>
          <span className="block">Shabi</span>
        </h2>

        <div className="mt-16 md:mt-20">
          <div className="min-h-44 border border-border p-8 md:min-h-56 md:p-10">
            <div className="min-h-40 md:min-h-48" />
          </div>
        </div>

        <div className="mt-6 grid border-t border-border md:mt-10 lg:grid-cols-3 lg:gap-16">
          <div className="pb-14 pt-10 md:pt-12 lg:border-r lg:border-border">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Currently
            </h3>
            <div className="mt-6 min-h-40 border-t border-border md:min-h-48" />
          </div>

          <div className="border-t border-border pb-14 pt-10 md:pt-12 lg:border-t-0 lg:border-r lg:border-border">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Focus
            </h3>
            <div className="mt-6 min-h-40 border-t border-border md:min-h-48" />
          </div>

          <div className="border-t border-border pb-14 pt-10 md:pt-12 lg:border-t-0">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Exploring
            </h3>
            <div className="mt-6 min-h-40 border-t border-border md:min-h-48" />
          </div>
        </div>
      </Container>
    </Section>
  );
}