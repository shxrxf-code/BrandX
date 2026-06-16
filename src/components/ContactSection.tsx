'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ContactSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background scroll-mt-24" id="contact">
      <div className="max-w-content mx-auto px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-4">
            Start Your Project
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-heading-1 font-bold tracking-tight max-w-2xl mx-auto mb-6"
        >
          Ready to build something great?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted text-base md:text-lg max-w-md mx-auto mb-10"
        >
          Tell us about your project and we will get back to you within two business days.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/contact"
            className="inline-flex px-8 py-4 bg-accent text-white text-base font-medium rounded-lg hover:bg-accent-dark transition-colors duration-200 shadow-sm"
          >
            Start Your Project
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
