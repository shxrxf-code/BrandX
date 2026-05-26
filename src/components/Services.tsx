'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Palette, Code, Megaphone, TrendingUp, Smartphone, Layers } from 'lucide-react'
import RotationCarousel from '@/components/services/RotationCarousel'
import NeuralNetwork3D from '@/components/services/NeuralNetwork3D'
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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const baseDelay = isMobile ? 0.1 : 0.3

  return (
    <section id="services" className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      <NeuralNetwork3D isLoaded={isLoaded} baseDelay={baseDelay} />

      <div className="section-container relative z-10">
        <div className="text-center mb-12 md:mb-16">
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

        <RotationCarousel services={services} isLoaded={isLoaded} baseDelay={baseDelay} />
      </div>
    </section>
  )
}
