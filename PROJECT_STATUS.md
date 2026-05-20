# BrandX — Project Status & Reference Document

> **Last Updated:** May 20, 2026
> **Status:** Production — Deployed on Vercel
> **Branch:** `main` (up to date with `origin/main`)
> **Latest Commit:** `445f2eb`

---

## 1. Project Overview

**BrandX** (branded as **Brandex Digital**) is a premium digital agency website — a single-page cinematic experience with smooth scroll, camera-lens preloader, 3D interactive sections, parallax effects, and extensive Framer Motion animations.

Migrated from Vite + React Router SPA to **Next.js 15 App Router** with 14 sections.

### Current State
- Framework: Next.js 15 (App Router)
- React: v19
- Deployed on Vercel: `https://brandexdigital.in`
- Full-width layout (no max-width constraint)
- Mobile-optimized (Lenis disabled on mobile, reduced animations, capped FPS)
- Custom cursor removed
- Contact info: `brandexdigital.in@gmail.com` / `+91 70100 096308`
- Portfolio: 5 projects with horizontal scroll, hover metrics reveal
- 3D interactive sections: Services (rotating carousel), Process (3D tilt cards), TechStack (floating 3D cards), Metrics (3D rotating counters)
- Cinematic Hero: Spotlight effect, floating shapes, gradient orbs, particles (capped FPS)
- Camera-lens opening animation (replaces loading bar)
- Performance optimized: Next.js Image, AVIF/WebP, font preload, IntersectionObserver on particles
- Error boundary: Catches runtime errors gracefully with reload option

---

## 2. Full Architecture

### File Tree

```
BrandX/
├── .next/                              # Next.js build output (gitignored)
├── public/                             # Static assets (empty)
├── src/
│   ├── app/
│   │   ├── globals.css                 # Global styles, Tailwind layers, CSS utilities
│   │   ├── layout.tsx                  # Root layout (server component) with fonts, metadata
│   │   ├── body-content.tsx            # Client wrapper for main content with preloader sync
│   │   ├── page.tsx                    # Main page — composes all 14 sections + ErrorBoundary
│   │   ├── error.tsx                   # Error boundary UI
│   │   ├── not-found.tsx               # 404 page
│   │   ├── robots.ts                   # Dynamic robots.txt (Next.js metadata API)
│   │   ├── sitemap.ts                  # Dynamic sitemap.xml
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts            # POST /api/contact — Nodemailer email handler
│   ├── components/
│   │   ├── effects/
│   │   │   ├── AnimatedGrid.tsx        # Canvas-based animated dot grid
│   │   │   ├── FloatingShapes.tsx      # Geometric floating shapes (Hero)
│   │   │   ├── GradientOrbs.tsx        # Floating gradient orbs (memo, hidden mobile)
│   │   │   ├── HeroSpotlight.tsx       # Mouse-following radial light (Hero)
│   │   │   └── Particles.tsx           # Canvas particles (capped FPS, IntersectionObserver)
│   │   ├── services/
│   │   │   ├── NetworkBackground.tsx   # Ambient background for services
│   │   │   ├── NetworkConnections.tsx  # SVG animated connection lines
│   │   │   ├── NetworkNode.tsx         # 3D tilt service card
│   │   │   └── RotationCarousel.tsx    # 3D rotating carousel with drag-to-spin
│   │   ├── ui/
│   │   │   ├── AnimatedCounter.tsx     # Scroll-triggered number counter
│   │   │   ├── GlowCard.tsx            # Card with static hover glow
│   │   │   ├── MagneticButton.tsx      # Magnetic button effect
│   │   │   ├── Marquee.tsx             # Infinite scrolling text
│   │   │   ├── ParallaxImage.tsx       # Scroll-linked parallax image
│   │   │   ├── ScrollReveal.tsx        # Scroll-triggered reveal (optimized mobile)
│   │   │   └── TextReveal.tsx          # Word-by-word staggered text
│   │   ├── About.tsx                   # Two-column about section (Next.js Image)
│   │   ├── AmbientMotion.tsx           # Global ambient motion effects
│   │   ├── CTA.tsx                     # Final CTA with marquee
│   │   ├── ErrorBoundary.tsx           # Class-based error boundary
│   │   ├── FAQ.tsx                     # Accordion FAQ
│   │   ├── Footer.tsx                  # Multi-column footer
│   │   ├── Hero.tsx                    # Cinematic hero with spotlight, shapes, particles
│   │   ├── Metrics.tsx                 # 3D rotating counter cards
│   │   ├── Navbar.tsx                  # Fixed glass nav + mobile fullscreen menu
│   │   ├── Portfolio.tsx               # Horizontal scroll, 5 projects (sticky pinned)
│   │   ├── Preloader.tsx               # Camera-lens opening animation
│   │   ├── Process.tsx                 # 3D tilt timeline cards
│   │   ├── Services.tsx                # 3D rotating carousel with drag-to-spin
│   │   ├── SmoothScroll.tsx            # Lenis wrapper (disabled on mobile)
│   │   ├── TechStack.tsx               # 3D floating tech cards
│   │   ├── Testimonials.tsx            # Client testimonial cards
│   │   ├── Trust.tsx                   # Trust indicator stats
│   │   └── WhyBrandex.tsx              # Sticky sidebar + reason cards
│   └── lib/
│       ├── hooks.ts                    # useIsMobile, useReducedMotion hooks
│       └── utils.ts                    # cn() utility
├── next.config.js                      # Next.js config (security headers, AVIF/WebP, caching)
├── tailwind.config.js                  # Design system (colors, typography, animations)
├── tsconfig.json                       # TypeScript config
├── postcss.config.js                   # Tailwind + Autoprefixer
├── vercel.json                         # Framework preset: nextjs
├── package.json                        # Dependencies
├── .env.example                        # Environment variables template
├── README.md                           # Project documentation
├── CONTACT_FORM_SETUP.md               # Email API configuration
└── PROJECT_STATUS.md                   # This file
```

