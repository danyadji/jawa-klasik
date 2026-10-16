/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jawa-primary': '#6b492b',
        'jawa-text': '#4d3a30',
        'jawa-clay': '#6b492b',
        'jawa-clay-container': '#ba7845',
        'jawa-parchment': '#fcf9ef',
        'jawa-parchment-low': '#f5ede0',
        'jawa-parchment-container': '#f8f3ea',
        'jawa-parchment-variant': '#e4d5c2',
        'jawa-charcoal': '#4d3a30',
        'jawa-charcoal-variant': '#705748',
        'jawa-cream-300': '#f3caa7',
      },
      fontFamily: {
        nama: ['"Great Vibes"', 'cursive'],
        judul: ['"Century Gothic"', 'sans-serif'],
        isi: ['"Futura Bk BT"', 'sans-serif'],
        headline: ['"Century Gothic"', 'sans-serif'],
        body: ['"Futura Bk BT"', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
        noto: ['"Noto Serif"', 'serif'],
        signature: ['"Photograph Signature"', 'cursive'],
        chyntia: ['"Chyntia Oesman Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
