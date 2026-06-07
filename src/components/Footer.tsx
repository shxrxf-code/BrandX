'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUp, ArrowUpRight, Mail, Phone, MapPin, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

const footerSections = [
  {
    label: 'Capabilities',
    links: [
      { label: 'Brand Strategy', href: '/services#brand-strategy' },
      { label: 'Web Platforms', href: '/services#web-platforms' },
      { label: 'UI/UX & Product', href: '/services#ui-ux-product' },
      { label: 'SEO & Growth', href: '/services#seo-growth' },
      { label: 'Performance Marketing', href: '/services#performance-marketing' },
      { label: 'Mobile Apps', href: '/services#mobile-apps' },
    ],
  },
  {
    label: 'Studio',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Work', href: '/portfolio' },
      { label: 'Process', href: '/about#process' },
      { label: 'Insights', href: '/#insights' },
      { label: 'Careers', href: '/about#careers' },
    ],
  },
  {
    label: 'Connect',
    links: [
      { label: 'Start a Project', href: '/contact' },
      { label: 'Press Kit', href: '#' },
      { label: 'Partnerships', href: '/contact' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'Instagram', href: 'https://instagram.com' },
    ],
  },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
  { label: 'X', href: 'https://x.com' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const handle = () => setShowBackToTop(window.scrollY > 800)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 4000)
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <footer
        ref={ref}
        className="relative pt-24 pb-8 border-t border-white/[0.06] overflow-hidden"
      >
        {/* Background accents */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[180px] pointer-events-none" />

        <div className="section-container relative z-10">
          {/* Top: Newsletter + brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-12 gap-12 mb-20 pb-16 border-b border-white/[0.06]"
          >
            <div className="lg:col-span-7">
              <h3 className="font-display text-3xl md:text-5xl font-semibold text-white leading-[1.05] tracking-tight max-w-xl">
                The Brandex Briefing — monthly playbooks from the studio.
              </h3>
              <p className="text-white/50 mt-4 max-w-lg">
                Brand strategy, design systems, growth experiments, and the
                occasional Awwwards deep-dive. No fluff, ever.
              </p>
            </div>
            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="relative">
                <div className="relative flex items-center glass-elevated border border-white/[0.08] rounded-full p-1.5 focus-within:border-accent/40 transition-colors">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent text-white placeholder:text-white/30 px-5 py-3 text-sm focus:outline-none"
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-bright transition-colors shadow-[0_0_20px_rgba(91,91,255,0.3)]"
                    data-cursor-hover
                  >
                    <span className="hidden sm:inline">Subscribe</span>
                    <Send size={14} />
                  </button>
                </div>
                <AnimatePresence>
                  {subscribed && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-accent text-xs mt-3 ml-5 font-mono uppercase tracking-wider"
                    >
                      ✓ Subscribed. Welcome to the briefing.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

          {/* Middle: Links + brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-12 gap-12 mb-20"
          >
            {/* Brand */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-3 mb-6 group" data-cursor-hover>
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 rounded-lg bg-accent/30 blur-md group-hover:bg-accent/50 transition-colors" />
                  <div className="relative w-full h-full rounded-lg border border-accent/50 flex items-center justify-center bg-background/60">
                    <span className="text-accent font-display font-bold text-lg">B</span>
                  </div>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-display text-lg font-semibold tracking-tight text-white">BRANDEX</span>
                  <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">Digital</span>
                </div>
              </Link>
              <p className="text-white/55 text-sm leading-relaxed max-w-sm mb-8">
                A premium digital transformation partner helping ambitious brands
                dominate online. Strategy, design, technology, and growth —
                engineered for measurable impact.
              </p>

              <div className="space-y-3 text-sm">
                <a
                  href="mailto:brandexdigital.in@gmail.com"
                  className="flex items-center gap-3 text-white/60 hover:text-accent transition-colors group"
                  data-cursor-hover
                >
                  <Mail size={14} className="text-white/30 group-hover:text-accent transition-colors" />
                  brandexdigital.in@gmail.com
                </a>
                <a
                  href="tel:+9170100096308"
                  className="flex items-center gap-3 text-white/60 hover:text-accent transition-colors group"
                  data-cursor-hover
                >
                  <Phone size={14} className="text-white/30 group-hover:text-accent transition-colors" />
                  +91 70100 096308
                </a>
                <div className="flex items-center gap-3 text-white/60">
                  <MapPin size={14} className="text-white/30" />
                  India · Global Reach
                </div>
              </div>
            </div>

            {/* Link columns */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
              {footerSections.map((section) => (
                <div key={section.label}>
                  <h4 className="text-eyebrow uppercase tracking-[0.2em] text-white/40 font-medium mb-5">
                    {section.label}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                          data-cursor-hover
                        >
                          <span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden">
                            <ArrowUpRight size={10} className="text-accent" />
                          </span>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Giant wordmark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="relative -mx-6 md:-mx-12 lg:-mx-16 mb-12 select-none pointer-events-none"
          >
            <div
              className="font-display font-bold tracking-[-0.05em] text-center"
              style={{
                fontSize: 'clamp(4rem, 18vw, 18rem)',
                lineHeight: 0.85,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              BRANDEX
            </div>
          </motion.div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06] text-xs text-white/40">
            <div className="flex flex-wrap items-center gap-6">
              <span>© {currentYear} Brandex Digital. All rights reserved.</span>
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
            </div>
            <div className="flex items-center gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                  data-cursor-hover
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full glass-strong border border-white/10 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent/40 transition-colors"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            data-cursor-hover
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
