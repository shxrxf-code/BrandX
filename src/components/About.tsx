'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useIsMobile } from '@/lib/hooks'

const values = [
  { label: 'Innovation First', desc: 'Pushing boundaries with every project' },
  { label: 'Results Driven', desc: 'Measurable impact on your bottom line' },
  { label: 'Premium Quality', desc: 'No shortcuts, only excellence' },
  { label: 'Global Reach', desc: 'Serving clients across 15+ countries' },
]

export default function About() {
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.02])

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-accent-blue/10 blur-[200px] -translate-y-1/2 pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content side */}
          <ScrollReveal direction="right" distance={60}>
            <div>
              <motion.span
                className="text-xs font-mono tracking-[0.3em] text-accent-blue uppercase mb-4 block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                About Us
              </motion.span>
              <motion.h2
                className="font-display text-section font-bold text-gradient mb-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                We Don&apos;t Just Build.<br />We Transform.
              </motion.h2>
              <div className="space-y-6 text-text-secondary text-body-lg leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Brandex Digital is a premium digital agency obsessed with crafting
                  experiences that matter. We combine strategic thinking with creative
                  excellence to deliver results that exceed expectations.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Our team of designers, developers, and strategists work in perfect
                  harmony to transform brands into market leaders. Every pixel, every
                  interaction, every line of code is crafted with intention.
                </motion.p>
              </div>

              {/* Values grid */}
              <div className="mt-10 grid grid-cols-2 gap-6">
                {values.map((value, i) => (
                  <motion.div
                    key={i}
                    className="border-l-2 border-accent-blue/30 pl-4 group hover:border-accent-blue transition-colors duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        <CheckCircle2 size={14} className="text-accent-blue" />
                      </motion.div>
                      <h4 className="font-display text-text-primary font-semibold group-hover:text-accent-blue transition-colors duration-300">
                        {value.label}
                      </h4>
                    </div>
                    <p className="text-sm text-text-muted">{value.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Image side */}
          <ScrollReveal direction="left" distance={60}>
            <div className="relative">
              {/* Main image with parallax and clip-path reveal */}
              <motion.div
                ref={imageRef}
                className="aspect-[4/5] rounded-3xl overflow-hidden bg-background-secondary"
                style={{ y: isMobile ? 0 : imageY, scale: isMobile ? 1 : imageScale }}
                initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Brandex Digital Team"
                  fill
                  className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={80}
                />
              </motion.div>

              {/* Glass quote card */}
              <motion.div
                className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-6 max-w-xs"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <p className="font-display text-lg font-bold text-text-primary mb-1">
                  &ldquo;Design is intelligence made visible.&rdquo;
                </p>
                <p className="text-xs text-text-muted">— Alina Wheeler</p>
              </motion.div>

              {/* Decorative blur orbs */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-accent-blue/20 blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-accent-purple/20 blur-3xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
