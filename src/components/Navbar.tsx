'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'py-3 bg-white/90 backdrop-blur-md border-b border-border'
            : 'py-5 bg-transparent'
        )}
      >
        <div className="max-w-content mx-auto px-6 md:px-10 flex items-center justify-between">
          <Link href="/" className="relative group">
            <span className="text-xl font-display font-bold tracking-tight text-foreground">
              Brandex
              <span className="text-accent">.</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm text-muted hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-dark transition-colors duration-200"
          >
            Start Your Project
          </Link>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Open menu"
          >
            <span className="block w-6 h-[1.5px] bg-foreground/80 transition-transform duration-300" />
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center relative"
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-3xl md:text-5xl font-display font-bold tracking-tight text-foreground/80 hover:text-foreground transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex px-8 py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-dark transition-colors duration-200"
                >
                  Start Your Project
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
