/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*{js, jsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: 'red',
      }
    },
  },
  plugins: [],
}