### Component Hierarchy

```
RootLayout (server)
├── Preloader                           # Camera-lens opening animation
├── AmbientMotion                       # Global ambient motion effects
├── SmoothScroll (Lenis — desktop only)
│   └── BodyContent (client)            # Main content wrapper with preloader sync
│       └── <main>
│           └── ErrorBoundary           # Catches runtime errors
│               ├── Navbar              # Fixed glass nav + mobile fullscreen menu
│               ├── Hero                # Cinematic hero
│               │   ├── GradientOrbs    # Hidden on mobile
│               │   ├── Particles       # Capped FPS, IntersectionObserver
│               │   ├── HeroSpotlight   # Mouse-following radial light
│               │   └── FloatingShapes  # Geometric floating shapes
│               ├── Trust               # 4-column stats
│               ├── Services            # 3D rotating carousel (drag-to-spin)
│               │   ├── RotationCarousel
│               │   ├── NetworkBackground
│               │   ├── NetworkConnections
│               │   └── NetworkNode
│               ├── Portfolio           # Horizontal scroll, 5 projects (sticky pinned)
│               ├── Process             # 3D tilt timeline cards
│               ├── About               # Two-column layout (Next.js Image)
│               ├── Metrics             # 3D rotating counter cards
│               ├── TechStack           # 3D floating tech cards
│               ├── Testimonials        # Client quotes
│               ├── WhyBrandex          # Sticky sidebar + cards
│               ├── FAQ                 # Accordion
│               ├── CTA                 # Final CTA + marquee
│               └── Footer              # Multi-column footer
├── .noise                              # SVG noise overlay (static on mobile)
└── Analytics                           # Vercel Analytics
```

---

## 3. Completed Sections & Features

| # | Section | ID Anchor | Key Features |
|---|---------|-----------|--------------|
| 1 | **Navbar** | — | Fixed glass pill nav, scroll-aware, mobile fullscreen menu, MagneticButton CTA |
| 2 | **Hero** | — | Spotlight effect, floating shapes, particles, word reveal, gradient text, scroll parallax, dual CTAs (tel/mailto), inline stats |
| 3 | **Trust** | — | 4-column stat counters with hover scale, scroll-reveal stagger |
| 4 | **Services** | `#services` | 3D rotating carousel, drag-to-spin, momentum physics, omnidirectional rotation, network connections |
| 5 | **Portfolio** | `#work` | Horizontal scroll (sticky pinned), 5 projects, hover metrics reveal, Next.js Image |
| 6 | **Process** | `#process` | 3D tilt cards, alternating layout, animated progress line, detail tags |
| 7 | **About** | `#about` | Two-column split, team image (Next.js Image) with glass quote overlay, 4 value props |
| 8 | **Metrics** | — | 3D rotating counter cards, gradient text, hover glow orbs |
| 9 | **TechStack** | — | 3D floating tech cards, mouse-tracking tilt, animated proficiency bars |
| 10 | **Testimonials** | — | 3-column quote cards, glass styling, avatar initials |
| 11 | **WhyBrandex** | — | Sticky sidebar, 4 numbered reason cards (10% opacity numbers) |
| 12 | **FAQ** | — | 6 accordion items, animated expand/collapse, scroll-reveal |
| 13 | **CTA** | `#contact` | Scroll-linked scale/opacity, gradient heading, tel/mailto buttons, marquee |
| 14 | **Footer** | — | 5-column grid, animated link arrows, contact info, socials, copyright |

---

