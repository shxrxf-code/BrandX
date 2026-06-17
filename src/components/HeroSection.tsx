'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import HeroVisual from '@/components/HeroVisual'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] animate-aurora" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-magenta/10 blur-[100px] animate-aurora" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px] animate-aurora" style={{ animationDelay: '-6s' }} />
      </div>

      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-4">
                Digital Experience Studio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-heading-1 font-bold tracking-tight leading-[1.05] mb-6"
            >
              Building Digital Products
              <br />
              <span className="text-gradient-accent">That Drive Real Growth</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted text-base md:text-lg leading-relaxed max-w-lg mb-8"
            >
              We design and engineer premium digital experiences — from web platforms
              to AI-powered solutions — that transform how businesses connect with their audience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start gap-3"
            >
              <Link
                href="/contact"
                className="inline-flex px-6 py-3 btn-gradient text-sm"
              >
                Start Your Project
              </Link>
              <Link
                href="/work"
                className="inline-flex px-6 py-3 text-foreground text-sm font-medium rounded-lg border border-white/10 glass hover:border-accent/30 hover:text-accent transition-all duration-200"
              >
                View Work
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <span className="text-xs text-muted">
                Built with modern technology{' '}
                <Link href="/services" className="text-accent hover:text-accent-light underline underline-offset-2 transition-colors duration-200">
                  Learn more
                </Link>
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
