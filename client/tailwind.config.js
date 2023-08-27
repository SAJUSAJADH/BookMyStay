/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      sm: '480px',
      md: '1000px',
      lg: '1100px',
      xl: '1440px'
    },extend: {
      colors: {
        blue: '#003b95',
        orange: "#ff4d30",
        lightblue: '#0d6efd',
      },
      fontFamily: {
        logo: 'Trebuchet MS,Lucida Sans Unicode,Lucida Grande,Lucida Sans,Arial,sans-serif'
      }
    },
  },
  plugins: [],
}

