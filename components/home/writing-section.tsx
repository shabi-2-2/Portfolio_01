import { WritingEntry } from "@/components/home/writing-entry";
import { writingEntries } from "@/components/home/writing";
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

        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
          Notes and lessons on things I have built, learned, investigated, or
          am currently exploring.
        </p>

        <div className="mt-16 md:mt-20">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Notes
          </p>
          <div className="mt-2 border-t border-border">
            {writingEntries.map((entry) => (
              <WritingEntry key={entry.number} entry={entry} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}