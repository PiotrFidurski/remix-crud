const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          dark: '#121212',
        },
        black: {
          default: '#080606',
        },
        error: '#B40023',
        white: {
          10: 'rgba(255 255 255 / 10%)',
        },
      },
      fontFamily: {
        sans: [
          'Montserrat',
          'sans-serif',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      minHeight: {
        100: '100px',
        200: '200px',
        600: '600px',
      },
      minWidth: {
        180: '180px',
        200: '200px',
      },
      maxWidth: {
        76: '76px',
        200: '200px',
      },
      dropShadow: {
        light: '0 1px 5px rgba(255 255 255 / 0.10)',
      },
      translate: {
        minus100: '-100%',
      },
      gridRow: {
        none: 'none',
      },
      visivility: {
        collapse: 'collapse',
      },
    },
  },
  variants: {},
  plugins: [],
};
