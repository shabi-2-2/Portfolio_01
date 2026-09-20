import { OpenSourceEntry } from "@/components/home/open-source-entry";
import { openSourceEntries } from "@/components/home/open-source";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";

export function OpenSourceSection() {
  return (
    <Section
      id="open-source"
      className="scroll-mt-20 pb-28 pt-8 md:pb-36 md:pt-12"
    >
      <Container>
        <SectionLabel number="03">Open Source + Experiments</SectionLabel>

        <h2 className="mt-8 text-[1.75rem] font-semibold uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
          <span className="block">Open Source</span>
          <span className="block">Experiments</span>
        </h2>

        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
          Repositories, learning implementations, and technical experiments that
          explore topics beyond the main projects.
        </p>

        <div className="mt-16 grid border-t border-border md:mt-20 lg:grid-cols-2 lg:gap-16">
          <div className="pb-14 pt-10 md:pt-14 lg:border-r lg:border-border">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Open Source
            </h3>
            <div className="mt-6">
              <div className="border-t border-border">
                {openSourceEntries.map((entry) => (
                  <OpenSourceEntry key={entry.number} entry={entry} />
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-border pb-14 pt-10 md:pt-14 lg:border-t-0">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Experiments
            </h3>
            <div className="mt-6 min-h-40 border-t border-border md:min-h-48" />
          </div>
        </div>
      </Container>
    </Section>
  );
}