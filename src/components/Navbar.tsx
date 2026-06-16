'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
  { href: '#about', label: 'About' },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()
  const isHome = pathname === '/'

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

  useEffect(() => {
    if (!isHome) return

    const sectionIds = navItems.map((item) => item.href.replace('#', ''))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [isHome])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.replace('#', '')
    if (isHome) {
      e.preventDefault()
      scrollToSection(id)
    }
    setMobileOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-2xl',
          scrolled
            ? 'glass-strong shadow-lg shadow-black/20 w-[calc(100%-2rem)] md:w-auto'
            : 'bg-transparent border-transparent w-[calc(100%-2rem)] md:w-auto'
        )}
      >
        <div className="flex items-center justify-between px-5 py-3 md:px-6 md:py-3">
          <a href="/" className="relative group">
            <span className="text-xl font-display font-bold tracking-tight text-foreground">
              Brandex
              <span className="text-accent">.</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 ml-12">
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '')
              const isActive = isHome && activeSection === sectionId
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'relative text-sm transition-colors duration-200',
                    isActive ? 'text-accent' : 'text-muted hover:text-foreground'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden md:inline-flex items-center px-5 py-2.5 btn-gradient text-sm"
          >
            Start Your Project
          </a>

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
            className="fixed inset-0 z-[100] bg-background flex flex-col"
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
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-3xl md:text-5xl font-display font-bold tracking-tight text-foreground/80 hover:text-foreground transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8"
              >
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="inline-flex px-8 py-3 btn-gradient text-sm"
                >
                  Start Your Project
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
