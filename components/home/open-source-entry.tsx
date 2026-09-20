import { ArrowLink } from "@/components/ui/arrow-link";
import type { OpenSourceEntry as OpenSourceEntryData } from "@/components/home/open-source";

export function OpenSourceEntry({ entry }: { entry: OpenSourceEntryData }) {
  return (
    <article className="group border-b border-border py-9 transition-colors duration-200 motion-reduce:transition-none last:border-b-0 hover:bg-muted/30 focus-within:bg-muted/30 md:py-11">
      <p className="font-mono text-sm font-medium text-muted-foreground transition-colors duration-200 motion-reduce:transition-none group-hover:text-foreground group-focus-within:text-foreground">
        {entry.number}
      </p>

      <h4 className="mt-2 text-xl font-semibold uppercase leading-tight tracking-tight transition-transform duration-200 motion-safe:group-hover:translate-x-1 motion-safe:group-focus-within:translate-x-1">
        {entry.name}
      </h4>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        {entry.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-200 motion-reduce:transition-none group-hover:text-foreground/80 group-focus-within:text-foreground/80">
          {entry.metadata.join(" · ")}
        </p>
        <ArrowLink
          href={entry.github}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2"
        >
          GitHub
        </ArrowLink>
      </div>
    </article>
  );
}