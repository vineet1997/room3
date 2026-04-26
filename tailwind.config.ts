import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // Reset Tailwind's defaults; we use it as a syntax, not a design system.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      bg: '#16110D',
      surface: '#221A14',
      'surface-2': '#2C231B',
      ink: '#F2E9D8',
      'ink-2': '#A89884',
      'ink-3': '#5F574D',
      gold: '#C4956A',
      terra: '#C45D3E',
      dusk: '#5C7A8C',
      'dusk-2': '#7A95A6',
    },
    fontFamily: {
      display: ['"GT Sectra Display"', 'Fraunces', 'Georgia', 'serif'],
      body: ['"Geist"', '"Inter Tight"', 'system-ui', 'sans-serif'],
      mono: ['"Geist Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      hand: ['"Caveat"', 'cursive'],
    },
    extend: {
      fontSize: {
        // Type scale from the spec
        'display-xl': ['clamp(56px, 18vw, 168px)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-l': ['clamp(40px, 8vw, 72px)', { lineHeight: '1.0', letterSpacing: '-0.01em' }],
        'display-m': ['clamp(28px, 5vw, 44px)', { lineHeight: '1.1', letterSpacing: '-0.005em' }],
        'body-l': ['clamp(19px, 2.5vw, 22px)', { lineHeight: '1.5' }],
        'body': ['clamp(17px, 2vw, 18px)', { lineHeight: '1.55' }],
        'caption': ['13px', { lineHeight: '1.4', letterSpacing: '0.01em' }],
      },
      letterSpacing: {
        'tight-display': '-0.02em',
      },
    },
  },
  plugins: [],
} satisfies Config;
