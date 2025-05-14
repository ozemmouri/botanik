const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        asap: ['Asap', 'sans-serif'],
        nimbus: ['NimbusRomNo9', 'serif'],
        chaparral: ['Chaparral', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        carattere: ['Carattere', 'serif']
      },
      colors: {
        'nude': '#EBE4D9',
        'ocre': '#AD5D3D',
        'perse': '#84928E',
        'main': '#3F3F3F',
        'mainbis': '#FDFDFA',
        'submenu': "#735f45",
        'archi': "#546A63"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // Utiliser la stratégie 'class' au lieu de 'base'
    }),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/container-queries'),
  ]
}
