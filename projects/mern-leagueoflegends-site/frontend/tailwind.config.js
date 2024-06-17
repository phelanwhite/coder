/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark1: `var(--dark1)`,
        grey1: `var(--grey1)`,
        back1: `var(--back1)`,
      },
      aspectRatio: {
        thumbnail: `9/16`,
      },
    },
  },
  plugins: [],
};
