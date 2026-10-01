import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { ArticleCardData } from "@/app/components/articles/ArticleCard";
import { formatDate, type LocalizedArticle } from "./articles";

/** Maps articles to presentational card data with localized labels. */
export async function toArticleCards(
  articles: LocalizedArticle[],
  locale: Locale
): Promise<ArticleCardData[]> {
  const t = await getTranslations({ locale, namespace: "common" });
  const tFilters = await getTranslations({ locale, namespace: "articles.filters" });

  return articles.map((a) => {
    const external = a.type === "etnetera";
    const badges: string[] = [];
    if (a.status === "draft") badges.push(t("draft"));
    if (a.isFallback && a.lang === "cs") badges.push(t("inCzech"));

    return {
      key: `${a.slug}-${a.lang}`,
      title: a.title,
      excerpt: a.excerpt,
      href: external ? a.externalUrl ?? null : `/articles/${a.slug}`,
      external,
      lang: a.lang,
      category: a.category,
      categoryLabel: tFilters(a.category),
      dateISO: a.date,
      dateLabel: formatDate(a.date, locale),
      metaLabel: external ? undefined : t("minRead", { minutes: a.readingMinutes }),
      sourceLabel: external
        ? a.externalUrl
          ? t("publishedOnEtnetera")
          : `${t("publishedOnEtnetera")} – ${t("linkComing")}`
        : undefined,
      badges,
      opensInNewTabLabel: t("opensInNewTab"),
    };
  });
}
