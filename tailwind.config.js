/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f8f0e5",
        navy: "#082052",
      },
      fontFamily: {
        display: ["Metropolis", "sans-serif"],
        body: ["Metropolis", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
