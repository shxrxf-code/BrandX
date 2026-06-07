'use client'

import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

export default function AboutHero() {
  return (
    <section className="relative min-h-[85vh] flex items-end overflow-hidden pt-32 pb-16">
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
        <SectionLabel number="01" label="About The Studio" className="mb-8" />

        <h1 className="font-display font-semibold leading-[0.92] tracking-[-0.04em] text-display mb-8 max-w-5xl">
          <span className="block text-white">We are not an agency.</span>
          <span className="block text-gradient-shine">We are a studio.</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-white/55 max-w-3xl leading-relaxed"
        >
          A small, senior team of designers, engineers, and strategists building
          premium digital experiences for ambitious brands. No handoffs. No
          account managers. Just the people who build the work.
        </motion.p>
      </div>
    </section>
  )
}
