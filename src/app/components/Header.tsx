"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdClose, MdEmail, MdMenu, MdPhone } from "react-icons/md";
import { Link, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { PERSON } from "@/app/lib/site";
import { analytics } from "@/app/lib/analytics";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/articles", key: "articles" },
  { href: "/projects", key: "projects" },
  { href: "/about", key: "about" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function LanguageLinks({ testIdPrefix }: { testIdPrefix: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("languages");
  const tNav = useTranslations("nav");

  return (
    <div
      role="group"
      aria-label={tNav("language")}
      className="flex items-center rounded-lg border border-line p-0.5 font-mono text-xs"
    >
      {locales.map((loc) => {
        const current = loc === locale;
        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            hrefLang={loc}
            lang={loc}
            aria-label={t(loc)}
            aria-current={current ? "true" : undefined}
            data-testid={`${testIdPrefix}-lang-${loc}`}
            onClick={() => !current && analytics.languageChange(locale, loc)}
            className={`rounded-md px-2 py-1 uppercase transition-colors ${
              current ? "bg-ink text-paper" : "text-muted hover:text-ink"
            }`}
          >
            {loc}
          </Link>
        );
      })}
    </div>
  );
}

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation and on Escape
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6 md:h-20">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 rounded-lg"
          data-testid="header-home-link"
        >
          <span className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full border border-line bg-surface md:h-10 md:w-10">
            <Image
              src="/avatar2.webp"
              alt=""
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </span>
          <span className="truncate font-heading text-lg font-bold text-ink">
            Richard Kousal
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label={t("mainLabel")} className="hidden md:block" data-testid="nav-desktop">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    data-testid={`nav-${item.key}`}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-ink underline decoration-accent decoration-2 underline-offset-[10px]"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageLinks testIdPrefix="desktop" />
          <ThemeToggle labels={{ toDark: t("themeToDark"), toLight: t("themeToLight") }} />
          <a
            href={PERSON.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            onClick={() => analytics.socialClick("linkedin")}
            className="rounded p-1 text-muted transition-colors hover:text-ink"
          >
            <FaLinkedin className="h-5 w-5" aria-hidden />
          </a>
          <a
            href={PERSON.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            onClick={() => analytics.socialClick("github")}
            className="rounded p-1 text-muted transition-colors hover:text-ink"
          >
            <FaGithub className="h-5 w-5" aria-hidden />
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
        <ThemeToggle testId="theme-toggle-mobile" labels={{ toDark: t("themeToDark"), toLight: t("themeToLight") }} />
        <button
          type="button"
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          className="rounded-lg p-2 text-muted transition-colors hover:text-ink"
        >
          {open ? <MdClose className="h-6 w-6" aria-hidden /> : <MdMenu className="h-6 w-6" aria-hidden />}
        </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        data-testid="mobile-menu-content"
        hidden={!open}
        className="border-t border-line bg-paper md:hidden"
      >
        <nav aria-label={t("mainLabel")} className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    data-testid={`mobile-nav-${item.key}`}
                    className={`block rounded-lg px-3 py-3 text-base font-medium ${
                      active ? "bg-ink/[0.06] text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 text-sm">
            <a
              href={`mailto:${PERSON.email}`}
              onClick={() => analytics.socialClick("email")}
              className="flex items-center gap-2 text-muted hover:text-ink"
            >
              <MdEmail className="h-5 w-5" aria-hidden />
              {PERSON.email}
            </a>
            <a
              href={`tel:${PERSON.phoneHref}`}
              onClick={() => analytics.socialClick("phone")}
              className="flex items-center gap-2 text-muted hover:text-ink"
            >
              <MdPhone className="h-5 w-5" aria-hidden />
              {PERSON.phone}
            </a>
            <div className="flex items-center justify-between pt-2">
              <LanguageLinks testIdPrefix="mobile" />
              <div className="flex items-center gap-4">
                <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted hover:text-ink">
                  <FaLinkedin className="h-6 w-6" aria-hidden />
                </a>
                <a href={PERSON.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted hover:text-ink">
                  <FaGithub className="h-6 w-6" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
