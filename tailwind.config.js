/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: "Montserrat",
        arabic: ['"Scheherazade New"', 'serif'], 
      },
      colors: {
        dark: '#2b2929',
      },
    },
    screens: {
      'sm': {'max': '639px'},
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  darkMode: 'class', 
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
