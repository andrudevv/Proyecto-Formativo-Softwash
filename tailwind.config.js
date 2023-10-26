/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-primary': '',
        'color-secundary': '#4DBDEB',
        'color-tertiary': '#FFE08C',
        'color-text': '#DFEEEE',
        'color': '#e7f0ed',
      }
    },
  },
  plugins: [],
}