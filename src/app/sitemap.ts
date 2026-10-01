import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { getAllArticles } from "@/app/lib/articles";
import { localeUrl } from "@/app/lib/site";

const PAGES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/articles", changeFrequency: "weekly", priority: 0.9 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const languages = (path: string) =>
    Object.fromEntries(locales.map((l) => [l, localeUrl(l, path)]));

  const pages = PAGES.flatMap((p) =>
    locales.map((locale) => ({
      url: localeUrl(locale, p.path),
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: { languages: languages(p.path) },
    }))
  );

  // Only published own articles (drafts are excluded in production builds),
  // listed under their original-language URL.
  const own = getAllArticles().filter((a) => a.type === "own" && a.status === "published");
  const articles = own.map((a) => {
    const path = `/articles/${a.slug}`;
    const translations = own.filter((o) => o.slug === a.slug).map((o) => o.lang);
    return {
      url: localeUrl(a.lang, path),
      lastModified: new Date(`${a.date}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(translations.map((l) => [l, localeUrl(l, path)])),
      },
    };
  });

  return [...pages, ...articles];
}
