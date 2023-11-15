const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      raleway: ["Raleway", "sans-serif"],
      rancho: ["Rancho", "cursive"],
    },
    extend: {
      backgroundImage: {
        "head-bg": "url('https://i.ibb.co/GdzkSmk/15.jpg')",
        "coffee-bg": "url('https://i.ibb.co/ZNGMj7y/11.png')",
      },
      colors: {
        "gray-text": "#374151",
        "coffee-text": "#331A15",
        input: "#1B1A1ACC",
        placeholder: "#1B1A1A99",
        "product-para": "#1B1A1A",
        "product-span": "#1B1A1AB2",
      },
      dropShadow: {
        coffee: [
          "0 50px 50px rgba(52, 29, 21, 0.06)",
          "0 65px 65px rgba(80, 60, 56, 0.1)"
        ],
        gray: [
          "0 35px 35px rgba(63, 76, 95, 0.04)",
          "0 45px 65px rgba(114, 120, 130, 0.1)"
        ],
      },
    },
  },
  plugins: [require("daisyui")],
});
