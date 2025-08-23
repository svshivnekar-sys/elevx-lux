/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        elevx: {
          navy: '#061427',
          teal: '#00C2A3',
          orange: '#FF6A00'
        }
      },
      boxShadow: {
        'elevx-glow-teal': '0 8px 30px rgba(0,194,163,0.12)',
        'elevx-glow-orange': '0 8px 30px rgba(255,106,0,0.12)'
      }
    }
  },
  plugins: []
}
