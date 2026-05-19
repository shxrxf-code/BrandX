'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <ScrollReveal direction="right" distance={60}>
            <div>
              <span className="text-xs font-mono tracking-[0.3em] text-accent-blue uppercase mb-4 block">
                About Us
              </span>
              <h2 className="font-display text-section font-bold text-gradient mb-8">
                We Don&apos;t Just Build. We Transform.
              </h2>
              <div className="space-y-6 text-text-secondary text-body-lg leading-relaxed">
                <p>
                  Brandex Digital is a premium digital agency obsessed with crafting
                  experiences that matter. We combine strategic thinking with creative
                  excellence to deliver results that exceed expectations.
                </p>
                <p>
                  Our team of designers, developers, and strategists work in perfect
                  harmony to transform brands into market leaders. Every pixel, every
                  interaction, every line of code is crafted with intention.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                {[
                  { label: 'Innovation First', desc: 'Pushing boundaries with every project' },
                  { label: 'Results Driven', desc: 'Measurable impact on your bottom line' },
                  { label: 'Premium Quality', desc: 'No shortcuts, only excellence' },
                  { label: 'Global Reach', desc: 'Serving clients across 15+ countries' },
                ].map((value, i) => (
                  <div key={i} className="border-l-2 border-accent-blue/30 pl-4">
                    <h4 className="font-display text-white font-semibold mb-1">
                      {value.label}
                    </h4>
                    <p className="text-sm text-text-muted">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" distance={60}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-background-secondary">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Brandex Digital Team"
                  className="w-full h-full object-cover opacity-80"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-6 max-w-xs">
                <p className="font-display text-lg font-bold text-white mb-1">
                  &ldquo;Design is intelligence made visible.&rdquo;
                </p>
                <p className="text-xs text-text-muted">— Alina Wheeler</p>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-accent-blue/20 blur-3xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-accent-purple/20 blur-3xl" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
