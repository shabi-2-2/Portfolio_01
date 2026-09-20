import { ArrowLink } from "@/components/ui/arrow-link";
import { cn } from "@/lib/utils";
import type { WritingEntry as WritingEntryData } from "@/components/home/writing";

export function WritingEntry({ entry }: { entry: WritingEntryData }) {
  const hasLink = Boolean(entry.href);

  return (
    <article
      className={cn(
        "border-b border-border py-9 last:border-b-0 md:py-11",
        hasLink &&
          "group transition-colors duration-200 motion-reduce:transition-none hover:bg-muted/30 focus-within:bg-muted/30",
      )}
    >
      <p
        className={cn(
          "font-mono text-sm font-medium text-muted-foreground",
          hasLink &&
            "transition-colors duration-200 motion-reduce:transition-none group-hover:text-foreground group-focus-within:text-foreground",
        )}
      >
        {entry.number}
      </p>

      <h3
        className={cn(
          "mt-2 text-2xl font-semibold uppercase leading-tight tracking-tight md:text-3xl",
          hasLink &&
            "transition-transform duration-200 motion-safe:group-hover:translate-x-1 motion-safe:group-focus-within:translate-x-1",
        )}
      >
        {entry.title}
      </h3>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
        {entry.description}
      </p>

      {entry.metadata.length > 0 ? (
        <p
          className={cn(
            "mt-6 font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground",
            hasLink &&
              "transition-colors duration-200 motion-reduce:transition-none group-hover:text-foreground/80 group-focus-within:text-foreground/80",
          )}
        >
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