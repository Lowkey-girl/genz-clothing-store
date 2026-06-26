/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
  theme: {
  extend: {
    fontFamily: {
      display: ['Anton', 'sans-serif'],
    },
  },
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

}
