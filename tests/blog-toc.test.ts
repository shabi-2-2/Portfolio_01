import assert from "node:assert/strict";
import test from "node:test";

import { extractTableOfContents } from "@/lib/blog-toc";

test("extracts h2 and h3 headings with slugged ids", () => {
  const source = [
    "# Page title",
    "",
    "## First section",
    "",
    "### A narrower idea",
    "",
    "## What I took away",
  ].join("\n");

  assert.deepEqual(extractTableOfContents(source), [
    { id: "first-section", text: "First section", level: 2 },
    { id: "a-narrower-idea", text: "A narrower idea", level: 3 },
    { id: "what-i-took-away", text: "What I took away", level: 2 },
  ]);
});

test("ignores headings inside fenced code blocks", () => {
  const source = [
    "## Real heading",
    "",
    "```md",
    "## Not a heading",
    "```",
    "",
    "~~~",
    "### Also not a heading",
    "~~~",
  ].join("\n");

  assert.deepEqual(extractTableOfContents(source), [
    { id: "real-heading", text: "Real heading", level: 2 },
  ]);
});

test("strips inline markdown and deduplicates repeated slugs", () => {
  const source = [
    "## Build **fast** with `code`",
    "",
    "## [Linked heading](https://example.com)",
    "",
    "## Build **fast** with `code`",
  ].join("\n");

  assert.deepEqual(extractTableOfContents(source), [
    { id: "build-fast-with-code", text: "Build fast with code", level: 2 },
    { id: "linked-heading", text: "Linked heading", level: 2 },
    { id: "build-fast-with-code-1", text: "Build fast with code", level: 2 },
  ]);
});

test("returns an empty outline when there are no h2 or h3 headings", () => {
  assert.deepEqual(
    extractTableOfContents("# Only a title\n\nA short article."),
    [],
  );
});

test("reserves h1 slugs so duplicate h2 headings match rehype-slug", () => {
  const source = [
    "# Shared title",
    "",
    "## Shared title",
    "",
    "## Shared title",
  ].join("\n");

  assert.deepEqual(extractTableOfContents(source), [
    { id: "shared-title-1", text: "Shared title", level: 2 },
    { id: "shared-title-2", text: "Shared title", level: 2 },
  ]);
});
