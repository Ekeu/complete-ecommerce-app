const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 60%': {
            transform: 'rotate(-5deg)',
          },
          '35%, 100%': {
            transform: 'rotate(5deg)',
          },
          '60%': {
            transform: 'rotate(-5deg)',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out',
      },
      fontFamily: {
        hind: ['Hind', 'sans-serif'],
        osans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        rose: colors.rose,
        fuchsia: colors.fuchsia,
        cyan: colors.cyan,
        emerald: colors.emerald,
        purple: colors.purple,
        violet: colors.violet,
        sky: colors.sky,
        red: colors.red,
        orange: colors.orange,
        pink: colors.pink,
        teal: colors.teal,
        'cool-gray': colors.coolGray,
        'blue-gray': colors.blueGray,
      },
      screens: {
        xs: '520px',
      },
      spacing: {
        '2/3': '66.666667%',
        '5/6': '83.333333%',
      },
      transitionDelay: {
        0: '0ms',
        2000: '2000ms',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
