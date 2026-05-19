'use client'

import { motion } from 'framer-motion'
import { Palette, Code, Megaphone, TrendingUp, Smartphone, Layers } from 'lucide-react'
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

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-accent-blue/10', text: 'text-accent-blue' },
  purple: { bg: 'bg-accent-purple/10', text: 'text-accent-purple' },
  cyan: { bg: 'bg-accent-cyan/10', text: 'text-accent-cyan' },
}

export default function Services() {
  return (
    <section id="services" className="section-padding relative">
      <div className="section-container">
        <ScrollReveal>
          <div className="max-w-3xl mb-20">
            <span className="text-xs font-mono tracking-[0.3em] text-accent-blue uppercase mb-4 block">
              What We Do
            </span>
            <h2 className="font-display text-section font-bold text-gradient mb-6">
              Services Built for Growth
            </h2>
            <p className="text-text-secondary text-body-lg leading-relaxed">
              End-to-end digital solutions designed to transform your brand presence
              and accelerate business outcomes.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const colors = colorMap[service.color] || colorMap.blue
            return (
              <ScrollReveal key={i} delay={i * 0.1} direction="up" distance={40}>
                <GlowCard glowColor={service.color as 'blue' | 'purple' | 'cyan'}>
                  <div className="p-8 h-full flex flex-col">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${colors.bg}`}>
                      <service.icon size={24} className={colors.text} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="text-[10px] font-mono tracking-wider uppercase text-text-muted bg-white/5 px-3 py-1.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
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
