/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "text-color": "var(--text-color)",
        "text-secondary-color": "var(--text-secondary-color)",
      },
      height: {
        25: "6.25rem",
      },
      screens: {
        xs: "368px",
      },
      fontSize: {
        xs: "0.8125rem",
      },
    },
  },
  important: true,
  plugins: [],
};
