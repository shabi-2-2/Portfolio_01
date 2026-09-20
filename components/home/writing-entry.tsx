import { ArrowLink } from "@/components/ui/arrow-link";
import type { WritingEntry as WritingEntryData } from "@/components/home/writing";

export function WritingEntry({ entry }: { entry: WritingEntryData }) {
  return (
    <article className="group border-b border-border py-9 transition-colors duration-200 motion-reduce:transition-none last:border-b-0 hover:bg-muted/30 focus-within:bg-muted/30 md:py-11">
      <p className="font-mono text-sm font-medium text-muted-foreground transition-colors duration-200 motion-reduce:transition-none group-hover:text-foreground group-focus-within:text-foreground">
        {entry.number}
      </p>

      <h3 className="mt-2 text-2xl font-semibold uppercase leading-tight tracking-tight transition-transform duration-200 motion-safe:group-hover:translate-x-1 motion-safe:group-focus-within:translate-x-1 md:text-3xl">
        {entry.title}
      </h3>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
        {entry.description}
      </p>

      {entry.metadata.length > 0 ? (
        <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-200 motion-reduce:transition-none group-hover:text-foreground/80 group-focus-within:text-foreground/80">
          {entry.metadata.join(" · ")}
        </p>
      ) : null}

      <p className="mt-3 font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
        {entry.status}
      </p>

      {entry.href ? (
        <div className="mt-5">
          <ArrowLink
            href={entry.href}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2"
          >
            {entry.linkLabel}
          </ArrowLink>
        </div>
      ) : null}
    </article>
  );
}