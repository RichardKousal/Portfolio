import { getAllArticles } from "@/app/lib/articles";
import { SITE_URL, localeUrl } from "@/app/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS 2.0 feed of published articles (own + Etnetera blog links). */
export function GET() {
  const articles = getAllArticles().filter(
    (a) => a.status === "published" && (a.type === "own" || a.externalUrl)
  );

  const items = articles
    .map((a) => {
      const link =
        a.type === "own" ? localeUrl(a.lang, `/articles/${a.slug}`) : (a.externalUrl as string);
      const categories = [a.category, ...a.tags]
        .map((c) => `      <category>${escapeXml(c)}</category>`)
        .join("\n");
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${new Date(`${a.date}T08:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(a.excerpt)}</description>
      <dc:language>${a.lang}</dc:language>
${categories}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Richard Kousal – články</title>
    <link>${SITE_URL}</link>
    <description>QA v době AI, test automation a osobní experimenty s AI. / QA in the age of AI, test automation and personal AI experiments.</description>
    <language>cs</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
