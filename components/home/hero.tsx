import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProcessCycle } from "@/components/home/process-cycle";
import { ArrowLink } from "@/components/ui/arrow-link";
import { SectionLabel } from "@/components/ui/section-label";

const focusAreas = ["Full-stack", "AI", "DevOps", "Open Source"] as const;

const metadataLinkClasses = "text-sm font-medium uppercase tracking-[0.15em]";

export function Hero() {
  return (
    <Section
      id="hero"
      className="flex min-h-dvh flex-col pb-10 pt-16 md:pb-16 md:pt-28 lg:pt-32"
    >
      <Container className="flex flex-1 flex-col justify-between">
        <div className="lg:flex lg:items-start lg:justify-between lg:gap-20">
          <div className="lg:max-w-2xl">
            <SectionLabel number="01">Intro</SectionLabel>
            <h1 className="mt-8 max-w-4xl text-4xl font-semibold uppercase leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">I build things</span>
              <span className="block">I&apos;m curious about.</span>
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              I build software across AI, full-stack web applications,
              developer tools, and infrastructure.
            </p>
            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
              <ArrowLink
                href="#work"
                className={metadataLinkClasses}
              >
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
            </div>
          </div>

          <ProcessCycle className="mt-16 lg:mt-2 lg:shrink-0" />
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