## 4. Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `background.DEFAULT` | `#050505` | Page background |
| `background.secondary` | `#0A0A0A` | Card/image backgrounds |
| `surface.DEFAULT` | `#1A1A1A` | Interactive surfaces |
| `text.primary` | `#FFFFFF` | Headings |
| `text.secondary` | `rgba(255,255,255,0.60)` | Body text |
| `text.muted` | `rgba(255,255,255,0.35)` | Labels |
| `accent.blue` | `#3B82F6` | Primary accent |
| `accent.purple` | `#A855F7` | Secondary accent |
| `accent.cyan` | `#22D3EE` | Tertiary accent |

### Typography

- `font-sans` → Inter
- `font-display` → Space Grotesk
- Fluid sizes via `clamp()`

### Key CSS Utilities

| Class | Description |
|-------|-------------|
| `.noise` | Fixed SVG noise overlay (animated desktop, static mobile) |
| `.glass` / `.glass-strong` / `.glass-card` | Frosted glass effects |
| `.text-gradient` / `.text-gradient-blue` | Gradient text |
| `.section-container` | Full-width: `w-full px-6 md:px-12 lg:px-16` |
| `.section-padding` | `py-24 md:py-32 lg:py-40` |
| `.hover-lift` | translateY(-8px) on hover |

---

## 5. Tech Stack & Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | ^15.1.3 | React framework (App Router) |
| `react` | ^19.0.0 | UI library |
| `react-dom` | ^19.0.0 | DOM renderer |
| `typescript` | ^5.3.3 | Type safety |
| `tailwindcss` | ^3.4.1 | Utility CSS |
| `framer-motion` | ^11.11.17 | Animations |
| `lenis` | ^1.3.23 | Smooth scroll (desktop only) |
| `lucide-react` | ^1.16.0 | Icons |
| `@vercel/analytics` | ^1.6.1 | Analytics |
| `nodemailer` | latest | Email sending |
| `clsx` | ^2.1.1 | Conditional classes |
| `tailwind-merge` | ^3.6.0 | Class conflict resolution |

### Dev Dependencies

| Package | Version |
|---------|---------|
| `eslint` | ^9.39.4 |
| `eslint-config-next` | ^15.1.3 |
| `@types/node` | ^20.11.5 |
| `@types/react` | ^19.0.0 |
| `@types/react-dom` | ^19.0.0 |
| `@types/nodemailer` | latest |
| `autoprefixer` | ^10.4.17 |
| `postcss` | ^8.4.35 |

### NPM Scripts

| Script | Command |
|--------|---------|
| `dev` | `next dev` |
| `build` | `next build` |
| `lint` | `next lint` |
| `start` | `next start` |

---

## 6. API Routes

### POST `/api/contact`

**File:** `src/app/api/contact/route.ts`

**Purpose:** Sends contact form submissions via Nodemailer to `brandexdigital.in@gmail.com`

**Request Body:**
```json
{
  "name": "string (min 2 chars)",
  "email": "string (valid email)",
  "subject": "string (min 3 chars)",
  "message": "string (min 10 chars)"
}
```

**Response:**
- `200` — `{ "success": true }`
- `400` — `{ "error": "validation message" }`
- `500` — `{ "error": "Failed to send email" }`
- `503` — `{ "error": "Email service not configured" }`

