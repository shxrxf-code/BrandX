# BrandX — Project Status & Reference Document

> **Generated:** May 19, 2026
> **Status:** Active Development — Major refactor from Vite/SPA to Next.js 15 App Router
> **Branch:** `main` (up to date with `origin/main`)

---

## 1. Project Overview

**BrandX** (branded as **Brandex Digital**) is a premium digital agency website designed to communicate trust, technical excellence, and creative sophistication. The site is a single-page cinematic experience with smooth scroll, custom cursor, preloader, parallax effects, and extensive Framer Motion animations.

The project underwent a **major architectural migration** from a Vite + React Router SPA (with multiple pages: Home, SocialMediaMarketing, WebDevelopment, SEO, Contact) to a **Next.js 15 App Router** single-page landing site. The current version is a polished, production-ready landing page with 14 distinct sections.

### Current State
- Framework migrated from Vite → Next.js 15
- React upgraded from v18 → v19
- Routing changed from React Router → single-page layout with anchor navigation
- Multiple page routes consolidated into one `page.tsx` with section-based navigation
- New UI component library and effects system created
- **15 modified files** and **7 untracked new files** awaiting commit

---

## 2. Full Architecture

### File Tree

```
BrandX/
├── .next/                              # Next.js build output (deleted/stale)
├── public/                             # Static assets (noise.png referenced)
├── src/
│   ├── app/
│   │   ├── globals.css                 # Global styles, Tailwind layers, CSS utilities (502 lines)
│   │   ├── layout.tsx                  # Root layout with fonts, Preloader, Cursor, SmoothScroll
│   │   └── page.tsx                    # Main page — composes all 14 sections
│   ├── components/
│   │   ├── effects/
│   │   │   ├── AnimatedGrid.tsx        # Canvas-based animated dot grid background
│   │   │   ├── GradientOrbs.tsx        # Mouse-reactive gradient blur orbs
│   │   │   └── Particles.tsx           # Canvas-based floating particle system
│   │   ├── ui/
│   │   │   ├── AnimatedCounter.tsx     # Scroll-triggered animated number counter
│   │   │   ├── Cursor.tsx              # Custom spring-animated cursor with hover states
│   │   │   ├── GlowCard.tsx            # 3D tilt card with radial gradient glow follow
│   │   │   ├── MagneticButton.tsx      # Magnetic pull button (primary/secondary/ghost)
│   │   │   ├── Marquee.tsx             # Infinite scrolling text marquee
│   │   │   ├── ParallaxImage.tsx       # Scroll-linked parallax image component
│   │   │   ├── ScrollReveal.tsx        # Directional scroll-triggered reveal wrapper
│   │   │   └── TextReveal.tsx          # Word-by-word staggered text animation
│   │   ├── About.tsx                   # Two-column about section with team image + values
│   │   ├── CTA.tsx                     # Final call-to-action with marquee background
│   │   ├── FAQ.tsx                     # [NEW] Accordion FAQ with animated expand/collapse
│   │   ├── Footer.tsx                  # Multi-column footer with links, contact, socials
│   │   ├── Hero.tsx                    # Full-screen hero with floating cards + stats
│   │   ├── Metrics.tsx                 # [NEW] Animated counter metrics section
│   │   ├── Navbar.tsx                  # [NEW] Fixed glass navbar with mobile menu
│   │   ├── Portfolio.tsx               # Asymmetric bento-grid project showcase
│   │   ├── Preloader.tsx               # Animated loading screen with progress bar
│   │   ├── Process.tsx                 # 6-step alternating timeline with progress bar
│   │   ├── Services.tsx                # 3-column service cards with glow effects
│   │   ├── SmoothScroll.tsx            # Lenis smooth scroll wrapper
│   │   ├── TechStack.tsx               # [NEW] Technology proficiency grid with bars
│   │   ├── Testimonials.tsx            # 3-column client testimonial cards
│   │   ├── Trust.tsx                   # Trust indicator stats bar
│   │   └── WhyBrandex.tsx              # [NEW] Sticky sidebar + reason cards section
│   ├── lib/
│   │   └── utils.ts                    # cn() utility (clsx + tailwind-merge)
├── next.config.js                      # Next.js config (strict mode, Unsplash images)
├── tailwind.config.js                  # Extensive design system (194 lines)
├── tsconfig.json                       # TypeScript config (ES2017, path aliases)
├── postcss.config.js                   # Tailwind + Autoprefixer
├── vercel.json                         # SPA rewrites + API routing
├── package.json                        # Dependencies and scripts
├── README.md                           # Outdated (references old Vite setup)
├── CONTACT_FORM_SETUP.md               # Email API configuration guide
└── PROJECT_STATUS.md                   # This file
```

