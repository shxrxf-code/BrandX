# Brandex Digital — Premium Digital Agency Website

A cinematic, single-page landing website for a premium digital agency. Built with Next.js 15, featuring smooth scroll, custom cursor, parallax effects, and extensive Framer Motion animations.

**Live site:** [brandexdigital.in](https://brandexdigital.in)

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 3 + PostCSS |
| Animation | Framer Motion 11, GSAP 3 |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Architecture

### Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles, Tailwind layers, CSS utilities
│   ├── layout.tsx           # Root layout with fonts, SmoothScroll
│   └── page.tsx             # Main page — composes all 14 sections
├── components/
│   ├── effects/             # Background effects (AnimatedGrid, GradientOrbs, Particles)
│   ├── ui/                  # Reusable UI primitives (Cursor, GlowCard, MagneticButton, etc.)
│   ├── Navbar.tsx           # Fixed glass navigation with mobile menu
│   ├── Hero.tsx             # Full-viewport hero with floating cards
│   ├── Trust.tsx            # Trust indicator stats bar
│   ├── Services.tsx         # 6-column service cards with glow effects
│   ├── Portfolio.tsx        # Asymmetric bento-grid project showcase
│   ├── Process.tsx          # 6-step alternating timeline
│   ├── About.tsx            # Two-column about section
│   ├── Metrics.tsx          # Animated counter metrics
│   ├── TechStack.tsx        # Technology proficiency grid
│   ├── Testimonials.tsx     # Client testimonial cards
│   ├── WhyBrandex.tsx       # Sticky sidebar + reason cards
│   ├── FAQ.tsx              # Accordion FAQ
│   ├── CTA.tsx              # Final call-to-action with marquee
│   ├── Footer.tsx           # Multi-column footer
│   └── SmoothScroll.tsx     # Lenis smooth scroll wrapper
└── lib/
    └── utils.ts             # cn() utility (clsx + tailwind-merge)
```

### Sections

The site is a single-page experience with 14 sections:

1. **Navbar** — Fixed glass pill navigation, scroll-aware, mobile fullscreen menu
2. **Hero** — Full-viewport with 3D word reveal, floating glass cards, scroll parallax
3. **Trust** — 4-column stat counters with hover scale
4. **Services** — 6 service cards with mouse-tracking radial glow (GlowCard)
5. **Portfolio** — Asymmetric bento grid, grayscale-to-color hover
6. **Process** — 6-step alternating timeline with animated progress line
7. **About** — Two-column split with team image and value props
8. **Metrics** — Animated counter metrics with gradient text
9. **TechStack** — 12-item tech proficiency grid with animated bars
10. **Testimonials** — 3-column client quote cards
11. **WhyBrandex** — Sticky sidebar with numbered reason cards
12. **FAQ** — 6-item accordion with animated expand/collapse
13. **CTA** — Scroll-linked scale/opacity, marquee background
14. **Footer** — 5-column grid with animated link arrows

## Design System

### Colors

| Token | Value |
|-------|-------|
| Background | `#050505` |
| Surface | `#1A1A1A` |
| Text Primary | `#FFFFFF` |
| Text Secondary | `rgba(255,255,255,0.60)` |
| Accent Blue | `#3B82F6` |
| Accent Purple | `#A855F7` |
| Accent Cyan | `#22D3EE` |

### Typography

- **Display/Headings:** Space Grotesk
- **Body:** Inter
- Sizes use `clamp()` for fluid responsive scaling

### CSS Utilities

Key utility classes defined in `globals.css`:

- `.glass` / `.glass-strong` / `.glass-card` — Frosted glass effects
- `.text-gradient` / `.text-gradient-blue` / `.text-gradient-purple` — Gradient text
- `.text-glow` / `.text-glow-blue` / `.text-glow-purple` — Text shadow glow
- `.glow-orb` / `.glow-orb-blue` / `.glow-orb-purple` — Blurred color orbs
- `.section-container` / `.section-padding` — Layout utilities
- `.hover-lift` / `.shimmer-text` / `.animated-border` — Interactive effects

## Environment Variables

For contact form email functionality, create a `.env.local` file:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=brandexdigital.in@gmail.com
EMAIL_PASS=<app-password>
```

## Deployment

### Vercel

The project is configured for Vercel deployment with `vercel.json` for SPA rewrites and `next.config.js` with Unsplash image remote patterns.

1. Push to your Git repository
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual

```bash
npm run build
```

The production build output is in `.next/`.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers fully supported
- Requires JavaScript enabled

---

**Created:** January 2026
**Last Updated:** May 2026
**Status:** Production Ready
