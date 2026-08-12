/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#F4EBD8',
          dark: '#E2D3B3',
          light: '#FDFBF7',
        },
        midnight: {
          DEFAULT: '#0F172A',
          dark: '#020617',
          light: '#1E293B',
        },
        gold: {
          DEFAULT: '#D4AF37',
          dark: '#AA8C2C',
          light: '#F3E5AB',
        },
        emerald: {
          DEFAULT: '#064E3B',
          dark: '#022C22',
          light: '#059669',
        },
        burgundy: {
          DEFAULT: '#7F1D1D',
          dark: '#450A0A',
          light: '#991B1B',
        },
        magical: {
          blue: '#1E3A8A',
          glow: '#60A5FA',
        },
        candle: {
          DEFAULT: '#FBBF24',
          glow: '#FDE68A',
        }
      },
      fontFamily: {
        fantasy: ['"Cinzel"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      backgroundImage: {
        'parchment-texture': "url('https://www.transparenttextures.com/patterns/old-wall.png')",
        'midnight-texture': "url('https://www.transparenttextures.com/patterns/stardust.png')",
      }
    },
  },
  plugins: [],
}
