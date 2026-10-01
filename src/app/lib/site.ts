import type { Locale } from "@/i18n/routing";

/** Canonical production URL (no trailing slash). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://richardkousal.com"
).replace(/\/$/, "");

export const PERSON = {
  name: "Richard Kousal",
  email: "kousal.richard@gmail.com",
  phone: "+420 604 674 931",
  phoneHref: "+420604674931",
  linkedin: "https://www.linkedin.com/in/richard-kousal",
  github: "https://github.com/richardkousal",
} as const;

export const OG_LOCALE: Record<Locale, string> = {
  cs: "cs_CZ",
  en: "en_US",
};

/** Absolute URL for a locale-prefixed path, e.g. ("cs", "/articles") */
export function localeUrl(locale: Locale, path = ""): string {
  return `${SITE_URL}/${locale}${path === "/" ? "" : path}`;
}
