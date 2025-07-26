/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors:{
      "bg-primary":"#212121",
      "bg-elevated-secondary":"#181818",
      "text-static":"#fff",
      "light":"#fff",
      "message-surface":"#333537",
      "accent":"#1e3a8a"
    }
  },
  plugins: [],
}