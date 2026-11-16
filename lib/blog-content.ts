import { existsSync } from "node:fs";
import { join } from "node:path";
import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";

import { articleRegistry } from "@/content/blog";
import { getPostBySlug } from "@/lib/blog";
import type { ArticleMetadata } from "@/lib/blog";

type MdxModule = {
  default: ComponentType<MDXProps>;
};

const POSTS_DIRECTORY = join(process.cwd(), "content", "blog", "posts");

export function getPostContentFilePath(
  slug: string,
  postsDirectory = POSTS_DIRECTORY,
): string {
  return join(postsDirectory, `${slug}.mdx`);
}

/**
 * Returns the slugs whose MDX file is missing. Used during build generation so
 * a registry entry can never point at content that does not exist.
 */
export function findMissingPostContent(
  posts: readonly Pick<ArticleMetadata, "slug">[],
  postsDirectory = POSTS_DIRECTORY,
): string[] {
  return posts
    .filter((post) => !existsSync(getPostContentFilePath(post.slug, postsDirectory)))
    .map((post) => post.slug);
}

export function assertPostContentFilesExist(): void {
  const missingSlugs = findMissingPostContent(articleRegistry);

  if (missingSlugs.length > 0) {
    throw new Error(
      `Missing MDX content for blog article(s): ${missingSlugs.join(
        ", ",
      )}. Add the matching file(s) under content/blog/posts/.`,
    );
  }
}

/**
 * Loads the MDX component for a published article. Draft and unknown slugs are
 * rejected here as a second line of defence, even though the route already
 * checks publication status before rendering.
 */
export async function loadPostContent(
  slug: string,
): Promise<ComponentType<MDXProps>> {
  if (!getPostBySlug(slug)) {
    throw new Error(
      `Cannot load MDX content for "${slug}" because it is not a published article.`,
    );
  }

  try {
    const contentModule = (await import(
      `@/content/blog/posts/${slug}.mdx`
    )) as MdxModule;

    return contentModule.default;
  } catch (error) {
    throw new Error(
      `Unable to load MDX content for blog slug "${slug}". Ensure content/blog/posts/${slug}.mdx exists and compiles.`,
      { cause: error },
    );
  }
}
