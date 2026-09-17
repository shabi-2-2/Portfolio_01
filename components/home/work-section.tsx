import { FeaturedProject } from "@/components/home/featured-project";
import { ProjectEntry } from "@/components/home/project-entry";
import { projects } from "@/components/home/projects";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";

export function WorkSection() {
  return (
    <Section
      id="work"
      className="scroll-mt-20 pb-28 pt-16 md:pb-36 md:pt-24"
    >
      <Container>
        <SectionLabel number="02">Selected Work</SectionLabel>

        <h2 className="mt-8 text-[1.75rem] font-semibold uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
          <span className="block">Selected</span>
          <span className="block">Work</span>
        </h2>

        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
          A selection of projects across AI, full-stack systems, developer
          tools, and infrastructure.
        </p>

        <div className="mt-16 border-t border-border pt-10 md:mt-20 md:pt-12">
          <FeaturedProject />
        </div>

        <div className="mt-20 md:mt-24">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Additional work
          </p>
          <div className="mt-2">
            {projects.map((project) => (
              <ProjectEntry key={project.number} project={project} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}