"use client";

import { useEffect, useState } from "react";

/**
 * A thin, fixed reading progress bar. It measures the article content element
 * directly so the indicator represents the article, not the whole document.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.getElementById("article-body");

    if (!article) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      const rect = article.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const distanceRead = -rect.top;

      const nextProgress =
        scrollableDistance <= 0
          ? 0
          : Math.min(1, Math.max(0, distanceRead / scrollableDistance));

      setProgress(nextProgress);
    };

    const schedule = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5"
    >
      <div
        className="h-full origin-left bg-foreground will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
