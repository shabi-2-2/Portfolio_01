import type { MDXComponents } from "mdx/types";

/**
 * Global MDX component overrides.
 *
 * Article typography is handled by `components/blog/article-layout.tsx` so
 * that the MDX files stay focused on content. Add shared MDX-only components
 * here if a future article needs them.
 */
export function useMDXComponents(): MDXComponents {
  return {};
}
