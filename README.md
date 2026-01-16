# BrandX - Premium Technical Consultancy Website

A luxury, enterprise-grade consultancy website built with modern web technologies. Designed to communicate trust, professionalism, and complete project delivery.

## Overview

This is a premium technical consultancy website featuring:
- **Professional Design**: Dark luxury theme with high-contrast typography
- **Enterprise Appearance**: Minimal but stunning visuals communicating trust and authority
- **Smooth Animations**: Confident transitions without flashiness
- **Responsive Design**: Perfect across all devices
- **Multiple Service Pages**: Detailed offerings for social media, web development, and SEO

## Tech Stack

- **Vite** - Lightning-fast build tool and dev server
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **React Router v6** - Client-side routing for multiple pages
- **Tailwind CSS v4** - Utility-first CSS framework
- **PostCSS** - CSS transformation

## Project Structure

```
src/
├── components/
│   └── Navigation.tsx        # Fixed navigation with mobile support
├── pages/
│   ├── Home.tsx              # Homepage with hero and service overview
│   ├── SocialMediaMarketing.tsx  # Social media strategy details
│   ├── WebDevelopment.tsx    # Web development services
│   ├── SEO.tsx               # SEO services explanation
│   └── Contact.tsx           # Contact form and FAQ
├── App.tsx                   # Router setup
├── main.tsx                  # Entry point
└── index.css                 # Tailwind + custom styles
```

## Pages

### 1. Home (/)
- Powerful headline establishing authority
- Value proposition highlighting complete execution
- Primary CTA to start a project
- Service overview cards
- Trust indicators section

### 2. Social Media Marketing (/social-media)
- Strategic approach (4-step process)
- Platform mastery coverage
- Results and ROI focus
- Call to consultation

### 3. Web Development (/web-development)
- Production-ready standards
- Performance, security, scalability emphasis
- Modern tech stack showcase
- Development process breakdown
- Ongoing support commitment

### 4. SEO Services (/seo)
- Sustainable ranking strategy
- Technical SEO details
- On-page optimization
- Authority building approach
- Transparent reporting metrics
- Realistic timeline expectations

### 5. Contact (/contact)
- Clean contact form
- Success confirmation message
- Alternative contact methods
- FAQ section
- Professional tone throughout

## Design System

### Colors
- **Background**: Gray-950 (#0f172a) - Deep luxury black
- **Secondary**: Gray-900 (#111827) - Card backgrounds
- **Borders**: Gray-800 (#1f2937) - Subtle divisions
- **Text**: White, Gray-300, Gray-400 - High contrast
- **Accent**: Blue-500, Blue-400 - Subtle, professional highlights

### Typography
- **Font**: Inter system font stack
- **H1**: 3rem-4rem, bold, tracking-tight
- **H2**: 2.25rem-3rem, bold, tracking-tight
- **H3**: 1.5rem-2rem, bold, tracking-tight
- **Body**: 1rem, line-height 1.5

### Components
- `.btn-primary` - White background, dark text
- `.btn-secondary` - Bordered, white text with blue hover
- `.card` - Gray-900 background with gray-800 border
- `.section-container` - Max-width container with padding
- `.heading-*` - Typography hierarchy classes

## Getting Started

### Installation

```bash
cd /home/null/BrandX
npm install
```

### Development

```bash
npm run dev
```

The site will open at `http://localhost:5180/` (or the next available port).

### Build

```bash
npm run build
```

Production-optimized build output goes to `dist/`.

### Preview Build

```bash
npm run preview
```

## Features

### Navigation
- Fixed header with logo
- Desktop menu with active state indicators
- Mobile hamburger menu (responsive)
- Smooth transitions between pages

### Interactions
- Smooth page transitions (fade-in animation)
- Hover effects on cards and buttons
- Form validation and success feedback
- Active route highlighting

### Performance
- Optimized CSS (25.57 kB gzip)
- Efficient JavaScript bundling (266 kB uncompressed)
- Fast load times with Vite
- Production-ready optimization

## Customization

### Colors
Edit `tailwind.config.js` to customize the color palette. The design uses Tailwind's built-in gray scales for luxury appearance.

### Content
Update page content in `src/pages/` files. Each page is self-contained and easy to modify.

### Form Handling
The contact form in `src/pages/Contact.tsx` currently logs submissions to console. Integrate with your backend service by updating the `handleSubmit` function.

### Email Links
Update placeholder email addresses:
- `hello@brandx.com` in Contact.tsx

## Deployment

### Vite Build Output
The `npm run build` command creates a `dist/` folder ready for deployment.

### Recommended Hosts
- Vercel (optimal for Vite projects)
- Netlify
- AWS S3 + CloudFront
- Any static hosting with SPA routing support

### Environment Setup
No environment variables required for the default setup.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ support
- Mobile browsers fully supported

## Performance Metrics

- **Bundle Size**: 266.11 kB (80.34 kB gzip)
- **CSS Size**: 25.57 kB (4.88 kB gzip)
- **Build Time**: ~1.19s
- **Page Load**: Sub-second on modern connections

## Best Practices Implemented

✓ TypeScript for type safety
✓ Responsive design across all breakpoints
✓ Semantic HTML structure
✓ Smooth animations with proper performance
✓ Accessible form inputs and navigation
✓ Mobile-first design approach
✓ Production-optimized build
✓ Clean, maintainable code structure
✓ Professional naming conventions

---

**Created**: January 2026
**Status**: Production Ready
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
