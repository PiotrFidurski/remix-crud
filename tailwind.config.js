const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          error: '#D13A28',
        },
        gray: {
          default: '#0d1117',
          lighter: '#4B4453',
        },
        purple: {
          default: '#845EC2',
          lighter: '#E1B4FF',
          darker: '#593796',
        },
      },
      fontFamily: {
        sans: [
          'Montserrat',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  variants: {},
  plugins: [],
};
