import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Allow MDX files to be imported and treated as modules.
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    // Turbopack requires plugin names as strings and serializable options.
    rehypePlugins: [
      "rehype-slug",
      ["rehype-highlight", { detect: false, plainText: ["text", "txt"] }],
    ],
  },
});

export default withMDX(nextConfig);
