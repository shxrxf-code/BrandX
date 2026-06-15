'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function FeaturedCaseStudySection() {
  return (
    <section className="relative bg-secondary py-20 md:py-28 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-3">
            Featured Project
          </span>
          <h2 className="text-heading-2 font-bold tracking-tight mb-10">
            SolarTech Energy
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden border border-border bg-white shadow-sm"
        >
          <div className="relative aspect-[16/9] md:aspect-[3/1] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-white">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80"
                alt="SolarTech Energy project"
                fill
                className="object-cover opacity-90"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex gap-3">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 border border-border shadow-sm">
                <span className="text-2xl md:text-3xl font-display font-bold text-accent">+340%</span>
                <span className="text-[10px] text-muted font-medium block mt-0.5">Inbound Leads</span>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 border border-border shadow-sm">
                <span className="text-2xl md:text-3xl font-display font-bold text-accent">14</span>
                <span className="text-[10px] text-muted font-medium block mt-0.5">Markets Unified</span>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 border border-border shadow-sm">
                <span className="text-2xl md:text-3xl font-display font-bold text-accent">3x</span>
                <span className="text-[10px] text-muted font-medium block mt-0.5">Engagement</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="p-6 md:p-8">
              <span className="text-[10px] text-muted font-semibold tracking-wider uppercase mb-2 block">Challenge</span>
              <p className="text-sm text-foreground leading-relaxed">
                Fragmented brand identity across 14 markets with a dated web platform that failed to inspire investor confidence.
              </p>
            </div>
            <div className="p-6 md:p-8">
              <span className="text-[10px] text-muted font-semibold tracking-wider uppercase mb-2 block">Solution</span>
              <p className="text-sm text-foreground leading-relaxed">
                Unified brand narrative with a premium visual system and modular web platform engineered for global scale.
              </p>
            </div>
            <div className="p-6 md:p-8 flex items-center">
              <Link
                href="/work/solartech-energy"
                className="inline-flex items-center gap-1.5 text-sm text-accent font-medium hover:text-accent-dark transition-colors duration-200"
              >
                Read full case study
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
