'use client'

import { motion } from 'framer-motion'
import { Palette, Code, Megaphone, TrendingUp, Smartphone, Layers, ArrowRight } from 'lucide-react'
import GlowCard from '@/components/ui/GlowCard'
import ScrollReveal from '@/components/ui/ScrollReveal'

const services = [
  {
    icon: Palette,
    title: 'Brand Identity',
    description: 'Crafting distinctive visual identities that resonate with your audience and stand the test of time.',
    color: 'blue',
    tags: ['Logo Design', 'Visual Systems', 'Brand Guidelines'],
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Building performant, scalable web applications with cutting-edge technology and pixel-perfect precision.',
    color: 'purple',
    tags: ['Next.js', 'React', 'Full-Stack'],
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Strategic campaigns that amplify your brand presence and drive measurable growth across channels.',
    color: 'cyan',
    tags: ['SEO', 'PPC', 'Content Strategy'],
  },
  {
    icon: TrendingUp,
    title: 'Growth Strategy',
    description: 'Data-driven approaches to scale your business, optimize conversions, and maximize ROI.',
    color: 'blue',
    tags: ['Analytics', 'CRO', 'Funnel Design'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile experiences that delight users and drive engagement.',
    color: 'purple',
    tags: ['iOS', 'Android', 'React Native'],
  },
  {
    icon: Layers,
    title: 'UI/UX Design',
    description: 'Human-centered design that balances aesthetics with functionality for exceptional user experiences.',
    color: 'cyan',
    tags: ['Research', 'Prototyping', 'Design Systems'],
  },
]

const colorMap: Record<string, { bg: string; text: string; glow: string }> = {
  blue: { bg: 'bg-accent-blue/10', text: 'text-accent-blue', glow: 'shadow-glow-blue' },
  purple: { bg: 'bg-accent-purple/10', text: 'text-accent-purple', glow: 'shadow-glow-purple' },
  cyan: { bg: 'bg-accent-cyan/10', text: 'text-accent-cyan', glow: 'shadow-glow-cyan' },
}

export default function Services() {
  return (
    <section id="services" className="section-padding relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/5 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
          <div>
            <motion.span
              className="text-xs font-mono tracking-[0.3em] text-accent-blue uppercase mb-4 block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              What We Do
            </motion.span>
            <motion.h2
              className="font-display text-section font-bold text-gradient mb-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Services Built for Growth
            </motion.h2>
          </div>
          <motion.p
            className="text-text-secondary max-w-md text-body-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            End-to-end digital solutions designed to transform your brand presence
            and accelerate business outcomes.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const colors = colorMap[service.color] || colorMap.blue
            const Icon = service.icon
            return (
              <ScrollReveal key={i} delay={i * 0.08} direction="up" distance={40}>
                <GlowCard glowColor={service.color as 'blue' | 'purple' | 'cyan'}>
                  <div className="p-8 h-full flex flex-col group">
                    {/* Icon with animated background */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${colors.bg} group-hover:scale-110 transition-transform duration-500`}>
                      <Icon size={26} className={`${colors.text} group-hover:scale-110 transition-transform duration-300`} />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-accent-blue transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="text-[10px] font-mono tracking-wider uppercase text-text-muted bg-white/5 px-3 py-1.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Learn more link */}
                    <div className="flex items-center gap-2 text-sm font-medium text-accent-blue opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span>Learn more</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </GlowCard>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
