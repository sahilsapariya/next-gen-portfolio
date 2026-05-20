/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        ivory: "#F5F1EA",
        accent: "#FF4A1C",
        muted: "#7A736B",
      },
      fontFamily: {
        serif: [
          "var(--font-fraunces)",
          "var(--font-instrument)",
          "Fraunces",
          "Instrument Serif",
          "serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "monospace",
        ],
        hand: ["var(--font-caveat)", "Caveat Brush", "Caveat", "cursive"],
      },
    },
  },
  plugins: [],
};
