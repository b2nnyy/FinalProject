import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      serif: ["var(--font-serif)", "Georgia", "serif"],
      sans: ["var(--font-sans)", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        cream: "#FAF8F4",
        "cream-dark": "#F0EDE6",
        ink: "#1C1917",
        "ink-light": "#44403C",
        accent: "#9A7B4F",
        "accent-light": "#B8976A",
        muted: "#78716C",
        "muted-light": "#A8A29E",
        rule: "rgba(154, 123, 79, 0.35)",
      },
      maxWidth: {
        essay: "680px",
        page: "1100px",
      },
      fontSize: {
        essay: ["1.125rem", { lineHeight: "1.8" }],
        "essay-lg": ["1.1875rem", { lineHeight: "1.8" }],
        sidebar: ["0.9375rem", { lineHeight: "1.7" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      letterSpacing: {
        label: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
