import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "@/i18n/navigation";

export interface ArticleCardData {
  key: string;
  title: string;
  excerpt: string;
  /** Internal path (without locale) or absolute external URL; null = no link yet */
  href: string | null;
  external: boolean;
  lang: string;
  category: "qa-ai" | "personal";
  categoryLabel: string;
  dateISO: string;
  dateLabel: string;
  metaLabel?: string;
  /** e.g. "Published on the Etnetera blog" */
  sourceLabel?: string;
  badges: string[];
  opensInNewTabLabel?: string;
}

export default function ArticleCard({ article }: { article: ArticleCardData }) {
  const titleClass =
    "after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none";

  return (
    <article
      data-testid="article-card"
      data-category={article.category}
      data-type={article.external ? "external" : "own"}
      lang={article.lang}
      className="card group relative flex h-full flex-col p-5 sm:p-6 focus-within:ring-2 focus-within:ring-primary-500"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="tag">{article.categoryLabel}</span>
        {article.badges.map((b) => (
          <span key={b} className="tag border-accent-yellow/40 text-accent-yellow" data-testid="article-badge">
            {b}
          </span>
        ))}
      </div>

      <h3 className="font-heading text-lg font-semibold leading-snug text-dark-text sm:text-xl">
        {article.href === null ? (
          article.title
        ) : article.external ? (
          <a href={article.href} target="_blank" rel="noopener noreferrer" className={titleClass}>
            {article.title}
            {article.opensInNewTabLabel && <span className="sr-only"> {article.opensInNewTabLabel}</span>}
          </a>
        ) : (
          <Link href={article.href} className={titleClass}>
            {article.title}
          </Link>
        )}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-dark-muted sm:text-base">{article.excerpt}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-dark-muted">
        <time dateTime={article.dateISO}>{article.dateLabel}</time>
        {article.metaLabel && (
          <>
            <span aria-hidden>·</span>
            <span>{article.metaLabel}</span>
          </>
        )}
        {article.sourceLabel && (
          <span
            className="inline-flex items-center gap-1.5 text-primary-300"
            data-testid="article-source-label"
          >
            <span aria-hidden>·</span>
            {article.sourceLabel}
            {article.external && article.href && <FaExternalLinkAlt className="h-3 w-3" aria-hidden />}
          </span>
        )}
      </div>
    </article>
  );
}
