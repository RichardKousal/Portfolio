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

// Re-render daily so "upcoming / past" talk labels stay current.
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

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden" data-testid="home-hero">
        <div
          className="pointer-events-none absolute -top-32 right-[-10%] h-80 w-80 rounded-full bg-primary-500/10 blur-3xl sm:h-[28rem] sm:w-[28rem]"
          aria-hidden
        />
        <div className="container-page relative flex flex-col-reverse items-start gap-10 py-14 sm:py-20 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="eyebrow">{t("hero.eyebrow")}</p>
            <h1 id="hero-heading" className="mt-3 font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              <span className="gradient-text">{t("hero.title")}</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-dark-muted">{t("hero.lead")}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent-emerald/30 bg-accent-emerald/10 px-3 py-1 text-sm text-accent-emerald" data-testid="availability">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-emerald" />
              </span>
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
          <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-dark-secondary shadow-2xl shadow-primary-500/10 sm:h-36 sm:w-36 md:ml-auto md:h-56 md:w-48">
            <Image
              src="/avatar.webp"
              alt="Richard Kousal"
              fill
              sizes="(max-width: 768px) 144px, 192px"
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

      {/* Talks */}
      <Section id="talks" title={t("talks.title")} testId="home-talks">
        <ul className="grid gap-4">
          {talks.map((talk) => {
            const upcoming = talk.date >= today;
            return (
              <li key={talk.title} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6" data-testid="talk-item">
                <div className="flex-shrink-0 rounded-xl border border-white/10 bg-dark-bg px-4 py-3 text-center sm:w-36">
                  <time dateTime={talk.date} className="block font-heading text-sm font-semibold text-dark-text">
                    {formatDate(talk.date, locale)}
                  </time>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-heading text-lg font-semibold">{talk.title}</h3>
                    <span className={`tag ${upcoming ? "border-accent-emerald/40 text-accent-emerald" : ""}`}>
                      {upcoming ? t("talks.upcoming") : t("talks.past")}
                    </span>
                  </div>
                  <p className="mt-1 text-dark-muted">{talk.description}</p>
                  <p className="mt-1 text-sm text-dark-muted">{talk.place}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Contact */}
      <Section id="contact" title={tContact("title")} testId="home-contact">
        <div className="card flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-dark-text/90">{tContact("text")}</p>
            <p className="mt-2 text-sm text-accent-emerald">{tCommon("availability")}</p>
          </div>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <TrackedLink event={{ kind: "social", platform: "email" }} href={`mailto:${PERSON.email}`} className="flex items-center gap-2 text-dark-text hover:text-primary-300" data-testid="contact-email">
                <MdEmail className="h-5 w-5 text-primary-400" aria-hidden />
                <span className="sr-only">{tContact("email")}: </span>
                {PERSON.email}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink event={{ kind: "social", platform: "phone" }} href={`tel:${PERSON.phoneHref}`} className="flex items-center gap-2 text-dark-text hover:text-primary-300">
                <MdPhone className="h-5 w-5 text-primary-400" aria-hidden />
                <span className="sr-only">{tContact("phone")}: </span>
                {PERSON.phone}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink event={{ kind: "social", platform: "linkedin" }} href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-dark-text hover:text-primary-300" data-testid="contact-linkedin">
                <FaLinkedin className="h-5 w-5 text-primary-400" aria-hidden />
                LinkedIn
              </TrackedLink>
            </li>
            <li>
              <TrackedLink event={{ kind: "social", platform: "github" }} href={PERSON.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-dark-text hover:text-primary-300">
                <FaGithub className="h-5 w-5 text-primary-400" aria-hidden />
                GitHub
              </TrackedLink>
            </li>
          </ul>
        </div>
      </Section>
    </>
  );
}
