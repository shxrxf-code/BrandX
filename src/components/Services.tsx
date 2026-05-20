'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Palette, Code, Megaphone, TrendingUp, Smartphone, Layers } from 'lucide-react'
import NetworkNode from '@/components/services/NetworkNode'
import NetworkConnections from '@/components/services/NetworkConnections'
import NetworkBackground from '@/components/services/NetworkBackground'
import { useIsMobile } from '@/lib/hooks'

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

export default function Services() {
  const isMobile = useIsMobile()
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const baseDelay = isMobile ? 0.1 : 0.3

  return (
    <section id="services" className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      <NetworkBackground isLoaded={isLoaded} baseDelay={baseDelay} />

      <div className="section-container relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            className="text-xs font-mono tracking-[0.3em] text-accent-blue uppercase mb-4 block"
            initial={{ opacity: 0, y: -20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: baseDelay }}
          >
            What We Do
          </motion.span>
          <motion.h2
            className="font-display text-section font-bold text-gradient mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: baseDelay + 0.1 }}
          >
            Services Built for Growth
          </motion.h2>
          <motion.p
            className="text-text-secondary max-w-xl mx-auto text-body-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: baseDelay + 0.2 }}
          >
            End-to-end digital solutions designed to transform your brand presence
            and accelerate business outcomes.
          </motion.p>
        </div>

        <div className="relative" style={{ minHeight: isMobile ? 'auto' : '700px' }}>
          <NetworkConnections isLoaded={isLoaded} baseDelay={baseDelay} />

          {isMobile ? (
            <div className="space-y-6">
              {services.map((service, i) => (
                <NetworkNode
                  key={i}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  tags={service.tags}
                  color={service.color}
                  index={i}
                  isLoaded={isLoaded}
                  baseDelay={baseDelay}
                />
              ))}
            </div>
          ) : (
            services.map((service, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <NetworkNode
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  tags={service.tags}
                  color={service.color}
                  index={i}
                  isLoaded={isLoaded}
                  baseDelay={baseDelay}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
