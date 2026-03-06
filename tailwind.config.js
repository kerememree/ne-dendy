/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dendy: {
          bg: '#0F1117',
          surface: '#1A1D27',
          card: '#21263A',
          border: '#2D3348',
          accent: '#6366F1',
          'accent-hover': '#4F52D0',
          muted: '#6B7280',
          text: '#E5E7EB',
          'text-secondary': '#9CA3AF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