### Component Hierarchy

```
RootLayout
├── Preloader                           # Full-screen loading animation
├── Cursor                              # Custom cursor (ring + dot)
├── SmoothScroll (Lenis wrapper)
│   └── <main>
│       ├── Navbar                      # Fixed glass nav + mobile fullscreen menu
│       ├── Hero                        # Full-viewport hero section
│       │   ├── GradientOrbs            # Background effect
│       │   └── Particles               # Background effect
│       ├── Trust                       # Stats bar
│       ├── Services                    # Service cards grid
│       │   └── GlowCard (×6)           # Card wrapper per service
│       ├── Portfolio                   # Project grid
│       ├── Process                     # Timeline with animated progress
│       ├── About                       # Two-column layout
│       ├── Metrics                     # Counter metrics
│       │   └── AnimatedCounter (×4)    # Per metric
│       ├── TechStack                   # Tech proficiency grid
│       ├── Testimonials                # Client quotes
│       ├── WhyBrandex                  # Sticky sidebar + cards
│       ├── FAQ                         # Accordion
│       ├── CTA                         # Final CTA
│       │   └── Marquee                 # Scrolling text
│       └── Footer                      # Site footer
└── .noise                              # SVG noise overlay (fixed)
```

---

## 3. Completed Sections & Features

| # | Section | ID Anchor | Key Features |
|---|---------|-----------|--------------|
| 1 | **Navbar** | — | Fixed glass pill nav, scroll-aware state, mobile fullscreen overlay, staggered link animations, MagneticButton CTA |
| 2 | **Hero** | — | Full-viewport, 3D word reveal animation, gradient text, floating glass cards with icons, scroll parallax (y/opacity/scale), dual CTAs, inline stats, scroll indicator |
| 3 | **Trust** | — | 4-column stat counters with hover scale, scroll-reveal stagger, accent-colored suffixes |
| 4 | **Services** | `#services` | 6 service cards in 3-col grid, GlowCard with mouse-tracking radial glow, icon badges, tag pills |
| 5 | **Portfolio** | `#work` | Asymmetric 12-column bento grid, grayscale→color hover, image scale on hover, external link button with rotation |
| 6 | **Process** | `#process` | 6-step alternating timeline, animated gradient progress line, large watermark numbers, detail tag pills |
| 7 | **About** | `#about` | Two-column split, team image with glass quote overlay, 4 value props with accent border, decorative blur orbs |
| 8 | **Metrics** | — | 4-column animated counters, gradient text, hover scale, background gradient band |
| 9 | **TechStack** | — | 12 tech items in 4-col grid, glass cards, animated proficiency bars on scroll |
| 10 | **Testimonials** | — | 3-column quote cards, glass-card styling, avatar initials with gradient backgrounds |
| 11 | **WhyBrandex** | — | Sticky left sidebar, 4 numbered reason cards with hover scale, large watermark numbers |
| 12 | **FAQ** | — | 6 accordion items, animated expand/collapse, rotating +/- icon, scroll-reveal |
| 13 | **CTA** | `#contact` | Scroll-linked scale/opacity, gradient heading, dual MagneticButtons, background marquee text |
| 14 | **Footer** | — | 5-column grid, animated link arrows, contact info with icons, social links, copyright bar |

---

