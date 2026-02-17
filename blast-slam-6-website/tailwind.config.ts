import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // BLAST Slam VI tournament palette
        dota: {
          bg: "#06091a",
          surface: "#0d1128",
          card: "#131836",
          border: "#1e2550",
          gold: "#c3ff00",
          "gold-light": "#d4ff4d",
          radiant: "#92ff49",
          "radiant-dim": "#4a8c1d",
          dire: "#ff4444",
          "dire-dim": "#8c1d1d",
          blue: "#3b82f6",
          purple: "#8b5cf6",
          cyan: "#06b6d4",
          muted: "#6b7280",
          text: "#e5e7eb",
          "text-dim": "#9ca3af",
        },
        blast: {
          bg: "#06091a",
          surface: "#0d1128",
          card: "#131836",
          border: "#1e2550",
          lime: "#c3ff00",
          "lime-dim": "#8ab300",
          pink: "#ff1a6c",
          "pink-dim": "#b3124b",
          navy: "#0a1030",
          blue: "#1a2660",
          "blue-light": "#2a3a80",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.8s ease-out",
        "fade-in": "fadeIn 1s ease-out",
        "count-up": "countUp 2s ease-out",
        "gradient-x": "gradientX 3s ease infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(201, 165, 55, 0.2)" },
          "100%": { boxShadow: "0 0 40px rgba(201, 165, 55, 0.4)" },
        },
        slideUp: {
          "0%": { transform: "translateY(60px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #06091a 0%, #131836 50%, #06091a 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
