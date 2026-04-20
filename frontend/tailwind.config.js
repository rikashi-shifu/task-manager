/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: "#D97706", // Dark orange
        "accent-light": "#F97316", // Light orange
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
      },
      spacing: {
        safe: "1rem",
      },
    },
  },
  plugins: [],
};