## 4. Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `background.DEFAULT` | `#050505` | Page background |
| `background.secondary` | `#0A0A0A` | Card/image backgrounds |
| `background.tertiary` | `#0F0F0F` | Deep surfaces |
| `background.elevated` | `#141414` | Elevated surfaces |
| `surface.DEFAULT` | `#1A1A1A` | Interactive surfaces |
| `surface.hover` | `#222222` | Hover states |
| `border.subtle` | `rgba(255,255,255,0.06)` | Subtle dividers |
| `border.DEFAULT` | `rgba(255,255,255,0.1)` | Standard borders |
| `border.bright` | `rgba(255,255,255,0.15)` | Prominent borders |
| `text.primary` | `#FFFFFF` | Headings, primary text |
| `text.secondary` | `rgba(255,255,255,0.60)` | Body text |
| `text.muted` | `rgba(255,255,255,0.35)` | Labels, captions |
| `text.faint` | `rgba(255,255,255,0.15)` | Watermarks |
| `accent.blue` | `#3B82F6` | Primary accent |
| `accent.blue-dim` | `#2563EB` | Dimmed blue |
| `accent.purple` | `#A855F7` | Secondary accent |
| `accent.purple-dim` | `#7C3AED` | Dimmed purple |
| `accent.cyan` | `#22D3EE` | Tertiary accent |
| `accent.cyan-dim` | `#06B6D4` | Dimmed cyan |
| `accent.violet` | `#8B5CF6` | Quaternary accent |
| `glow.blue` | `rgba(59,130,246,0.15)` | Blue glow effects |
| `glow.purple` | `rgba(168,85,247,0.15)` | Purple glow effects |
| `glow.cyan` | `rgba(34,211,238,0.15)` | Cyan glow effects |

### Typography

| Token | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|----------------|-------|
| `display` | `clamp(3rem, 8vw, 8rem)` | 0.95 | -0.04em | Largest display text |
| `hero` | `clamp(2.5rem, 7vw, 7rem)` | 1.0 | -0.03em | Hero headings |
| `section` | `clamp(2rem, 5vw, 5rem)` | 1.05 | -0.03em | Section headings |
| `heading` | `clamp(1.5rem, 3vw, 3rem)` | 1.1 | -0.02em | Sub-section headings |
| `subheading` | `clamp(1.125rem, 2vw, 1.5rem)` | 1.3 | -0.01em | Subheadings |
| `body-lg` | `1.25rem` | 1.6 | — | Large body text |
| `body` | `1rem` | 1.6 | — | Standard body |
| `body-sm` | `0.875rem` | 1.5 | — | Small body |
| `caption` | `0.75rem` | 1.4 | 0.05em | Captions, labels |

**Font Families:**
- `font-sans` → Inter (`--font-inter`)
- `font-display` → Space Grotesk (`--font-space-grotesk`)

### CSS Utility Classes (defined in `globals.css`)

| Class | Description |
|-------|-------------|
| `.noise` | Fixed SVG noise overlay (z-9999, pointer-events none) |
| `.glass` | Frosted glass: `bg-white/[0.03]`, `backdrop-blur-2xl`, subtle border |
| `.glass-strong` | Stronger glass: `bg-white/[0.06]`, `backdrop-blur-3xl` |
| `.glass-card` | Card glass with hover state (bg brightens, blue glow appears) |
| `.text-gradient` | White-to-transparent vertical gradient text |
| `.text-gradient-blue` | Blue→Cyan→Purple animated gradient text |
| `.text-gradient-purple` | Purple→Violet→Blue animated gradient text |
| `.text-glow` / `.text-glow-blue` / `.text-glow-purple` | Colored text shadow glow |
| `.glow-orb` / `.glow-orb-blue` / `.glow-orb-purple` / `.glow-orb-cyan` | Large blurred color orbs |
| `.glow-border` | Gradient border that appears on hover |
| `.magnetic-btn` | Button with mouse-tracking radial highlight |
| `.btn-primary` | White bg button → blue on hover with glow |
| `.btn-secondary` | Transparent bordered button |
| `.section-container` | `max-w-7xl mx-auto px-6 md:px-8 lg:px-12` |
| `.section-padding` | `py-24 md:py-32 lg:py-40` |
| `.border-gradient` | Gradient border via pseudo-element |
| `.animated-border` | Animated flowing gradient border |
| `.hover-lift` | translateY(-8px) + shadow on hover |
| `.image-reveal` | Clip-path reveal animation |
| `.line-through-hover` | Animated underline on hover |
| `.marquee-container` / `.marquee-content` | Infinite scroll marquee |
| `.dot-grid` | Dot pattern background |
| `.grid-lines` | Grid line background |
| `.shimmer-text` | Shimmer animation on text |
| `.perspective-container` / `.tilt-card` | 3D perspective transforms |
| `.blend-difference` | `mix-blend-mode: difference` |

