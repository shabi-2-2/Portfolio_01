import type { MDXComponents } from "mdx/types";

import { CodeBlock } from "@/components/blog/code-block";

/**
 * Global MDX component overrides.
 *
 * Article typography lives in `app/globals.css` under `.article-prose` so MDX
 * files stay focused on content. The article layout owns the page-level h1, so
 * headings written at the top of an MDX file are suppressed to avoid duplicate
 * page titles.
 */
const components = {
  h1: () => null,
  pre: CodeBlock,
  img: ({ alt = "", ...props }: React.ComponentProps<"img">) => (
    // MDX images do not carry intrinsic dimensions, so a responsive native
    // image avoids layout assumptions while still loading lazily.
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} loading="lazy" decoding="async" {...props} />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
