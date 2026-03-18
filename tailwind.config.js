/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/renderer/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forge: {
          primary: '#1a1510',
          surface: '#231e17',
          elevated: '#2e2720',
          border: '#3d3530',
          accent: '#d4942a',
          'accent-dim': '#a06b1a',
          online: '#22c55e',
          'text-primary': '#c8bda8',
          'text-secondary': '#8a7e6e',
        },
        status: {
          completed: '#2ecc71',
          'in-progress': '#d4942a',
          ready: '#3498db',
          pending: '#6b6560',
          blocked: '#e74c3c',
          waiting: '#e67e22',
          merged: '#a78bfa',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