### Utility Layer Classes

| Class | Description |
|-------|-------------|
| `.mask-radial` | Radial gradient mask |
| `.mask-linear` | Linear gradient mask (top fade) |
| `.mask-linear-top` | Linear gradient mask (bottom fade) |
| `.no-scrollbar` | Hide scrollbar |
| `.will-change-transform` / `.will-change-opacity` | Performance hints |
| `.gpu-accelerated` | `translateZ(0)` + `backface-visibility: hidden` |
| `.text-stroke` / `.text-stroke-thick` | Outlined text |

### Animations (Tailwind config)

| Animation | Duration | Easing | Description |
|-----------|----------|--------|-------------|
| `fade-in` | 0.8s | ease-out | Opacity 0→1 |
| `fade-in-slow` | 1.5s | ease-out | Slow opacity |
| `slide-up` | 0.8s | out-expo | TranslateY 60px→0 |
| `slide-down` | 0.8s | out-expo | TranslateY -40px→0 |
| `slide-left` | 0.8s | out-expo | TranslateX 60px→0 |
| `slide-right` | 0.8s | out-expo | TranslateX -60px→0 |
| `scale-in` | 0.6s | out-expo | Scale 0.9→1 |
| `float` | 6s | ease-in-out | Infinite float (loop) |
| `float-slow` | 8s | ease-in-out | Slow float |
| `float-fast` | 4s | ease-in-out | Fast float |
| `pulse-slow` | 4s | cubic | Slow pulse |
| `pulse-glow` | 3s | ease-in-out | Glow pulse with scale |
| `marquee` | 30s | linear | Infinite scroll |
| `marquee-fast` | 20s | linear | Fast marquee |
| `spin-slow` | 20s | linear | Slow rotation |
| `shimmer` | 2s | ease-in-out | Shimmer sweep |
| `gradient` | 8s | ease | Gradient position shift |
| `border-flow` | 3s | linear | Animated border gradient |
| `text-reveal` | 1s | out-expo | Clip-path text reveal |
| `blur-in` | 0.8s | ease-out | Blur 20px→0 |
| `morph` | 8s | ease-in-out | Border-radius morphing |

### Custom Easing Curves

| Name | Value |
|------|-------|
| `out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `in-expo` | `cubic-bezier(0.76, 0, 0.24, 1)` |
| `in-out-expo` | `cubic-bezier(0.87, 0, 0.13, 1)` |
| `spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

### Box Shadows

| Token | Value |
|-------|-------|
| `glow-blue` | `0 0 40px rgba(59,130,246,0.3), 0 0 80px rgba(59,130,246,0.1)` |
| `glow-purple` | `0 0 40px rgba(168,85,247,0.3), 0 0 80px rgba(168,85,247,0.1)` |
| `glow-cyan` | `0 0 40px rgba(34,211,238,0.3), 0 0 80px rgba(34,211,238,0.1)` |
| `inner-glow` | `inset 0 0 40px rgba(255,255,255,0.05)` |
| `card` | `0 4px 24px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.2)` |
| `card-hover` | `0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)` |
| `elevated` | `0 20px 60px rgba(0,0,0,0.5)` |

---

## 5. Tech Stack & Dependencies

### Core Framework
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | ^15.1.3 | React framework (App Router) |
| `react` | ^19.0.0 | UI library |
| `react-dom` | ^19.0.0 | React DOM renderer |
| `typescript` | ^5.3.3 | Type safety |

### Styling
| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | ^3.4.1 | Utility-first CSS |
| `autoprefixer` | ^10.4.17 | CSS vendor prefixes |
| `postcss` | ^8.4.35 | CSS transformation |
| `clsx` | ^2.1.1 | Conditional class names |
| `tailwind-merge` | ^3.6.0 | Tailwind class conflict resolution |

### Animation & Interaction
| Package | Version | Purpose |
|---------|---------|---------|
| `framer-motion` | ^11.11.17 | React animation library |
| `gsap` | ^3.12.5 | GreenSock animation (installed, not yet used) |
| `lenis` | ^1.3.23 | Smooth scroll library |