**Required Environment Variables:**
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=brandexdigital.in@gmail.com
EMAIL_PASS=<gmail-app-password>
```

---

## 7. SEO & Metadata

| Feature | Status | File |
|---------|--------|------|
| robots.txt | ✅ Dynamic | `src/app/robots.ts` |
| sitemap.xml | ✅ Dynamic | `src/app/sitemap.ts` |
| Open Graph | ✅ Configured | `src/app/layout.tsx` |
| Twitter Card | ✅ Configured | `src/app/layout.tsx` |
| Vercel Analytics | ✅ Integrated | `src/app/layout.tsx` |
| Error page | ✅ | `src/app/error.tsx` |
| 404 page | ✅ | `src/app/not-found.tsx` |

---

## 8. Mobile Optimizations

| Component | Desktop | Mobile |
|-----------|---------|--------|
| Preloader | Camera-lens animation (2.2s) | Camera-lens animation (1.8s) |
| Lenis Scroll | Enabled (lerp 0.08) | Disabled (native scroll) |
| Particles | 20 particles, 30fps | 5 particles, 20fps |
| GradientOrbs | 2 floating orbs | Hidden |
| ScrollReveal | 60px distance, 0.8s | 30px distance, 0.4s |
| Hero 3D | Spring physics, floating cards | Direct transform, no cards |
| Progress line | Animated | Hidden |
| Noise overlay | Animated | Static |
| Portfolio hover | Scale + rotate | Disabled |
| Services 3D | Rotating carousel + drag | Stacked cards |

---

## 9. Performance Optimizations

| Optimization | Impact |
|---|---|
| Removed GSAP (~90KB) | Smaller bundle |
| Next.js Image (Portfolio + About) | Auto WebP/AVIF, lazy loading, responsive sizes |
| Particles capped (30→20 desktop, 10→5 mobile) | Less CPU/GPU usage |
| FPS limiter (30fps desktop, 20fps mobile) | Reduced animation overhead |
| IntersectionObserver on particles | Pauses when off-screen |
| GradientOrbs reduced (3→2, memo) | Fewer blur layers |
| Font preload + fallbacks | Faster text rendering |
| Image formats (AVIF + WebP) | ~30% smaller images |
| Static asset caching (1 year immutable) | Better repeat visits |
| Referrer-Policy header | Security improvement |

---

## 10. Known Issues

### Resolved
- ~~Custom cursor causing issues~~ — Removed
- ~~GSAP unused dependency~~ — Removed
- ~~Missing noise.png reference~~ — Removed from tailwind.config.js
- ~~Dynamic Tailwind classes in Services~~ — Fixed with colorMap
- ~~robots.ts syntax error~~ — Fixed with Next.js metadata API
- ~~vercel.json conflicting with Next.js~~ — Fixed with framework preset
- ~~Mobile crash (Lenis + useScroll conflict)~~ — Lenis disabled on mobile
- ~~Preloader too slow on mobile~~ — Simplified to camera-lens animation
- ~~Watermark numbers invisible~~ — Increased opacity to 10%
- ~~"Book a Strategy Call" not calling~~ — Added tel: link
- ~~Email button not opening mail app~~ — Added mailto: link
- ~~Site not full width~~ — Removed max-w-7xl constraint
- ~~Metadata export error~~ — Split layout into server/client components
- ~~Hydration mismatch~~ — Added mounted guard to client components
- ~~Horizontal scroll not working~~ — Fixed with ref-based transform
- ~~Empty space after last project~~ — Calculated exact scroll distance

### Remaining
- Social links still point to `#` (awaiting URLs)
- Portfolio images use external Unsplash URLs
- No dark/light mode toggle

---

## 11. Pending Tasks

### Medium Priority
- [ ] Add real social media URLs
- [ ] Add real portfolio images (replace Unsplash)
- [ ] Add loading.tsx for route-level loading UI

### Low Priority
- [ ] Implement dark/light mode toggle
- [ ] Add blog/careers pages
- [ ] Add real project screenshots
- [ ] Add testimonials with real client data

---

## 12. Recent Changes (This Session)

### Git History

| Commit | Message |
|--------|---------|
| `445f2eb` | remove: navigation buttons and dot indicators from portfolio |
| `9d19a52` | feat: add left/right navigation buttons and dot indicators for project scroll |
| `c5ed60c` | fix: horizontal scroll using ref-based transform for live maxScroll updates |
| `014d142` | perf: optimize performance - remove GSAP, Next.js Image, reduce particles, cap FPS, font preload |
| `e79238a` | fix: calculate exact pixel scroll distance with correct gap sizes |
| `7136f4b` | fix: use DOM measurements for exact horizontal scroll distance |
| `7876041` | fix: calculate exact scroll distance to eliminate empty space after last project |
| `dd64dc5` | fix: remove empty space after last project by calculating exact scroll height |
| `40b55e7` | fix: add mounted guard to prevent hydration mismatch in 3D carousel |
| `59ef600` | remove: Nuts & Plants project from portfolio |
| `82fe2d0` | feat: enable free 3D rotation in all directions with drag and momentum |
| `c2259ae` | feat: add 3D rotating carousel with drag-to-spin and momentum for Services |
| `4c62073` | fix: repair 3D tilt interactions in Services with reactive motion templates |
| `d46710a` | fix: use useEffect instead of useState initializer to prevent window SSR error |
| `366f493` | fix: split layout into server component and client wrapper to fix metadata export error |
| `b72679f` | feat: replace loading screen with camera lens opening animation |
| `48f687e` | fix: enable horizontal scroll for projects with sticky pinned section |
| `1e7b885` | style: remove award-winning digital agency badge from hero |
| `a8e3f3d` | feat: add 3D interactions to Process, TechStack, and Metrics sections |
| `2989104` | feat: redesign Hero with cinematic effects, 3D Services network, and horizontal Portfolio scroll |

---

## 13. How to Run

### Prerequisites
- Node.js 20+
- npm

### Development
```bash
npm install
npm run dev
```
Available at `http://localhost:3000`

### Production
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

### Deployment
Push to `main` — Vercel auto-deploys.

### Environment Variables (Vercel)
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=brandexdigital.in@gmail.com
EMAIL_PASS=<app-password>
```

---

*Updated after every significant change.*
