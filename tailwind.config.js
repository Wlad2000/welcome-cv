/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Arial Black"', 'Impact', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        asphalt: '#08080d',
        tar: '#111118',
        sticker: '#f8ff4d',
        punch: '#ff2f7d',
        mint: '#35f2c2',
        skyvolt: '#46b4ff',
      },
      boxShadow: {
        sticker: '5px 5px 0 rgba(0,0,0,.9)',
        neon: '0 0 24px rgba(53,242,194,.34)',
      },
    },
  },
  plugins: [],
};
