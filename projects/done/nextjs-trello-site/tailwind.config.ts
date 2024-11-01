import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-board": "var(--bg-board)",
        "bg-form": "var(--bg-form)",
        "bg-item-board": "var(--bg-item-board)",
        "bg-item-column": "var(--bg-item-column)",
        "bg-item-card": "var(--bg-item-card)",
      },
    },
  },
  plugins: [],
  important: true,
};
export default config;
