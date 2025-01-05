/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

    theme: {
      extend: {
        colors: {
          vibrantClay: '#00E0FF', // Vibrant electric blue
        },
      },
    },
  plugins: [ require('daisyui'),],
  daisyui: {
    themes: ["dark"], 
  },
}