/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 0 0 3px #c8f3fa, 0 1px 2px rgba(15,17,17,.15) inset",
      },
    },
  },
  plugins: [],
};
