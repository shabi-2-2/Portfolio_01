import { articleRegistry } from "@/content/blog";

export type ArticleStatus = "draft" | "published";

export type ArticleMetadata = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  /** ISO 8601 calendar date, for example `2026-11-16`. */
  publishedAt: string;
  /** ISO 8601 calendar date, for example `2026-11-20`. */
  updatedAt?: string;
  /** Estimated reading time in minutes. Must be a positive integer. */
  readTime: number;
  status: ArticleStatus;
  featured?: boolean;
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const ARTICLE_KEYS = new Set([
  "slug",
  "title",
  "description",
  "category",
  "tags",
  "publishedAt",
  "updatedAt",
  "readTime",
  "status",
  "featured",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidDate(value: unknown): value is string {
  if (typeof value !== "string" || !ISO_DATE_PATTERN.test(value)) {
    return false;
  }

  // Comparing the serialized date catches impossible calendar dates such as
  // 2026-02-30, which JavaScript would otherwise normalize into March.
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value
  );
}

function describeArticle(value: unknown, index?: number): string {
  if (isRecord(value) && isNonEmptyString(value.slug)) {
    return `Article "${value.slug}"`;
  }

  return index === undefined ? "Article metadata" : `Article at index ${index}`;
}

/**
 * Validates a single article metadata object at runtime.
 *
 * The registry is typed, but runtime validation is still required because
 * metadata is authored by hand and invalid values must fail during the build
 * rather than rendering a broken article.
 */
export function validateArticleMetadata(
  value: unknown,
  index?: number,
): string[] {
  const label = describeArticle(value, index);

  if (!isRecord(value)) {
    return [`${label} must be an object.`];
  }

  const errors: string[] = [];

  for (const key of Object.keys(value)) {
    if (!ARTICLE_KEYS.has(key)) {
      errors.push(`${label} has an unknown field "${key}".`);
    }
  }

  if (typeof value.slug !== "string" || !SLUG_PATTERN.test(value.slug)) {
    errors.push(
      `${label} has an invalid slug. Use lowercase letters, numbers, and single hyphens (for example "building-agentic-ai-systems").`,
    );
  }

  if (!isNonEmptyString(value.title)) {
    errors.push(`${label} must have a non-empty title.`);
  }

  if (!isNonEmptyString(value.description)) {
    errors.push(`${label} must have a non-empty description.`);
  }

  if (!isNonEmptyString(value.category)) {
    errors.push(`${label} must have a non-empty category.`);
  }

  if (!Array.isArray(value.tags)) {
    errors.push(`${label} must have a tags array.`);
  } else {
    if (!value.tags.every(isNonEmptyString)) {
      errors.push(`${label} must only contain non-empty string tags.`);
    }

    const stringTags = value.tags.filter(isNonEmptyString);
    if (new Set(stringTags).size !== stringTags.length) {
      errors.push(`${label} has duplicate tags.`);
    }
  }

  if (!isValidDate(value.publishedAt)) {
    errors.push(
      `${label} must have a valid publishedAt date in YYYY-MM-DD format.`,
    );
  }

  if (value.updatedAt !== undefined) {
    if (!isValidDate(value.updatedAt)) {
      errors.push(
        `${label} must have a valid updatedAt date in YYYY-MM-DD format.`,
      );
    } else if (
      isValidDate(value.publishedAt) &&
      value.updatedAt < value.publishedAt
    ) {
      errors.push(`${label} cannot be updated before it was published.`);
    }
  }

  if (
    typeof value.readTime !== "number" ||
    !Number.isInteger(value.readTime) ||
    value.readTime <= 0
  ) {
    errors.push(`${label} must have a positive integer readTime.`);
  }

  if (value.status !== "draft" && value.status !== "published") {
    errors.push(`${label} must have a status of either "draft" or "published".`);
  }

  if (value.featured !== undefined && typeof value.featured !== "boolean") {
    errors.push(`${label} must have a boolean featured value when provided.`);
  }

  return errors;
}

/**
 * Validates every entry in a registry, including duplicate slug detection.
 * Returns an empty array when the registry is valid.
 */
export function validateArticleRegistry(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return ["The blog article registry must be an array."];
  }

  const errors: string[] = [];
  const seenSlugs = new Map<string, number>();

  value.forEach((article, index) => {
    errors.push(...validateArticleMetadata(article, index));

    if (isRecord(article) && typeof article.slug === "string") {
      const firstIndex = seenSlugs.get(article.slug);

      if (firstIndex !== undefined) {
        errors.push(
          `Duplicate slug "${article.slug}" found at indexes ${firstIndex} and ${index}. Slugs must be unique.`,
        );
      } else {
        seenSlugs.set(article.slug, index);
      }
    }
  });

  return errors;
}

export function assertValidArticleRegistry(
  value: unknown,
): asserts value is readonly ArticleMetadata[] {
  const errors = validateArticleRegistry(value);

  if (errors.length > 0) {
    throw new Error(`Invalid blog article registry:\n- ${errors.join("\n- ")}`);
  }
}

export type ArticleRepository = {
  getAllPublishedPosts: () => ArticleMetadata[];
  getPostBySlug: (slug: string) => ArticleMetadata | undefined;
  getAllPostSlugs: () => string[];
};

function compareByNewest(a: ArticleMetadata, b: ArticleMetadata): number {
  const dateDifference =
    Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

  return dateDifference !== 0
    ? dateDifference
    : a.title.localeCompare(b.title);
}

function cloneArticle(article: ArticleMetadata): ArticleMetadata {
  return { ...article, tags: [...article.tags] };
}

/**
 * Creates a validated, read-only view over a metadata registry.
 *
 * A factory keeps the retrieval logic testable with fixture data while the
 * default repository below is backed by the real `content/blog` registry.
 */
export function createArticleRepository(
  registry: readonly unknown[],
): ArticleRepository {
  assertValidArticleRegistry(registry);

  const publishedPosts = registry
    .filter((article): article is ArticleMetadata => article.status === "published")
    .sort(compareByNewest);

  return {
    getAllPublishedPosts: () => publishedPosts.map(cloneArticle),
    getPostBySlug: (slug) => {
      const article = publishedPosts.find((post) => post.slug === slug);
      return article ? cloneArticle(article) : undefined;
    },
    getAllPostSlugs: () => publishedPosts.map((post) => post.slug),
  };
}

const defaultRepository = createArticleRepository(articleRegistry);

export const getAllPublishedPosts = defaultRepository.getAllPublishedPosts;
export const getPostBySlug = defaultRepository.getPostBySlug;
export const getAllPostSlugs = defaultRepository.getAllPostSlugs;
