// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          primary: "var(--primary)",
          "primary-container": "var(--primary-container)",
          secondary: "var(--secondary)",
          background: "var(--background)",
          surface: "var(--on-surface)",
          "surface-variant": "var(--on-surface-variant)",
          "surface-container": "var(--surface-container)",
          outline: "var(--outline)",
          "surface-bright": "var(--surface-bright)",
          "on-primary": "var(--on-primary)",
        },
      },
    },
    plugins: [],
  }

