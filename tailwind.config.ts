import type { Config } from 'tailwindcss'

// Ledger palette: light paper, green-grey rules, dark ink, one green accent.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F6F7F4',
        'paper-2': '#EEF1EC',
        rule: '#C8D2CA',
        ink: '#17201B',
        'ink-2': '#4A5750',
        green: '#1E6F50',
        'green-dark': '#165840',
        red: '#B2412B',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        content: '1120px',
        copy: '68ch',
      },
      fontSize: {
        display: ['clamp(2.25rem, 5.2vw, 3.75rem)', { lineHeight: '1.04', letterSpacing: '-0.015em' }],
        h2: ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        h3: ['1.25rem', { lineHeight: '1.3' }],
      },
    },
  },
  plugins: [],
}

export default config
