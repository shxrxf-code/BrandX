# BrandX — Project Status & Reference Document

> **Last Updated:** May 19, 2026 at 21:10 IST
> **Status:** Production — Deployed on Vercel
> **Branch:** `main` (up to date with `origin/main`)
> **Latest Commit:** `cfb17c0`

---

## 1. Project Overview

**BrandX** (branded as **Brandex Digital**) is a premium digital agency website — a single-page cinematic experience with smooth scroll, preloader, parallax effects, and extensive Framer Motion animations.

Migrated from Vite + React Router SPA to **Next.js 15 App Router** with 14 sections.

### Current State
- Framework: Next.js 15 (App Router)
- React: v19
- Deployed on Vercel: `https://brandexdigital.in`
- Full-width layout (no max-width constraint)
- Mobile-optimized (Lenis disabled on mobile, reduced animations)
- Custom cursor removed
- Contact info: `brandexdigital.in@gmail.com` / `+91 70100 096308`
- Portfolio: 6 projects with hover metrics reveal
- Premium motion system: GSAP + Framer Motion + blur-to-clear reveals
- Cinematic Hero: Massive typography, staggered animations, floating cards
- Enhanced microinteractions: Magnetic buttons, 3D tilt cards, cursor-following glow
- Error boundary: Catches runtime errors gracefully with reload option
- All sections redesigned: Services, About, Metrics, Testimonials, FAQ, Footer, WhyBrandex
- GSAP ScrollTrigger: Pinned horizontal scroll section for capabilities showcase
- Ambient motion system: Global floating orbs, subtle grid lines, parallax layers

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
│   │   ├── layout.tsx                  # Root layout with fonts, Preloader, SmoothScroll, Analytics
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
│   │   │   ├── GradientOrbs.tsx        # Floating gradient orbs (hidden on mobile)
│   │   │   └── Particles.tsx           # Canvas particles (reduced on mobile)
│   │   ├── ui/
│   │   │   ├── AnimatedCounter.tsx     # Scroll-triggered number counter
│   │   │   ├── GlowCard.tsx            # Card with static hover glow (no tilt)
│   │   │   ├── MagneticButton.tsx      # Standard button (no magnetic effect)
│   │   │   ├── Marquee.tsx             # Infinite scrolling text
│   │   │   ├── ParallaxImage.tsx       # Scroll-linked parallax image
│   │   │   ├── ScrollReveal.tsx        # Scroll-triggered reveal (optimized mobile)
│   │   │   └── TextReveal.tsx          # Word-by-word staggered text
│   │   ├── About.tsx                   # Two-column about section
│   │   ├── CTA.tsx                     # Final CTA with marquee
│   │   ├── ErrorBoundary.tsx           # Class-based error boundary (catches runtime errors)
│   │   ├── FAQ.tsx                     # Accordion FAQ
│   │   ├── Footer.tsx                  # Multi-column footer
│   │   ├── Hero.tsx                    # Full-viewport hero (simplified on mobile)
│   │   ├── Metrics.tsx                 # Animated counter metrics
│   │   ├── Navbar.tsx                  # Fixed glass nav + mobile menu
│   │   ├── Portfolio.tsx               # 3-col grid project showcase (6 projects)
│   │   ├── Preloader.tsx               # Loading screen (simplified on mobile)
│   │   ├── Process.tsx                 # 6-step timeline (no progress line on mobile)
│   │   ├── Services.tsx                # 6 service cards with static glow
│   │   ├── SmoothScroll.tsx            # Lenis wrapper (disabled on mobile)
│   │   ├── TechStack.tsx               # Tech proficiency grid
│   │   ├── Testimonials.tsx            # Client testimonial cards
│   │   ├── Trust.tsx                   # Trust indicator stats
│   │   └── WhyBrandex.tsx              # Sticky sidebar + reason cards
│   └── lib/
│       ├── hooks.ts                    # useIsMobile, useReducedMotion hooks
│       └── utils.ts                    # cn() utility
├── next.config.js                      # Next.js config (security headers, Unsplash images)
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
RootLayout
├── Preloader                           # Full-screen loading (simplified mobile)
├── SmoothScroll (Lenis — desktop only)
│   └── <main>
│       └── ErrorBoundary               # Catches runtime errors
│           ├── Navbar                  # Fixed glass nav + mobile fullscreen menu
│           ├── Hero                    # Hero with parallax, stats, CTAs
│           │   ├── GradientOrbs        # Hidden on mobile
│           │   └── Particles           # Reduced count on mobile
│           ├── Trust                   # 4-column stats
│           ├── Services                # 6 service cards
│           │   └── GlowCard (×6)       # Static hover glow
│           ├── Portfolio               # 3-col grid, 6 projects
│           ├── Process                 # 6-step timeline
│           ├── About                   # Two-column layout
│           ├── Metrics                 # Animated counters
│           │   └── AnimatedCounter (×4)
│           ├── TechStack               # Tech proficiency grid
│           ├── Testimonials            # Client quotes
│           ├── WhyBrandex              # Sticky sidebar + cards
│           ├── FAQ                     # Accordion
│           ├── CTA                     # Final CTA + marquee
│           └── Footer                  # Multi-column footer
├── .noise                              # SVG noise overlay (static on mobile)
└── Analytics                           # Vercel Analytics
```

---

## 3. Completed Sections & Features

| # | Section | ID Anchor | Key Features |
|---|---------|-----------|--------------|
| 1 | **Navbar** | — | Fixed glass pill nav, scroll-aware, mobile fullscreen menu, MagneticButton CTA |
| 2 | **Hero** | — | Full-viewport, word reveal, gradient text, scroll parallax, dual CTAs (tel/mailto), inline stats |
| 3 | **Trust** | — | 4-column stat counters with hover scale, scroll-reveal stagger |
| 4 | **Services** | `#services` | 6 service cards in 3-col grid, static hover glow, icon badges, tag pills |
| 5 | **Portfolio** | `#work` | 2-col grid, 6 projects, hover metrics reveal, grayscale→color, zoom effect |
| 6 | **Process** | `#process` | 6-step alternating timeline, watermark numbers (10% opacity), detail tags |
| 7 | **About** | `#about` | Two-column split, team image with glass quote overlay, 4 value props |
| 8 | **Metrics** | — | 4-column animated counters, gradient text, hover scale |
| 9 | **TechStack** | — | 12 tech items in 4-col grid, glass cards, animated proficiency bars |
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
| Preloader | 1.2s with progress bar | 300ms, logo only |
| Lenis Scroll | Enabled (lerp 0.08) | Disabled (native scroll) |
| Particles | 50 particles, 60fps | 10 particles, 20fps |
| GradientOrbs | 3 floating orbs | Hidden |
| ScrollReveal | 60px distance, 0.8s | 30px distance, 0.4s |
| Hero 3D | Spring physics, floating cards | Direct transform, no cards |
| Progress line | Animated | Hidden |
| Noise overlay | Animated | Static |
| Portfolio hover | Scale + rotate | Disabled |
| Watermark numbers | 10% opacity | 10% opacity |

