/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        thumbnail: "9 / 15",
      },
    },
  },
  important: true,
  plugins: [],
};
