import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/layout/container";

const githubUrl = "https://github.com/shabi-2-2";
const linkedInUrl = "https://www.linkedin.com/in/shabi-haidar-rizvi-bab637385/";
const emailUrl = "mailto:zhrizvi476@gmail.com";

const footerLinkClasses =
  "py-1 font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-10">
        <p className="font-medium tracking-tight text-foreground">
          Shabi Haidar Rizvi
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            © 2026
          </p>
          <ArrowLink
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClasses}
          >
            GitHub
          </ArrowLink>
          <ArrowLink
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClasses}
          >
            LinkedIn
          </ArrowLink>
          <ArrowLink className={footerLinkClasses} href={emailUrl}>
            Email
          </ArrowLink>
        </div>
      </Container>
    </footer>
  );
}