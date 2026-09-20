import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";

type ContactMethod = {
  number: string;
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

const contactMethods: ContactMethod[] = [
  {
    number: "01",
    label: "Email",
    value: "zhrizvi476@gmail.com",
    href: "mailto:zhrizvi476@gmail.com",
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
  return (
    <Section id="contact" className="scroll-mt-20 pb-28 pt-8 md:pb-36 md:pt-12">
      <Container>
        <SectionLabel number="06">Contact</SectionLabel>

        <h2 className="mt-8 text-[1.75rem] font-semibold uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
          <span className="block">Let&apos;s</span>
          <span className="block">Build Something.</span>
        </h2>

        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
          Have an idea, project, or something interesting to build? I&apos;d
          be happy to hear from you.
        </p>

        <div className="mt-16 md:mt-20">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Reach me
          </p>
          <ul className="mt-2 border-t border-border">
            {contactMethods.map((method) => (
              <li
                key={method.number}
                className="flex flex-col gap-2 border-b border-border py-6 last:border-b-0 md:flex-row md:items-baseline md:justify-between md:gap-6 md:py-8"
              >
                <div className="flex min-w-0 items-baseline gap-4">
                  <p className="shrink-0 font-mono text-sm font-medium text-muted-foreground">
                    {method.number}
                  </p>
                  <h3 className="text-lg font-semibold uppercase leading-tight tracking-tight md:text-xl">
                    {method.label}
                  </h3>
                </div>
                <ArrowLink
                  href={method.href}
                  {...(method.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="break-all font-mono text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground"
                >
                  {method.value}
                </ArrowLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}