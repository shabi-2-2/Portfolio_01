import { Children, isValidElement, type ReactNode } from "react";

import { CopyButton } from "@/components/blog/copy-button";
import { cn } from "@/lib/utils";

type CodeBlockProps = React.ComponentPropsWithoutRef<"pre">;

const LANGUAGE_LABELS: Record<string, string> = {
  bash: "Shell",
  c: "C",
  cpp: "C++",
  csharp: "C#",
  css: "CSS",
  diff: "Diff",
  go: "Go",
  graphql: "GraphQL",
  html: "HTML",
  java: "Java",
  javascript: "JavaScript",
  js: "JavaScript",
  json: "JSON",
  jsonc: "JSON",
  jsx: "JSX",
  md: "Markdown",
  mdx: "MDX",
  plaintext: "Text",
  py: "Python",
  python: "Python",
  rs: "Rust",
  rust: "Rust",
  scss: "SCSS",
  sh: "Shell",
  shell: "Shell",
  sql: "SQL",
  text: "Text",
  ts: "TypeScript",
  tsx: "TSX",
  txt: "Text",
  typescript: "TypeScript",
  yaml: "YAML",
  yml: "YAML",
  zsh: "Shell",
};

function getCodeElement(children: ReactNode): ReactNode {
  return Children.toArray(children).find(isValidElement);
}

function getLanguage(children: ReactNode): string | undefined {
  const codeElement = getCodeElement(children);

  if (
    !isValidElement<{
      className?: string;
      "data-language"?: string;
    }>(codeElement)
  ) {
    return undefined;
  }

  if (codeElement.props["data-language"]) {
    return codeElement.props["data-language"];
  }

  const match = /(?:language|lang)-([\w-]+)/.exec(
    codeElement.props.className ?? "",
  );

  return match?.[1];
}

function getCodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getCodeText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getCodeText(node.props.children);
  }

  return "";
}

/**
 * Server-rendered code block shell. Highlighting is applied at build time by
 * `rehype-highlight`; only the copy control hydrates on the client.
 */
export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const language = getLanguage(children);
  const code = getCodeText(children);
  const languageLabel = language
    ? (LANGUAGE_LABELS[language.toLowerCase()] ?? language)
    : "Code";

  return (
    <figure
      data-code-block=""
      className="my-8 min-w-0 overflow-hidden border border-border bg-muted/30"
    >
      <figcaption className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {languageLabel}
        </span>
        <CopyButton code={code} />
      </figcaption>

      <pre
        {...props}
        tabIndex={0}
        className={cn(
          "overflow-x-auto px-4 py-4 font-mono text-[13px] leading-6 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:text-sm",
          className,
        )}
      >
        {children}
      </pre>
    </figure>
  );
}
