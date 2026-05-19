'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Zap, Award, Code2, TrendingUp } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import MagneticButton from '@/components/ui/MagneticButton'

const reasons = [
  {
    number: '01',
    icon: Zap,
    title: 'Strategic Thinking',
    description: 'Every project begins with deep research and strategic planning. We don\'t guess—we analyze, test, and validate.',
    color: 'blue',
  },
  {
    number: '02',
    icon: Award,
    title: 'Award-Winning Design',
    description: 'Our design philosophy blends aesthetics with functionality, creating experiences that are both beautiful and effective.',
    color: 'purple',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Technical Excellence',
    description: 'We build with the latest technologies, ensuring your digital products are fast, secure, and scalable.',
    color: 'cyan',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Results That Matter',
    description: 'Beautiful design means nothing without results. We measure success by the impact we create for your business.',
    color: 'blue',
  },
]

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-accent-blue/10', text: 'text-accent-blue', border: 'border-accent-blue/20' },
  purple: { bg: 'bg-accent-purple/10', text: 'text-accent-purple', border: 'border-accent-purple/20' },
  cyan: { bg: 'bg-accent-cyan/10', text: 'text-accent-cyan', border: 'border-accent-cyan/20' },
}

export default function WhyBrandex() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-accent-purple/10 blur-[200px] -translate-y-1/2 pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Sticky sidebar */}
          <ScrollReveal direction="right">
            <div className="lg:sticky lg:top-32">
              <motion.span
                className="text-xs font-mono tracking-[0.3em] text-accent-cyan uppercase mb-4 block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Why Brandex
              </motion.span>
              <motion.h2
                className="font-display text-section font-bold text-gradient mb-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Built Different.<br />Built Better.
              </motion.h2>
              <motion.p
                className="text-text-secondary text-body-lg leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                We&apos;re not just another agency. We&apos;re your strategic partner in
                digital transformation, committed to delivering excellence at every touchpoint.
              </motion.p>

              {/* Feature list */}
              <motion.div
                className="space-y-3 mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {['Data-Driven Decisions', 'Transparent Process', 'Dedicated Support'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                    <CheckCircle2 size={16} className="text-accent-blue" />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <MagneticButton variant="primary" href="#contact">
                  Start Your Project
                </MagneticButton>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Reason cards */}
          <div className="space-y-6">
            {reasons.map((reason, i) => {
              const colors = colorMap[reason.color] || colorMap.blue
              const Icon = reason.icon
              return (
                <ScrollReveal key={i} delay={i * 0.1} direction="left" distance={40}>
                  <motion.div
                    className={`glass-card rounded-3xl p-8 group relative overflow-hidden border transition-all duration-500 hover:border-accent-blue/20`}
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Glow effect on hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                      style={{
                        background: `radial-gradient(circle at 20% 50%, ${reason.color === 'blue' ? 'rgba(59,130,246,0.1)' : reason.color === 'purple' ? 'rgba(168,85,247,0.1)' : 'rgba(34,211,238,0.1)'}, transparent 60%)`,
                      }}
                    />

                    <div className="relative z-10 flex items-start gap-6">
                      {/* Icon + Number */}
                      <div className="flex-shrink-0">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${colors.bg} group-hover:scale-110 transition-transform duration-500`}>
                          <Icon size={24} className={colors.text} />
                        </div>
                        <span className={`font-display text-2xl font-bold ${colors.text} opacity-40 group-hover:opacity-100 transition-opacity duration-500`}>
                          {reason.number}
                        </span>
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-accent-blue transition-colors duration-300">
                          {reason.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
