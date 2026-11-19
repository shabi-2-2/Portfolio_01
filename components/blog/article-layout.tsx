import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ArticleFooter } from "@/components/blog/article-footer";
import { MobileTableOfContents } from "@/components/blog/mobile-table-of-contents";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Container } from "@/components/layout/container";
import type { ArticleMetadata } from "@/lib/blog";
import type { TableOfContentsEntry } from "@/lib/blog-toc";
import { cn } from "@/lib/utils";

type ArticleLayoutProps = {
  post: ArticleMetadata;
  toc?: TableOfContentsEntry[];
  previousPost?: ArticleMetadata;
  nextPost?: ArticleMetadata;
  children: React.ReactNode;
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00.000Z`));
}

export function ArticleLayout({
  post,
  toc = [],
  previousPost,
  nextPost,
  children,
}: ArticleLayoutProps) {
  const hasTableOfContents = toc.length >= 2;

  return (
    <main className="pb-24 pt-10 md:pb-32 md:pt-16">
      <ReadingProgress />

      <Container className="max-w-5xl">
        <nav aria-label="Breadcrumb">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to blog
          </Link>
        </nav>

        <div
          className={cn(
            "mt-8 md:mt-10",
            hasTableOfContents
              ? "lg:grid lg:grid-cols-[minmax(0,1fr)_12rem] lg:items-start lg:gap-12 xl:gap-16"
              : "mx-auto max-w-3xl",
          )}
        >
          <article aria-labelledby="article-title" className="min-w-0">
            <header className="border-b border-border pb-8 md:pb-10">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {post.category}
              </p>

              <h1
                id="article-title"
                className="mt-4 text-[2rem] font-semibold uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-5xl"
              >
                {post.title}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {post.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>

                {post.updatedAt ? (
                  <span>
                    Updated{" "}
                    <time dateTime={post.updatedAt}>
                      {formatDate(post.updatedAt)}
                    </time>
                  </span>
                ) : null}

                <span>{post.readTime} min read</span>
              </div>
            </header>

            {hasTableOfContents ? (
              <MobileTableOfContents items={toc} />
            ) : null}

            <div
              id="article-body"
              className="article-prose mt-10 md:mt-12"
            >
              {children}
            </div>

            <ArticleFooter
              post={post}
              previousPost={previousPost}
              nextPost={nextPost}
            />

            {hasTableOfContents ? (
              // Zero-visual sentinel used by the table of contents to activate
              // its final entry when the reader reaches the end of the article.
              <div aria-hidden="true" data-toc-end className="h-px" />
            ) : null}
          </article>

          {hasTableOfContents ? (
            <aside className="hidden lg:block lg:self-stretch">
              <div className="sticky top-24">
                <TableOfContents items={toc} />
              </div>
            </aside>
          ) : null}
        </div>
      </Container>
    </main>
  );
}