---

## 9. Known Issues

### Resolved
- ~~Custom cursor causing issues~~ — Removed
- ~~GSAP unused dependency~~ — Removed
- ~~Missing noise.png reference~~ — Removed from tailwind.config.js
- ~~Dynamic Tailwind classes in Services~~ — Fixed with colorMap
- ~~robots.ts syntax error~~ — Fixed with Next.js metadata API
- ~~vercel.json conflicting with Next.js~~ — Fixed with framework preset
- ~~Mobile crash (Lenis + useScroll conflict)~~ — Lenis disabled on mobile
- ~~Preloader too slow on mobile~~ — Simplified to 300ms
- ~~Watermark numbers invisible~~ — Increased opacity to 10%
- ~~"Book a Strategy Call" not calling~~ — Added tel: link
- ~~Email button not opening mail app~~ — Added mailto: link
- ~~Site not full width~~ — Removed max-w-7xl constraint

### Remaining
- Social links still point to `#` (awaiting URLs)
- Portfolio images use external Unsplash URLs
- No dark/light mode toggle

---

## 10. Pending Tasks

### Medium Priority
- [ ] Add real social media URLs
- [ ] Add real portfolio images (replace Unsplash)
- [ ] Add loading.tsx for route-level loading UI
- [ ] Performance audit (Lighthouse testing)

