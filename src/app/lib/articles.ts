import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/routing";

export type ArticleType = "etnetera" | "own";
export type ArticleCategory = "qa-ai" | "personal";
export type ArticleStatus = "draft" | "published";

export interface ArticleMeta {
  title: string;
  slug: string;
  /** YYYY-MM-DD */
  date: string;
  lang: Locale;
  type: ArticleType;
  category: ArticleCategory;
  excerpt: string;
  externalUrl?: string;
  status: ArticleStatus;
  tags: string[];
  readingMinutes: number;
}

export interface Article extends ArticleMeta {
  content: string;
}

/** An article as shown on a given locale (may be an untranslated fallback). */
export interface LocalizedArticle extends ArticleMeta {
  /** true when the article's language differs from the page locale */
  isFallback: boolean;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "articles");

/** Drafts are visible only in `next dev`, never in a production build. */
export const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

const TYPES: ArticleType[] = ["etnetera", "own"];
const CATEGORIES: ArticleCategory[] = ["qa-ai", "personal"];
const LANGS: Locale[] = ["cs", "en"];

function toDateString(value: unknown): string {
  // gray-matter (js-yaml) parses unquoted YYYY-MM-DD into a Date object
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

function parseFile(fileName: string): Article | null {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const problems: string[] = [];

  const article: Article = {
    title: String(data.title ?? "").trim(),
    slug: String(data.slug ?? "").trim(),
    date: toDateString(data.date),
    lang: data.lang,
    type: data.type,
    category: data.category,
    excerpt: String(data.excerpt ?? "").trim(),
    externalUrl: data.externalUrl ? String(data.externalUrl).trim() : undefined,
    status: data.status === "published" ? "published" : "draft",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    content,
    readingMinutes: Math.max(
      1,
      Math.round(content.split(/\s+/).filter(Boolean).length / 200)
    ),
  };

  if (!article.title) problems.push("title");
  if (!/^[a-z0-9-]+$/.test(article.slug)) problems.push("slug");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(article.date)) problems.push("date");
  if (!LANGS.includes(article.lang)) problems.push("lang");
  if (!TYPES.includes(article.type)) problems.push("type");
  if (!CATEGORIES.includes(article.category)) problems.push("category");
  if (article.externalUrl && !/^https?:\/\//.test(article.externalUrl)) {
    article.externalUrl = undefined; // "TBD" and similar placeholders
  }
  if (
    article.type === "etnetera" &&
    article.status === "published" &&
    !article.externalUrl
  ) {
    problems.push("externalUrl (required for published etnetera articles)");
  }

  if (problems.length) {
    console.warn(
      `[articles] Skipping ${fileName}: invalid ${problems.join(", ")}`
    );
    return null;
  }
  return article;
}

let cache: Article[] | null = null;

/** All valid articles visible in the current environment, newest first. */
export function getAllArticles(): Article[] {
  if (cache && !SHOW_DRAFTS) return cache;
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const articles = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(parseFile)
    .filter((a): a is Article => a !== null)
    .filter((a) => SHOW_DRAFTS || a.status === "published")
    .sort((a, b) => b.date.localeCompare(a.date));

  cache = articles;
  return articles;
}

/** Whether the Articles section exists at all (hidden in production until one is published). */
export function hasArticles(): boolean {
  return getAllArticles().length > 0;
}

function stripContent({ content: _content, ...meta }: Article): ArticleMeta {
  return meta;
}

/**
 * Articles for a page locale. Czech pages show Czech articles only.
 * English pages show English articles plus Czech articles that have no
 * English translation (same slug), flagged as fallback ("in Czech").
 */
export function getArticlesForLocale(locale: Locale): LocalizedArticle[] {
  const all = getAllArticles();
  if (locale === "cs") {
    return all
      .filter((a) => a.lang === "cs")
      .map((a) => ({ ...stripContent(a), isFallback: false }));
  }
  const enSlugs = new Set(all.filter((a) => a.lang === "en").map((a) => a.slug));
  return all
    .filter((a) => a.lang === "en" || !enSlugs.has(a.slug))
    .map((a) => ({ ...stripContent(a), isFallback: a.lang !== locale }));
}

/** Own (on-site) article for a slug in the given page locale, with fallback. */
export function getOwnArticle(
  locale: Locale,
  slug: string
): (Article & { isFallback: boolean; translations: Locale[] }) | null {
  const variants = getAllArticles().filter(
    (a) => a.type === "own" && a.slug === slug
  );
  if (!variants.length) return null;
  const exact = variants.find((a) => a.lang === locale);
  // Czech is the primary language; English pages may fall back to it.
  const chosen = exact ?? (locale === "en" ? variants.find((a) => a.lang === "cs") : undefined);
  if (!chosen) return null;
  return {
    ...chosen,
    isFallback: chosen.lang !== locale,
    translations: variants.map((a) => a.lang),
  };
}

/** Distinct slugs of own articles (for static params / sitemap). */
export function getOwnArticleSlugs(): string[] {
  return Array.from(
    new Set(getAllArticles().filter((a) => a.type === "own").map((a) => a.slug))
  );
}

export function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "cs" ? "cs-CZ" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
