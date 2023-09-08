/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-pie-pagina': '#628ca6',
        'custom-nav-bar': '#164f55',
        'custom-ventanas': '#7fb9c2',
        'custom-botones': '#95acb2',
        'custom-pagina-fondo': '#e7f0ed',
      }
    },
  },
  plugins: [],
}