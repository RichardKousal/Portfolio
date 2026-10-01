import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/app/lib/metadata";
import { getArticlesForLocale, formatDate } from "@/app/lib/articles";
import { toArticleCards } from "@/app/lib/article-cards";
import { getProjects } from "@/app/lib/projects";
import { PERSON } from "@/app/lib/site";
import ArticleCard from "@/app/components/articles/ArticleCard";
import ProjectCard from "@/app/components/projects/ProjectCard";
import Section from "@/app/components/ui/Section";
import TrackedLink from "@/app/components/ui/TrackedLink";
import Verdict from "@/app/components/ui/Verdict";

// Re-render daily so the status line and "upcoming / done" labels stay current.
export const revalidate = 86400;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return buildPageMetadata({
    locale,
    path: "",
    title: t("title"),
    description: t("description"),
  });
}

interface Talk {
  title: string;
  date: string;
  place: string;
  description: string;
}

function shortDate(date: string, locale: Locale) {
  const d = new Date(`${date}T00:00:00Z`);
  if (locale === "cs") return `${d.getUTCDate()}. ${d.getUTCMonth() + 1}.`;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }).format(d);
}

export default async function HomePage({ params }: Props) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const tContact = await getTranslations("contact");
  const tTalks = await getTranslations("talks");

  const latest = await toArticleCards(getArticlesForLocale(locale).slice(0, 3), locale);
  const { featured } = await getProjects(locale);
  const talks = tTalks.raw("items") as Talk[];
  const today = new Date().toISOString().slice(0, 10);
  const nextTalk = talks
    .filter((talk) => talk.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-heading" data-testid="home-hero">
        <div className="container-page flex flex-col-reverse items-start gap-10 py-16 sm:py-24 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{t("hero.eyebrow")}</p>
            <h1
              id="hero-heading"
              className="mt-4 font-heading text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t("hero.lead")}</p>

            <p
              className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 border-y border-line py-3 font-mono text-sm"
              data-testid="status-line"
            >
              <span className="sr-only">{t("status.label")}: </span>
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
              </span>
              <span>
                <span className="text-muted">{t("status.now")}:</span> {t("status.nowValue")}
              </span>
              {nextTalk && (
                <>
                  <span aria-hidden className="text-muted">·</span>
                  <span>
                    <span className="text-muted">{t("status.nextTalk")}:</span> {nextTalk.title},{" "}
                    {shortDate(nextTalk.date, locale)}
                  </span>
                </>
              )}
            </p>

            <p className="mt-4 text-sm text-ok" data-testid="availability">
              {tCommon("availability")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/articles" className="btn-primary" data-testid="hero-cta-articles">
                {t("hero.ctaArticles")}
              </Link>
              <Link href="/projects" className="btn-secondary" data-testid="hero-cta-projects">
                {t("hero.ctaProjects")}
              </Link>
            </div>
          </div>
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-line bg-surface sm:h-32 sm:w-32 md:h-52 md:w-44">
            <Image
              src="/avatar.webp"
              alt="Richard Kousal"
              fill
              sizes="(max-width: 768px) 128px, 176px"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </section>

      {/* Latest articles (hidden when there are none) */}
      {latest.length > 0 && (
        <Section
          id="latest-articles"
          title={t("latest.title")}
          action={{ href: "/articles", label: tCommon("allArticles") }}
          testId="home-latest-articles"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {latest.map((a) => (
              <ArticleCard key={a.key} article={a} />
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      <Section
        id="work"
        title={t("work.title")}
        intro={t("work.intro")}
        action={{ href: "/projects", label: tCommon("allProjects") }}
        testId="home-projects"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} variant="compact" />
          ))}
        </div>
      </Section>

      {/* LinkedIn series */}
      <section aria-labelledby="series-heading" className="container-page py-6" data-testid="home-series">
        <div className="card flex flex-col gap-5 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">
              {t("series.label")} · <span className="text-ok">{t("series.schedule")}</span>
            </p>
            <h2 id="series-heading" className="mt-2 font-heading text-2xl font-bold tracking-tight">
              {t("series.title")}
            </h2>
            <p className="mt-2 leading-relaxed text-muted">{t("series.text")}</p>
          </div>
          <TrackedLink
            event={{ kind: "social", platform: "linkedin" }}
            href={PERSON.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex-shrink-0"
            data-testid="series-linkedin"
          >
            <FaLinkedin className="h-4 w-4" aria-hidden />
            {t("series.cta")}
            <span className="sr-only">{tCommon("opensInNewTab")}</span>
          </TrackedLink>
        </div>
      </section>

      {/* Talks */}
      <Section id="talks" title={t("talks.title")} testId="home-talks">
        <ul className="divide-y divide-line border-y border-line">
          {talks.map((talk) => {
            const upcoming = talk.date >= today;
            return (
              <li
                key={talk.title}
                className="grid gap-2 py-5 md:grid-cols-[10rem_1fr] md:gap-8"
                data-testid="talk-item"
              >
                <time dateTime={talk.date} className="font-mono text-sm text-muted">
                  {talk.date}
                </time>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-heading text-lg font-semibold">{talk.title}</h3>
                    <Verdict kind={upcoming ? "pass" : "neutral"} symbol={upcoming ? "●" : "✓"}>
                      {upcoming ? t("talks.upcoming") : t("talks.past")}
                    </Verdict>
                  </div>
                  <p className="mt-1">{talk.description}</p>
                  <p className="mt-1 text-sm text-muted">
                    {talk.place} · {formatDate(talk.date, locale)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Contact */}
      <Section id="contact" title={tContact("title")} testId="home-contact">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <p className="text-lg leading-relaxed">{tContact("text")}</p>
            <p className="mt-3 text-sm text-ok">{tCommon("availability")}</p>
          </div>
          <ul className="flex flex-col gap-3 font-mono text-sm">
            <li>
              <TrackedLink event={{ kind: "social", platform: "email" }} href={`mailto:${PERSON.email}`} className="flex items-center gap-2 hover:text-accent" data-testid="contact-email">
                <MdEmail className="h-4 w-4 text-accent" aria-hidden />
                <span className="sr-only">{tContact("email")}: </span>
                {PERSON.email}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink event={{ kind: "social", platform: "phone" }} href={`tel:${PERSON.phoneHref}`} className="flex items-center gap-2 hover:text-accent">
                <MdPhone className="h-4 w-4 text-accent" aria-hidden />
                <span className="sr-only">{tContact("phone")}: </span>
                {PERSON.phone}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink event={{ kind: "social", platform: "linkedin" }} href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent" data-testid="contact-linkedin">
                <FaLinkedin className="h-4 w-4 text-accent" aria-hidden />
                linkedin.com/in/richard-kousal
              </TrackedLink>
            </li>
            <li>
              <TrackedLink event={{ kind: "social", platform: "github" }} href={PERSON.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent">
                <FaGithub className="h-4 w-4 text-accent" aria-hidden />
                github.com/richardkousal
              </TrackedLink>
            </li>
          </ul>
        </div>
      </Section>
    </>
  );
}
