/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        '850px': '850px', // Breakpoint personalizado de 850px
        'custom-md': '920px', // Agrega un nuevo punto de quiebre a 800px
      },
      colors: {
        customRed: 'hsl(340, 80%, 55%)',       // Color principal
        'customRed-light': 'hsl(340, 80%, 75%)', // Variación más clara
        'customRed-dark': 'hsl(340, 80%, 35%)',  // Variación más oscura
      },
    },
  },
  plugins: [],
}