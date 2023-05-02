/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    screens:{
      'xs': '450px'
    },
    fontFamily: {
    'michroma': ['Michroma'],
    'poppins': ['Poppins']
  },

  backgroundImage: {
    'lampada': "url('/public/fundo_inicio.png')",
    'fundo_home': "url('/src/assets/imagens/fundo_vermelho.png')",
    'fundo_home_invertido': "url('/src/assets/imagens/fundo_vermelho_invertido.png')",
  }
  },
  },
  plugins: [],
  }