import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./design-system/components/**/*.{html,js,ts,jsx,tsx}",
    "./screens/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090f",
        "card-surface": "#1a1a24",
        "card-border": "rgba(255, 255, 255, 0.12)",
        primary: {
          DEFAULT: "#7c3aed",
          light: "#a78bfa",
        },
        text: {
          DEFAULT: "#e4e0ec",
          muted: "rgba(228, 224, 236, 0.5)",
        },
        glow: "rgba(124, 58, 237, 0.25)",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        ui: ['"Inter"', "system-ui", "sans-serif"],
      },
      fontWeight: {
        "display-normal": "500",
        "ui-normal": "400",
      },
      fontSize: {
        xs: ["11px", { lineHeight: "1.4" }],
        sm: ["13px", { lineHeight: "1.5" }],
        base: ["15px", { lineHeight: "1.6" }],
        lg: ["18px", { lineHeight: "1.5" }],
      },
      spacing: {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "24px",
        full: "9999px",
      },
      width: {
        card: "240px",
      },
      boxShadow: {
        glow: "0 0 80px 20px rgba(124, 58, 237, 0.25)",
      },
      backdropBlur: {
        card: "16px",
      },
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
      },
      transitionTimingFunction: {
        smooth: "ease-in-out",
      },
      keyframes: {
        "border-cycle": {
          "0%, 100%": { borderColor: "#7c3aed" },
          "50%": { borderColor: "#a78bfa" },
        },
        "pulse-gentle": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        "border-cycle": "border-cycle 2.5s ease-in-out infinite",
        "pulse-gentle": "pulse-gentle 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
