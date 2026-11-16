"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

type CopyState = "idle" | "copied" | "error";

async function writeToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  const successful = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!successful) {
    throw new Error("The copy command was rejected by the browser.");
  }
}

export function CopyButton({ code }: { code: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await writeToClipboard(code);
      setState("copied");
    } catch {
      setState("error");
    }

    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    resetTimer.current = setTimeout(() => setState("idle"), 2000);
  }

  const label = state === "copied" ? "Copied" : state === "error" ? "Retry" : "Copy";
  const accessibleLabel =
    state === "copied"
      ? "Code copied to clipboard"
      : state === "error"
        ? "Unable to copy code. Try again"
        : "Copy code to clipboard";

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={accessibleLabel}
        className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-200 motion-reduce:transition-none hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {state === "copied" ? (
          <Check aria-hidden="true" className="size-3.5" />
        ) : (
          <Copy aria-hidden="true" className="size-3.5" />
        )}
        <span aria-hidden="true">{label}</span>
      </button>

      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied"
          ? "Code copied to clipboard."
          : state === "error"
            ? "Unable to copy code. Try again."
            : ""}
      </span>
    </>
  );
}
