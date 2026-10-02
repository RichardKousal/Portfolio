import { Link } from "@/i18n/navigation";

interface SectionProps {
  id: string;
  title: string;
  /** Small label above the title */
  eyebrow?: string;
  intro?: string;
  action?: { href: string; label: string };
  children: React.ReactNode;
  testId?: string;
}

export default function Section({ id, title, eyebrow, intro, action, children, testId }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="container-page scroll-mt-24 py-16 sm:py-24"
      data-testid={testId}
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 sm:mb-12">
        <div className="max-w-2xl">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h2 id={headingId} className="section-title">
            {title}
          </h2>
          {intro && <p className="mt-3 text-lg leading-relaxed text-muted">{intro}</p>}
        </div>
        {action && (
          <Link href={action.href} className="link-arrow group">
            {action.label}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
