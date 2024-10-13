/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "text-secondary-color-1": "var(--text-secondary-color-1)",
        "text-secondary-color-2": "var(--text-secondary-color-2)",
      },
      backgroundColor: {
        "bg-secondary-color": "var(--bg-secondary-color)",
      },
    },
  },
  plugins: [],
  important: true,
};
