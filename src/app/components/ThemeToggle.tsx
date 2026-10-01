"use client";

import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

type Theme = "light" | "dark";

export default function ThemeToggle({
  labels,
  testId = "theme-toggle",
}: {
  labels: { toDark: string; toLight: string };
  testId?: string;
}) {
  // Real value is read after mount; the inline head script already applied it.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: choice lasts for this page view */
    }
    setTheme(next);
  };

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      data-testid={testId}
      aria-label={isDark ? labels.toLight : labels.toDark}
      title={isDark ? labels.toLight : labels.toDark}
      className="rounded-lg p-2 text-muted transition-colors hover:text-ink"
    >
      {isDark ? <MdLightMode className="h-5 w-5" aria-hidden /> : <MdDarkMode className="h-5 w-5" aria-hidden />}
    </button>
  );
}
