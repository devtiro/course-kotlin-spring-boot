const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "1rem",
        xl: "2rem",
        "2xl": "10rem",
      },
    },
    extend: {},
  },
  darkMode: "class",

  plugins: [
    nextui({
      addCommonColors: true,
    }),
  ],
};
