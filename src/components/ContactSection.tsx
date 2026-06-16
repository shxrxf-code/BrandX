'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ContactSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background scroll-mt-24" id="contact">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-accent/5 blur-[120px] animate-aurora-slow" />
      </div>
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-strong rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-4">
                Start Your Project
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-heading-1 font-bold tracking-tight max-w-2xl mx-auto mb-6"
            >
              Ready to build something great?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted text-base md:text-lg max-w-lg mx-auto mb-10"
            >
              Tell us about your project and we will get back to you within two business days.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/contact"
                className="inline-flex px-8 py-4 btn-gradient text-base"
              >
                Start Your Project
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
