/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "darkColor-1": `var(--darkColor-1)`,
      },
      aspectRatio: {
        thumbnail: `9 / 14`,
      },
      screens: {
        xxl: "1500px",
      },
    },
  },
  important: true,
  plugins: [],
};
