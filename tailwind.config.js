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
        muted: '#888888',
        subtle: '#1A1A1A',
        border: 'rgba(255,255,255,0.08)',
        accent: {
          DEFAULT: '#5B5BFF',
          dim: '#4545E0',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 9vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'section': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'eyebrow': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.12em' }],
      },
      maxWidth: {
        'content': '1200px',
        'text': '640px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
}
