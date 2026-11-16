import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ArticleEntry } from "@/components/blog/article-entry";
import { Reveal } from "@/components/blog/reveal";
import { Container } from "@/components/layout/container";
import { SectionLabel } from "@/components/ui/section-label";
import { getAllPublishedPosts } from "@/lib/blog";

const description =
  "Technical explorations, engineering lessons, experiments, and ideas by Shabi Haidar Rizvi.";

export const metadata: Metadata = {
  title: "Writing & Ideas",
  description,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Writing & Ideas — Shabi Haidar Rizvi",
    description,
    type: "website",
    siteName: "Shabi Haidar Rizvi",
    url: "/blog",
  },
  twitter: {
    card: "summary",
    title: "Writing & Ideas — Shabi Haidar Rizvi",
    description,
  },
};

const backLinkClasses =
  "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function BlogPage() {
  const posts = getAllPublishedPosts();
  const articleCount = posts.length;
  const articleCountLabel = `${articleCount} ${
    articleCount === 1 ? "published article" : "published articles"
  }`;

  return (
    <main className="pb-24 pt-10 md:pb-32 md:pt-16">
      <Container className="max-w-3xl">
        <nav aria-label="Breadcrumb">
          <Link href="/" className={backLinkClasses}>
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to portfolio
          </Link>
        </nav>

        <header className="mt-12 border-b border-border pb-10 md:mt-16 md:pb-12">
          <SectionLabel number="05">Writing</SectionLabel>

          <h1 className="mt-8 text-[2rem] font-semibold uppercase leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">Writing</span>
            <span className="block">&amp; Ideas</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Technical explorations, engineering lessons, experiments, and ideas
            — notes on what I build, break, and learn along the way.
          </p>

          <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <span>Complete archive</span>
            <span aria-hidden="true">·</span>
            <span>{articleCountLabel}</span>
          </p>
        </header>

        {posts.length > 0 ? (
          <ul aria-label="Published articles" className="mt-2">
            {posts.map((post, index) => (
              <li
                key={post.slug}
                className="border-b border-border last:border-b-0"
              >
                <Reveal delay={index * 0.08}>
                  <ArticleEntry post={post} index={index} />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal className="mt-10">
            <div className="border border-border px-6 py-12 md:px-8 md:py-16">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Archive
              </p>

              <h2 className="mt-4 text-2xl font-semibold uppercase leading-tight tracking-tight md:text-3xl">
                No published articles yet
              </h2>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                This archive is still being written. Check back soon for notes
                on what I&apos;m building, breaking, and learning.
              </p>

              <Link href="/" className={`${backLinkClasses} mt-8`}>
                <ArrowLeft aria-hidden="true" className="size-4" />
                Return home
              </Link>
            </div>
          </Reveal>
        )}
      </Container>
    </main>
  );
}
