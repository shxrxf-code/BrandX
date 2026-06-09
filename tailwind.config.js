/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#FFFFFF',
        muted: {
          DEFAULT: '#888888',
          dark: '#555555',
          light: '#B0B0B0',
        },
        subtle: '#0A0A0A',
        'subtle-light': '#111111',
        border: 'rgba(255,255,255,0.08)',
        'border-light': 'rgba(255,255,255,0.15)',
        accent: {
          DEFAULT: '#5B5BFF',
          dim: '#4545E0',
          light: '#7B7BFF',
          glow: 'rgba(91, 91, 255, 0.3)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'giant': ['clamp(5rem, 18vw, 18rem)', { lineHeight: '0.8', letterSpacing: '-0.06em' }],
        'hero': ['clamp(3.5rem, 12vw, 12rem)', { lineHeight: '0.85', letterSpacing: '-0.045em' }],
        'scene': ['clamp(3rem, 9vw, 9rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'big': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1.0', letterSpacing: '-0.035em' }],
        'label': ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.18em' }],
        'massive': ['clamp(6rem, 25vw, 25rem)', { lineHeight: '0.75', letterSpacing: '-0.07em' }],
      },
      maxWidth: {
        'content': '1600px',
        'text': '640px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'elastic': 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { opacity: '0.5', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
