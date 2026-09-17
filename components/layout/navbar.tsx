"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ArrowLink } from "@/components/ui/arrow-link";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Writing", href: "#writing" },
  { label: "About", href: "#about" },
] as const;

const sectionIds = navItems.map((item) => item.href.slice(1));
const githubUrl = "https://github.com/shabi-2-2";

const navLinkClasses =
  "text-[13px] font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el: HTMLElement | null): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const activeSection = useActiveSection(sectionIds);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-border bg-background"
      initial={
        shouldReduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: -8 }
      }
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }
      }
    >
      <Container>
        <div className="flex items-center justify-between py-6 md:py-7">
          <Link
            href="/"
            className="font-medium tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Shabi Haidar Rizvi
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 md:flex"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    navLinkClasses,
                    "relative",
                    isActive && "text-foreground",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 -bottom-1.5 h-px bg-foreground transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                </a>
              );
            })}
            <ArrowLink
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(navLinkClasses, "gap-1 uppercase")}
            >
              GitHub
            </ArrowLink>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="inline-flex items-center justify-center p-1 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={
              shouldReduceMotion
                ? { opacity: 1, height: "auto" }
                : { opacity: 0, height: 0 }
            }
            animate={{ opacity: 1, height: "auto" }}
            exit={
              shouldReduceMotion
                ? { opacity: 1, height: "auto" }
                : { opacity: 0, height: 0 }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.25, ease: "easeOut" }
            }
            className="overflow-hidden border-t border-border md:hidden"
          >
            <Container className="flex flex-col py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </a>
              ))}
              <ArrowLink
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub
              </ArrowLink>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}