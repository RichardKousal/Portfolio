import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/app/lib/metadata";
import { formatDate, getOwnArticle, getOwnArticleSlugs } from "@/app/lib/articles";
import { generateBlogPostingData } from "@/app/lib/seo";
import { localeUrl } from "@/app/lib/site";
import Verdict from "@/app/components/ui/Verdict";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const slugs = getOwnArticleSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await params).locale as Locale;
  const article = getOwnArticle(locale, slug);
  if (!article) return {};

  // Every locale can show the article (English falls back to Czech), so
  // hreflang lists the real translations and canonical points to the
  // original-language URL for untranslated fallbacks.
  return buildPageMetadata({
    locale,
    path: `/articles/${slug}`,
    title: `${article.title} | Richard Kousal`,
    description: article.excerpt,
    availableLocales: article.translations,
    canonical: article.isFallback ? localeUrl(article.lang, `/articles/${slug}`) : undefined,
    type: "article",
    publishedTime: article.date,
    tags: article.tags,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const article = getOwnArticle(locale, slug);
  if (!article) notFound();

  const t = await getTranslations("common");
  const tArticles = await getTranslations("articles");
  const tFilters = await getTranslations("articles.filters");

  return (
    <div className="container-page py-14 sm:py-20">
      {!article.isFallback && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateBlogPostingData({
              title: article.title,
              description: article.excerpt,
              slug: article.slug,
              date: article.date,
              lang: article.lang,
              tags: article.tags,
            }),
          }}
        />
      )}

      <nav aria-label="Breadcrumb" className="mb-8">
        <Link href="/articles" className="link text-sm" data-testid="back-to-articles">
          <span aria-hidden>←</span> {t("backToArticles")}
        </Link>
      </nav>

      <article lang={article.lang} className="mx-auto max-w-prose" data-testid="article-detail">
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Verdict kind={article.category === "qa-ai" ? "pass" : "info"}>{tFilters(article.category)}</Verdict>
            {article.status === "draft" && (
              <Verdict kind="warn" testId="article-badge">
                {t("draft")}
              </Verdict>
            )}
          </div>
          <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{article.excerpt}</p>
          <p className="mt-4 flex flex-wrap gap-x-3 font-mono text-xs text-muted">
            <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
            <span aria-hidden>·</span>
            <span>{t("minRead", { minutes: article.readingMinutes })}</span>
          </p>
          {article.isFallback && (
            <p lang={locale} className="mt-6 rounded-lg border border-warn/40 bg-warn/[0.06] px-4 py-3 text-sm text-warn" data-testid="fallback-notice">
              {tArticles("fallbackNotice")}
            </p>
          )}
          {article.status === "draft" && (
            <p lang={locale} className="mt-4 font-mono text-xs text-warn">{tArticles("todoDraftNotice")}</p>
          )}
        </header>

        <div className="prose-article">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
        </div>

        {article.tags.length > 0 && (
          <ul className="mt-12 flex flex-wrap gap-1.5 border-t border-line pt-6" aria-label="Tags">
            {article.tags.map((tag) => (
              <li key={tag} className="chip">#{tag}</li>
            ))}
          </ul>
        )}
      </article>
    </div>
  );
}
