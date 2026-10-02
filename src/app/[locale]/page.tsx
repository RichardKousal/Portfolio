import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdArrowOutward, MdEmail, MdPhone } from "react-icons/md";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/app/lib/metadata";
import { getArticlesForLocale, formatDate, hasArticles } from "@/app/lib/articles";
import { toArticleCards } from "@/app/lib/article-cards";
import { getProjects } from "@/app/lib/projects";
import type { Position } from "@/app/lib/profile";
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

/** Full years since the first QA/testing position (from the LinkedIn timeline). */
function yearsInQa(timeline: Position[]) {
  const first = timeline
    .filter((p) => /QA|Test/i.test(p.role))
    .map((p) => p.start)
    .sort()[0];
  if (!first) return 0;
  const [y, m] = first.split("-").map(Number);
  const now = new Date();
  return Math.floor((now.getUTCFullYear() * 12 + now.getUTCMonth() - (y * 12 + (m - 1))) / 12);
}

export default async function HomePage({ params }: Props) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const tContact = await getTranslations("contact");
  const tTalks = await getTranslations("talks");
  const tPro = await getTranslations("professional");

  const showArticles = hasArticles();
  const latest = await toArticleCards(getArticlesForLocale(locale).slice(0, 3), locale);
  const { items: projects, featured } = await getProjects(locale);
  const talks = tTalks.raw("items") as Talk[];
  const today = new Date().toISOString().slice(0, 10);
  const nextTalk = talks
    .filter((talk) => talk.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  const title = t("hero.title");
  const comma = title.indexOf(", ");
  const facts = [
    { value: t("facts.years", { years: yearsInQa(tPro.raw("experience.timeline") as Position[]) }), label: t("facts.yearsLabel") },
    { value: t("facts.role"), label: t("facts.roleLabel") },
    { value: t("facts.tools"), label: t("facts.toolsLabel") },
    { value: String(projects.length), label: t("facts.projectsLabel") },
  ];

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-heading" data-testid="home-hero" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(60rem_28rem_at_75%_-10%,rgb(var(--accent)/0.10),transparent_70%)]"
        />
        <div className="container-page grid items-center gap-12 pb-16 pt-12 sm:pt-20 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-16 md:pb-24 lg:pt-24">
          <div>
            <p className="eyebrow">{t("hero.eyebrow")}</p>
            <h1
              id="hero-heading"
              className="mt-6 font-heading text-[2.75rem] font-extrabold leading-[1.04] tracking-[-0.028em] sm:text-6xl lg:text-[4.75rem]"
            >
              {comma > 0 ? (
                <>
                  {title.slice(0, comma + 1)}{" "}
                  <span className="text-accent">{title.slice(comma + 2)}</span>
                </>
              ) : (
                title
              )}
            </h1>
            <p className="lead mt-6 max-w-xl">{t("hero.lead")}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {showArticles && (
                <Link href="/articles" className="btn-primary" data-testid="hero-cta-articles">
                  {t("hero.ctaArticles")}
                </Link>
              )}
              <Link
                href="/projects"
                className={showArticles ? "btn-secondary" : "btn-primary"}
                data-testid="hero-cta-projects"
              >
                {t("hero.ctaProjects")}
                {!showArticles && <span aria-hidden>→</span>}
              </Link>
              {!showArticles && (
                <a href="#contact" className="btn-secondary" data-testid="hero-cta-contact">
                  {tContact("title")}
                </a>
              )}
            </div>

            <p
              className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm"
              data-testid="status-line"
            >
              <span className="sr-only">{t("status.label")}: </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 shadow-card">
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
                </span>
                <span>
                  <span className="text-muted">{t("status.now")}:</span>{" "}
                  <span className="font-medium">{t("status.nowValue")}</span>
                </span>
              </span>
              {nextTalk && (
                <span className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1.5 shadow-card">
                  <span className="text-muted">{t("status.nextTalk")}:</span>&nbsp;
                  <span className="font-medium">
                    {nextTalk.title}, {shortDate(nextTalk.date, locale)}
                  </span>
                </span>
              )}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[16rem] sm:max-w-sm md:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rotate-2 rounded-[2rem] bg-gradient-to-br from-accent/25 via-accent/5 to-transparent sm:-inset-4"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-ink shadow-lift">
              <Image
                src="/avatar.webp"
                alt="Richard Kousal"
                fill
                sizes="(max-width: 768px) 320px, 420px"
                className="object-cover object-top"
                priority
              />
            </div>
            <p
              className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-line bg-surface/95 px-4 py-3 text-sm font-medium text-ok shadow-lift backdrop-blur sm:left-6 sm:right-auto"
              data-testid="availability"
            >
              {tCommon("availability")}
            </p>
          </div>
        </div>

        {/* Facts strip */}
        <div className="container-page pb-4">
          <dl
            aria-label={t("facts.label")}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-card lg:grid-cols-4"
          >
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse gap-1 bg-surface p-5 sm:p-7">
                <dt className="text-sm leading-snug text-muted">{f.label}</dt>
                <dd className="font-heading text-xl font-bold tracking-tight sm:text-2xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Latest articles (hidden when there are none) */}
      {latest.length > 0 && (
        <Section
          id="latest-articles"
          eyebrow={t("eyebrows.latest")}
          title={t("latest.title")}
          action={{ href: "/articles", label: tCommon("allArticles") }}
          testId="home-latest-articles"
        >
          <div className="grid gap-5 md:grid-cols-3">
            {latest.map((a) => (
              <ArticleCard key={a.key} article={a} />
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      <Section
        id="work"
        eyebrow={t("eyebrows.work")}
        title={t("work.title")}
        intro={t("work.intro")}
        action={{ href: "/projects", label: tCommon("allProjects") }}
        testId="home-projects"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} variant="compact" />
          ))}
        </div>
      </Section>

      {/* LinkedIn series */}
      <section aria-labelledby="series-heading" className="container-page py-4" data-testid="home-series">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-10 text-paper sm:px-12 sm:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/40 blur-3xl"
          />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-paper/70">
                <FaLinkedin className="h-3.5 w-3.5" aria-hidden />
                {t("series.label")} · {t("series.schedule")}
              </p>
              <h2 id="series-heading" className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                {t("series.title")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-paper/75">{t("series.text")}</p>
            </div>
            <TrackedLink
              event={{ kind: "social", platform: "linkedin" }}
              href={PERSON.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[2.75rem] flex-shrink-0 items-center justify-center gap-2 rounded-full bg-paper px-6 py-2.5 text-[0.9375rem] font-semibold text-ink transition hover:bg-white"
              data-testid="series-linkedin"
            >
              {t("series.cta")}
              <MdArrowOutward className="h-4 w-4" aria-hidden />
              <span className="sr-only">{tCommon("opensInNewTab")}</span>
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* Talks */}
      <Section id="talks" eyebrow={t("eyebrows.talks")} title={t("talks.title")} testId="home-talks">
        <ul className="flex flex-col gap-4">
          {talks.map((talk) => {
            const upcoming = talk.date >= today;
            const d = new Date(`${talk.date}T00:00:00Z`);
            return (
              <li
                key={talk.title}
                className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-7"
                data-testid="talk-item"
              >
                <time
                  dateTime={talk.date}
                  className="flex w-20 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-accent/[0.08] py-3 text-accent"
                >
                  <span className="font-heading text-3xl font-bold leading-none">{d.getUTCDate()}</span>
                  <span className="mt-1 text-xs font-semibold uppercase tracking-wider">
                    {new Intl.DateTimeFormat(locale === "cs" ? "cs-CZ" : "en-GB", { month: "short", timeZone: "UTC" }).format(d)}
                  </span>
                </time>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-heading text-xl font-semibold tracking-tight">{talk.title}</h3>
                    <Verdict kind={upcoming ? "pass" : "neutral"} symbol={upcoming ? "●" : "✓"}>
                      {upcoming ? t("talks.upcoming") : t("talks.past")}
                    </Verdict>
                  </div>
                  <p className="mt-1.5">{talk.description}</p>
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
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="container-page scroll-mt-24 py-16 sm:py-24"
        data-testid="home-contact"
      >
        <div className="card grid gap-10 p-6 sm:p-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-16">
          <div>
            <p className="eyebrow">{t("eyebrows.contact")}</p>
            <h2 id="contact-heading" className="section-title mt-3">
              {tContact("heading")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{tContact("text")}</p>
            <p className="mt-4 text-sm font-medium text-ok">{tCommon("availability")}</p>
            <TrackedLink
              event={{ kind: "social", platform: "email" }}
              href={`mailto:${PERSON.email}`}
              className="btn-primary mt-8"
            >
              <MdEmail className="h-4 w-4" aria-hidden />
              {tContact("email")}
            </TrackedLink>
          </div>
          <ul className="flex flex-col divide-y divide-line self-center border-y border-line text-[0.9375rem]">
            {[
              { platform: "email", href: `mailto:${PERSON.email}`, icon: MdEmail, label: tContact("email"), value: PERSON.email, testId: "contact-email" },
              { platform: "phone", href: `tel:${PERSON.phoneHref}`, icon: MdPhone, label: tContact("phone"), value: PERSON.phone },
              { platform: "linkedin", href: PERSON.linkedin, icon: FaLinkedin, label: "LinkedIn", value: "richard-kousal", external: true, testId: "contact-linkedin" },
              { platform: "github", href: PERSON.github, icon: FaGithub, label: "GitHub", value: "richardkousal", external: true },
            ].map(({ platform, href, icon: Icon, label, value, external, testId }) => (
              <li key={platform}>
                <TrackedLink
                  event={{ kind: "social", platform: platform as "email" | "phone" | "linkedin" | "github" }}
                  href={href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="group flex items-center gap-4 py-4 transition-colors hover:text-accent"
                  data-testid={testId}
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-ink/[0.05] text-ink transition-colors group-hover:bg-accent group-hover:text-accent-ink">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-muted">{label}</span>
                    <span className="block truncate font-medium">{value}</span>
                  </span>
                  <MdArrowOutward className="h-4 w-4 text-muted transition group-hover:text-accent" aria-hidden />
                </TrackedLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
