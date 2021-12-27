const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      margin: {
        tiny: '0.15rem',
      },
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
        900: '900px',
      },
      minWidth: {
        200: '200px',
      },
      maxWidth: {
        76: '76px',
      },
      dropShadow: {
        light: '0 1px 5px rgba(255 255 255 / 0.10)',
      },
    },
  },
  variants: {},
  plugins: [],
};
