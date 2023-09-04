/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors:{
        "gray-white": "#F5F7FB",
        "primary": "#22B77E",
        "red-error": "#DC3545",
        "red-error-100": "#FFD0CB", 
        "secundary": "#1BA8C4" 
      },
      fontFamily:{
        lato: '"lato", sans-serif',
        sora: '"sora", sans-serif',
        baloo2: '"Baloo 2", sans-serif'
      },
      backgroundImage:{
        "banner": "url(../bannerLogin.jpg)",
        "mockup": "url(../mockup.png)",
      }
    },
  },
  plugins: [],
}

