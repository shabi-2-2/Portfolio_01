import { ChevronDown } from "lucide-react";

import type { TableOfContentsEntry } from "@/lib/blog-toc";

export function MobileTableOfContents({
  items,
}: {
  items: TableOfContentsEntry[];
}) {
  return (
    <details className="group mt-8 border-y border-border py-4 lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
        On this page
        <ChevronDown
          aria-hidden="true"
          className="size-4 transition-transform duration-200 motion-reduce:transition-none group-open:rotate-180"
        />
      </summary>

      <nav aria-label="On this page">
        <ul className="mt-4 space-y-2.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={
                  item.level === 3
                    ? "block pl-4 text-sm leading-snug text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    : "block text-sm leading-snug text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                }
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
