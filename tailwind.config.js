/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  fontFamily: {},
  screens: {
    xs: '360px',
    sm: '672px',
    md: '992px',
    lg: '1200px',
    l: '1440px',
    xl: '1700px',
    xxl: '1900px',
  },
  colors: {
    white: {
      100: '#ffffff',
      200: '#f6f7f5',
    },
    black: {
      100: '#000000',
      200: '#242424',
    },
  },
  plugins: [],
}
