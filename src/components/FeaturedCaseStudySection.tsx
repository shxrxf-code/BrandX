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
            SunSolar Power System
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
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=85&auto=format"
                alt="SunSolar Power System project"
                fill
                className="object-cover opacity-90"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex gap-3">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 border border-border shadow-sm">
                <span className="text-xs font-semibold text-accent">Solar Energy</span>
                <span className="text-[10px] text-muted font-medium block mt-0.5">Industry</span>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 border border-border shadow-sm">
                <span className="text-xs font-semibold text-accent">Website & Branding</span>
                <span className="text-[10px] text-muted font-medium block mt-0.5">Service</span>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 border border-border shadow-sm">
                <span className="text-xs font-semibold text-accent">Lead Generation</span>
                <span className="text-[10px] text-muted font-medium block mt-0.5">Goal</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="p-6 md:p-8">
              <span className="text-[10px] text-muted font-semibold tracking-wider uppercase mb-2 block">Challenge</span>
              <p className="text-sm text-foreground leading-relaxed">
                The client needed a professional digital presence that could effectively communicate their renewable energy expertise and generate qualified leads.
              </p>
            </div>
            <div className="p-6 md:p-8">
              <span className="text-[10px] text-muted font-semibold tracking-wider uppercase mb-2 block">Solution</span>
              <p className="text-sm text-foreground leading-relaxed">
                A comprehensive solar energy platform featuring service showcases, installation galleries, and optimized lead capture flows.
              </p>
            </div>
            <div className="p-6 md:p-8 flex items-center">
              <Link
                href="/work/sunsolar-power-system"
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
