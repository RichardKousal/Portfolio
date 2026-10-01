import { getTranslations } from "next-intl/server";
import { FaGithub, FaLinkedin, FaRss } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { PERSON } from "@/app/lib/site";

export default async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const year = new Date().getFullYear();

  const links = [
    { href: "/", label: tNav("home") },
    { href: "/articles", label: tNav("articles") },
    { href: "/projects", label: tNav("projects") },
    { href: "/about", label: tNav("about") },
  ];

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-bold">Richard Kousal</p>
          <p className="mt-1 font-mono text-xs text-muted">QA & Test Automation Lead</p>
        </div>

        <nav aria-label={tNav("footerLabel")}>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-2 text-sm">
          <a href={`mailto:${PERSON.email}`} className="flex items-center gap-2 text-muted hover:text-ink">
            <MdEmail className="h-4 w-4" aria-hidden /> {PERSON.email}
          </a>
          <a href={`tel:${PERSON.phoneHref}`} className="flex items-center gap-2 text-muted hover:text-ink">
            <MdPhone className="h-4 w-4" aria-hidden /> {PERSON.phone}
          </a>
          <div className="mt-2 flex items-center gap-4">
            <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted hover:text-ink">
              <FaLinkedin className="h-5 w-5" aria-hidden />
            </a>
            <a href={PERSON.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted hover:text-ink">
              <FaGithub className="h-5 w-5" aria-hidden />
            </a>
            <a href="/feed.xml" aria-label={t("rss")} className="text-muted hover:text-ink" data-testid="footer-rss">
              <FaRss className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-5xl px-4 py-4 font-mono text-xs text-muted sm:px-6">
          {t("copyright", { year })}
        </p>
      </div>
    </footer>
  );
}
