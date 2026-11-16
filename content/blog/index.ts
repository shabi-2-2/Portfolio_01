import type { ArticleMetadata } from "@/lib/blog";

/**
 * Central article registry.
 *
 * Add the metadata entry here and add the matching MDX file in
 * `content/blog/posts/` using the same slug as the filename.
 *
 * Drafts are intentionally excluded from every public retrieval function.
 */
export const articleRegistry = [
  {
    slug: "building-agentic-ai-systems",
    title: "Building Agentic AI Systems",
    description:
      "A draft placeholder for an article about building agentic AI systems. The final content will be written in a later phase.",
    category: "AI Engineering",
    tags: ["AI", "Agents", "Architecture"],
    publishedAt: "2026-11-16",
    readTime: 5,
    status: "published",
    featured: false,
  },
  {
    slug: "neural-networks-from-scratch",
    title: "Learning Neural Networks From Scratch",
    description:
      "A draft placeholder for an article about learning neural networks from first principles. The final content will be written in a later phase.",
    category: "Machine Learning",
    tags: ["Neural Networks", "Deep Learning", "Python"],
    publishedAt: "2026-11-16",
    readTime: 6,
    status: "published",
    featured: false,
  },
] satisfies readonly ArticleMetadata[];
