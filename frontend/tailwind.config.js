/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./**/*.{html,js}"],
  content: ["./ui-components.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
