import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleLayout } from "@/components/blog/article-layout";
import {
  getAllPostSlugs,
  getAllPublishedPosts,
  getPostBySlug,
} from "@/lib/blog";
import {
  assertPostContentFilesExist,
  loadPostContent,
  loadPostTableOfContents,
} from "@/lib/blog-content";

// Only slugs produced by generateStaticParams are valid. Draft articles and
// unknown URLs therefore resolve to a 404 instead of rendering dynamically.
export const dynamicParams = false;

const siteUrl = "https://shabi01.vercel.app";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  assertPostContentFilesExist();

  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const canonicalPath = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: "Shabi Haidar Rizvi" }],
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: canonicalPath,
      siteName: "Shabi Haidar Rizvi",
      publishedTime: post.publishedAt,
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      tags: [...post.tags],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [PostContent, toc] = await Promise.all([
    loadPostContent(post.slug),
    loadPostTableOfContents(post.slug),
  ]);

  // Navigation is derived from the published repository, so drafts can never
  // appear as previous/next links.
  const posts = getAllPublishedPosts();
  const postIndex = posts.findIndex((entry) => entry.slug === post.slug);
  const previousPost = postIndex >= 0 ? posts[postIndex + 1] : undefined;
  const nextPost = postIndex > 0 ? posts[postIndex - 1] : undefined;

  const articleUrl = `${siteUrl}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: "Shabi Haidar Rizvi",
      url: `${siteUrl}/`,
    },
    publisher: {
      "@type": "Person",
      name: "Shabi Haidar Rizvi",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    url: articleUrl,
    articleSection: post.category,
    keywords: post.tags.join(", "),
    timeRequired: `PT${post.readTime}M`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ArticleLayout
        post={post}
        toc={toc}
        previousPost={previousPost}
        nextPost={nextPost}
      >
        <PostContent />
      </ArticleLayout>
    </>
  );
}
