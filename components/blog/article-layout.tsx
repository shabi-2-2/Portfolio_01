import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/layout/container";
import type { ArticleMetadata } from "@/lib/blog";

type ArticleLayoutProps = {
  post: ArticleMetadata;
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

const articleContentClasses = [
  "[&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight",
  "[&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight",
  "[&_p]:mt-5 [&_p]:leading-7 [&_p]:text-muted-foreground",
  "[&_ul]:mt-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
  "[&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
  "[&_li]:leading-7 [&_li]:text-muted-foreground",
  "[&_blockquote]:mt-6 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-muted-foreground",
  "[&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 [&_a:hover]:decoration-foreground",
  "[&_strong]:font-semibold [&_strong]:text-foreground",
  "[&_code]:rounded-sm [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-foreground",
  "[&_pre]:mt-6 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-6",
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit",
  "[&_hr]:mt-10 [&_hr]:border-border",
].join(" ");

export function ArticleLayout({ post, children }: ArticleLayoutProps) {
  return (
    <main className="pb-24 pt-10 md:pb-32 md:pt-16">
      <Container className="max-w-3xl">
        <nav aria-label="Breadcrumb">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to blog
          </Link>
        </nav>

        <article>
          <header className="mt-8 border-b border-border pb-8">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {post.category}
            </p>

            <h1 className="mt-4 text-3xl font-semibold uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
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
                  Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                </span>
              ) : null}

              <span>{post.readTime} min read</span>
            </div>

            {post.tags.length > 0 ? (
              <ul aria-label="Tags" className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-border px-2.5 py-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </header>

          <div className={articleContentClasses}>{children}</div>
        </article>
      </Container>
    </main>
  );
}
