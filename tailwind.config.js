const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
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
    },
  },
  variants: {},
  plugins: [],
};
