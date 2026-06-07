'use client'

import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

export default function ContactHero() {
  return (
    <section className="relative min-h-[70vh] flex items-end overflow-hidden pt-32 pb-16">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full opacity-50"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(91,91,255,0.3) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="section-container relative z-10 w-full">
        <SectionLabel number="01" label="Start a Project" className="mb-8" />

        <h1 className="font-display font-semibold leading-[0.92] tracking-[-0.04em] text-display mb-8 max-w-5xl">
          <span className="block text-white">Tell us about</span>
          <span className="block text-gradient-shine">what you&apos;re building.</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl text-white/55 max-w-2xl leading-relaxed"
        >
          We reply to every inquiry within 24 hours — usually faster. No pitch.
          No funnels. Just a real conversation.
        </motion.p>
      </div>
    </section>
  )
}
