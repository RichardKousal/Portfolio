import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/app/lib/metadata";
import { getProjects } from "@/app/lib/projects";
import ProjectCard from "@/app/components/projects/ProjectCard";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "meta.projects" });
  return buildPageMetadata({
    locale,
    path: "/projects",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ProjectsPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("projects");
  const tCommon = await getTranslations("common");
  const { items, extraLabel } = await getProjects(locale);

  return (
    <div className="container-page py-14 sm:py-20">
      <header className="mb-14 max-w-2xl">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{t("intro")}</p>
      </header>
      <div data-testid="project-list">
        {items.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            variant="full"
            labels={{
              visitWebsite: tCommon("visitWebsite"),
              opensInNewTab: tCommon("opensInNewTab"),
              extra: extraLabel,
            }}
          />
        ))}
      </div>
    </div>
  );
}
