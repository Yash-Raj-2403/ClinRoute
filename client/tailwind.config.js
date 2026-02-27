/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        background: '#FDFBF7', // Warm cream background
        surface: '#FFFFFF',
        primary: {
          50: '#f2fcf9',
          100: '#dff8f1',
          200: '#bfeee3',
          300: '#92e0cf',
          400: '#5cc9b5',
          500: '#38b2a3', // Original teal-ish
          600: '#0f4c3a', // Deep Forest Green (Brand Primary)
          700: '#0d4033',
          800: '#0a352b',
          900: '#03231d',
        },
        secondary: {
          light: '#FFFBEB',
          DEFAULT: '#FBBF24', // Warm Yellow
          dark: '#D97706',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e8e5',
          200: '#c5d1cb',
          300: '#9eb4ab',
          400: '#759288',
          500: '#56756a',
          600: '#435c53',
        },
        accent: {
          purple: '#E9D5FF', // Soft purple
          orange: '#FFEDD5', // Soft orange
          rose: '#FFE4E6',   // Soft rose
          blue: '#DBEAFE',   // Soft blue
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,0,0,0.05)',
        'nav': '0 4px 20px -2px rgba(0,0,0,0.03)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
