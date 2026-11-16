import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { ArticleMetadata } from "@/lib/blog";

type ArticleEntryProps = {
  post: ArticleMetadata;
  index: number;
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00.000Z`));
}

export function ArticleEntry({ post, index }: ArticleEntryProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      aria-label={`Read ${post.title}`}
      className="group block py-9 transition-colors duration-200 motion-reduce:transition-none hover:bg-muted/30 focus-visible:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:py-11"
    >
      <article>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <p className="font-mono text-sm font-medium text-muted-foreground transition-colors duration-200 motion-reduce:transition-none group-hover:text-foreground group-focus-visible:text-foreground">
            {String(index + 1).padStart(2, "0")}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-200 motion-reduce:transition-none group-hover:text-foreground/80 group-focus-visible:text-foreground/80">
            <span>{post.category}</span>
            <span aria-hidden="true">/</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span aria-hidden="true">/</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <h2 className="mt-3 max-w-3xl text-2xl font-semibold uppercase leading-tight tracking-tight transition-transform duration-200 motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1 md:text-3xl">
          {post.title}
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {post.description}
        </p>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          {post.tags.length > 0 ? (
            <ul
              aria-label={`Tags for ${post.title}`}
              className="flex flex-wrap gap-2"
            >
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-200 motion-reduce:transition-none group-hover:border-foreground/20 group-hover:text-foreground/80 group-focus-visible:border-foreground/20 group-focus-visible:text-foreground/80"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}

          <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-200 motion-reduce:transition-none group-hover:text-foreground group-focus-visible:text-foreground">
            Read article
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 motion-reduce:transition-none motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5"
            />
          </span>
        </div>
      </article>
    </Link>
  );
}
