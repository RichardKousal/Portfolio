/** Small test-result style label, e.g. "✓ QA & AI". Symbol is decorative. */
export type VerdictKind = "pass" | "info" | "warn" | "neutral";

const STYLES: Record<VerdictKind, { symbol: string; className: string }> = {
  pass: { symbol: "✓", className: "border-ok/40 bg-ok/[0.07] text-ok" },
  info: { symbol: "◆", className: "border-accent/40 bg-accent/[0.07] text-accent" },
  warn: { symbol: "○", className: "border-warn/40 bg-warn/[0.07] text-warn" },
  neutral: { symbol: "↳", className: "border-line text-muted" },
};

export default function Verdict({
  kind,
  children,
  symbol,
  testId,
}: {
  kind: VerdictKind;
  children: React.ReactNode;
  symbol?: string;
  testId?: string;
}) {
  const style = STYLES[kind];
  return (
    <span
      data-testid={testId}
      data-verdict={kind}
      className={`inline-flex items-center gap-1.5 rounded border px-1.5 py-0.5 font-mono text-[0.72rem] font-medium leading-none ${style.className}`}
    >
      <span aria-hidden>{symbol ?? style.symbol}</span>
      {children}
    </span>
  );
}
