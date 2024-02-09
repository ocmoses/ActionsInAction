/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    animation: {
      'slide-up-fade': 'slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      'slide-down-fade': 'slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      'zoom-in': 'zoom-in 0.5s ease-in',
      'fade-in': 'fadeIn 0.5s ease-in',
      'slide-left': 'slide-left 0.5s ease-in',
      'slide-right': 'slide-right 0.5s ease-in',
    },
    keyframes: {
      'slide-up-fade': {
        '0%': { opacity: 0, transform: 'translateY(6px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
      'slide-down-fade': {
        '0%': { opacity: 0, transform: 'translateY(-6px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
      'zoom-in': {
          '0%': { opacity: 0, transform: 'scale(0.5)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'slide-left': {
          '0%': { opacity: 0, transform: 'translateX(20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        'slide-right': {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },






    // colors: {
    //   mtn: {
    //     light: "#efb703",
    //     DEFAULT: "#efb703",
    //     dark: "#fefce8",
    //     50: "#fefce8",
    //     100: "#fffac2",
    //     200: "#fff387",
    //     300: "#ffe443",
    //     400: "#ffd529",
    //     500: "#efb703",
    //     600: "#ce8d00",
    //     700: "#a46404",
    //     800: "#884e0b",
    //     900: "#733f10",
    //   },
    // },
    fontFamily: {
      mtn: ["mtn_regular"],
      "mtn-medium": ["mtn_medium"],
      "mtn-medium-italic": ["mtn_medium_italic"],
      "mtn-bold": ["mtn_bold"],
      "mtn-bold-italic": ["mtn_bold_italic"],
      "mtn-extrabold": ["mtn_extrabold"],
      "mtn-extrabold-italic": ["mtn_extrabold_italic"],
      "mtn-extralight": ["mtn_extralight"],
      "mtn-extralight-italic": ["mtn_extralight_italic"],
    },
    fontWeight: {
      hairline: 100,
      "extra-light": 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      "extra-bold": 800,
      black: 900,
    },
    extend: {
      colors: {
        mtn: {
          light: "#efb703",
          DEFAULT: "#efb703",
          dark: "#fefce8",
          50: "#fefce8",
          100: "#fffac2",
          200: "#fff387",
          300: "#ffe443",
          400: "#ffd529",
          500: "#efb703",
          600: "#ce8d00",
          700: "#a46404",
          800: "#884e0b",
          900: "#733f10",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
    require("daisyui"),
  ],
};
