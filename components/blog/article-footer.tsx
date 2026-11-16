import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { ArticleMetadata } from "@/lib/blog";
import { cn } from "@/lib/utils";

type ArticleFooterProps = {
  post: ArticleMetadata;
  previousPost?: ArticleMetadata;
  nextPost?: ArticleMetadata;
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00.000Z`));
}

function AdjacentArticle({
  post,
  direction,
}: {
  post: ArticleMetadata;
  direction: "previous" | "next";
}) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col gap-2 bg-background p-5 transition-colors duration-200 motion-reduce:transition-none hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:p-6",
        isNext && "sm:items-end sm:text-right",
      )}
    >
      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 motion-reduce:transition-none group-hover:text-foreground">
        {isNext ? (
          <>
            Next article
            <ArrowRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 motion-reduce:transition-none motion-safe:group-hover:translate-x-0.5"
            />
          </>
        ) : (
          <>
            <ArrowLeft
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 motion-reduce:transition-none motion-safe:group-hover:-translate-x-0.5"
            />
            Previous article
          </>
        )}
      </span>

      <span className="text-base font-semibold leading-snug tracking-tight text-foreground">
        {post.title}
      </span>
    </Link>
  );
}

export function ArticleFooter({
  post,
  previousPost,
  nextPost,
}: ArticleFooterProps) {
  return (
    <footer className="mt-16 border-t border-border pt-8 md:mt-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Published
          </p>

          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>

            {post.updatedAt ? (
              <span>
                · Updated{" "}
                <time dateTime={post.updatedAt}>
                  {formatDate(post.updatedAt)}
                </time>
              </span>
            ) : null}

            <span aria-hidden="true">·</span>
            <span>{post.readTime} min read</span>
          </p>
        </div>

        {post.tags.length > 0 ? (
          <ul
            aria-label="Article tags"
            className="flex flex-wrap gap-2 sm:justify-end"
          >
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {previousPost || nextPost ? (
        <nav
          aria-label="Article navigation"
          className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2"
        >
          {previousPost ? (
            <AdjacentArticle post={previousPost} direction="previous" />
          ) : (
            <span aria-hidden="true" className="hidden bg-background sm:block" />
          )}

          {nextPost ? (
            <AdjacentArticle post={nextPost} direction="next" />
          ) : (
            <span aria-hidden="true" className="hidden bg-background sm:block" />
          )}
        </nav>
      ) : null}

      <div className="mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to all writing
        </Link>
      </div>
    </footer>
  );
}
