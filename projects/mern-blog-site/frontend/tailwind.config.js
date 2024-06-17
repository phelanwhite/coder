/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        secondaryColor: "var(--secondaryColor)",
        bgColor: "var(--bgColor)",
        textColor: "var(--textColor)",
      },
    },
  },
  important: true,
  plugins: [],
};
