import type { Config } from "tailwindcss";

// Same design tokens as the public site (frontend/tailwind.config.ts), pared
// down to what the admin UI actually uses — no display type scale or motion
// tokens needed here.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bone: { DEFAULT: "#F3F0E7", 50: "#FBFAF6", 100: "#F3F0E7", 200: "#E7E2D3", 300: "#D8D2BF" },
        ink: { DEFAULT: "#14160F", 800: "#1D2016", 700: "#2A2E20", 600: "#3A3F2E" },
        lime: { DEFAULT: "#C7E63F", 400: "#D3ED5E", 300: "#DEF187", 600: "#B2D22B" },
        muted: { DEFAULT: "#6B6C5F", light: "#9A9B8E", dark: "#A7A99B" },
        line: { DEFAULT: "#DAD5C6", dark: "#2E3222" },
      },
      borderRadius: {
        pill: "9999px",
        card: "1rem",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
