/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./containers/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        haze: "#f1f5f9",
        accent: "#f97316",
        mint: "#22c55e",
        skyline: "#38bdf8",
        primary: "#f97316",
        "primary-hover": "#ea580c",
        "background-light": "#f3f4f6",
        "background-dark": "#0f1115",
        "card-dark": "#161b22",
        "card-light": "#ffffff",
        "border-dark": "#30363d",
        "border-light": "#e5e7eb",
        "text-main-dark": "#f0f6fc",
        "text-main-light": "#111827",
        "text-muted-dark": "#8b949e",
        "text-muted-light": "#6b7280"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(249, 115, 22, 0.15)"
      },
      keyframes: {
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-in-down": "fade-in-down 0.6s ease-out both"
      }
    }
  },
  plugins: []
};
