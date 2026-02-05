import { Montserrat, Lato } from "next/font/google";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { generateStructuredData } from "@/app/lib/seo";
import "@/app/globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
});

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-lato",
  display: "swap",
});

const locales = ["cs", "en", "pl", "de"] as const;
type Locale = (typeof locales)[number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://richardkousal.cz";

  const titles: Record<string, string> = {
    cs: "Richard Kousal - QA & Test Automation Lead | Playwright, Cypress, CI/CD",
    en: "Richard Kousal - QA & Test Automation Lead | Playwright, Cypress, CI/CD",
    de: "Richard Kousal - QA & Test Automation Lead | Playwright, Cypress, CI/CD",
    pl: "Richard Kousal - QA & Test Automation Lead | Playwright, Cypress, CI/CD",
  };

  const descriptions: Record<string, string> = {
    cs: "QA & Test Automation Lead se zaměřením na Playwright, budování týmů a mentoring. Specializace na automatizaci testování, CI/CD a moderní QA procesy. Praha, Česká republika.",
    en: "QA & Test Automation Lead focused on Playwright, team building and mentoring. Specializing in test automation, CI/CD and modern QA processes. Prague, Czech Republic.",
    de: "QA & Test Automation Lead mit Fokus auf Playwright, Teamaufbau und Mentoring. Spezialisiert auf Testautomatisierung, CI/CD und moderne QA-Prozesse. Prag, Tschechische Republik.",
    pl: "QA & Test Automation Lead skupiony na Playwright, budowaniu zespołów i mentoringu. Specjalizacja w automatyzacji testów, CI/CD i nowoczesnych procesach QA. Praga, Czechy.",
  };

  const siteName = "Richard Kousal - QA & Test Automation Lead";
  const ogImageUrl = `${baseUrl}/og-image.svg`; // You'll need to create this

  // Generate alternate language URLs (hreflang)
  const languages = {
    cs: `${baseUrl}/cs`,
    en: `${baseUrl}/en`,
    de: `${baseUrl}/de`,
    pl: `${baseUrl}/pl`,
    "x-default": `${baseUrl}/cs`, // Default for unknown locales
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.cs,
    description: descriptions[locale] || descriptions.cs,
    keywords: [
      "QA Automation",
      "Test Automation Lead",
      "Playwright",
      "Cypress",
      "TypeScript",
      "JavaScript",
      "CI/CD",
      "DevOps",
      "Azure",
      "QA Leadership",
      "Mentoring",
      "Agile",
      "Quality Assurance",
      "Test Engineering",
      "Prague",
      "Czech Republic",
    ],
    authors: [{ name: "Richard Kousal", url: baseUrl }],
    creator: "Richard Kousal",
    publisher: "Richard Kousal",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: languages,
    },
    openGraph: {
      type: "website",
      locale: locale,
      alternateLocale: ["cs", "en", "de", "pl"].filter((l) => l !== locale),
      url: `${baseUrl}/${locale}`,
      siteName: siteName,
      title: titles[locale] || titles.cs,
      description: descriptions[locale] || descriptions.cs,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Richard Kousal - QA & Test Automation Lead",
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.cs,
      description: descriptions[locale] || descriptions.cs,
      images: [ogImageUrl],
      creator: "@richardkousal", // Add your Twitter handle if you have one
    },
    verification: {
      // google: 'your-google-verification-code', // Add when you set up Google Search Console
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
    other: {
      "contact:email": "kousal.richard@gmail.com",
      "contact:phone_number": "+420604674931",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: paramsLocale } = await params;
  const locale = await getLocale();
  const messages = await getMessages();
  const structuredData = generateStructuredData(locale);

  return (
    <html lang={locale} className={`${montserrat.variable} ${lato.variable}`}>
      <head>
        {/* JSON-LD Structured Data for SEO and AI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-192.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        {/* Theme Color */}
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        {/* Mobile Optimization */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        {/* Format Detection */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="format-detection" content="email=yes" />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body antialiased">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
