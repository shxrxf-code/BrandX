'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import MagneticButton from './ui/MagneticButton'
import { useIsMobile } from '@/lib/hooks'
import { useNavigation } from '@/components/NavigationProvider'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const isMobile = useIsMobile()
  const { navigate, isTransitioning } = useNavigation()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const { scrollY, scrollYProgress } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    )

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

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

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    navigate(href, e)
    if (isOpen) setIsOpen(false)
  }

  return (
    <>
      {/* Scroll progress bar */}
      {!isMobile && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan origin-left"
          style={{ scaleX: scrollYProgress, opacity: isScrolled ? 1 : 0 }}
        />
      )}

      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="section-container">
          <nav
            role="navigation"
            aria-label="Main navigation"
            className={`flex items-center justify-between rounded-full px-6 py-4 transition-all duration-500 ${
              isScrolled
                ? 'glass-strong backdrop-blur-3xl'
                : 'bg-transparent'
            }`}
          >
            <a
              href="#"
              className="font-display text-xl font-bold tracking-tight text-white"
            >
              BRANDEX
              <span className="ml-1 text-xs font-normal text-text-muted tracking-widest uppercase">
                Digital
              </span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1)
                const isHovered = hoveredLink === link.label
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="text-sm transition-colors duration-300 line-through-hover relative cursor-pointer"
                    style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.6)' }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 + i * 0.1 }}
                    onClick={(e) => handleNavClick(link.href, e)}
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {link.label}
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-px bg-accent-blue"
                        layoutId="activeNav"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    {/* Hover glow underline */}
                    {!isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-accent-blue/50 via-accent-purple/50 to-accent-cyan/50"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </motion.a>
                )
              })}
            </div>

            <div className="hidden md:block">
              <MagneticButton variant="primary" href="#contact" onClick={(e) => handleNavClick('#contact', e)}>
                Let&apos;s Talk
              </MagneticButton>
            </div>

            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-3xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="font-display text-4xl md:text-5xl font-bold text-white hover:text-accent-blue transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => handleNavClick(link.href, e)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <MagneticButton variant="primary" href="#contact" onClick={(e) => handleNavClick('#contact', e)}>
                  Let&apos;s Talk
                </MagneticButton>
              </motion.div>
            </div>

            <motion.div
              className="absolute bottom-12 left-0 right-0 flex justify-center gap-8 text-text-muted text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a href="mailto:brandexdigital.in@gmail.com" className="hover:text-white transition-colors">
                brandexdigital.in@gmail.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
