import { Link } from "@/i18n/navigation";

interface SectionProps {
  id: string;
  title: string;
  intro?: string;
  action?: { href: string; label: string };
  children: React.ReactNode;
  testId?: string;
}

export default function Section({ id, title, intro, action, children, testId }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="container-page py-12 sm:py-16" data-testid={testId}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h2 id={headingId} className="section-title">
            {title}
          </h2>
          {intro && <p className="mt-2 text-dark-muted">{intro}</p>}
        </div>
        {action && (
          <Link href={action.href} className="link-arrow">
            {action.label} <span aria-hidden>→</span>
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
