/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        
        poppins : ['Poppins'],
        
      },
      colors : {
        noir : "#1A1A1A",
        blanc : "#f2f2f2",
        rose : "#ff0032",
        jaune : "#fdf59f",
        lightBleu : "#9ef0cb",
        bleu : "#71b1e0",
        orange : "rgb(83, 31, 23)",
        violet : "#6C63FF",
      },
      boxShadow: {
        'card': '-0.5rem 0.5rem 0px 0px rgb(188 82 64)',
      },
      gridTemplateColumns: {
        'mobile': 'repeat(auto-fit,minmax(300px,400px))',
      },
    },
  },
  plugins: [],
}
