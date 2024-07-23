/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mild: "#fcd5ce",
        point: "#fe85ac",
        alert: "#ff5e5e",
        missing: "#00b428",
        stroke: "#d9d9d9",
        yellow: "#fef3c7",
      },
    },
  },
  plugins: [],
}
