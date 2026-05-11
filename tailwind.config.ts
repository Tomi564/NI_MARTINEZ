import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-saira)", "sans-serif"],
        condensed: ["var(--font-saira-condensed)", "sans-serif"],
      },
      colors: {
        navy: "var(--color-navy)",
        "navy-mid": "var(--color-navy-mid)",
        "navy-dark": "var(--color-navy-dark)",
        orange: "var(--color-orange)",
        "orange-hover": "var(--color-orange-hover)",
        "gray-bg": "var(--color-gray-bg)",
        "gray-card": "var(--color-gray-card)",
        "gray-border": "var(--color-gray-border)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
      },
    },
  },
  plugins: [],
};

export default config;
