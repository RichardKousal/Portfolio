import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaRss } from "react-icons/fa";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/app/lib/metadata";
import { getArticlesForLocale } from "@/app/lib/articles";
import { toArticleCards } from "@/app/lib/article-cards";
import ArticleFilter from "@/app/components/articles/ArticleFilter";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "meta.articles" });
  return buildPageMetadata({
    locale,
    path: "/articles",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ArticlesPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("articles");
  const cards = await toArticleCards(getArticlesForLocale(locale), locale);

  return (
    <div className="container-page py-12 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-heading text-4xl font-bold sm:text-5xl">
          <span className="gradient-text">{t("title")}</span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-dark-muted">{t("intro")}</p>
        <a href="/feed.xml" className="link-arrow mt-4 inline-flex items-center gap-2 text-sm">
          <FaRss className="h-3.5 w-3.5" aria-hidden />
          {t("rss")}
        </a>
      </header>

      {cards.length === 0 ? (
        <p className="card p-6 text-dark-muted" data-testid="articles-empty">{t("empty")}</p>
      ) : (
        <ArticleFilter
          articles={cards}
          labels={{
            group: t("filterLabel"),
            all: t("filters.all"),
            "qa-ai": t("filters.qa-ai"),
            personal: t("filters.personal"),
            emptyFilter: t("emptyFilter"),
          }}
        />
      )}
    </div>
  );
}
