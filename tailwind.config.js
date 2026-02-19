/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Gotham', 'system-ui', 'sans-serif'],
    },
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
      },
      black: {
        100: '#1d1d1b',
      },
      beige: {
        100: '#ebeee9',
      },
      brown: {
        100: '#914528',
      },
      sand: {
        100: '#c3b6a3',
      },
    },
    extend: {},
  },
  plugins: [],
}
