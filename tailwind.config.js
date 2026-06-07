/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#000000',
          secondary: '#0A0A0A',
          tertiary: '#111111',
          elevated: '#161616',
        },
        surface: {
          DEFAULT: '#111111',
          hover: '#1A1A1A',
          raised: '#1F1F1F',
        },
        border: {
          subtle: 'rgba(255,255,255,0.06)',
          DEFAULT: 'rgba(255,255,255,0.1)',
          bright: 'rgba(255,255,255,0.18)',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#D1D5DB',
          muted: 'rgba(255,255,255,0.5)',
          faint: 'rgba(255,255,255,0.3)',
        },
        accent: {
          DEFAULT: '#5B5BFF',
          'accent-dim': '#4545E0',
          'accent-bright': '#7B7BFF',
          'accent-soft': 'rgba(91,91,255,0.12)',
        },
        glow: {
          accent: 'rgba(91,91,255,0.35)',
          'accent-soft': 'rgba(91,91,255,0.18)',
          'accent-faint': 'rgba(91,91,255,0.08)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3.5rem, 10vw, 10rem)', { lineHeight: '0.92', letterSpacing: '-0.045em' }],
        'hero': ['clamp(2.75rem, 8vw, 8.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'section': ['clamp(2.25rem, 6vw, 6rem)', { lineHeight: '1.0', letterSpacing: '-0.035em' }],
        'heading': ['clamp(1.5rem, 3.5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'subheading': ['clamp(1.125rem, 2vw, 1.625rem)', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        'body-lg': ['1.25rem', { lineHeight: '1.55' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        'eyebrow': ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.18em' }],
      },
      spacing: {
        'section': 'clamp(5rem, 12vh, 10rem)',
        'container': 'clamp(1.25rem, 5vw, 4rem)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-slow': 'fadeIn 1.5s ease-out forwards',
        'slide-up': 'slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-left': 'slideLeft 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-right': 'slideRight 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 7s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-fast': 'float 5s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 3.5s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-fast': 'marquee 22s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'spin-slow': 'spin 25s linear infinite',
        'shimmer': 'shimmer 2.4s ease-in-out infinite',
        'gradient': 'gradient 10s ease infinite',
        'border-flow': 'borderFlow 4s linear infinite',
        'text-reveal': 'textReveal 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'blur-in': 'blurIn 0.9s ease-out forwards',
        'counter': 'counter 2.2s ease-out forwards',
        'morph': 'morph 10s ease-in-out infinite',
        'mesh-drift': 'meshDrift 18s ease-in-out infinite',
        'orbit': 'orbit 24s linear infinite',
        'shine': 'shine 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-18px) rotate(1deg)' },
          '66%': { transform: 'translateY(-9px) rotate(-1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.65', transform: 'scale(1.08)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 200%' },
        },
        textReveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0% 0 0)' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(20px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
        },
        meshDrift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 30px) scale(0.97)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(40px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(40px) rotate(-360deg)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 40% 20%, rgba(91,91,255,0.25) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(91,91,255,0.18) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(91,91,255,0.15) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(91,91,255,0.12) 0px, transparent 50%)',
        'gradient-accent': 'linear-gradient(135deg, #5B5BFF 0%, #7B7BFF 50%, #5B5BFF 100%)',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
      },
      boxShadow: {
        'glow-accent': '0 0 50px rgba(91,91,255,0.35), 0 0 100px rgba(91,91,255,0.18)',
        'glow-accent-sm': '0 0 24px rgba(91,91,255,0.3)',
        'glow-accent-lg': '0 0 80px rgba(91,91,255,0.4), 0 0 160px rgba(91,91,255,0.2)',
        'inner-glow': 'inset 0 0 60px rgba(91,91,255,0.06)',
        'card': '0 6px 30px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3)',
        'elevated': '0 30px 80px rgba(0,0,0,0.6)',
        'inset-line': 'inset 0 -1px 0 0 rgba(255,255,255,0.06)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      backdropBlur: {
        'xs': '2px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-expo': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
}
