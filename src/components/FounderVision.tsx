'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useIsMobile } from '@/lib/hooks'

const values = [
  {
    title: 'Craft over output',
    description: 'We measure success in decades, not deliverables. Every artifact is built to be admired and to compound.',
  },
  {
    title: 'Truth in evidence',
    description: 'No opinion is allowed in the room without data. We defend decisions with research and measure outcomes relentlessly.',
  },
  {
    title: 'Studio intimacy, enterprise rigor',
    description: 'You work directly with the principals — no account managers, no handoffs, no dilution. The team that scopes builds.',
  },
  {
    title: 'Outcomes, not artifacts',
    description: 'Beautiful work that doesn\'t move metrics is decoration. We exist to grow businesses and elevate brands.',
  },
]

export default function FounderVision() {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const imgY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [80, -80])

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/[0.04]"
    >
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div className="lg:col-span-5 order-1 lg:order-1">
            <ScrollReveal direction="left">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-background-tertiary">
                <motion.div
                  style={{ y: imgY, height: '120%' }}
                  className="relative w-full -mt-[10%]"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85"
                    alt="Brandex Digital — Studio"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    quality={85}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                {/* Floating signature */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-strong">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-bright flex items-center justify-center text-white font-display font-semibold">
                      AM
                    </div>
                    <div>
                      <div className="font-display text-base font-medium text-white">Aarav Mehta</div>
                      <div className="text-xs text-white/50">Founder & Principal</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 order-2 lg:order-2">
            <SectionLabel number="06" label="Founder Vision" className="mb-8" />

            <ScrollReveal delay={0.1}>
              <div className="relative mb-10">
                <Quote size={32} className="text-accent/40 absolute -top-2 -left-2" />
                <p className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-[1.2] tracking-tight pl-8">
                  We started Brandex because the world is full of agencies that
                  ship forgettable work for forgettable budgets. We exist to do
                  the opposite — and to prove that craft and commerce are the
                  same thing.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-white/60 leading-relaxed mb-4 max-w-2xl">
                Our mission is simple: help ambitious brands build digital
                systems that earn attention, command trust, and compound in
                value. We work with a small number of clients, end to end,
                with no handoffs and no dilution.
              </p>
              <p className="text-white/60 leading-relaxed mb-10 max-w-2xl">
                What you see in our case studies is not an exception — it is
                the standard. We bring the rigor of a global consultancy and
                the obsession of a boutique studio to every engagement.
              </p>
            </ScrollReveal>

            {/* Values */}
            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <ScrollReveal key={v.title} delay={0.3 + i * 0.08} direction="up" distance={20}>
                  <div className="p-5 rounded-2xl glass-elevated border border-white/[0.06] h-full">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                      0{i + 1}
                    </div>
                    <div className="font-display text-base font-medium text-white mb-1.5">
                      {v.title}
                    </div>
                    <p className="text-sm text-white/55 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
