import type { Config } from "tailwindcss";

/**
 * Design tokens extracted from the Figma file
 * "S&S Landing Page — Warm (Bone + Lime)".
 *
 * Components must reference these token names (e.g. bg-bone, text-ink,
 * bg-lime) rather than arbitrary values like bg-[#f3f0e7].
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    // Breakpoints matching the Figma frames: mobile (default) / tablet / desktop.
    screens: {
      sm: "480px",
      md: "768px", // tablet frame
      lg: "1024px", // desktop frame
      xl: "1280px",
      "2xl": "1440px", // design canvas width
    },
    extend: {
      colors: {
        // Warm neutrals
        bone: {
          DEFAULT: "#F3F0E7", // page background
          50: "#FBFAF6",
          100: "#F3F0E7",
          200: "#E7E2D3",
          300: "#D8D2BF",
        },
        // Near-black warm ink used for dark sections, footer and body text
        ink: {
          DEFAULT: "#14160F",
          800: "#1D2016",
          700: "#2A2E20",
          600: "#3A3F2E",
        },
        // Lime accent (the "Lime" in the palette name)
        lime: {
          DEFAULT: "#C7E63F",
          400: "#D3ED5E",
          300: "#DEF187",
          600: "#B2D22B",
        },
        // Warm greys for secondary text / borders
        muted: {
          DEFAULT: "#6B6C5F", // secondary text on bone
          light: "#9A9B8E",
          dark: "#A7A99B", // secondary text on ink
        },
        line: {
          DEFAULT: "#DAD5C6", // hairline dividers on bone
          dark: "#2E3222", // hairline dividers on ink
        },
      },
      fontFamily: {
        // Wired in app/layout.tsx via next/font as CSS variables.
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Type scale extracted from the frames.
        eyebrow: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.14em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "display-md": ["3rem", { lineHeight: "1.03", letterSpacing: "-0.015em" }],
        "display-lg": ["4rem", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "display-xl": ["5rem", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
      },
      spacing: {
        // Section rhythm.
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      maxWidth: {
        container: "1200px", // laptop
        "container-wide": "1400px", // large desktop (2xl, ≥1440px)
      },
      borderRadius: {
        pill: "9999px",
        card: "1rem",
        image: "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 22, 15, 0.04), 0 12px 32px -12px rgba(20, 22, 15, 0.18)",
        "card-dark": "0 12px 40px -16px rgba(0, 0, 0, 0.6)",
        "card-hover": "0 1px 2px rgba(20, 22, 15, 0.05), 0 24px 48px -18px rgba(20, 22, 15, 0.28)",
      },
      transitionTimingFunction: {
        // Smooth "ease-out-expo"-style curve used across reveals and hovers.
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Radar-style ring that expands and fades out from a small dot.
        "dot-pulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(178, 210, 43, 0.55)" },
          "70%": { boxShadow: "0 0 0 7px rgba(178, 210, 43, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(178, 210, 43, 0)" },
        },
        // Larger glowing ring for highlighting a primary button.
        "btn-pulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(199, 230, 63, 0.6)" },
          "70%": { boxShadow: "0 0 0 14px rgba(199, 230, 63, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(199, 230, 63, 0)" },
        },
      },
      animation: {
        rise: "rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.9s ease-out both",
        "dot-pulse": "dot-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "btn-pulse": "btn-pulse 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
