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
        className="card card-interactive group relative flex h-full flex-col p-6 focus-within:ring-2 focus-within:ring-accent sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-xl font-semibold tracking-tight">
            <Link
              href={`/projects#${project.id}`}
              className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none"
            >
              {project.name}
            </Link>
          </h3>
          <span
            aria-hidden
            className="mt-1 text-muted transition group-hover:translate-x-0.5 group-hover:text-accent"
          >
            →
          </span>
        </div>
        <p className="mt-2 font-medium text-accent">{project.tagline}</p>
        <div className="mt-3 flex-1">
          <p className="line-clamp-4 text-[0.9375rem] leading-relaxed text-muted">{project.description}</p>
        </div>
        <div className="mt-6">
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
      className="card scroll-mt-28 p-6 sm:p-10 md:grid md:grid-cols-[16rem_1fr] md:gap-12"
    >
      <div>
        <h2 id={headingId} className="font-heading text-2xl font-bold tracking-tight sm:text-[1.75rem]">
          {project.name}
        </h2>
        <p className="mt-2 font-medium text-accent">{project.tagline}</p>
      </div>
      <div className="mt-5 max-w-prose md:mt-0">
        <p className="text-lg leading-relaxed">{project.description}</p>
        {project.extra && labels && (
          <p className="mt-4 leading-relaxed text-muted">
            <span className="mr-2 text-xs font-semibold uppercase tracking-[0.14em] text-ok">+ {labels.extra}</span>
            {project.extra}
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
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
