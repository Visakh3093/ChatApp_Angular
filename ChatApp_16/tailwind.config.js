/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: {
          50: '#f0faff',
          100: '#e0f7ff',
          200: '#b9ecff',
          300: '#83dcff',
          400: '#33c2ff',
          500: '#ff0000',  // Main color
          600: '#0094e6',
          700: '#0072b3',
          800: '#005380',
          900: '#00364d',
        },
        // purpleGradient: 
      },
    },
  },
  plugins: [],
}