import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ArrowLinkProps = React.ComponentProps<typeof Link> & {
  children: React.ReactNode;
};

export function ArrowLink({ children, className, ...props }: ArrowLinkProps) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 motion-reduce:transition-none motion-safe:group-hover:translate-x-[3px] motion-safe:group-hover:-translate-y-[3px] motion-safe:group-focus-visible:translate-x-[3px] motion-safe:group-focus-visible:-translate-y-[3px]"
      />
    </Link>
  );
}