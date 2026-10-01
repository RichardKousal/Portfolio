// Types for profile data stored in messages/*.json (source of truth: LinkedIn export).

export interface Position {
  role: string;
  company: string;
  location: string;
  /** YYYY-MM */
  start: string;
  /** YYYY-MM, null = current */
  end: string | null;
  intro: string[];
  bullets: string[];
  outro: string[];
}

export interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
  activities: string[];
}

export interface LanguageSkill {
  name: string;
  level: string;
}

export interface Certification {
  name: string;
  authority: string;
  /** YYYY-MM */
  issued: string;
  expires?: string;
  credentialId?: string;
  url?: string;
}

export interface SkillCategory {
  name: string;
  items: string[];
}

/** "2025-04" -> "duben 2025" / "April 2025" */
export function formatMonth(ym: string, locale: string): string {
  const [y, m] = ym.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "cs" ? "cs-CZ" : "en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, (m || 1) - 1, 1)));
}
