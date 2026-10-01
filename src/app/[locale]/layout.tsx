import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { locales, isLocale } from "@/i18n/routing";
import { generateStructuredData } from "@/app/lib/seo";
import { hasArticles } from "@/app/lib/articles";
import { KEYWORDS } from "@/app/lib/metadata";
import { PERSON, SITE_URL } from "@/app/lib/site";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BackToTop from "@/app/components/BackToTop";
import "@/app/globals.css";

// Inter has hand-drawn Czech diacritics (ě, ř, ů); Lato's latin-ext set did not.
const display = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#fafaf8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta.home" });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: "%s" },
    description: t("description"),
    keywords: KEYWORDS,
    authors: [{ name: PERSON.name, url: SITE_URL }],
    creator: PERSON.name,
    publisher: PERSON.name,
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
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon-192.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.svg",
    },
    appleWebApp: { capable: true, statusBarStyle: "default" },
    formatDetection: { telephone: true, email: true },
    other: {
      "contact:email": PERSON.email,
      "contact:phone_number": PERSON.phoneHref,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations("nav");
  const structuredData = generateStructuredData(locale);

  return (
    <html
      lang={locale}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-paper font-body text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
        <a href="#main-content" className="skip-to-content" data-testid="skip-link">
          {t("skipLink")}
        </a>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header showArticles={hasArticles()} />
          <main id="main-content" tabIndex={-1} className="flex-1 pt-16 md:pt-[4.5rem] outline-none">
            {children}
          </main>
          <Footer locale={locale} />
          <BackToTop label={t("backToTop")} />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