### Low Priority
- [ ] Implement dark/light mode toggle
- [ ] Add blog/careers pages
- [ ] Add real project screenshots
- [ ] Add testimonials with real client data

---

## 11. Recent Changes (This Session)

### Git History

| Commit | Time (IST) | Message |
|--------|------------|---------|
| `cfb17c0` | 21:10 | a11y: improve accessibility with focus styles, ARIA labels, and skip link |
| `4cf7c14` | 21:00 | feat: add GSAP ScrollTrigger horizontal scroll section and ambient motion system |
| `d34e642` | 20:50 | docs: update PROJECT_STATUS.md at 20:50 IST - WhyBrandex redesigned |
| `b0abe1f` | 20:50 | feat: redesign WhyBrandex section - sticky sidebar, enhanced cards with icons, glow effects |
| `2fcda14` | 20:45 | feat: complete section redesigns - Services, About, Metrics, Testimonials, FAQ, Footer |
| `f1904c9` | 20:30 | fix: simplify useIsMobile hook to prevent hydration errors |
| `a2a295c` | 20:26 | fix: remove invalid Lenis touchInertiaMultiplier option |
| `6abcecd` | 20:22 | update: add Aero Travels to Portfolio (Personal Branding) |
| `4083f18` | 20:15 | style: increase portfolio category and year label size |
| `fee4930` | 20:10 | docs: update timestamp to 20:10 IST |
| `e701d0e` | 18:45 | feat: premium redesign - cinematic hero, enhanced portfolio, microinteractions |
| `505d883` | 18:25 | update: change Nuts & Plants image to nuts and chocolates |
| `8f28239` | 18:20 | docs: save current project status with timestamps |
| `351fe0b` | 18:10 | update: move Nuts & Plants to Project 5 in Portfolio |
| `555c013` | 18:05 | update: replace ArchViz Studio with Diamond Restaurant in Portfolio |
| `c07edc6` | 18:00 | update: add Mirra Montessori School to Portfolio (personal branding) |
| `b92aefa` | 17:55 | update: rename Drifto Fashion to Drifto Men's Fashion |
| `2d25fe3` | 17:50 | update: rename NOIR Fashion to Drifto Fashion in Portfolio |
| `0049691` | 17:45 | docs: update PROJECT_STATUS.md with current project state, APIs, and all recent changes |
| `66fbdab` | 17:40 | redesign: Portfolio section with 6 projects, updated years and stats |
| `60730b2` | 17:35 | style: make website full width |
| `cd5ba43` | 17:30 | update: change client satisfaction stat to 100% |
| `17eaa02` | 17:25 | fix: remove invalid Lenis autoResize option |
| `5ca747b` | 17:20 | perf: optimize mobile performance and reduce lag |
| `1a9be47` | 17:15 | fix: make email button open mail app |
| `d4bb7eb` | 17:10 | fix: make Book a Strategy Call buttons open phone dialer |
| `110323e` | 17:05 | fix: increase watermark number opacity in Process and WhyBrandex |
| `db850c0` | 17:00 | remove: custom cursor and mouse-tracking animations |
| `8f221c0` | 16:55 | update: replace placeholder contact info with real email and phone |
| `dc019a0` | 16:50 | fix: correct robots.ts to use Next.js metadata API |
| `16984d3` | 16:45 | fix: explicitly set Next.js framework in vercel.json |
| `0f168d2` | 16:40 | chore: add .env.example for contact form configuration |
| `3ac4575` | 16:35 | feat: add contact form API route with Nodemailer |
| `ae7eac7` | 16:30 | feat: add analytics, SEO, error handling, and remove unused GSAP |
| `867d57a` | 16:25 | docs: rewrite README.md for Next.js 15 architecture |
| `e48e2ec` | 16:20 | fix: remove broken noise.png reference and legacy vite.svg |
| `8334644` | 16:15 | feat: complete Next.js 15 migration with 14-section landing page |

---

## 12. How to Run

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
