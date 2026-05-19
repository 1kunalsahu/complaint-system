/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17202A",
        mint: "#12A594",
        coral: "#F97361",
        steel: "#406882"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(23, 32, 42, 0.10)"
      }
    }
  },
  plugins: []
};
