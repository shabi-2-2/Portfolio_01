import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col">
      <Container className="flex flex-1 flex-col">
        <Section className="flex flex-1 flex-col justify-start pt-32 md:pt-48">
          <h1 className="max-w-4xl text-3xl font-semibold uppercase leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Shabi Haidar Rizvi
          </h1>
          <SectionLabel number="01" className="mt-12">
            Foundation
          </SectionLabel>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            The portfolio foundation is ready.
            <br />
            This is only a temporary preview.
          </p>
        </Section>
      </Container>
    </main>
  );
}