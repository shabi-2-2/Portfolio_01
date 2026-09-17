import { cn } from "@/lib/utils";

type SectionLabelProps = React.ComponentProps<"p"> & {
  number: string;
  children: React.ReactNode;
};

export function SectionLabel({
  number,
  children,
  className,
  ...props
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true">{number}</span>
      <span className="h-px w-8 bg-border" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}