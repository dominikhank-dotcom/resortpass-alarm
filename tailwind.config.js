/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ep-blue': '#002C5F',
        'ep-gold': '#D4AF37',
        'ep-gold-light': '#F5E6A8',
        'ep-silver': '#C0C0C0',
        'ep-silver-dark': '#757575',
        'ep-red': '#C8102E',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-out': 'fadeInOut 3s ease-in-out',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInOut: {
          '0%': { opacity: '0' },
          '10%, 90%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}