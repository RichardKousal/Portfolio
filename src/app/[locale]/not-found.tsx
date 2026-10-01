import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center" data-testid="not-found">
      <p className="font-heading text-7xl font-bold sm:text-8xl">
        <span className="gradient-text">404</span>
      </p>
      <h1 className="mt-6 font-heading text-2xl font-bold sm:text-3xl">{t("title")}</h1>
      <p className="mt-3 max-w-md text-dark-muted">{t("description")}</p>
      <Link href="/" className="btn-primary mt-8">
        {t("homeButton")}
      </Link>
    </div>
  );
}
