module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        synkora: {
          bg: '#0a0a0a',
          ink: '#e4e4e4',
          muted: '#888888',
          line: '#222222',
          paper: '#111111',
          paper2: '#161616',
          accent: '#ff6a26',
          green: '#5fb47b',
          yellow: '#e2b14a',
          red: '#d65a4f',
          blue: '#6ea3d4',
          violet: '#9b7bd4',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Helvetica Neue"', '"Segoe UI"', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
      },
    },
  },
  variants: { extend: {} },
  plugins: [],
}
