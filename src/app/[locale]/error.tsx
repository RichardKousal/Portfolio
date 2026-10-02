"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { analytics } from "@/app/lib/analytics";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    analytics.errorPage("error", error.digest);
    if (process.env.NODE_ENV === "development") {
      console.error("Error boundary caught:", error);
    }
  }, [error]);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <h1 className="font-heading text-2xl font-bold sm:text-3xl">{t("title")}</h1>
      <p className="mt-3 max-w-md text-muted">{t("description")}</p>
      {process.env.NODE_ENV === "development" && (
        <pre className="mt-6 max-w-full overflow-auto rounded-lg border border-line bg-surface p-4 text-left font-mono text-xs text-muted">
          {error.message}
        </pre>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn-primary">
          {t("retryButton")}
        </button>
        <Link href="/" className="btn-secondary">
          {t("homeButton")}
        </Link>
      </div>
    </div>
  );
}
