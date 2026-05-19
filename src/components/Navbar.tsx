'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import MagneticButton from './ui/MagneticButton'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
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

  return (
    <>
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
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-white transition-colors duration-300 line-through-hover"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 + i * 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="hidden md:block">
              <MagneticButton variant="primary" href="#contact">
                Let&apos;s Talk
              </MagneticButton>
            </div>

            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
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
                  className="font-display text-4xl md:text-5xl font-bold text-white hover:text-accent-blue transition-colors"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setIsOpen(false)}
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
                <MagneticButton variant="primary" href="#contact" onClick={() => setIsOpen(false)}>
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
              <a href="mailto:hello@brandexdigital.in" className="hover:text-white transition-colors">
                hello@brandexdigital.in
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
