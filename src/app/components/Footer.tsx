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
    <footer className="mt-24 border-t border-white/5 bg-dark-secondary/40">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-bold">Richard Kousal</p>
          <p className="mt-1 text-sm text-dark-muted">QA & Test Automation Lead</p>
        </div>

        <nav aria-label={tNav("mainLabel")}>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-dark-muted hover:text-dark-text">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-2 text-sm">
          <a href={`mailto:${PERSON.email}`} className="flex items-center gap-2 text-dark-muted hover:text-dark-text">
            <MdEmail className="h-4 w-4" aria-hidden /> {PERSON.email}
          </a>
          <a href={`tel:${PERSON.phoneHref}`} className="flex items-center gap-2 text-dark-muted hover:text-dark-text">
            <MdPhone className="h-4 w-4" aria-hidden /> {PERSON.phone}
          </a>
          <div className="mt-2 flex items-center gap-4">
            <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-dark-muted hover:text-primary-400">
              <FaLinkedin className="h-5 w-5" aria-hidden />
            </a>
            <a href={PERSON.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-dark-muted hover:text-primary-400">
              <FaGithub className="h-5 w-5" aria-hidden />
            </a>
            <a href="/feed.xml" aria-label={t("rss")} className="text-dark-muted hover:text-primary-400" data-testid="footer-rss">
              <FaRss className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5">
        <p className="mx-auto max-w-5xl px-4 py-4 text-xs text-dark-muted sm:px-6">
          {t("copyright", { year })}
        </p>
      </div>
    </footer>
  );
}
