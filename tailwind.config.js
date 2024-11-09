/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bodyfont: ["Poppins", "sans-serif"],
        titlefont: ["Montserrat", "sans-serif"],
      },
      colors: {
        bodyColor: "#212428",
        lightText: "#c4cfde",
        boxBg: "linear-gradient(145deg, #1e2024, #23272b)",
        designColor: "#0d9488",
      },
      boxShadow: {
        shadowOne: "4px 10px 19px #1c1e22, -10px -10px 19px #262a2e",
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
      },
      scrollbar: {
        DEFAULT: {
          width: "4px",
          "background-color": "#f1f1f1",
        },
        thumb: {
          "background-color": "blue",
          borderRadius: "4px",
        },
      },
    },
  },
  variants: {
    scrollbar: ["rounded-md"],
  },
  plugins: [require("tailwind-scrollbar")],
};
