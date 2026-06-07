'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'

export default function ServicesTestimonial() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <SectionLabel number="03" label="In Their Words" className="mb-6" />
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-white">
              What it&apos;s like to{' '}
              <span className="text-gradient-shine">work with us</span>.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative p-8 md:p-12 rounded-3xl glass-elevated border border-white/[0.08] overflow-hidden"
            >
              <div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent/15 blur-3xl"
              />
              <div className="relative">
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="font-display text-2xl md:text-3xl text-white leading-snug mb-8">
                  &ldquo;Brandex doesn&apos;t just deliver a website — they re-architect how you
                  go to market. They treat every interaction as a chance to earn trust.
                  Our inbound pipeline is 3.2x what it was before.&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/[0.06]">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-bright flex items-center justify-center text-white font-display font-semibold">
                    RK
                  </div>
                  <div>
                    <div className="font-display text-base font-medium text-white">Rajesh Kumar</div>
                    <div className="text-sm text-white/50">CEO, SolarTech Energy · $48M Series B</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
