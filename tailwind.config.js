/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/constants/**/*.ts',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
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
      transparent: 'transparent',
      current: 'currentColor',
      white: {
        100: '#ffffff',
      },
      black: {
        100: '#26251e',
      },
      beige: {
        50: '#fafaf7',
        100: '#f1efe9',
        200: '#e8e4db',
      },
      brown: {
        50: '#f5ebe6',
        100: '#914528',
        200: '#7a3a22',
      },
      sand: {
        50: '#e8dfd4',
        100: '#c3b6a3',
        200: '#a89a86',
      },
    },
    extend: {},
  },
  plugins: [],
}
