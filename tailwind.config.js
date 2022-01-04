const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          background: '#121212',
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
      dropShadow: {
        light: '0 1px 5px rgba(255 255 255 / 0.10)',
      },
    },
  },
  variants: {},
  plugins: [],
};
