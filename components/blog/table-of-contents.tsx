"use client";

import { useEffect, useState } from "react";

import type { TableOfContentsEntry } from "@/lib/blog-toc";
import { cn } from "@/lib/utils";

const DEFAULT_HEADING_OFFSET = 96;
const MAX_HEADING_WAIT_FRAMES = 120;
const SCROLL_SETTLE_DELAY = 80;

function getHeadingOffset(heading: HTMLElement | undefined): number {
  if (!heading) return DEFAULT_HEADING_OFFSET;

  const value = Number.parseFloat(getComputedStyle(heading).scrollMarginTop);

  return Number.isFinite(value) ? value : DEFAULT_HEADING_OFFSET;
}

function useActiveHeading(items: TableOfContentsEntry[]) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    let headings: HTMLElement[] = [];
    let offset = DEFAULT_HEADING_OFFSET;
    let headingObserver: IntersectionObserver | null = null;
    let endObserver: IntersectionObserver | null = null;
    let endIntersecting = false;
    let settleTimer = 0;
    let retryFrame = 0;
    let resizeFrame = 0;
    let retries = 0;

    const sync = () => {
      if (headings.length === 0) return;

      // Re-read positions so jumps that skip observer boundaries and
      // bottom-of-article edge cases still resolve to the correct section.
      // A 1px tolerance absorbs subpixel layout and anchor-scroll rounding.
      let currentId = headings[0].id;
      const line = offset + 1;

      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= line) {
          currentId = heading.id;
        }
      }

      if (endIntersecting) {
        const scrollable =
          document.documentElement.scrollHeight > window.innerHeight + 4;

        if (scrollable && window.scrollY > 0) {
          currentId = headings[headings.length - 1].id;
        }
      }

      setActiveId((prev) => (prev === currentId ? prev : currentId));
    };

    const scheduleSettle = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(sync, SCROLL_SETTLE_DELAY);
    };

    const handleScrollEnd = () => {
      window.clearTimeout(settleTimer);
      settleTimer = 0;
      sync();
    };

    const setup = () => {
      headingObserver?.disconnect();
      endObserver?.disconnect();
      endIntersecting = false;

      headings = items
        .map((item) => document.getElementById(item.id))
        .filter((heading): heading is HTMLElement => heading !== null);

      // Retry briefly so the TOC still binds if headings mount after hydration.
      if (headings.length === 0) {
        if (retries < MAX_HEADING_WAIT_FRAMES) {
          retries += 1;
          retryFrame = window.requestAnimationFrame(setup);
        }
        return;
      }

      offset = Math.round(getHeadingOffset(headings[0]));
      const bottomMargin = Math.max(0, window.innerHeight - offset - 1);
      const rootMargin = `-${offset}px 0px -${bottomMargin}px 0px`;

      headingObserver = new IntersectionObserver(
        () => {
          sync();
        },
        { rootMargin, threshold: 0 },
      );

      for (const heading of headings) {
        headingObserver.observe(heading);
      }

      const endElement = document.querySelector<HTMLElement>("[data-toc-end]");

      if (endElement) {
        endObserver = new IntersectionObserver(
          ([entry]) => {
            endIntersecting = entry?.isIntersecting ?? false;
            sync();
          },
          { threshold: 0 },
        );

        endObserver.observe(endElement);
      }

      sync();
    };

    const handleResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        setup();
      });
    };

    const supportsScrollEnd = "onscrollend" in window;

    setup();
    window.addEventListener("scroll", scheduleSettle, { passive: true });
    if (supportsScrollEnd) {
      window.addEventListener("scrollend", handleScrollEnd, { passive: true });
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(retryFrame);
      window.cancelAnimationFrame(resizeFrame);
      window.clearTimeout(settleTimer);
      headingObserver?.disconnect();
      endObserver?.disconnect();
      window.removeEventListener("scroll", scheduleSettle);
      if (supportsScrollEnd) {
        window.removeEventListener("scrollend", handleScrollEnd);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [items]);

  return items.some((item) => item.id === activeId)
    ? activeId
    : (items[0]?.id ?? "");
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
