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
        orange : "#ff832b",
        violet : "#6C63FF",
      },
      boxShadow: {
        'card': '-1.2rem 1.2rem 0px 0px #9ef0cb',
      },
      gridTemplateColumns: {
        'mobile': 'repeat(auto-fit,minmax(300px,1fr))',
      },
    },
  },
  plugins: [],
}
