import type { Locale } from "@/i18n/routing";
import { PERSON, SITE_URL, localeUrl } from "./site";

export const KNOWS_ABOUT = [
  "AI-driven QA",
  "AI agents",
  "Test Automation",
  "Playwright",
  "TypeScript",
  "k6",
  "Performance Testing",
  "CI/CD",
  "QA Leadership",
  "Mentoring",
];

/** Site-wide JSON-LD (Person + WebSite). */
export function generateStructuredData(locale: Locale) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PERSON.name,
        url: SITE_URL,
        image: {
          "@type": "ImageObject",
          url: `${SITE_URL}/avatar.webp`,
          width: 256,
          height: 320,
        },
        jobTitle: "QA & Test Automation Lead",
        worksFor: {
          "@type": "Organization",
          name: "Etnetera Core",
          url: "https://www.etnetera.cz",
        },
        email: PERSON.email,
        telephone: PERSON.phoneHref,
        address: {
          "@type": "PostalAddress",
          addressCountry: "CZ",
          addressLocality: "Prague",
        },
        sameAs: [PERSON.linkedin, PERSON.github],
        knowsAbout: KNOWS_ABOUT,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: PERSON.name,
        description:
          locale === "cs"
            ? "Osobní web Richarda Kousala – AI-driven QA, test automation, články a projekty."
            : "Personal site of Richard Kousal – AI-driven QA, test automation, articles and projects.",
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return JSON.stringify(structuredData);
}

interface BlogPostingInput {
  title: string;
  description: string;
  slug: string;
  date: string;
  lang: Locale;
  tags: string[];
}

export function generateBlogPostingData(article: BlogPostingInput) {
  const url = localeUrl(article.lang, `/articles/${article.slug}`);
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: article.lang,
    keywords: article.tags.join(", "),
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${SITE_URL}/og-image.svg`,
    author: { "@id": `${SITE_URL}/#person`, "@type": "Person", name: PERSON.name, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#person` },
  });
}
