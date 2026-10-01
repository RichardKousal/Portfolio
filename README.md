# Richard Kousal – osobní hub

Osobní web Richarda Kousala (QA & Test Automation Lead, Etnetera Core): články, projekty, vystoupení a profil. Tmavý minimalistický design, plně responzivní, dvojjazyčný (cs/en).

Produkce: https://richardkousal.com

## Technologie

- **Next.js 15** (App Router, server components, SSG/ISR) · **React 18** · **TypeScript**
- **Tailwind CSS** · fonty Montserrat (nadpisy) + Lato (text) přes `next/font`
- **next-intl** – jazyky `cs` (výchozí) a `en`, cesty `/cs/...` a `/en/...`
- **gray-matter + react-markdown + remark-gfm** – články v Markdownu
- **pdfmake** – generování CV (`/api/generate-cv?locale=cs|en`)
- **Vercel Analytics + Speed Insights**
- **Playwright** – E2E testy (`tests/`)

## Struktura webu

| Cesta | Obsah |
| --- | --- |
| `/[locale]` | Domů: hero, nejnovější články (skryté, když žádné nejsou), na čem pracuji, vystoupení, kontakt |
| `/[locale]/articles` | Seznam článků s filtrem Vše / QA & AI / Osobní (`?category=qa-ai`) |
| `/[locale]/articles/[slug]` | Detail vlastního článku (typ `own`) |
| `/[locale]/projects` | Projekty |
| `/[locale]/about` | Profese (timeline, dovednosti, přístup), osobní část, CV ke stažení |
| `/feed.xml` | RSS publikovaných článků |
| `/sitemap.xml`, `/robots.txt` | SEO |

Staré URL `/de/*` a `/pl/*` se trvale přesměrují na `/en/*` (`next.config.mjs`).

## Jak přidat článek

1. Vytvoř soubor `content/articles/<slug>.md` (název souboru je libovolný, rozhoduje `slug` ve frontmatteru; soubory začínající `_` se ignorují).
2. Vyplň frontmatter:

   ```yaml
   ---
   title: "Název článku"
   slug: nazev-clanku          # jen a-z, 0-9 a pomlčky; tvoří URL /cs/articles/nazev-clanku
   date: 2026-10-20            # YYYY-MM-DD, podle data se řadí
   lang: cs                    # cs | en
   type: own                   # own = text na tomto webu | etnetera = jen odkaz na blog Etnetery
   category: qa-ai             # qa-ai | personal
   excerpt: "Jedna až dvě věty do výpisu, meta description a RSS."
   externalUrl: "https://www.etnetera.cz/blog/..."   # povinné pro published etnetera, jinak vynech
   status: draft               # draft | published
   tags: [AI-driven QA, Playwright]
   ---
   ```

3. U `type: own` napiš pod frontmatter text v Markdownu (GFM: tabulky, seznamy, kód). U `type: etnetera` text nepiš – web zobrazí jen kartu s odkazem ven a štítkem „Vyšlo na blogu Etnetery“.
4. `status: draft` se zobrazuje jen v `npm run dev` (se štítkem „Koncept“). Do produkce (`npm run build`) jdou jen články se `status: published` – teprve pak se objeví na webu, v sitemapě a v RSS.
5. **Překlad:** vytvoř druhý soubor se **stejným `slug`** a `lang: en`. Bez překladu anglický web ukáže český článek se štítkem „in Czech“ (canonical pak míří na českou verzi). Český web ukazuje jen české články.
6. Ověř lokálně (`npm run dev` → `/cs/articles`), přepni `status: published`, commit, push.

Nevalidní soubor (chybějící pole, špatné datum, published etnetera bez URL) se při buildu přeskočí s varováním v konzoli.

## Kde se co upravuje

- Texty, projekty, vystoupení, timeline, dovednosti: `messages/cs.json`, `messages/en.json` (klíče `projects.items`, `projects.featured`, `talks.items`, `professional.*`, `personal.*`, `pdf.*`).
- Kontakty a URL webu: `src/app/lib/site.ts` (`NEXT_PUBLIC_SITE_URL`, výchozí `https://richardkousal.com`).
- SEO metadata a JSON-LD: `src/app/lib/metadata.ts`, `src/app/lib/seo.ts`.
- Načítání článků: `src/app/lib/articles.ts`.

## Vývoj

```bash
npm install
npm run dev           # http://localhost:3000
npm run lint
npm run build && npm start
npm run test:e2e:chromium   # Playwright si sám spustí dev server na portu 3003
```

## Struktura projektu

```
content/articles/          # články (Markdown + frontmatter)
messages/                  # cs.json, en.json
src/
├── app/
│   ├── [locale]/          # layout, stránky (home, articles, projects, about), 404, error
│   ├── api/generate-cv/   # PDF CV
│   ├── feed.xml/          # RSS
│   ├── components/        # Header, Footer, BackToTop, articles/, projects/, ui/
│   ├── lib/               # articles, metadata, seo, site, projects, analytics, generate-cv-pdf
│   ├── sitemap.ts, robots.ts, manifest.ts
│   └── globals.css
├── i18n/                  # routing, request, navigation
└── middleware.ts
tests/                     # Playwright (POM)
```

## Licence

© Richard Kousal. Všechna práva vyhrazena.
