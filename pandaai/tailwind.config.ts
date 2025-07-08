/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B794F6',
          dark: '#9F7AEA',
        },
        secondary: {
          DEFAULT: '#F687B3',
          dark: '#ED64A6',
        },
        accent: {
          DEFAULT: '#9AE6B4',
          dark: '#68D391',
        },
        neutral: {
          light: '#E2E8F0',
          DEFAULT: '#CBD5E0',
        },
        background: {
          DEFAULT: '#FEFEFE',
          light: '#F7FAFC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        kawaii: ['Poppins', 'cursive'],
      },
    },
  },
  plugins: [],
} 