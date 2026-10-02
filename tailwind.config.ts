import type { Config } from "tailwindcss";

/** Colors are CSS variables (RGB triplets) defined in globals.css. */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        heading: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
      },
      colors: {
        paper: v("paper"),
        surface: v("surface"),
        line: v("line"),
        ink: v("ink"),
        muted: v("muted"),
        accent: v("accent"),
        "accent-ink": v("accent-ink"),
        ok: v("ok"),
        warn: v("warn"),
      },
      maxWidth: {
        prose: "68ch",
      },
      boxShadow: {
        card: "0 1px 2px rgb(15 23 32 / 0.04), 0 1px 1px rgb(15 23 32 / 0.03)",
        lift: "0 12px 32px -12px rgb(15 23 32 / 0.18), 0 2px 6px rgb(15 23 32 / 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
