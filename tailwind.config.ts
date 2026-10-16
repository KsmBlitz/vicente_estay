import type { Config } from 'tailwindcss'

// El color de acento se cambia en app/assets/css/main.css (variable --accent).
export default {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
} satisfies Partial<Config>
