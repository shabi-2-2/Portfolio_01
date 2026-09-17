import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div">;

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1400px] px-5 md:px-8 lg:px-12",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}