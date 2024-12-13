/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './view/depotView.js',  // Assurez-vous que ce chemin couvre tous vos fichiers EJS
    './view/loginView.js',
    './view/nav.js',
    './view/profileView.js',
    './view/registerView.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

