import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/app/lib/projects";

interface Props {
  project: Project;
  variant: "compact" | "full";
  labels?: { visitWebsite: string; opensInNewTab: string };
}

export default function ProjectCard({ project, variant, labels }: Props) {
  const headingId = `project-${project.id}`;

  if (variant === "compact") {
    return (
      <article
        data-testid="project-card"
        className="card relative flex h-full flex-col p-5 sm:p-6 focus-within:ring-2 focus-within:ring-primary-500"
      >
        <h3 className="font-heading text-lg font-semibold">
          <Link
            href={`/projects#${project.id}`}
            className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none"
          >
            {project.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-primary-300">{project.tagline}</p>
        <div className="mt-3 flex-1">
          <p className="line-clamp-4 text-sm leading-relaxed text-dark-muted">{project.description}</p>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">{tag}</li>
          ))}
        </ul>
      </article>
    );
  }

  return (
    <article
      id={project.id}
      aria-labelledby={headingId}
      data-testid="project-card"
      className="card scroll-mt-28 p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={headingId} className="font-heading text-xl font-bold sm:text-2xl">
          {project.name}
        </h2>
        <p className="text-sm font-medium text-primary-300">{project.tagline}</p>
      </div>
      <p className="mt-4 leading-relaxed text-dark-text/90">{project.description}</p>
      <ul className="mt-5 grid gap-2 sm:grid-cols-3">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-sm text-dark-muted">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-emerald" aria-hidden />
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-2" aria-label="Tags">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">{tag}</li>
          ))}
        </ul>
        {project.url && labels && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow inline-flex items-center gap-2"
          >
            {labels.visitWebsite}
            <FaExternalLinkAlt className="h-3 w-3" aria-hidden />
            <span className="sr-only">{labels.opensInNewTab}</span>
          </a>
        )}
      </div>
    </article>
  );
}
