import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["cs", "en", "pl", "de"],
  defaultLocale: "cs",
  localeDetection: true, // Explicitně povolíme detekci jazyka prohlížeče
});
