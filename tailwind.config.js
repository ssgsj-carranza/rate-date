/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'neumorphic': '3px 3px 6px #c7c7c7, -3px -3px 6px #ffffff',
        'neumorphic-inset': 'inset 2px 2px 4px #c7c7c7, inset -2px -2px 4px #ffffff'
      },
      colors: {
        gold: '#FFD700',
        sage: '#B2AC88',
      }
    },
  },
  plugins: [],
}

