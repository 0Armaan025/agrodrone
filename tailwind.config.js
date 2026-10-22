/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#0b140b',
        surface: '#122312',
        'surface-2': '#1a301a',
        line: '#264726',
        'line-bright': '#3a6b3a',
        ink: '#def0de',
        'ink-2': '#a8c7a8',
        'ink-3': '#7a9a7a',
        accent: '#4ade80',
        'accent-ink': '#064e3b',
        'accent-2': '#22c55e',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(74, 222, 128, 0.15)',
        'card': '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}
