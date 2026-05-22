/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0E0E0C",
        fg: "#EAE5DC",
        accent: "#FF5B2A",
        live: "#4DB874",
        muted: "#8B847A",
      },
      fontFamily: {
        serif: [
          "var(--font-serif)",
          "Newsreader",
          "Georgia",
          "serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "monospace",
        ],
        script: ["var(--font-script)", "Caveat Brush", "cursive"],
      },
      letterSpacing: {
        "display-tight": "-0.05em",
        "display": "-0.045em",
        "block": "-0.025em",
        "body": "-0.012em",
        "wide-meta": "0.3em",
      },
    },
  },
  plugins: [],
};
