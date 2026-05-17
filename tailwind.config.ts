import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'oklch(11% 0.01 280)',
        ink: 'oklch(96% 0.005 280)',
        gold: 'oklch(78% 0.13 80)',
        magenta: 'oklch(70% 0.22 340)',
        cyan: 'oklch(78% 0.13 200)',
        violet: 'oklch(65% 0.23 300)'
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: []
};

export default config;
