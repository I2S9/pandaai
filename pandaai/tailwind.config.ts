import type { Config } from "tailwindcss";

const config: Config = {
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
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          dark: 'var(--color-secondary-dark)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          dark: 'var(--color-accent-dark)',
        },
        neutral: {
          light: 'var(--color-neutral-light)',
          DEFAULT: 'var(--color-neutral)',
        },
        background: {
          DEFAULT: 'var(--color-background)',
          light: 'var(--color-background-light)',
        },
      },
      fontFamily: {
        sans: ['var(--font-family-sans)'],
        kawaii: ['var(--font-family-kawaii)'],
      },
    },
  },
  plugins: [],
};

export default config; 