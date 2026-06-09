'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCursor } from '@/components/providers/CursorProvider'

const navItems = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'Studio' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { setCursor } = useCursor()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavHover = useCallback((label: string) => {
    setCursor(label, 'expand')
  }, [setCursor])

  const handleNavLeave = useCallback(() => {
    setCursor(null, 'default')
  }, [setCursor])

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="max-w-content mx-auto px-6 md:px-10 flex items-center justify-between">
          <Link
            href="/"
            className="relative group"
            onMouseEnter={() => { setCursor('Home', 'expand') }}
            onMouseLeave={handleNavLeave}
          >
            <span className="text-xl font-display font-bold tracking-tight text-foreground">
              Brandex
              <span className="text-accent">.</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm text-muted hover:text-foreground transition-colors duration-400 group"
                onMouseEnter={() => handleNavHover(item.label)}
                onMouseLeave={handleNavLeave}
              >
                <span className="inline-block">{item.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="hidden md:inline-flex group"
            onMouseEnter={() => { setCursor('Start', 'expand') }}
            onMouseLeave={handleNavLeave}
          >
            <span className="relative text-sm text-foreground border border-border-light px-5 py-2.5 rounded-full overflow-hidden transition-all duration-500 hover:border-accent hover:bg-accent/10">
              <span className="relative z-10">Start a project</span>
            </span>
          </Link>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            onMouseEnter={() => { setCursor('Menu', 'expand') }}
            onMouseLeave={handleNavLeave}
            aria-label="Open menu"
          >
            <span className="block w-6 h-[1.5px] bg-foreground/80" />
            <span className="block w-4 h-[1.5px] bg-foreground/60" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[100] bg-background flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center"
                aria-label="Close menu"
              >
                <span className="block w-6 h-[1.5px] bg-foreground rotate-45 absolute" />
                <span className="block w-6 h-[1.5px] bg-foreground -rotate-45 absolute" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-4xl md:text-6xl font-display font-bold tracking-tight text-foreground/80 hover:text-foreground transition-colors duration-400"
                    onMouseEnter={() => handleNavHover(item.label)}
                    onMouseLeave={handleNavLeave}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg text-foreground border border-border-light px-8 py-3 rounded-full hover:bg-accent/10 hover:border-accent transition-all duration-400"
                  onMouseEnter={() => { setCursor('Start', 'expand') }}
                  onMouseLeave={handleNavLeave}
                >
                  Start a project
                </Link>
              </motion.div>
            </nav>

            <div className="p-6 text-center">
              <p className="text-xs text-muted tracking-[0.2em] uppercase">
                Digital Experience Studio
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
