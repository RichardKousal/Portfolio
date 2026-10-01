import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/routing";
import { OG_LOCALE, SITE_URL, localeUrl } from "./site";
import { hasArticles } from "./articles";

export const KEYWORDS = [
  "AI-driven QA",
  "AI agents",
  "QA Automation",
  "Test Automation Lead",
  "Playwright",
  "TypeScript",
  "k6",
  "Performance testing",
  "CI/CD",
  "QA Leadership",
  "Quality Assurance",
  "Test Engineering",
  "Etnetera",
  "Prague",
  "Czech Republic",
];

interface PageMetaInput {
  locale: Locale;
  /** Path without locale prefix, e.g. "" | "/articles" */
  path: string;
  title: string;
  description: string;
  /** Locales in which this exact path exists (default: all). */
  availableLocales?: readonly Locale[];
  /** Override canonical (e.g. untranslated article shown on another locale). */
  canonical?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  availableLocales = locales,
  canonical,
  type = "website",
  publishedTime,
  tags,
}: PageMetaInput): Metadata {
  const url = canonical ?? localeUrl(locale, path);
  const languages: Record<string, string> = {};
  for (const l of availableLocales) languages[l] = localeUrl(l, path);
  languages["x-default"] = localeUrl(
    availableLocales.includes("cs") ? "cs" : availableLocales[0],
    path
  );

  const ogImage = `${SITE_URL}/og-image.svg`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
      ...(hasArticles() && { types: { "application/rss+xml": `${SITE_URL}/feed.xml` } }),
    },
    openGraph: {
      type,
      locale: OG_LOCALE[locale],
      alternateLocale: availableLocales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
      url,
      siteName: "Richard Kousal",
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Richard Kousal" }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(tags ? { tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
