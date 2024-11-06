/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#3B1E54",
        "light-purple": "#D4BEE4",
        "bright-green": "#3EE64D",
        "bright-red": "#E00F00",
        "white-smoke": "#F8F8F8",
        nero: "#2C2C2C",
      },
    },
  },
  plugins: [],
};