### Icons
| Package | Version | Purpose |
|---------|---------|---------|
| `lucide-react` | ^1.16.0 | Icon library |

### Analytics
| Package | Version | Purpose |
|---------|---------|---------|
| `@vercel/analytics` | ^1.6.1 | Vercel analytics (installed, not yet integrated) |

### Dev Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `eslint` | ^9.39.4 | Linting |
| `eslint-config-next` | ^15.1.3 | Next.js ESLint rules |
| `@eslint/js` | ^9.39.4 | ESLint core |
| `@next/eslint-plugin-next` | ^15.5.18 | Next.js specific rules |
| `@types/react` | ^19.0.0 | React types |
| `@types/react-dom` | ^19.0.0 | ReactDOM types |
| `@types/node` | ^20.11.5 | Node types |

### NPM Scripts

| Script | Command |
|--------|---------|
| `dev` | `next dev` |
| `build` | `next build` |
| `lint` | `next lint` |
| `start` | `next start` |

---

## 6. Component Inventory

### Section Components (`src/components/`)

| Component | Lines | Type | Dependencies | Description |
|-----------|-------|------|--------------|-------------|
| `Navbar.tsx` | 146 | Client | framer-motion, lucide-react, MagneticButton | Fixed glass pill navigation with scroll detection, mobile fullscreen menu with staggered animations |
| `Hero.tsx` | 165 | Client | framer-motion, lucide-react, GradientOrbs, Particles, MagneticButton, ScrollReveal | Full-viewport hero with 3D word reveal, floating glass cards, scroll parallax, inline stats |
| `Trust.tsx` | 54 | Client | framer-motion, ScrollReveal | 4-column trust stats with hover scale and scroll-reveal |
| `Services.tsx` | 104 | Client | framer-motion, lucide-react, GlowCard, ScrollReveal | 6 service cards in responsive grid with glow effects and tag pills |
| `Portfolio.tsx` | 112 | Client | framer-motion, lucide-react, ScrollReveal | Asymmetric bento-grid project showcase with grayscale→color hover |
| `Process.tsx` | 125 | Client | framer-motion, ScrollReveal | 6-step alternating timeline with animated gradient progress line |
| `About.tsx` | 74 | Client | framer-motion, ScrollReveal | Two-column about with team image, glass quote overlay, 4 value props |
| `Metrics.tsx` | 59 | Client | framer-motion, AnimatedCounter, ScrollReveal | 4-column animated counter metrics with gradient text |
| `TechStack.tsx` | 70 | Client | framer-motion, ScrollReveal | 12-item tech proficiency grid with animated bars |
| `Testimonials.tsx` | 73 | Client | framer-motion, lucide-react, ScrollReveal | 3-column client testimonial cards with quote icons |
| `WhyBrandex.tsx` | 90 | Client | framer-motion, lucide-react, ScrollReveal | Sticky sidebar + 4 numbered reason cards |
| `FAQ.tsx` | 96 | Client | framer-motion, lucide-react, ScrollReveal | 6-item accordion with animated expand/collapse |
| `CTA.tsx` | 82 | Client | framer-motion, MagneticButton, ScrollReveal, Marquee | Final CTA with scroll-linked scale, marquee background |
| `Footer.tsx` | 151 | Client | framer-motion, lucide-react | Multi-column footer with animated link arrows |
| `Preloader.tsx` | 114 | Client | framer-motion | Full-screen loading screen with progress bar, cycling text, slide-up exit |
| `SmoothScroll.tsx` | 33 | Client | lenis | Lenis smooth scroll wrapper with RAF loop |

### UI Components (`src/components/ui/`)

