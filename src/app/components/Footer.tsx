import { getTranslations } from "next-intl/server";
import { FaGithub, FaLinkedin, FaRss } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { PERSON } from "@/app/lib/site";
import { hasArticles } from "@/app/lib/articles";

export default async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const year = new Date().getFullYear();

  const showArticles = hasArticles();
  const links = [
    { href: "/", label: tNav("home") },
    ...(showArticles ? [{ href: "/articles", label: tNav("articles") }] : []),
    { href: "/projects", label: tNav("projects") },
    { href: "/about", label: tNav("about") },
  ];

  const iconLink = "flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink/30 hover:text-ink";

  return (
    <footer className="mt-12 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-heading text-lg font-bold tracking-tight">Richard Kousal</p>
          <p className="mt-1 text-sm text-muted">QA &amp; Test Automation Lead · Etnetera Core</p>
          <div className="mt-5 flex items-center gap-2">
            <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconLink}>
              <FaLinkedin className="h-4 w-4" aria-hidden />
            </a>
            <a href={PERSON.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconLink}>
              <FaGithub className="h-4 w-4" aria-hidden />
            </a>
            {showArticles && (
              <a href="/feed.xml" aria-label={t("rss")} className={iconLink} data-testid="footer-rss">
                <FaRss className="h-3.5 w-3.5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <nav aria-label={tNav("footerLabel")}>
          <ul className="flex flex-col gap-2.5 text-[0.9375rem]">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted transition-colors hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-2.5 text-[0.9375rem]">
          <a href={`mailto:${PERSON.email}`} className="text-muted transition-colors hover:text-ink">
            {PERSON.email}
          </a>
          <a href={`tel:${PERSON.phoneHref}`} className="text-muted transition-colors hover:text-ink">
            {PERSON.phone}
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-muted sm:px-8">{t("copyright", { year })}</p>
      </div>
    </footer>
  );
}
