'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useIsMobile } from '@/lib/hooks'
import { cn } from '@/lib/utils'

const navLinks = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Brand Strategy & Identity', desc: 'Strategy, identity, voice', href: '/services#brand-strategy' },
      { label: 'Web Platforms', desc: 'Next.js, headless CMS, motion', href: '/services#web-platforms' },
      { label: 'UI/UX & Product Design', desc: 'Research, design systems', href: '/services#ui-ux-product' },
      { label: 'SEO & Organic Growth', desc: 'Technical, content, digital PR', href: '/services#seo-growth' },
      { label: 'Performance Marketing', desc: 'Paid, lifecycle, attribution', href: '/services#performance-marketing' },
      { label: 'Mobile Apps', desc: 'iOS, Android, React Native', href: '/services#mobile-apps' },
    ],
  },
  {
    label: 'Work',
    href: '/portfolio',
    children: [
      { label: 'All Projects', desc: 'See the full portfolio', href: '/portfolio' },
      { label: 'SolarTech Energy', desc: 'Brand · Web · Growth', href: '/portfolio/solartech-energy' },
      { label: 'Drifto', desc: 'E-commerce · Brand', href: '/portfolio/drifto-fashion' },
      { label: 'FinFlow', desc: 'Design System · Product', href: '/portfolio/finflow' },
    ],
  },
  {
    label: 'Studio',
    href: '/about',
    children: [
      { label: 'About', desc: 'Our story and team', href: '/about' },
      { label: 'Process', desc: 'How we work', href: '/about#process' },
      { label: 'Insights', desc: 'Field notes & playbooks', href: '/#insights' },
      { label: 'Careers', desc: 'Join the studio', href: '/about#careers' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const { scrollY } = useScroll()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 30)
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleMenuEnter = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    const item = navLinks.find((l) => l.label === label)
    if (item?.children) {
      setActiveMenu(label)
      setHoveredItem(label)
    } else {
      setActiveMenu(null)
      setHoveredItem(label)
    }
  }, [])

  const handleMenuLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => {
      setActiveMenu(null)
      setHoveredItem(null)
    }, 150)
  }, [])

  const handleMenuStay = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const activeChildren = navLinks.find((l) => l.label === activeMenu)?.children

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX: useTransform(scrollY, [0, 1000], [0, 1]),
          background: 'linear-gradient(90deg, #5B5BFF, #7B7BFF, #5B5BFF)',
          boxShadow: '0 0 12px rgba(91,91,255,0.5)',
        }}
      />

      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="section-container">
          <motion.nav
            role="navigation"
            aria-label="Main navigation"
            className={cn(
              'flex items-center justify-between rounded-full px-2 py-2 transition-all duration-500',
              isScrolled ? 'glass-strong shadow-[0_8px_30px_rgba(0,0,0,0.3)]' : 'bg-transparent'
            )}
            onMouseLeave={handleMenuLeave}
          >
            <Link
              href="/"
              className="group flex items-center gap-2 pl-4 pr-6 py-2"
              data-cursor-hover
            >
              <motion.div
                className="relative w-8 h-8"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute inset-0 rounded-md bg-accent/20 blur-md" />
                <div className="relative w-full h-full rounded-md border border-accent/40 flex items-center justify-center bg-background/50">
                  <span className="text-accent font-display font-bold text-sm">B</span>
                </div>
              </motion.div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-base font-semibold tracking-tight text-white">BRANDEX</span>
                <span className="text-[9px] font-mono tracking-[0.25em] text-white/40 uppercase">Digital</span>
              </div>
            </Link>

            {!isMobile && (
              <div className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = hoveredItem === link.label
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => handleMenuEnter(link.label)}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          'relative px-5 py-3 text-sm font-medium tracking-wide transition-colors duration-300',
                          'flex items-center gap-1.5',
                          isActive ? 'text-white' : 'text-white/60 hover:text-white'
                        )}
                        data-cursor-hover
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="nav-active"
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                      </Link>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="flex items-center gap-2 pr-2">
              <Link
                href="/contact"
                className={cn(
                  'group relative inline-flex items-center gap-2 rounded-full overflow-hidden',
                  'px-6 py-3 text-sm font-medium uppercase tracking-[0.08em] text-white',
                  'bg-gradient-to-br from-accent to-accent-bright',
                  'shadow-[0_0_20px_rgba(91,91,255,0.3)]',
                  'hover:shadow-[0_0_40px_rgba(91,91,255,0.5)]',
                  'transition-shadow duration-500',
                  isMobile && 'hidden'
                )}
                data-cursor-hover
              >
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out-expo" />
                <span className="relative">Start a Project</span>
                <ArrowUpRight size={14} className="relative transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <button
                className="md:hidden text-white p-2"
                onClick={() => setIsOpen((v) => !v)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                data-cursor-hover
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </motion.nav>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {!isMobile && activeChildren && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 top-full"
              onMouseEnter={handleMenuStay}
              onMouseLeave={handleMenuLeave}
            >
              <div className="section-container pt-3">
                <div className="glass-strong rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                  <div className="grid grid-cols-2 gap-2">
                    {activeChildren.map((child, i) => (
                      <motion.div
                        key={child.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={child.href}
                          className="group flex items-center justify-between gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300"
                          data-cursor-hover
                        >
                          <div>
                            <div className="text-white font-display font-medium text-base mb-1 group-hover:text-accent transition-colors duration-300">
                              {child.label}
                            </div>
                            <div className="text-sm text-white/50">{child.desc}</div>
                          </div>
                          <ArrowUpRight
                            size={18}
                            className="text-white/30 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-3xl flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-1 flex flex-col items-start justify-center px-8 pt-32 pb-12 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full border-b border-white/5 py-4"
                >
                  <Link
                    href={link.href}
                    className="font-display text-3xl font-medium text-white hover:text-accent transition-colors flex items-center justify-between group"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                    <ArrowUpRight size={24} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </Link>
                  {link.children && (
                    <div className="mt-4 ml-1 space-y-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block text-sm text-white/50 hover:text-white transition-colors py-1"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.1, duration: 0.5 }}
                className="w-full mt-8 space-y-4"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 bg-accent text-white font-medium uppercase tracking-[0.08em] shadow-[0_0_30px_rgba(91,91,255,0.3)]"
                >
                  Start a Project
                  <ArrowUpRight size={16} />
                </Link>
                <a
                  href="mailto:brandexdigital.in@gmail.com"
                  className="block text-center text-sm text-white/50 hover:text-white transition-colors"
                >
                  brandexdigital.in@gmail.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
