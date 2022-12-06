/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "phone": "480px"
    },
    // height: {
    //   // sm: '8px',
    //   // md: '16px',
    //   // lg: '24px',
    //   // xl: '48px',
    // },
    extend: {},
  },
  plugins: [],
}
