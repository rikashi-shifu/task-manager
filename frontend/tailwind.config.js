/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: "#374151", // Dark gray (replacing dark green)
        "accent-light": "#6B7280", // Light gray
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