| Component | Lines | Props | Description |
|-----------|-------|-------|-------------|
| `AnimatedCounter.tsx` | 63 | `value`, `suffix?`, `prefix?`, `className?`, `duration?` | Scroll-triggered counter with eased animation (cubic ease-out) |
| `Cursor.tsx` | 97 | `enabled?` | Custom cursor with spring-physics ring + dot, hover detection, `data-cursor-label` support, auto-disabled on touch |
| `GlowCard.tsx` | 81 | `children`, `className?`, `glowColor?`, `intensity?`, `tilt?` | 3D tilt card with mouse-following radial gradient glow (blue/purple/cyan/white) |
| `MagneticButton.tsx` | 79 | `children`, `className?`, `variant?`, `onClick?`, `href?`, `strength?` | Magnetic pull button with primary/secondary/ghost variants |
| `Marquee.tsx` | 40 | `items`, `speed?`, `direction?`, `className?`, `itemClassName?` | Infinite scrolling text marquee, configurable speed and direction |
| `ParallaxImage.tsx` | 42 | `src`, `alt`, `className?`, `strength?`, `rounded?` | Scroll-linked parallax image with y-transform and scale |
| `ScrollReveal.tsx` | 73 | `children`, `className?`, `delay?`, `duration?`, `direction?`, `distance?`, `once?`, `threshold?` | Wrapper for scroll-triggered directional reveal animations |
| `TextReveal.tsx` | 84 | `text`, `className?`, `delay?`, `staggerDelay?`, `as?`, `wordByWord?`, `blurIn?` | Word-by-word staggered text reveal with optional blur effect |

### Effects Components (`src/components/effects/`)

| Component | Lines | Props | Description |
|-----------|-------|-------|-------------|
| `AnimatedGrid.tsx` | 82 | `cellSize?`, `opacity?`, `color?`, `className?` | Canvas-based animated dot grid with distance-based wave opacity |
| `GradientOrbs.tsx` | 68 | `count?`, `className?` | Mouse-reactive gradient blur orbs (blue/purple/cyan) with spring physics |
| `Particles.tsx` | 93 | `count?`, `speed?`, `size?`, `color?`, `className?` | Canvas-based floating particle system with wrap-around |

### Utility

| File | Lines | Description |
|------|-------|-------------|
| `src/lib/utils.ts` | 6 | `cn()` — clsx + tailwind-merge utility for conditional class composition |

---

## 7. Known Issues

### Critical
1. **Dev server not responding** — `.next/` build artifacts have been deleted; `npm run dev` needs to be run to regenerate them
2. **Missing `public/noise.png`** — `globals.css` references a noise overlay via SVG data URI (inline), but `tailwind.config.js` also references `url('/noise.png')` in `backgroundImage.noise`. The actual file may not exist in `/public/`

### Warnings
3. **Outdated README.md** — Still references old Vite + React Router setup with multi-page structure. Does not reflect current Next.js 15 architecture
4. **Uncommitted changes** — 15 modified files + 7 new untracked files (FAQ, Metrics, Navbar, TechStack, WhyBrandex, effects/, ui/) need to be staged and committed
5. **GSAP installed but unused** — `gsap` is in dependencies but no component currently imports it
6. **@vercel/analytics installed but unused** — Package is in dependencies but not imported in `layout.tsx` or anywhere else
7. **CONTACT_FORM_SETUP.md references old structure** — Mentions `src/pages/Contact.tsx` and `api/contact.ts` which don't exist in the current Next.js App Router structure
8. **Portfolio images use external Unsplash URLs** — No local fallbacks; relies on external CDN availability
9. **No API routes implemented** — `vercel.json` has API rewrites but no `/api/` route files exist in `src/app/`
10. **No `next.config.js` TypeScript validation** — Uses `module.exports` instead of TypeScript config

### Minor
11. **Hardcoded email/phone in Footer** — `brandexdigital.in@gmail.com` and `+91 70100 096308` are real values
12. **All social links point to `#`** — No actual social media URLs configured
13. **No Open Graph image** — `metadata` in `layout.tsx` doesn't include an `openGraph.images` entry
14. **No robots.txt or sitemap** — SEO basics not implemented

---

## 8. Pending Tasks

### From Project Analysis (no formal TODO file exists)

#### High Priority
- [ ] **Commit current changes** — 15 modified + 7 new files need to be staged and committed
- [ ] **Regenerate `.next/` build** — Run `npm run dev` or `npm run build`
- [ ] **Add `public/noise.png`** or remove the reference from `tailwind.config.js`
- [ ] **Update README.md** to reflect Next.js 15 architecture

