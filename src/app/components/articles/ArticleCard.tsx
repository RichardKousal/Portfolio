import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import Verdict, { type VerdictKind } from "@/app/components/ui/Verdict";

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
  badges: { kind: VerdictKind; label: string }[];
  opensInNewTabLabel?: string;
}

export default function ArticleCard({ article }: { article: ArticleCardData }) {
  const titleClass =
    "after:absolute after:inset-0 after:rounded-2xl after:content-[''] hover:text-accent focus-visible:outline-none";

  return (
    <article
      data-testid="article-card"
      data-category={article.category}
      data-type={article.external ? "external" : "own"}
      lang={article.lang}
      className="card card-interactive relative flex h-full flex-col p-6 focus-within:ring-2 focus-within:ring-accent sm:p-7"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Verdict kind={article.category === "qa-ai" ? "pass" : "info"}>{article.categoryLabel}</Verdict>
        {article.badges.map((b) => (
          <Verdict key={b.label} kind={b.kind} testId="article-badge">
            {b.label}
          </Verdict>
        ))}
      </div>

      <h3 className="font-heading text-xl font-semibold leading-snug tracking-tight text-ink">
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

      <p className="mt-2 flex-1 leading-relaxed text-muted">{article.excerpt}</p>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
        <time dateTime={article.dateISO}>{article.dateLabel}</time>
        {article.metaLabel && (
          <>
            <span aria-hidden>·</span>
            <span>{article.metaLabel}</span>
          </>
        )}
        {article.sourceLabel && (
          <span className="inline-flex items-center gap-1.5 text-accent" data-testid="article-source-label">
            <span aria-hidden className="text-muted">·</span>
            {article.sourceLabel}
            {article.external && article.href && <FaExternalLinkAlt className="h-2.5 w-2.5" aria-hidden />}
          </span>
        )}
      </div>
    </article>
  );
}
