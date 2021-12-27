const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      margin: {
        tiny: '0.15rem',
      },
      colors: {
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
      maxWidth: {
        76: '76',
      },
    },
  },
  variants: {},
  plugins: [],
};
