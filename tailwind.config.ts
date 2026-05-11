import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#f4f7f4",
          100: "#e6ede6",
          200: "#cddccd",
          300: "#a8c2a8",
          400: "#7da17d",
          500: "#5a825a",
          600: "#476747",
          700: "#3a5339",
          800: "#304330",
          900: "#283829",
        },
        coral: {
          50: "#fff4f2",
          100: "#ffe6e1",
          200: "#ffd0c7",
          300: "#ffb0a0",
          400: "#ff8470",
          500: "#f95d47",
          600: "#e63e29",
          700: "#c12e1d",
          800: "#9f281b",
          900: "#84261c",
        },
        cream: {
          50: "#fdfaf5",
          100: "#faf4e8",
          200: "#f5e9d1",
          300: "#eed6af",
          400: "#e4be85",
          500: "#d9a560",
          600: "#ca8e45",
          700: "#a87239",
          800: "#885c33",
          900: "#6f4c2c",
        },
        blush: {
          50: "#fdf2f6",
          100: "#fce7ef",
          200: "#fad0e1",
          300: "#f7a8c8",
          400: "#f172a4",
          500: "#e84885",
          600: "#d42b6a",
          700: "#b21f55",
          800: "#941d47",
          900: "#7b1d3e",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 20px rgba(0,0,0,0.06)",
        card: "0 4px 32px rgba(0,0,0,0.08)",
        elevated: "0 8px 48px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
