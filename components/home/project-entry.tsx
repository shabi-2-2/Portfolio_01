import { ArrowLink } from "@/components/ui/arrow-link";
import type { Project } from "@/components/home/projects";

type ProjectEntryProps = {
  project: Project;
};

export function ProjectEntry({ project }: ProjectEntryProps) {
  return (
    <article className="group border-b border-border transition-colors duration-200 motion-reduce:transition-none hover:bg-muted/30 focus-within:bg-muted/30 py-8 md:py-10">
      <div className="flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-sm font-medium text-muted-foreground transition-colors duration-200 motion-reduce:transition-none group-hover:text-foreground group-focus-within:text-foreground">
            {project.number}
          </p>
          <h3 className="mt-1 text-2xl font-semibold uppercase leading-tight tracking-tight transition-transform duration-200 motion-safe:group-hover:translate-x-1 motion-safe:group-focus-within:translate-x-1 md:text-3xl">
            {project.title}
          </h3>
        </div>

        {project.year ? (
          <p className="shrink-0 font-mono text-xs font-medium tabular-nums text-muted-foreground">
            {project.year}
          </p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 md:flex-row md:items-start md:justify-between md:gap-8">
        {project.description ? (
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.description}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 md:ml-auto">
          {project.metadata.length > 0 ? (
            <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-200 motion-reduce:transition-none group-hover:text-foreground/80 group-focus-within:text-foreground/80 md:text-right">
              {project.metadata.join(" · ")}
            </p>
          ) : null}

          {project.href ? (
            <ArrowLink
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              View project
            </ArrowLink>
          ) : null}

          {project.github ? (
            <ArrowLink
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </ArrowLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}