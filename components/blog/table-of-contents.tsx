"use client";

import { useEffect, useState } from "react";

import type { TableOfContentsEntry } from "@/lib/blog-toc";
import { cn } from "@/lib/utils";

function useActiveHeading(items: TableOfContentsEntry[]) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => heading !== null);

    if (headings.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        setActiveId(headings[headings.length - 1].id);
        return;
      }

      const offset = 140;
      let current = headings[0].id;

      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= offset) {
          current = heading.id;
        }
      }

      setActiveId(current);
    };

    const schedule = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  return activeId;
}

export function TableOfContents({
  items,
}: {
  items: TableOfContentsEntry[];
}) {
  const activeId = useActiveHeading(items);

  return (
    <nav aria-label="On this page" className="hidden lg:block">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        On this page
      </p>

      <ul className="mt-4 border-l border-border">
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  item.level === 3 ? "pl-6" : "pl-4",
                  isActive
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
