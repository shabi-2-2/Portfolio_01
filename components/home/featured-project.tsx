import { ArrowLink } from "@/components/ui/arrow-link";

const deploymentUrl = "https://census-ai-connect.vercel.app/";
const repositoryUrl = "https://github.com/shabi-2-2/CensusAI-Connect";

const metadataLineClasses =
  "font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground";

export function FeaturedProject() {
  return (
    <article className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-16">
      <div className="lg:col-span-5">
        <p className="font-mono text-sm font-medium text-muted-foreground">
          01
        </p>

        <h3 className="mt-4 text-3xl font-semibold uppercase leading-tight tracking-tight md:text-4xl">
          Census AI Connect
        </h3>

        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
          A multilingual, AI-assisted platform for understanding and
          participating in India&apos;s Digital Census — guided self-enumeration,
          schedule lookup, a myth-busting fact-checker, and data insights.
          Demonstration prototype built with Next.js and Google Gemini.
        </p>

        <div className="mt-8 space-y-2">
          <p className={metadataLineClasses}>AI · Full-stack · Multilingual</p>
          <p className={metadataLineClasses}>
            Next.js · Google Gemini · Vercel
          </p>
        </div>
      </div>

      <div className="mt-12 border border-border bg-white lg:col-span-7 lg:mt-0">
        <iframe
          src={deploymentUrl}
          title="Census AI Connect — live preview"
          loading="lazy"
          referrerPolicy="no-referrer"
          tabIndex={-1}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          className="h-[420px] w-full md:h-[560px]"
        />
        <p className="border-t border-border px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          Live site · Demonstration prototype
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8 lg:col-span-12">
        <ArrowLink
          href={deploymentUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View project
        </ArrowLink>
        <ArrowLink
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </ArrowLink>
      </div>
    </article>
  );
}