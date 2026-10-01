import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaDownload, FaEnvelope, FaExternalLinkAlt, FaLinkedin } from "react-icons/fa";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/app/lib/metadata";
import { PERSON } from "@/app/lib/site";
import TrackedLink from "@/app/components/ui/TrackedLink";

type Props = { params: Promise<{ locale: string }> };

interface TimelineItem {
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
}
interface SkillCategory {
  name: string;
  items: string[];
}
interface PassionCategory {
  name: string;
  description?: string;
  items?: string[];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return buildPageMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("description"),
  });
}

export default async function AboutPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tCommon = await getTranslations("common");
  const tPro = await getTranslations("professional");
  const tPer = await getTranslations("personal");

  const timeline = tPro.raw("experience.timeline") as TimelineItem[];
  const skills = tPro.raw("skills.categories") as SkillCategory[];
  const passions = tPer.raw("passions.categories") as PassionCategory[];

  return (
    <div className="container-page py-12 sm:py-16">
      {/* Intro */}
      <header className="flex flex-col gap-8 md:flex-row md:items-start" data-testid="about-intro">
        <div className="relative h-48 w-40 flex-shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-dark-secondary">
          <Image src="/avatar.webp" alt="Richard Kousal" fill sizes="160px" className="object-cover object-top" priority />
        </div>
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">
            <span className="gradient-text">{t("title")}</span>
          </h1>
          <p className="mt-3 font-heading text-lg text-primary-300">{tPro("hero.subtitle")}</p>
          <p className="mt-4 leading-relaxed text-dark-text/90">{tPro("hero.description")}</p>
          <p className="mt-4 text-sm text-accent-emerald">{tCommon("availability")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedLink
              event={{ kind: "cv", locale }}
              href={`/api/generate-cv?locale=${locale}`}
              className="btn-primary"
              data-testid="btn-download-cv"
            >
              <FaDownload className="h-4 w-4" aria-hidden />
              {t("downloadCv")}
            </TrackedLink>
            <TrackedLink
              event={{ kind: "social", platform: "linkedin" }}
              href={PERSON.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              data-testid="btn-linkedin"
            >
              <FaLinkedin className="h-4 w-4" aria-hidden />
              {tPro("hero.btnLinkedIn")}
            </TrackedLink>
            <TrackedLink
              event={{ kind: "social", platform: "email" }}
              href={`mailto:${PERSON.email}`}
              className="btn-secondary"
              data-testid="btn-email"
            >
              <FaEnvelope className="h-4 w-4" aria-hidden />
              {tPro("hero.btnContact")}
            </TrackedLink>
          </div>
        </div>
      </header>

      {/* Professional */}
      <section aria-labelledby="experience-heading" className="mt-20" data-testid="about-experience">
        <p className="eyebrow">{t("professionalTitle")}</p>
        <h2 id="experience-heading" className="section-title mt-2">{tPro("experience.title")}</h2>
        <ol className="relative mt-8 space-y-6 border-l border-white/10 pl-6">
          {timeline.map((item) => (
            <li key={`${item.role}-${item.period}`} className="relative">
              <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full border-2 border-dark-bg bg-primary-400" aria-hidden />
              <div className="card p-5 sm:p-6">
                <h3 className="font-heading text-lg font-semibold sm:text-xl">{item.role}</h3>
                <p className="mt-1 text-sm">
                  <span className="text-primary-300">{item.company}</span>
                  <span className="text-dark-muted"> · {item.period}</span>
                </p>
                <ul className="mt-3 space-y-1.5">
                  {item.responsibilities.map((r) => (
                    <li key={r} className="flex gap-2 text-sm leading-relaxed text-dark-muted">
                      <span className="text-primary-400" aria-hidden>▸</span>
                      {/* Trusted content from messages/*.json (may contain <strong>) */}
                      <span dangerouslySetInnerHTML={{ __html: r }} />
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="skills-heading" className="mt-16" data-testid="about-skills">
        <h2 id="skills-heading" className="section-title">{tPro("skills.title")}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {skills.map((cat) => (
            <div key={cat.name} className="card p-5">
              <h3 className="font-heading font-semibold text-dark-text">{cat.name}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {cat.items.map((s) => (
                  <li key={s} className="tag">{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="vision-heading" className="mt-16">
        <figure className="card relative overflow-hidden p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-500/10 blur-3xl" aria-hidden />
          <h2 id="vision-heading" className="section-title">{tPro("vision.title")}</h2>
          <blockquote className="mt-4 border-l-2 border-primary-500/60 pl-4 text-lg italic leading-relaxed text-dark-text/90">
            {tPro("vision.text")}
          </blockquote>
        </figure>
      </section>

      {/* Personal */}
      <section aria-labelledby="personal-heading" className="mt-20" data-testid="about-personal">
        <p className="eyebrow">{t("personalTitle")}</p>
        <h2 id="personal-heading" className="section-title mt-2">{tPer("intro.title")}</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-dark-muted">{tPer("intro.description")}</p>

        <h3 className="mt-10 font-heading text-xl font-semibold">{tPer("passions.title")}</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {passions.map((p) => (
            <div key={p.name} className="card p-5">
              <h4 className="font-heading font-semibold">{p.name}</h4>
              {p.description && <p className="mt-2 text-sm leading-relaxed text-dark-muted">{p.description}</p>}
              {p.items && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.items.map((i) => (
                    <li key={i} className="tag">{i}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="side-heading" className="mt-16" data-testid="about-side-hustle">
        <div className="card flex flex-col overflow-hidden md:flex-row">
          <div className="relative h-56 md:h-auto md:w-2/5">
            <Image src="/lounge-1.webp" alt="Apartmány Iwona" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
          </div>
          <div className="p-6 sm:p-8 md:w-3/5">
            <h2 id="side-heading" className="font-heading text-2xl font-bold">{tPer("sideHustle.title")}</h2>
            <TrackedLink
              event={{ kind: "external", name: "apartmany-iwona" }}
              href={`https://${tPer("sideHustle.link")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow mt-2 inline-flex items-center gap-2"
            >
              {tPer("sideHustle.link")}
              <FaExternalLinkAlt className="h-3 w-3" aria-hidden />
              <span className="sr-only">{tCommon("opensInNewTab")}</span>
            </TrackedLink>
            <p className="mt-4 leading-relaxed text-dark-muted">{tPer("sideHustle.description")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