#### Medium Priority
- [ ] **Implement Vercel Analytics** — Import and use `@vercel/analytics` in `layout.tsx`
- [ ] **Create API route for contact form** — Migrate from old `api/contact.ts` to `src/app/api/contact/route.ts`
- [ ] **Add environment variables** — Set up `.env.local` for email configuration
- [ ] **Add Open Graph image** — Generate and add `og:image` to metadata
- [ ] **Create `robots.txt` and `sitemap.xml`** — Basic SEO setup
- [ ] **Update hardcoded contact info** — Replace placeholder email/phone with real values
- [ ] **Add real social media URLs** — Replace `#` placeholders

#### Low Priority
- [ ] **Remove or use GSAP** — Either integrate GSAP for additional animations or remove from dependencies
- [ ] **Add error boundary** — Next.js `error.tsx` and `not-found.tsx` in `src/app/`
- [ ] **Add loading states** — `loading.tsx` for route-level loading UI
- [ ] **Performance audit** — Lighthouse testing, optimize bundle size
- [ ] **Accessibility audit** — ARIA labels, keyboard navigation, focus states
- [ ] **Add real portfolio images** — Replace Unsplash URLs with actual project screenshots
- [ ] **Implement dark/light mode toggle** — Currently dark-only
- [ ] **Add blog/careers pages** — If multi-page routing is needed in the future

---

## 9. Recent Changes (This Session)

### Git History (last 5 commits)

| Commit | Message |
|--------|---------|
| `b9c6841` | Fix ESLint and dependency setup |
| `ec0bdb1` | chore: add ESLint configuration with Next.js plugin |
| `e0cda63` | Add hot update files for webpack with new hash values |
| `6a8cfd6` | Refactor code structure for improved readability and maintainability |
| `35a3d6b` | feat: Update About and Process components with improved layout and animations |

### Uncommitted Changes (Working Directory)

**Modified files (15):**
- `src/app/globals.css` — Extended with new CSS utilities, animations, and component styles
- `src/app/layout.tsx` — Updated with Preloader, Cursor, SmoothScroll wrappers
- `src/app/page.tsx` — Rebuilt with 14 section imports
- `src/components/About.tsx` — Improved two-column layout with values grid
- `src/components/CTA.tsx` — Added Marquee, scroll-linked transforms
- `src/components/Footer.tsx` — Multi-column layout with animated link arrows
- `src/components/Hero.tsx` — Added floating cards, scroll parallax, stats
- `src/components/Portfolio.tsx` — Bento grid with hover effects
- `src/components/Preloader.tsx` — Progress bar with cycling text
- `src/components/Process.tsx` — Alternating timeline with progress line
- `src/components/Services.tsx` — GlowCard integration
- `src/components/SmoothScroll.tsx` — Lenis configuration
- `src/components/Testimonials.tsx` — Glass card testimonials
- `src/components/Trust.tsx` — Scroll-reveal stats
- `tailwind.config.js` — Extended with full design system

**New untracked files (7):**
- `src/components/FAQ.tsx` — Accordion FAQ component
- `src/components/Metrics.tsx` — Animated counter metrics
- `src/components/Navbar.tsx` — Fixed glass navigation
- `src/components/TechStack.tsx` — Tech proficiency grid
- `src/components/WhyBrandex.tsx` — Sticky sidebar + cards
- `src/components/effects/` — AnimatedGrid, GradientOrbs, Particles
- `src/components/ui/` — AnimatedCounter, Cursor, GlowCard, MagneticButton, Marquee, ParallaxImage, ScrollReveal, TextReveal

---

## 10. How to Run the Project

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm, yarn, or pnpm

### Installation

```bash
cd /home/gojo/Projects/BrandX
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:3000` (or the next available port).

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

### Deployment (Vercel)

The project is configured for Vercel deployment with:
- `vercel.json` for SPA rewrites
- `next.config.js` with Unsplash image remote patterns
- Required environment variables for contact form:
  ```
  EMAIL_HOST=smtp.gmail.com
  EMAIL_PORT=587
  EMAIL_USER=brandexdigital.in@gmail.com
  EMAIL_PASS=<app-password>
  ```

### Project URLs
- **Live site:** `https://brandexdigital.in` (configured in metadata)
- **Locale:** `en_IN`

---

*This document is auto-generated and should be updated after significant project changes.*
