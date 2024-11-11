/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#252728",
        secondary: "#333334",
        firered: "#D52429",
      },
    },
  },
  plugins: [],
};
