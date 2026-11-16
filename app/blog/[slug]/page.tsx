import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleLayout } from "@/components/blog/article-layout";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import {
  assertPostContentFilesExist,
  loadPostContent,
} from "@/lib/blog-content";

// Only slugs produced by generateStaticParams are valid. Draft articles and
// unknown URLs therefore resolve to a 404 instead of rendering dynamically.
export const dynamicParams = false;

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

  const PostContent = await loadPostContent(post.slug);

  return (
    <ArticleLayout post={post}>
      <PostContent />
    </ArticleLayout>
  );
}
