# SEO & AI Optimalizace - Setup Guide

## ✅ Co bylo implementováno

### 1. **robots.txt** (`src/app/robots.ts`)
- Instrukce pro vyhledávače (Google, Bing, atd.)
- Automatické generování z Next.js
- Odkaz na sitemap

### 2. **sitemap.xml** (`src/app/sitemap.ts`)
- Dynamický sitemap pro všechny jazykové verze
- Automatické generování URL
- Správné priority a changeFrequency
- hreflang alternativy

### 3. **JSON-LD Strukturovaná data** (`src/app/lib/seo.ts`)
Implementované schémata:
- **Person Schema** - Kdo jsi, kontakty, dovednosti
- **WebSite Schema** - Metadata o webu
- **Organization Schema** - OSVČ informace (IČO)

Toto pomáhá:
- ✅ Google vyhledávání
- ✅ Google Knowledge Graph
- ✅ ChatGPT, Claude, Gemini (AI pochopení)
- ✅ LinkedIn, Facebook preview

### 4. **Kompletní Metadata** (`src/app/[locale]/layout.tsx`)
- ✅ Title & Description (optimalizované pro SEO)
- ✅ Keywords
- ✅ Canonical URLs
- ✅ **hreflang tagy** pro multilingual SEO
- ✅ **Open Graph** (Facebook, LinkedIn)
- ✅ **Twitter Cards**
- ✅ Author & Publisher metadata
- ✅ Robots direktivy
- ✅ Mobile viewport

### 5. **PWA Manifest** (`src/app/manifest.ts`)
- Progressive Web App podpora
- Installable na mobily
- Ikony a barvy

---

## 🔧 Co musíš ještě udělat

### 1. Vytvořit Open Graph Image

Vytvoř obrázek **1200x630px** (poměr 1.91:1):

**Umístění:** `public/og-image.jpg`

**Design doporučení:**
- Tvoje jméno: **Richard Kousal**
- Podtitul: **QA & Test Automation Lead**
- Logo/brand prvky
- Jednoduchý, čistý design
- Použij barvy z webu (dark theme)
- Fotka (optional)

**Nástroje:**
- Canva (template "LinkedIn Post")
- Figma
- Photoshop
- Online: [og-image.xyz](https://og-image.vercel.app/)

### 2. Vytvořit favicony/ikony

Vytvoř následující soubory v `public/`:

- `favicon.ico` (48x48px) ✅ už máš
- `icon-192.png` (192x192px) - potřebuješ vytvořit
- `icon-512.png` (512x512px) - potřebuješ vytvořit
- `apple-touch-icon.png` (180x180px) - optional

**Quick tip:**
Použij [favicon.io](https://favicon.io/) nebo [RealFaviconGenerator](https://realfavicongenerator.net/)

### 3. Nastavit doménu a ENV proměnnou

Vytvoř `.env.local` soubor:

```bash
NEXT_PUBLIC_SITE_URL=https://tvoje-domena.cz
```

**Nebo v production (Vercel/Netlify):**
Nastav environment variable v hosting dashboardu.

### 4. Zaregistrovat web v Google Search Console

1. Jdi na [search.google.com/search-console](https://search.google.com/search-console/)
2. Přidej svou doménu
3. Ověř vlastnictví (DNS nebo meta tag)
4. Odešli sitemap: `https://tvoje-domena.cz/sitemap.xml`

**V `layout.tsx` (řádek 119) odkomentuj:**
```typescript
verification: {
  google: 'tvuj-verifikacni-kod',
},
```

### 5. Optional: Google Analytics

Nainstaluj:
```bash
npm install @vercel/analytics
```

Přidej do `layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

// V body
<Analytics />
```

---

## 🎯 Testování SEO

### Nástroje pro ověření:

1. **Structured Data Test**
   - [schema.org validator](https://validator.schema.org/)
   - [Google Rich Results Test](https://search.google.com/test/rich-results)

2. **Open Graph Preview**
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

3. **SEO Audit**
   - [Google PageSpeed Insights](https://pagespeed.web.dev/)
   - [Lighthouse](https://developers.google.com/web/tools/lighthouse) (v Chrome DevTools)
   - [SEO Checker](https://www.seobility.net/en/seocheck/)

4. **Sitemap & Robots Test**
   - Otevři: `https://tvoje-domena.cz/robots.txt`
   - Otevři: `https://tvoje-domena.cz/sitemap.xml`

---

## 📊 Co to přinese

### SEO výhody:
- 📈 **Lepší ranking v Google** díky strukturovaným datům
- 🌍 **Multilingual SEO** - správné hreflang tagy
- 🔗 **Canonical URLs** - žádný duplicate content
- 📱 **Mobile-first** - optimalizováno pro mobily
- ⚡ **Core Web Vitals** - rychlé načítání

### AI výhody:
- 🤖 **ChatGPT/Claude/Gemini** - lépe pochopí, kdo jsi a co děláš
- 💬 **Voice search** (Siri, Google Assistant) - strukturovaná data
- 📊 **Knowledge Graph** - možnost zobrazení v Google panelu

### Social Media výhody:
- 💼 **LinkedIn** - krásný preview při sdílení
- 🐦 **Twitter/X** - velké obrázky vCards
- 👍 **Facebook** - správné Open Graph
- 📧 **Email preview** - některé klienty ukazují OG data

---

## 🚀 Next Steps (Priorita)

1. ✅ **VYSOKÁ** - Vytvoř OG image (`public/og-image.jpg`)
2. ✅ **VYSOKÁ** - Nastav `NEXT_PUBLIC_SITE_URL` env variable
3. ✅ **STŘEDNÍ** - Vytvoř ikony (192px, 512px)
4. ✅ **STŘEDNÍ** - Zaregistruj v Google Search Console
5. ⏸️ **NÍZKÁ** - Google Analytics (pokud chceš trackovat návštěvy)

---

## 💡 Tipy pro další vylepšení

1. **Blog/Articles** - přidej blog pro SEO content
2. **Case Studies** - projekty s detaily
3. **Testimonials** - doporučení od klientů/kolegů
4. **Video** - YouTube embed (VideoObject schema)
5. **FAQ Section** - FAQ schema markup

---

Máš otázky? Všechno je připravené - stačí jen dokončit body výše! 🎉

