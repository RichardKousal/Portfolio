import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import i18nConfig from "@/app/i18nConfig";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.richard.kousal.com/"),
  title: "Richard Kousal - Test Engineer",
  description:
    "Richard Kousal is a skilled Test Automation Engineer with a passion for ensuring software quality and reliability through meticulously crafted automated tests. With over three years of experience, he specializes in automated test design, CI/CD setup, infrastructure improvement, and training colleagues. Explore Richard's profile to learn more about his expertise and contributions to the field of software testing.",

  keywords: [
    "Richard Kousal",
    "Test Automation Engineer",
    "automated testing",
    "software development lifecycle",
    "software quality",
    "reliability",
    "automated tests",
    "testing philosophy",
    "bug discovery",
    "test design",
    "CI/CD Setup",
    "infrastructure improvement",
    "team performance",
    "QA processes",
    "stakeholder collaboration",
    "code review",
    "test specification",
    "Cypress Bootcamp",
    "Cypress commands",
    "retry logic",
    "API testing",
    "environment configuration",
    "test optimization",
    "process improvement",
    "logistics applications",
    "mobile testing",
    "team knowledge sharing",
    "test automation",
    "Cypress",
    "Playwright",
    "Postman",
    "CI/CD DevOps",
    "Git",
    "agile methodology",
    "communication skills",
    "teamwork",
    "problem solving",
    "time management",
    "Frontend Technologies",
    "Next.js",
    "Tailwind CSS",
    "CSS",
    "HTML",
    "programming languages",
    "TypeScript",
    "JavaScript",
    "SQL knowledge",
    "languages",
    "English",
    "Czech",
    "Polish",
  ],
  applicationName: "Richard Kousal - Test Engineer",
  authors: [{ name: "Richard Kousal", url: "https://www.richard.kousal.com/" }],
  generator: "Next.js",
  openGraph: {
    type: "website",
    url: "https://www.richard.kousal.com/",
    title: "Richard Kousal - Test Engineer",
    description:
      "Richard Kousal is a skilled Test Automation Engineer with a passion for ensuring software quality and reliability through meticulously crafted automated tests. With over three years of experience, he specializes in automated test design, CI/CD setup, infrastructure improvement, and training colleagues. Explore Richard's profile to learn more about his expertise and contributions to the field of software testing.",
    siteName: "Richard Kousal",
    images: [{ url: "/public/favicon.ico" }],
  },
  formatDetection: { telephone: false },
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
