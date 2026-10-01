import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaDownload, FaEnvelope, FaExternalLinkAlt, FaLinkedin } from "react-icons/fa";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/app/lib/metadata";
import { PERSON } from "@/app/lib/site";
import type { Certification, Education, LanguageSkill, Position, SkillCategory } from "@/app/lib/profile";
import TrackedLink from "@/app/components/ui/TrackedLink";

type Props = { params: Promise<{ locale: string }> };

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

/** "Label: text" bullets from LinkedIn get a bold label. */
function Bullet({ text }: { text: string }) {
  const idx = text.indexOf(": ");
  if (idx > 0 && idx < 50) {
    return (
      <>
        <strong className="font-semibold text-ink">{text.slice(0, idx)}:</strong> {text.slice(idx + 2)}
      </>
    );
  }
  return <>{text}</>;
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="section-title">
      {children}
    </h2>
  );
}

export default async function AboutPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tCommon = await getTranslations("common");
  const tPro = await getTranslations("professional");
  const tPer = await getTranslations("personal");

  const summary = tPro.raw("summary") as string[];
  const timeline = tPro.raw("experience.timeline") as Position[];
  const education = tPro.raw("education.items") as Education[];
  const languages = tPro.raw("languages.items") as LanguageSkill[];
  const certifications = tPro.raw("certifications.items") as Certification[];
  const skills = tPro.raw("skills.categories") as SkillCategory[];
  const passions = tPer.raw("passions.categories") as PassionCategory[];
  const present = tPro("experience.present");

  return (
    <div className="container-page py-14 sm:py-20">
      {/* Intro */}
      <header className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12" data-testid="about-intro">
        <div className="relative h-40 w-32 flex-shrink-0 overflow-hidden rounded-2xl border border-line bg-surface md:h-52 md:w-44">
          <Image src="/avatar.webp" alt="Richard Kousal" fill sizes="176px" className="object-cover object-top" priority />
        </div>
        <div className="max-w-prose">
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1>
          <p className="mt-3 font-mono text-sm text-accent" data-testid="about-headline">
            {tPro("hero.subtitle")}
          </p>
          <div className="mt-6 space-y-4 leading-relaxed" data-testid="about-summary">
            {summary.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <p className="mt-5 text-sm text-ok">{tCommon("availability")}</p>
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

      {/* Experience as a changelog */}
      <section aria-labelledby="experience-heading" className="mt-24" data-testid="about-experience">
        <p className="eyebrow">{t("professionalTitle")}</p>
        <div className="mt-2">
          <SectionHeading id="experience-heading">{tPro("experience.title")}</SectionHeading>
        </div>
        <ol className="mt-10">
          {timeline.map((job, i) => (
            <li
              key={`${job.role}-${job.start}`}
              className="grid gap-2 md:grid-cols-[11rem_1fr] md:gap-8"
              data-testid="experience-item"
            >
              <p className="pt-1 font-mono text-sm text-muted">
                <time dateTime={job.start}>{job.start}</time>
                <span aria-hidden> → </span>
                <span className="sr-only"> – </span>
                {job.end ? <time dateTime={job.end}>{job.end}</time> : <span className="text-ok">{present}</span>}
              </p>
              <div className={`relative border-l border-line pb-10 pl-6 ${i === timeline.length - 1 ? "pb-0" : ""}`}>
                <span
                  className={`absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full border-2 border-paper ${job.end ? "bg-muted" : "bg-ok"}`}
                  aria-hidden
                />
                <h3 className="font-heading text-lg font-semibold sm:text-xl">{job.role}</h3>
                <p className="mt-0.5 text-sm">
                  <span className="font-semibold text-accent">{job.company}</span>
                  {job.location && <span className="text-muted"> · {job.location}</span>}
                </p>
                <div className="mt-3 max-w-prose space-y-3 leading-relaxed text-muted">
                  {job.intro.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                  {job.bullets.length > 0 && (
                    <ul className="space-y-1.5">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="font-mono text-ok" aria-hidden>+</span>
                          <span>
                            <Bullet text={b} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {job.outro.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Education + languages */}
      <div className="mt-20 grid gap-12 md:grid-cols-2">
        <section aria-labelledby="education-heading" data-testid="about-education">
          <SectionHeading id="education-heading">{tPro("education.title")}</SectionHeading>
          {education.map((e) => (
            <div key={e.school} className="mt-6">
              <p className="font-mono text-sm text-muted">
                {e.start} → {e.end}
              </p>
              <h3 className="mt-1 font-semibold">{e.school}</h3>
              <p className="text-muted">{e.degree}</p>
              {e.activities.length > 0 && (
                <>
                  <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted">{t("activities")}</p>
                  <ul className="mt-1 space-y-1 text-muted">
                    {e.activities.map((a) => (
                      <li key={a} className="flex gap-2">
                        <span className="font-mono text-ok" aria-hidden>+</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </section>

        <section aria-labelledby="languages-heading" data-testid="about-languages">
          <SectionHeading id="languages-heading">{tPro("languages.title")}</SectionHeading>
          <dl className="mt-6 divide-y divide-line border-y border-line">
            {languages.map((l) => (
              <div key={l.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3" data-testid="language-item">
                <dt className="font-semibold">{l.name}</dt>
                <dd className="font-mono text-sm text-muted">{l.level}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {/* Certifications */}
      <section aria-labelledby="certifications-heading" className="mt-20" data-testid="about-certifications">
        <SectionHeading id="certifications-heading">{tPro("certifications.title")}</SectionHeading>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {certifications.map((c) => (
            <li key={c.name} className="grid gap-1 py-4 md:grid-cols-[11rem_1fr] md:gap-8" data-testid="certification-item">
              <p className="font-mono text-sm text-muted">
                <time dateTime={c.issued}>{c.issued}</time>
              </p>
              <div>
                <h3 className="font-semibold">
                  <span className="mr-1.5 font-mono text-ok" aria-hidden>✓</span>
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline">
                      {c.name}
                      <FaExternalLinkAlt className="ml-1.5 inline h-2.5 w-2.5 text-muted" aria-hidden />
                      <span className="sr-only"> {tCommon("opensInNewTab")}</span>
                    </a>
                  ) : (
                    c.name
                  )}
                </h3>
                <p className="mt-0.5 text-sm text-muted">
                  {c.authority}
                  {c.expires && (
                    <span className="font-mono text-xs">
                      {" · "}
                      {tPro("certifications.expires")} {c.expires}
                    </span>
                  )}
                  {c.credentialId && (
                    <span className="font-mono text-xs">
                      {" · "}
                      {tPro("certifications.credentialId")} {c.credentialId}
                    </span>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills-heading" className="mt-20" data-testid="about-skills">
        <SectionHeading id="skills-heading">{tPro("skills.title")}</SectionHeading>
        <div className="mt-6 space-y-6">
          {skills.map((cat) => (
            <div key={cat.name} className="md:grid md:grid-cols-[11rem_1fr] md:gap-8">
              <h3 className="font-mono text-sm text-muted">{cat.name}</h3>
              <ul className="mt-2 flex flex-wrap gap-1.5 md:mt-0">
                {cat.items.map((s) => (
                  <li key={s} className="rounded border border-line bg-surface px-2 py-1 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="vision-heading" className="mt-20">
        <SectionHeading id="vision-heading">{tPro("vision.title")}</SectionHeading>
        <blockquote className="mt-4 max-w-prose border-l-2 border-accent pl-5 text-lg leading-relaxed">
          {tPro("vision.text")}
        </blockquote>
      </section>

      {/* Personal */}
      <section aria-labelledby="personal-heading" className="mt-24" data-testid="about-personal">
        <p className="eyebrow">{t("personalTitle")}</p>
        <h2 id="personal-heading" className="section-title mt-2">
          {tPer("intro.title")}
        </h2>
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">{tPer("intro.description")}</p>

        <h3 className="mt-12 font-heading text-xl font-semibold">{tPer("passions.title")}</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {passions.map((p) => (
            <div key={p.name} className="card p-5">
              <h4 className="font-heading font-semibold">{p.name}</h4>
              {p.description && <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>}
              {p.items && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {p.items.map((i) => (
                    <li key={i} className="chip">
                      {i}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="side-heading" className="mt-12" data-testid="about-side-hustle">
        <div className="card flex flex-col overflow-hidden md:flex-row">
          <div className="relative h-56 md:h-auto md:w-2/5">
            <Image src="/lounge-1.webp" alt="Apartmány Iwona" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
          </div>
          <div className="p-6 sm:p-8 md:w-3/5">
            <h2 id="side-heading" className="font-heading text-2xl font-bold">
              {tPer("sideHustle.title")}
            </h2>
            <TrackedLink
              event={{ kind: "external", name: "apartmany-iwona" }}
              href={`https://${tPer("sideHustle.link")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link mt-2 inline-flex items-center gap-2 font-mono text-sm"
            >
              {tPer("sideHustle.link")}
              <FaExternalLinkAlt className="h-3 w-3" aria-hidden />
              <span className="sr-only">{tCommon("opensInNewTab")}</span>
            </TrackedLink>
            <p className="mt-4 leading-relaxed text-muted">{tPer("sideHustle.description")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
