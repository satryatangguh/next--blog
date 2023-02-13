/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  ttheme: {
    extend: {
      fontFamily: {
        waterfall: ["Waterfall", "cursive"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp")
  ],
};
