import type { Config } from "tailwindcss";

/** Colors are CSS variables (RGB triplets) defined in globals.css for light/dark themes. */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
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
        heading: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"],
        body: ["var(--font-lato)", "Lato", "system-ui", "sans-serif"],
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
    },
  },
  plugins: [],
};

export default config;
