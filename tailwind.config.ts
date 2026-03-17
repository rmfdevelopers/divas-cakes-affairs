import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)'],
        sans: ['var(--font-body)'],
      },
      colors: {
        primary: "#2D0A0A",
        secondary: "#4A1010",
        accent: "#D4AF37",
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
};
export default config;