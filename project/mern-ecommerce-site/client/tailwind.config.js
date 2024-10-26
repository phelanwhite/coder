/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "secondary-1": `var(--text-secondary-color-1)`,
        "secondary-2": `var(--text-secondary-color-2)`,
      },
      screens: {
        "2xl": `1534px`,
      },
    },
  },
  plugins: [],
  important: true,
};
