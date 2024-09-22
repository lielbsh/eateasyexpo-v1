/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          red: "#F1684B", // HEX: #ff502b, RGB: 255, 80, 43, HSL: 10, 83%, 58%
          beige: "#fff5dc", // HEX: #fff5dc, RGB: 255, 245, 220
          offwhite: "#fffefc", // HEX: #fffefc, RGB: 255, 254, 252
          shadow: "#585751", // HEX: #585751, RGB: 88, 87, 81
          offwhitesheer:'rgba(255, 254, 252,0.9)',
          shadowsheer: "rgba(88, 87, 81,0.9)", // HEX: #585751, RGB: 88, 87, 81
          shadowverysheer: "rgba(88, 87, 81,0.5)",
          offwhiteverysheer:'rgba(255, 254, 252,0.6)',
        },
        box: "#ccc9b8", // HEX: #ccc9b8, RGB: 204, 201, 184
        shadow: "#585751", // HEX: #585751, RGB: 88, 87, 81
        text: "#33322f", // HEX: #33322f, RGB: 51, 50, 47
        burgundy: "#b90000", // HEX: #b90000, RGB: 185, 0, 0
        green: "#57800d", // HEX: #57800d, RGB: 87, 128, 13
        beige: "#fff5dc", // HEX: #fff5dc, RGB: 255, 245, 220
        offwhite: "#fffefc", // HEX: #fffefc, RGB: 255, 254, 252
        red: "#F1684B", // HEX: #ff502b, RGB: 255, 80, 43, HSL: 10, 83%, 58%
      },
      
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
        cursive: ["Pacifico",'cursive'],
      },
    },
  },
  plugins: [],
};