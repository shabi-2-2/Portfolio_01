import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { articleRegistry } from "@/content/blog";
import {
  createArticleRepository,
  validateArticleMetadata,
  validateArticleRegistry,
  type ArticleMetadata,
} from "@/lib/blog";
import { findMissingPostContent } from "@/lib/blog-content";

const validArticle: ArticleMetadata = {
  slug: "valid-article",
  title: "Valid Article",
  description: "A valid article used by the blog tests.",
  category: "Engineering",
  tags: ["Testing", "Blog"],
  publishedAt: "2026-01-15",
  readTime: 4,
  status: "published",
  featured: false,
};

function makeArticle(
  overrides: Partial<ArticleMetadata> = {},
): ArticleMetadata {
  return { ...validArticle, ...overrides };
}

test("accepts valid article metadata", () => {
  assert.deepEqual(validateArticleMetadata(validArticle), []);
});

test("rejects invalid slugs", () => {
  const errors = validateArticleMetadata(
    makeArticle({ slug: "Not A Valid Slug!" }),
  );

  assert.ok(errors.some((error) => error.includes("invalid slug")));
});

test("rejects missing required metadata", () => {
  const errors = validateArticleMetadata({
    slug: "missing-fields",
  });

  assert.ok(errors.some((error) => error.includes("title")));
  assert.ok(errors.some((error) => error.includes("description")));
  assert.ok(errors.some((error) => error.includes("category")));
  assert.ok(errors.some((error) => error.includes("tags")));
  assert.ok(errors.some((error) => error.includes("publishedAt")));
  assert.ok(errors.some((error) => error.includes("readTime")));
  assert.ok(errors.some((error) => error.includes("status")));
});

test("rejects invalid and impossible dates", () => {
  assert.ok(
    validateArticleMetadata(
      makeArticle({ publishedAt: "2026-02-30" }),
    ).some((error) => error.includes("publishedAt")),
  );

  assert.ok(
    validateArticleMetadata(
      makeArticle({ publishedAt: "15/01/2026" }),
    ).some((error) => error.includes("publishedAt")),
  );

  assert.ok(
    validateArticleMetadata(
      makeArticle({ publishedAt: "2026-05-01", updatedAt: "2026-04-01" }),
    ).some((error) => error.includes("updated before")),
  );
});

test("rejects non-positive and non-integer read times", () => {
  for (const readTime of [0, -1, 1.5, Number.NaN]) {
    const errors = validateArticleMetadata(makeArticle({ readTime }));
    assert.ok(errors.some((error) => error.includes("readTime")));
  }
});

test("rejects invalid statuses, duplicate tags, and unknown fields", () => {
  const invalidStatus = validateArticleMetadata(
    { ...validArticle, status: "archived" },
  );
  assert.ok(invalidStatus.some((error) => error.includes("status")));

  const duplicateTags = validateArticleMetadata(
    makeArticle({ tags: ["AI", "AI"] }),
  );
  assert.ok(duplicateTags.some((error) => error.includes("duplicate tags")));

  const unknownField = validateArticleMetadata({
    ...validArticle,
    author: "Unknown",
  });
  assert.ok(unknownField.some((error) => error.includes("unknown field")));
});

test("rejects duplicate slugs in a registry", () => {
  const errors = validateArticleRegistry([
    makeArticle({ slug: "duplicate-slug" }),
    makeArticle({ slug: "duplicate-slug", title: "Another Article" }),
  ]);

  assert.ok(errors.some((error) => error.includes("Duplicate slug")));
});

test("rejects a registry that is not an array", () => {
  assert.deepEqual(validateArticleRegistry({}), [
    "The blog article registry must be an array.",
  ]);
});

test("public retrieval returns published articles only, newest first", () => {
  const repository = createArticleRepository([
    makeArticle({
      slug: "older-published",
      title: "Older Published",
      publishedAt: "2026-01-01",
    }),
    makeArticle({
      slug: "newer-published",
      title: "Newer Published",
      publishedAt: "2026-02-01",
    }),
    makeArticle({
      slug: "draft-article",
      title: "Draft Article",
      publishedAt: "2026-03-01",
      status: "draft",
    }),
  ]);

  assert.deepEqual(repository.getAllPostSlugs(), [
    "newer-published",
    "older-published",
  ]);
  assert.deepEqual(
    repository.getAllPublishedPosts().map((post) => post.slug),
    ["newer-published", "older-published"],
  );
  assert.equal(repository.getPostBySlug("draft-article"), undefined);
  assert.equal(repository.getPostBySlug("unknown-article"), undefined);
  assert.equal(
    repository.getPostBySlug("newer-published")?.title,
    "Newer Published",
  );
});

test("the real registry is valid and every entry has an MDX file", () => {
  assert.deepEqual(validateArticleRegistry(articleRegistry), []);
  assert.deepEqual(findMissingPostContent(articleRegistry), []);
});

test("findMissingPostContent reports missing MDX files", () => {
  const directory = mkdtempSync(join(tmpdir(), "portfolio-blog-test-"));

  try {
    writeFileSync(join(directory, "present.mdx"), "# Present");

    assert.deepEqual(
      findMissingPostContent(
        [{ slug: "present" }, { slug: "missing" }],
        directory,
      ),
      ["missing"],
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
