const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    screens: {
      xxss: "375px",
      xxs: "420px",
      xs: "450px",
      sm: "575px",
      mid: "650px",
      md: "786px",
      880: "880px",
      lg: "1020px",
      "2lg": "1025px",
      mds: "1100px",
      base: "1100px",
      xl: "1200px",
      "2xl": "1500px",
    },
    extend: {
      animation: {
        fadeUp: "fadeUp 0.3s ease-out",
        fadeIn: "fadeIn 2.2s ease-in-out",
        fade: "fade 1.5s ease-in-out", // Added fade animation
      },
      screens: {
        ipp: { raw: "(max-width: 1024px) and (max-height: 1366px)" },
      },
      colors: {
        current: "currentColor",
        clr1: "#000949",
        clr2: "#030121",
        clr3: "#000949",
        lightblue: "#3b82f6",
        "color-dark": "#191919",
      },
      fontSize: {
        clamp: "clamp(1rem, 5vw, 3rem)",
      },
      dropShadow: {
        three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
