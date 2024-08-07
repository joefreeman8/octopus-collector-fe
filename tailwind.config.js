/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
import daisyui from "daisyui"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'nord-accent': '#88c0d0',
        'nord-warning': '#EBCB8B'
      },
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      "aqua",
      "nord",
    ],
  },
}

