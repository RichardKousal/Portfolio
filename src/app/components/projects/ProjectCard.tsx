import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/app/lib/projects";

interface Props {
  project: Project;
  variant: "compact" | "full";
  labels?: { visitWebsite: string; opensInNewTab: string; extra: string };
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag} className="chip">
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectCard({ project, variant, labels }: Props) {
  if (variant === "compact") {
    return (
      <article
        data-testid="project-card"
        className="card relative flex h-full flex-col p-5 transition-colors hover:border-ink/30 focus-within:ring-2 focus-within:ring-accent sm:p-6"
      >
        <h3 className="font-heading text-lg font-semibold">
          <Link
            href={`/projects#${project.id}`}
            className="after:absolute after:inset-0 after:rounded-xl after:content-[''] hover:text-accent focus-visible:outline-none"
          >
            {project.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-semibold text-accent">{project.tagline}</p>
        <div className="mt-3 flex-1">
          <p className="line-clamp-4 text-sm leading-relaxed text-muted">{project.description}</p>
        </div>
        <div className="mt-4">
          <Tags tags={project.tags} />
        </div>
      </article>
    );
  }

  const headingId = `project-${project.id}-heading`;
  return (
    <article
      id={project.id}
      aria-labelledby={headingId}
      data-testid="project-card"
      className="scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0 md:grid md:grid-cols-[14rem_1fr] md:gap-10"
    >
      <div>
        <h2 id={headingId} className="font-heading text-xl font-bold sm:text-2xl">
          {project.name}
        </h2>
        <p className="mt-1 text-sm font-semibold text-accent">{project.tagline}</p>
      </div>
      <div className="mt-4 max-w-prose md:mt-0">
        <p className="leading-relaxed">{project.description}</p>
        {project.extra && labels && (
          <p className="mt-4 leading-relaxed text-muted">
            <span className="mr-2 font-mono text-xs uppercase tracking-wider text-ok">+ {labels.extra}</span>
            {project.extra}
          </p>
        )}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <Tags tags={project.tags} />
          {project.url && labels && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-2 text-sm">
              {labels.visitWebsite}
              <FaExternalLinkAlt className="h-3 w-3" aria-hidden />
              <span className="sr-only">{labels.opensInNewTab}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
