import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** One concrete extra detail */
  extra?: string;
  tags: string[];
  url?: string;
}

export async function getProjects(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "projects" });
  const items = t.raw("items") as Project[];
  const featuredIds = t.raw("featured") as string[];
  const featured = featuredIds
    .map((id) => items.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p));
  return { items, featured, extraLabel: t("extraLabel") };
}
