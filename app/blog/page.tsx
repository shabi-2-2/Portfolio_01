import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { getAllPublishedPosts } from "@/lib/blog";

const description = "Technical notes and articles by Shabi Haidar Rizvi.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog — Shabi Haidar Rizvi",
    description,
    type: "website",
    siteName: "Shabi Haidar Rizvi",
    url: "/blog",
  },
  twitter: {
    card: "summary",
    title: "Blog — Shabi Haidar Rizvi",
    description,
  },
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00.000Z`));
}

export default function BlogPage() {
  const posts = getAllPublishedPosts();

  return (
    <main className="pb-24 pt-10 md:pb-32 md:pt-16">
      <Container className="max-w-3xl">
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          ← Shabi Haidar Rizvi
        </Link>

        <header className="mt-10 border-b border-border pb-8">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Writing
          </p>
          <h1 className="mt-4 text-3xl font-semibold uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
            Blog
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        </header>

        {posts.length > 0 ? (
          <ul className="mt-4 border-t border-border">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border">
                <article className="py-8">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    <span>{post.category}</span>
                    <span aria-hidden="true">/</span>
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                    <span aria-hidden="true">/</span>
                    <span>{post.readTime} min read</span>
                  </div>

                  <h2 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 border border-border p-6 text-muted-foreground">
            No published articles yet.
          </p>
        )}
      </Container>
    </main>
  );
}
