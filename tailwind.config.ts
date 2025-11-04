import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D87D4A',
          light: '#FBAF85',
        },
        background: {
          DEFAULT: '#FAFAFA',
        },
        text: {
          primary: '#000000',
          secondary: '#979797',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      letterSpacing: {
        wider: '0.1em',
      },
    },
  },
  plugins: [],
};

export default config;

