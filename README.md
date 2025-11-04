# Richard Kousal - Portfolio

Moderní, minimalistické osobní portfolio s přepínáním mezi profesním a osobním obsahem. Plně responzivní dark mode design.

## 🚀 Technologie

- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **next-intl** (internacionalizace)
- **React Icons**

## 🌍 Jazyky

Portfolio podporuje 4 jazyky:
- 🇨🇿 Čeština (výchozí)
- 🇬🇧 Angličtina
- 🇩🇪 Němčina
- 🇵🇱 Polština

## ✨ Vlastnosti

### Hlavička (Fixed, Fully Responsive)
- **Profilová fotka** (avatar) s gradient borderem
- Jméno
- **Toggle přepínač** mezi Profesním a Osobním zobrazením (vždy viditelný na mobilu!)
- Email (mailto: odkaz) - desktop
- Telefon (+420 604 674 931) - desktop
- **Kompaktní Language Switcher** (dropdown s 4 jazyky: cs | en | de | pl)
- Sociální sítě (LinkedIn, GitHub)
- **Hamburger menu** pro mobil s kompletní navigací

### Profesní Portfolio
- Hero sekce s představením a **profilovou fotkou**
- Timeline zkušeností s detaily pozic
- Dovednosti zobrazené jako pills/tagy
- Sekce s vizí pro QA

### Osobní Portfolio
- Úvodní sekce
- Grid s vášněmi (Hudba, AI, Programování)
- Side hustle projekt (Apartmány Iwona)

### Footer
- Copyright
- Sociální sítě

## 🎨 Design

- **Dark Mode**: Minimalistický tmavý design
- **Fonty**: 
  - Montserrat (nadpisy)
  - Lato (tělo textu)
- **Barvy**: 
  - Pozadí: #0a0a0a
  - Sekundární: #1a1a1a
  - Accent: #2a2a2a
  - Text: #e5e5e5
  - Muted: #a0a0a0

## 📦 Instalace

```bash
# Nainstalovat závislosti
npm install

# Spustit dev server
npm run dev

# Build pro production
npm run build

# Spustit production server
npm start
```

## 🔧 Konfigurace

### Personalizace

Pro přizpůsobení portfolia upravte následující soubory:

1. **Osobní informace v Header**: `src/app/components/Header.tsx`
   - Email adresa
   - Odkazy na sociální sítě (LinkedIn, GitHub)

2. **Překlady**: `messages/*.json`
   - `messages/cs.json` - České překlady
   - `messages/en.json` - Anglické překlady
   - `messages/de.json` - Německé překlady
   - `messages/pl.json` - Polské překlady

3. **Metadata**: `src/app/[locale]/layout.tsx`
   - SEO titulky
   - Popisy stránek

## 🏗️ Struktura projektu

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Root layout s i18n
│   │   └── page.tsx            # Hlavní stránka s toggle logikou
│   ├── components/
│   │   ├── Header.tsx          # Hlavička
│   │   ├── Footer.tsx          # Patička
│   │   ├── LanguageSwitcher.tsx # Přepínač jazyků
│   │   ├── ViewToggle.tsx      # Přepínač Professional/Personal
│   │   ├── professional/       # Profesní komponenty
│   │   │   ├── ProfessionalHero.tsx
│   │   │   ├── ExperienceTimeline.tsx
│   │   │   ├── SkillsPills.tsx
│   │   │   └── VisionSection.tsx
│   │   └── personal/           # Osobní komponenty
│   │       ├── PersonalIntro.tsx
│   │       ├── PassionsGrid.tsx
│   │       └── SideHustle.tsx
│   └── globals.css             # Globální styly
├── i18n/                       # i18n konfigurace
│   ├── routing.ts
│   └── request.ts
└── middleware.ts               # Next.js middleware pro i18n

messages/                       # Překlady
├── cs.json
├── en.json
├── de.json
└── pl.json
```

## 🎯 Klíčové vlastnosti implementace

- **Server Components** jako výchozí
- **Client Components** pouze kde je nutné (toggle, language switcher, hamburger menu)
- **Sémantické HTML** (`<section>`, `<article>`, `<header>`, `<footer>`)
- **Dynamické metadata** pro SEO
- **Plná podpora české diakritiky** ve fontech
- **Plně responzivní design** - Mobile-first přístup
  - ✅ ViewToggle vždy dostupný (i na mobilu!)
  - ✅ Hamburger menu pro mobilní navigaci
  - ✅ Optimalizováno pro všechny obrazovky (375px - 1440px+)
  - ✅ Touch-friendly buttony a spacing

## 🔍 SEO & AI Optimalizace

Portfolio je **plně optimalizováno** pro vyhledávače a AI:

### Implementováno:
- ✅ **robots.txt** - instrukce pro vyhledávače
- ✅ **sitemap.xml** - dynamický sitemap pro všechny jazyky
- ✅ **JSON-LD Structured Data** - Schema.org (Person, WebSite, Organization)
- ✅ **Open Graph** - Facebook, LinkedIn preview
- ✅ **Twitter Cards** - velké obrázky na X/Twitter
- ✅ **hreflang tagy** - multilingual SEO
- ✅ **Canonical URLs** - prevence duplicate content
- ✅ **PWA Manifest** - installable web app
- ✅ **Mobile-first metadata** - optimalizováno pro mobily
- ✅ **Keywords & Author tags** - kompletní metadata

### Pro AI pochopení:
- 🤖 **ChatGPT, Claude, Gemini** - strukturovaná data pro AI asistenty
- 🗣️ **Voice Search** (Siri, Google Assistant)
- 📊 **Google Knowledge Graph** - možnost zobrazení v panelu
- 🔍 **Enhanced Search Results** - rich snippets

📖 **Setup guide:** Viz [SEO-SETUP.md](./SEO-SETUP.md)

## 📱 Responsive Design

Portfolio je **plně responzivní** s mobile-first přístupem:

### Mobile (<768px):
- ✅ **ViewToggle na středu** headeru - vždy dostupný!
- ✅ **Hamburger menu** pro sekundární navigaci
- ✅ **Kompaktní layout** - optimalizováno pro malé obrazovky
- ✅ **Touch-friendly** - dostatečně velké klikací oblasti

### Desktop (≥768px):
- ✅ **Plná navigace** inline v headeru
- ✅ **Všechny kontakty** viditelné
- ✅ **Větší spacing** pro lepší UX

📖 **Detaily:** Viz [RESPONSIVE-IMPROVEMENTS.md](./RESPONSIVE-IMPROVEMENTS.md)

## 📝 Kontakt

Kontakt výhradně přes emailovou adresu v hlavičce stránky.

## 📄 Licence

© 2025 Richard Kousal. Všechna práva vyhrazena.
