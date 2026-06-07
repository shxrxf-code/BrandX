'use client'

import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import SectionLabel from '@/components/ui/SectionLabel'

const stats = [
  { value: 6, suffix: '', label: 'Capabilities' },
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 12, suffix: '', label: 'Industries Served' },
  { value: 40, suffix: 'M+', label: 'Users Reached' },
]

export default function ServicesHero() {
  return (
    <section className="relative min-h-[85vh] flex items-end overflow-hidden pt-32 pb-16">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full opacity-50"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(91,91,255,0.35) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="section-container relative z-10 w-full">
        <SectionLabel number="01" label="Capabilities" className="mb-8" />

        <h1 className="font-display font-semibold leading-[0.92] tracking-[-0.04em] text-display mb-8 max-w-5xl">
          <span className="block text-white">Enterprise services,</span>
          <span className="block text-gradient-shine">studio intimacy.</span>
        </h1>

        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="text-xl text-white/55 max-w-2xl leading-relaxed">
              Six tightly-defined capabilities. We don&apos;t do &quot;general digital&quot;.
              Each service is a practice with frameworks, principles, and proof.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="text-center md:text-left">
                  <div className="font-display text-3xl md:text-4xl font-semibold text-white tabular-nums">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/40 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
