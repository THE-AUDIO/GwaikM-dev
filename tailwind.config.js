/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors:{
      "bg-primary":"#f9fafb",
      "bg-elevated-secondary":"#1f2937",
      "text-static":"#212121",
      "light":"#fff",
      "message-surface":"#1f2937",
      "accent":"#1e3a8a"
    }
  },
  plugins: [],
}
// 212121