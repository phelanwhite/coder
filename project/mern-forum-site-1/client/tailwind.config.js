/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textSecondaryColor: "var(--textSecondaryColor)",
        bgSecondaryColor: "var(--bgSecondaryColor)",
        borderColor: "var(--borderColor)",
        textColor: "var(--textColor)",
      },
      screens: {
        iPad: "900px",
      },
    },
  },
  important: true,
  plugins: [],
};
