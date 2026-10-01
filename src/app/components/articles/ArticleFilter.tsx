"use client";

import { useEffect, useState } from "react";
import ArticleCard, { type ArticleCardData } from "./ArticleCard";

type Filter = "all" | "qa-ai" | "personal";
const FILTERS: Filter[] = ["all", "qa-ai", "personal"];

interface Props {
  articles: ArticleCardData[];
  labels: Record<Filter, string> & { group: string; emptyFilter: string };
}

export default function ArticleFilter({ articles, labels }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  // Allow deep links like /articles?category=qa-ai
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("category");
    if (fromUrl && (FILTERS as string[]).includes(fromUrl)) setFilter(fromUrl as Filter);
  }, []);

  const select = (f: Filter) => {
    setFilter(f);
    const url = new URL(window.location.href);
    if (f === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", f);
    window.history.replaceState(null, "", url.toString());
  };

  const visible = filter === "all" ? articles : articles.filter((a) => a.category === filter);

  return (
    <>
      <div role="group" aria-label={labels.group} className="mb-8 flex flex-wrap gap-2" data-testid="article-filters">
        {FILTERS.map((f) => {
          const count = f === "all" ? articles.length : articles.filter((a) => a.category === f).length;
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              data-testid={`filter-${f}`}
              onClick={() => select(f)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-primary-500/60 bg-primary-500/15 text-primary-200"
                  : "border-white/10 text-dark-muted hover:border-white/20 hover:text-dark-text"
              }`}
            >
              {labels[f]} <span className="ml-1 text-xs opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length}
      </p>

      {visible.length === 0 ? (
        <p className="text-dark-muted" data-testid="articles-empty-filter">{labels.emptyFilter}</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2" data-testid="article-list">
          {visible.map((a) => (
            <li key={a.key}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
