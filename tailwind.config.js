/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //comor primario blue-700 
        'color-primary': '#1d4ed8',

        //comor secundario blue-500
        'color-secundary': '#3b82f6',

        'color-tertiary': '#FFE08C',

        'color-text': '#DFEEEE',

        'color': '#e7f0ed',

        // color para los hover de color cyan-500
        'color-hover': '#22d3ee',



        //yellow-300
        'button-primary': '#fcd34d',

        //cyan-400
        'button-secundary': '#22d3ee',

        //blue-700
        'button-neutral': '#0369a1',
      }
    },
  },
  plugins: [ 
  ],
}