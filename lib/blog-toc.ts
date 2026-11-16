import GithubSlugger from "github-slugger";

export type TableOfContentsEntry = {
  id: string;
  text: string;
  level: 2 | 3;
};

const HEADING_PATTERN = /^(#{1,3})\s+(.+?)(?:\s+#+)?\s*$/;
const FENCE_PATTERN = /^\s*(`{3,}|~{3,})/;

type Fence = {
  marker: string;
  length: number;
};

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/&nbsp;/g, " ");
}

function stripInlineMarkdown(value: string): string {
  const text = value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/~~(.*?)~~/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\\([\\`*_{}[\]()#+\-.!])/g, "$1");

  return decodeEntities(text).replace(/\s+/g, " ").trim();
}

/**
 * Extracts the h2/h3 headings from an MDX source file so the article layout
 * can render a table of contents without adding client-side DOM parsing.
 *
 * Heading IDs are produced with the same `github-slugger` package used by
 * `rehype-slug`, keeping the links and rendered heading anchors in sync. h1
 * headings are still fed through the slugger even though they are excluded
 * from the outline, because rehype-slug assigns them IDs first and any later
 * duplicate heading would otherwise receive the wrong suffix.
 */
export function extractTableOfContents(
  source: string,
): TableOfContentsEntry[] {
  const slugger = new GithubSlugger();
  const entries: TableOfContentsEntry[] = [];
  let fence: Fence | null = null;

  for (const line of source.split(/\r?\n/)) {
    const fenceMatch = FENCE_PATTERN.exec(line);

    if (fenceMatch) {
      const [marker] = fenceMatch[1];

      if (!fence) {
        fence = { marker, length: fenceMatch[1].length };
      } else if (fence.marker === marker && fenceMatch[1].length >= fence.length) {
        fence = null;
      }

      continue;
    }

    if (fence) continue;

    const headingMatch = HEADING_PATTERN.exec(line);

    if (!headingMatch) continue;

    const text = stripInlineMarkdown(headingMatch[2]);

    if (!text) continue;

    const level = headingMatch[1].length;

    if (level === 1) {
      // Consume the slug so later headings match rehype-slug, then skip it.
      slugger.slug(text);
      continue;
    }

    entries.push({
      id: slugger.slug(text),
      text,
      level: level as 2 | 3,
    });
  }

  return entries;
}
