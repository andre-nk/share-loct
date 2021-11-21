module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      margin: {
        "68": "17rem",
        "92": "24.5rem"
      },
      colors: {
        "primary-light": "#23C08C",
        "primary-surface": "#F1FCF8",
        'secondary-light': "#ECEB98",
        "danger-active": "#651D18",
        "danger-border": "#EEBDBA",
        "danger-hover": "#A93029",
        "danger-light": "#CB3A31",
        "danger-surface": "#F5D8D6",
        "info-active": "#193371",
        "info-border": "#BBCCF6",
        "info-hover": "#2A56BD",
        "info-light": "#3267E3",
        "info-surface": "#D6E1F9",
        "success-active": "#0B4928",
        "success-border": "#B1DBC4",
        "success-hover": "#127A42",
        "success-light": "#16924F",
        "success-surface": "#D0E9DC",
        "warning-active": "#806200",
        "warning-border": "#FFEBAA",
        "warning-hover": "#D5A300",
        "warning-light": "#FFC400",
        "warning-surface": "#FFF3CC",
        "black-main": "#191B1D",
        "black-hover": "#D1D1D2",
        "black-border": "#DDDDE7",
        "black-surface": "#E8E8E8",
        "gray-main": "#B2B1B6",
        "white-main": "#FEFFFF",
        "white-sub": "#F7F7F7"
      },
      fontFamily: {
        sans: ["Inter"],
        serif: ["Lora"],
      },
      fontSize:{
        "main": "2.25rem",
        "heading-1": "1.75rem",
        "heading-2": "1.375rem",
        "heading-3": "1.25rem",
        "subtitle": "1.125rem",
        "body": "1rem",
        "caption": "0.813rem",
        "footnote": "0.75rem"
      }
    },
  },
  variants: {},
  plugins: [
    require('tailwindcss-debug-screens'),
  ],
}